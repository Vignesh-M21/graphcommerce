import { ButtonProps, makeStyles, TextField, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconSearch } from '@reachdigital/next-ui/icons'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      '& fieldset': {
        border: `2px solid rgba(0,0,0,0.1)`,
      },
    },
    inputRoot: {
      ...theme.typography.body2,
    },
  }),
  { name: 'SearchButton' },
)

export type SearchButtonProps = Pick<ButtonProps, 'onClick'> & UseStyles<typeof useStyles>

export default function SearchButton(props: SearchButtonProps) {
  const { onClick } = props
  const classes = useStyles(props)

  return (
    <TextField
      variant='outlined'
      size='small'
      classes={{ root: classes.root }}
      InputProps={{
        readOnly: true,
        endAdornment: <SvgImage src={iconSearch} alt='Search' loading='eager' size='small' />,
        classes: { root: classes.inputRoot },
      }}
      placeholder=''
      onClick={onClick}
    />
  )
}
