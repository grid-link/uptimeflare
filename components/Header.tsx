import { Container, Group } from '@mantine/core'
import Link from 'next/link'
import classes from '@/styles/Header.module.css'
import { pageConfig } from '@/uptime.config'
import { PageConfigLink } from '@/types/config'
import { useTranslation } from 'react-i18next'

export default function Header({ style }: { style?: React.CSSProperties }) {
  const { t } = useTranslation('common')
  const linkToElement = (link: PageConfigLink, i: number) => {
    return (
      <a
        key={i}
        href={link.link}
        target={link.link.startsWith('/') ? undefined : '_blank'}
        className={classes.link}
        data-active={link.highlight}
      >
        {link.label}
      </a>
    )
  }

  const links = [{ label: t('Incidents'), link: '/incidents' }, ...(pageConfig.links || [])]

  return (
    <header className={classes.header} style={style}>
      <Container size="md" className={classes.inner}>
        <Link href="/" className={classes.brand} aria-label="GridLink home">
          <svg
            viewBox="0 0 374 362"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.brandMark}
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M 51.5,14.5 C 78.5021,14.3334 105.502,14.5 132.5,15C 190.035,30.7285 220.035,68.5619 222.5,128.5C 239.757,109.044 261.09,97.2107 286.5,93C 312.165,92.5 337.831,92.3334 363.5,92.5C 366.241,162.242 334.241,207.076 267.5,227C 252.247,229.125 236.914,229.958 221.5,229.5C 221.667,258.502 221.5,287.502 221,316.5C 215.716,335.399 203.216,345.566 183.5,347C 182.5,349 181.5,349 180.5,347C 161.541,346.027 149.375,336.527 144,318.5C 143.833,297.159 143.333,275.826 142.5,254.5C 136.881,235.543 124.547,223.876 105.5,219.5C 105.762,220.978 105.429,222.311 104.5,223.5C 93.4541,237.389 80.4541,248.889 65.5,258C 54.8145,259.834 46.4812,256.334 40.5,247.5C 39.52,244.914 39.1866,242.247 39.5,239.5C 31.8261,239.666 24.1594,239.5 16.5,239C 11.8786,237.536 9.87859,234.369 10.5,229.5C 10.2795,225.752 11.6129,222.752 14.5,220.5C 22.1378,219.503 29.8045,219.169 37.5,219.5C 37.5,209.833 37.5,200.167 37.5,190.5C 29.1401,190.831 20.8068,190.498 12.5,189.5C 10.3054,185.035 9.97208,180.368 11.5,175.5C 12.646,174.855 13.646,174.022 14.5,173C 22.5,172.667 30.5,172.333 38.5,172C 39.6997,163.699 44.0331,157.699 51.5,154C 56.8333,153.333 62.1667,153.333 67.5,154C 83.8168,164.651 97.4835,177.984 108.5,194C 132.641,197.264 150.474,209.764 162,231.5C 164.319,237.12 166.319,242.787 168,248.5C 168.167,269.508 168.667,290.508 169.5,311.5C 172.626,320.128 178.626,323.295 187.5,321C 190.81,318.032 193.31,314.532 195,310.5C 195.5,257.501 195.667,204.501 195.5,151.5C 147.715,155.743 108.215,139.743 77,103.5C 58.1126,76.9713 49.6126,47.3046 51.5,14.5 Z M 78.5,40.5 C 94.8367,40.3334 111.17,40.5001 127.5,41C 153.666,46.8184 173.333,61.4851 186.5,85C 192.274,98.1057 195.274,111.939 195.5,126.5C 159.572,129.529 128.905,118.529 103.5,93.5C 89.9745,78.123 81.6412,60.4563 78.5,40.5 Z M 291.5,118.5 C 307.181,118.167 322.848,118.501 338.5,119.5C 327.812,166.851 298.479,194.851 250.5,203.5C 240.856,204.498 231.19,204.832 221.5,204.5C 221.162,172.836 234.162,148.17 260.5,130.5C 270.03,125.457 280.03,121.957 290.5,120C 291.056,119.617 291.389,119.117 291.5,118.5 Z"
            />
          </svg>
          <span className={classes.brandWordmark}>GRIDLINK</span>
          <span className={classes.brandSep} aria-hidden="true">/</span>
          <span className={classes.brandStatus}>STATUS</span>
        </Link>

        <Group gap={5} visibleFrom="sm">
          {links?.map(linkToElement)}
        </Group>

        <Group gap={5} hiddenFrom="sm">
          {links?.filter((link) => link.highlight || link.link.startsWith('/')).map(linkToElement)}
        </Group>
      </Container>
    </header>
  )
}
