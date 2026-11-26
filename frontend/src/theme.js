import { createTheme } from '@mantine/core'

const theme = createTheme({
  primaryColor: 'teal',
  defaultRadius: 'md',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
})

export const heroGradient =
  'light-dark(linear-gradient(160deg, #e6fbf5 0%, #eef3ff 100%), linear-gradient(160deg, #0d1b17 0%, #0d1324 100%))'

export default theme
