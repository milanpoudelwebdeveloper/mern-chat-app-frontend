import { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from './../styles/chakraStyles'
import './../styles/globals.css'
import '@fontsource/work-sans/300.css'
import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/700.css'

import ChatProvider from '../Context/ChatProvider'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ChatProvider>
          <Box
            minH="100vh"
            display="flex"
            backgroundImage="/images/background.png"
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <Component {...pageProps} />
          </Box>
        </ChatProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
