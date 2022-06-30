import { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from './../styles/chakraStyles'
import '@fontsource/work-sans/300.css'
import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/700.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        display="flex"
        backgroundImage="/images/background.png"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
