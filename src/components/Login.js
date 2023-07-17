import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const toast = useToast();

  const handelClick = () => {
    setShow(!show);
  };

  const submithandel = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please enter all details',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const obj = {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },

        data: { email, password },
      };

      const { data } = await axios(
        'expense-9eu8h8u7p-jeevan-12.vercel.app',
        obj
      );
      setLoading(false);
      toast({
        title: 'Login succesfull',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      nav('/dashboard');
    } catch (error) {
      toast({
        title: 'Invalid email or password, pls signin, if not signin before',
        description: error.response.data.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const demoSetup = (e) => {
    setEmail('demo@gmail.com');
    setPassword('Demo123');
  };

  return (
    <VStack>
      <FormControl>
        <FormLabel>Email*</FormLabel>
        <Input
          type={'email'}
          placeholder="Please enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password*</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
            value={password}
            type={show ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
          <InputRightElement>
            <Button colorScheme="facebook" onClick={handelClick}>
              {show ? 'Show' : 'Hide'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="facebook" width="80%" onClick={submithandel}>
        Login
      </Button>
      <Button colorScheme="red" width="80%" onClick={demoSetup}>
        DemoUser login credentials
      </Button>
    </VStack>
  );
}

export default Login;
