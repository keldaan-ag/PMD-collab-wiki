import { Link } from "react-router-dom"
import { Paper, Typography } from "@mui/material"
import { formatDate, getFormMaxPortraitBounty, getFormMaxSpriteBounty, getMonsterMaxPortraitBounty, getMonsterMaxSpriteBounty } from '../util'
import { MonsterFormWithRef } from "./pokemon-carousel"

interface Props {
  form: MonsterFormWithRef
  infoKey: string
  doesShowParameters: Record<string, boolean>
  isSpeciesThumbnail?: boolean
}
export default function PokemonThumbnail({
  form, form: { monster },
  infoKey,
  doesShowParameters: {
    index, spriteAuthor, portraitAuthor, lastModification,
    portraitBounty, spriteBounty
  },
  isSpeciesThumbnail = false
}: Props) {
  return (
    <Link to={`/${infoKey}`}>
      <Paper
        sx={{
          minWidth: 80
        }}
        elevation={2}
      >
        {form.portraits.previewEmotion?.url ? (
          <img
            src={form.portraits.previewEmotion?.url}
            style={{ height: 80, imageRendering: "pixelated" }}
          />
        ) : (
          <Typography variant="h4" align="center" sx={{ height: 80 }}>
            ?
          </Typography>
        )}
        <Typography
          align="center"
          color="GrayText"
          noWrap
          sx={{ width: "80px" }}
        >
          {isSpeciesThumbnail || monster.name == form.fullName ? monster.name : `(${form.fullName})`}
        </Typography>
        {index && <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
          {infoKey}
        </Typography>}
        {portraitAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {form.portraits.creditPrimary?.name}
          </Typography>
        )}
        {spriteAuthor && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {form.sprites.creditPrimary?.name}
          </Typography>
        )}
        {lastModification && (
          <Typography align="center" color="GrayText" noWrap sx={{ width: "80px" }}>
            {formatDate(Math.max(
              new Date(form.portraits.modifiedDate).getTime(),
              new Date(form.sprites.modifiedDate).getTime()
            ))}
          </Typography>
        )}
        {portraitBounty && (
          <Typography color="GrayText" align="center" noWrap>
            {isSpeciesThumbnail ? getMonsterMaxPortraitBounty(monster) : getFormMaxPortraitBounty(form)} gp
          </Typography>
        )}
        {spriteBounty && (
          <Typography color="GrayText" align="center" noWrap>
            {isSpeciesThumbnail ? getMonsterMaxSpriteBounty(monster) : getFormMaxSpriteBounty(form)} gp
          </Typography>
        )}
      </Paper>
    </Link>
  )
}