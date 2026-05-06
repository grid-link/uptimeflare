import '@mantine/core/styles.css'
import '@/styles/brand.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core'
import NoSsr from '@/components/NoSsr'
import '@/util/i18n'

// GridLink accent — built around #00E676 (the brand vivid green) so Mantine's
// Tailwind-style 0–9 shade scale resolves to colors that match the website.
const accent: MantineColorsTuple = [
  '#e6fff0',
  '#ccffe1',
  '#99ffc3',
  '#66ffa5',
  '#33ff87',
  '#00E676',
  '#00b85e',
  '#008a47',
  '#005c2f',
  '#002e18',
]

const theme = createTheme({
  primaryColor: 'accent',
  primaryShade: { light: 6, dark: 5 },
  colors: { accent },
  white: '#F5F4F1',
  black: '#0F0F0F',
  fontFamily: '"Outfit", ui-sans-serif, system-ui, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  headings: {
    fontFamily: '"Syne", "Outfit", sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'sm',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoSsr>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </NoSsr>
  )
}
