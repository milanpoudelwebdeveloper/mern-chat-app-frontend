import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const Home: NextPage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        w="full"
        bg="white"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        p={3}
      >
        <Text fontSize="4xl">Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="full" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab flex={1}>Login</Tab>
            <Tab flex={1}>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
