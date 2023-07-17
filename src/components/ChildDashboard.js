import React, { useEffect, useState } from 'react';
import DashBoard from '../pages/DashBoard';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import { TotalState } from '../context/ContextProvider';

function ChildDashboard() {
  const [display, setDisplay] = useState(false);
  const [totalCreadits, setTotalCredits] = useState('');
  const [enterValue, setEnterValue] = useState('');
  const [progress, setProgress] = useState(0);

  const { spend } = TotalState();

  const toast = useToast();

  useEffect(() => {
    getUserinfo();
    reFetch();
  });

  useEffect(() => {
    progressHandler();
  }, [spend, totalCreadits]);

  const getUserinfo = async () => {
    const userEmail = JSON.parse(localStorage.getItem('userInfo')).email;

    const obj = {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      data: {
        email: userEmail,
      },
    };
    try {
      const { data } = await axios('http://localhost:8000/getinfo', obj);
      setTotalCredits(data.totalCredits);
    } catch (err) {
      console.log(err);
    }
  };

  const updateAmount = async () => {
    const id = JSON.parse(localStorage.getItem('userInfo'))._id;
    const { data } = await axios.put(
      `http://localhost:8000/updatecredit/${id}`,
      {
        totalCredits: enterValue,
      }
    );
    toast({
      title: data,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });
    setDisplay(false);
  };

  const reFetch = async () => {
    const userEmail = JSON.parse(localStorage.getItem('userInfo')).email;

    const obj = {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      data: {
        email: userEmail,
      },
    };

    const { data } = await axios('http://localhost:8000/getinfo', obj);
    console.log(data);
    setTotalCredits(data.totalCredits);
  };

  const progressHandler = () => {
    let a = spend;
    let b = totalCreadits;
    let c = (a / b) * 100;
    setProgress(c);
  };

  return (
    <DashBoard>
      <Box width="400px" p="20px" border="1px solid " borderRadius="2g">
        <Box
          p="10px"
          display="flex"
          fontSize="20px"
          justifyContent="space-between"
        >
          <Text fontSize="20px" fontWeight="bold">
            Total Expense
          </Text>
          <Text fontSize="20px" fontWeight="bold">
            ${spend}/$ {totalCreadits}
          </Text>
        </Box>
        <Box paddingTop="20px" paddingBottom="60px">
          <Progress
            hasStripe
            value={progress}
            colorScheme={progress > 80 ? 'red' : 'blue'}
          />
          <Button
            margin="20px"
            float="right"
            colorScheme="blue"
            onClick={() => setDisplay(!display)}
          >
            Enter Amount
          </Button>
        </Box>
      </Box>
      <Box>
        {display ? (
          <VStack paddingTop={'50px'}>
            <FormControl>
              <FormLabel fontSize="15px" fontWeight="bold">
                Enter Amount
              </FormLabel>
              <Input
                type={'number'}
                onChange={(e) => setEnterValue(e.target.value)}
                placeholder="Enter amount"
              />
            </FormControl>
            <ButtonGroup gap="4">
              <Button colorScheme="facebook" onClick={updateAmount}>
                Submit{' '}
              </Button>
              <Button colorScheme="red" onClick={() => setDisplay(false)}>
                Cancel
              </Button>
            </ButtonGroup>
          </VStack>
        ) : (
          <Box></Box>
        )}
      </Box>
    </DashBoard>
  );
}

export default ChildDashboard;
