import { Box, Container, Image, Text } from '@chakra-ui/react'
import React from 'react'
import image from '../image/wallet.png'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Signin from '../components/Signin'
import Login from '../components/Login'

function Home() {
    return (
        <Container maxW='xl' centerContent>
            <Box d='flex'
                justifyContent='center'
                padding='1'
                w='100%'
                backgroundColor='lightblue'
                m='10px 0 5px 0'
                borderRadius='lg'
                borderWidth='1px' >
                <Image marginLeft='40%' borderRadius='full'
                    boxSize='100px'
                    src={image}
                    alt='Dan Abramov'
                />
                <Text fontSize='20px' >PrettyCash</Text>

            </Box>
            <Box d='flex'
                justifyContent='center'
                padding='1'
                w='100%'
                backgroundColor='lightblue'
                m='5px 0 10px 0'
                borderRadius='lg'
                borderWidth='1px' >
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Signin</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <Signin/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home