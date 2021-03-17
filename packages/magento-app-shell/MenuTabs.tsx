import { Theme, makeStyles, Link } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import { MenuQueryFragment } from './MenuQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      display: 'flex',
      pointerEvents: 'all',
      flexGrow: 1,
      height: 50,
      padding: '10px 0',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    scroller: {
      columnGap: '40px',
    },
    prevNext: {
      pointerEvents: 'all',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    link: {
      ...theme.typography.h6,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      color: 'black',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    line: {
      maxWidth: 40,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 2,
      background: theme.palette.primary.main,
      margin: '0 auto',
      marginTop: 8,
    },
  }),
  { name: 'DesktopMenuTabs' },
)

export type MenuTabsProps = MenuQueryFragment

export default function MenuTabs(props: MenuTabsProps) {
  const { menu } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <SliderContext scrollSnapAlign={false}>
      <SliderPrev className={classes.prevNext} />
      <SliderContainer classes={{ container: clsx(classes.container) }}>
        <SliderScroller classes={{ scroller: clsx(classes.scroller) }}>
          {menu?.items?.[0]?.children?.map((cat) => {
            if (!cat || !cat.id || !cat.url_path) return null
            return (
              <PageLink key={cat.id} href={cat.url_path}>
                <Link className={classes.link}>
                  {cat.name}

                  {router.asPath.startsWith(`/${cat?.url_path}`) && (
                    <m.div layoutId='menutabs-line' className={classes.line} layout initial />
                  )}
                </Link>
              </PageLink>
            )
          })}
          <PageLink href='/blog'>
            <Link className={classes.link}>
              Blog
              {router.asPath.startsWith(`/blog`) && (
                <m.div layoutId='menutabs-line' className={classes.line} layout initial />
              )}
            </Link>
          </PageLink>
        </SliderScroller>
      </SliderContainer>
      <SliderNext className={classes.prevNext} />
    </SliderContext>
  )
}
