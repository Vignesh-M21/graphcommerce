import { Rating, RatingProps } from '@material-ui/lab'
import React from 'react'
import { SvgImageSimple } from '..'
import { iconStar } from '../icons'
import { makeStyles, Theme } from '@material-ui/core'

export type StarRatingFieldProps = {
  id?: string
  onChange?: (id: string, value: number) => void
  iconSize?: number
} & Omit<RatingProps, 'id' | 'onChange'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    iconStar: {
      fill: '#FFDA1C',
      stroke: 'none',
      margin: '0 3px',
    },
    iconStarEmpty: {
      fill: theme.palette.grey[300],
      stroke: 'none',
      margin: '0 3px',
    },
  }),
  {
    name: 'StarRatingField',
  },
)

export default function StarRatingField(props: StarRatingFieldProps) {
  const { id, onChange = () => {}, iconSize = 20, ...ratingProps } = props
  const classes = useStyles(props)

  return (
    <Rating
      name={`star-rating-${id}`}
      max={5}
      size='small'
      emptyIcon={<SvgImageSimple src={iconStar} size='large' className={classes.iconStarEmpty} />}
      icon={<SvgImageSimple src={iconStar} size='large' className={classes.iconStar} />}
      onChange={(event, value) => {
        onChange(id ?? '', value ?? 0)
      }}
      {...ratingProps}
    />
  )
}
