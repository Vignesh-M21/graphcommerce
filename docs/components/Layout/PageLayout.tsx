import { responsiveVal } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import React from 'react'
import { FileOrFolderNode } from '../../lib/files'
import SidebarMenu from '../SidebarMenu'

export type LayoutProps = { menuData: FileOrFolderNode }

export default function Layout(props: LayoutProps & { children: React.ReactNode }) {
  const { menuData, children } = props

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${responsiveVal(150, 300)} 4fr`,
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={(theme) => ({
          overflowY: 'auto',
          minWidth: 'min-content',
          borderRight: `1px solid ${theme.palette.divider}`,
        })}
      >
        <SidebarMenu menuData={menuData} />
      </Box>
      <Box
        sx={(theme) => ({
          overflow: 'hidden',
          maxWidth: '100%',
          padding: `0 ${theme.spacings.sm} ${theme.spacings.sm}`,
        })}
      >
        {children}
      </Box>
    </Box>
  )
}
