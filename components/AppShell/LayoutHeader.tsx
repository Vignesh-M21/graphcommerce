import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import Backdrop from 'components/PageTransition/Backdrop'
import instantAnimation from 'components/PageTransition/animation/instant'
import keepAnimation from 'components/PageTransition/animation/keep'
import opacityAnimation from 'components/PageTransition/animation/opacity'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import Header from './Header'

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
      // backgroundColor: 'rgba(255, 255, 255, 0.7)',
      // backdropFilter: 'blur(4px)',
    },
  }),
  { name: 'LayoutHeader' },
)

const LayoutHeader: PageLayoutFC<GQLLayoutHeaderQuery> = (props) => {
  const { children, urlResolver, menu } = props
  const theme = useTheme()
  const classes = useStyles(props)
  const { offsetDiv, inFront } = usePageTransition()

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <Backdrop inFront={inFront} />
      <motion.div {...offsetDiv}>
        <Header menu={menu} urlResolver={urlResolver} />
        <div className={classes.content}>{children}</div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutHeaderProps = GetProps<typeof LayoutHeader>

export default LayoutHeader
