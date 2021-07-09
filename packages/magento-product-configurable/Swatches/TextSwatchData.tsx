import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { TextSwatchDataFragment } from './TextSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      width: '100%',
      textAlign: 'start',
      gridColumnGap: theme.spacings.sm,
      gridTemplateAreas: `
        "label value"
        "delivery delivery"
      `,
    },
    storeLabel: {
      gridArea: 'label',
      // fontWeight: theme.typography.fontWeightMedium,
    },
    value: {
      gridArea: 'value',
      justifySelf: 'end',
      // ...theme.typography.body1,
      margin: 'auto 0',
    },
    delivery: {
      gridArea: 'delivery',
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'TextSwatchData' },
)

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function TextSwatchData(props: TextSwatchDataProps) {
  const classes = useStyles(props)
  const { store_label, size, price } = props

  return (
    <div className={classes.root}>
      {size === 'large' ? (
        <>
          <Typography className={classes.storeLabel} variant='subtitle2' component='div'>
            {store_label}
          </Typography>
          <Typography className={classes.value} variant='body2' component='div'>
            <Money {...price} />
          </Typography>
          <Typography variant='body2' className={classes.delivery} component='div'>
            Next day delivery
          </Typography>
        </>
      ) : (
        <>{store_label}</>
      )}
    </div>
  )
}
