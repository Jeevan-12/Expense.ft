import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

import React, { useState } from 'react';
import DashBoard from '../pages/DashBoard';

function Credits() {
  const [acc, setAcc] = useState({
    date: '',
    bank: '',
    accountNumber: '',
    amount: '',
  });

  const toast = useToast();

  const changeSubmit = (e) => {
    setAcc({ ...acc, [e.target.name]: e.target.value });
  };

  const submitAcc = async () => {
    const custId = JSON.parse(localStorage.getItem('userInfo'))._id;
    const transInfo = { ...acc, custId: custId };
    const obj = {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      data: transInfo,
    };
    try {
      const { data } = await axios(
        'expense-9eu8h8u7p-jeevan-12.vercel.app/transaction/addtrans',
        obj
      );
      toast({
        title: 'Expense added to list',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setAcc({
        date: '',
        bank: '',
        accountNumber: '',
        amount: '',
      });
    } catch (error) {
      toast({
        title: 'Please fill all fields or network issue',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <DashBoard>
      <Box fontSize="25px" fontWeight="bold" paddingBottom="10px">
        <Text>Add Your Credits here</Text>
      </Box>
      <Box>
        <VStack>
          <FormControl>
            <FormLabel>Date*</FormLabel>
            <Input
              required
              type={'date'}
              name="date"
              value={acc.date}
              onChange={changeSubmit}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bank name*</FormLabel>
            <Input
              type={'text'}
              name="bank"
              value={acc.bank}
              onChange={changeSubmit}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Account No.*</FormLabel>
            <Input
              type={'text'}
              name="accountNumber"
              value={acc.accountNumber}
              onChange={changeSubmit}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Amount*</FormLabel>
            <Input
              type={'number'}
              name="amount"
              value={acc.amount}
              onChange={changeSubmit}
              isRequired
            />
          </FormControl>
          <Button colorScheme="facebook" onClick={submitAcc}>
            AddExpense
          </Button>
        </VStack>
      </Box>
    </DashBoard>
  );
}

export default Credits;
