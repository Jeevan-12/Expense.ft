import { VStack } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPws, setConfirmPws] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const nav = useNavigate();

  const toast = useToast();

  const handelClick = () => {
    setShow(!show);
  };

  const handelClick1 = () => {
    setShow1(!show1);
  };

  const signinSubmit = async () => {
    if (!name || !email || !password || !confirmPws) {
      toast({
        title: 'Please enter all details',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if (password !== confirmPws) {
      toast({
        title: 'Password does not match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      const obj = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: { name, email, password },
      };

      const { data } = await axios('http://localhost:8000/register', obj);
      toast({
        title: 'Registration sucessfull',
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
        title: 'User alreday exist or pls check password',
        description: error.response.data.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
  };

  return (
    <VStack>
      <FormControl>
        <FormLabel>Name*</FormLabel>
        <Input
          placeholder="Enter your name"
          type={'text'}
          onChange={(e) => setName(e.target.value)}
          isRequired
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email*</FormLabel>
        <Input
          placeholder="Enter your name"
          type={'email'}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password*</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your password"
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
      <FormControl>
        <FormLabel>Confirm Password*</FormLabel>
        <InputGroup>
          <Input
            placeholder="Please confirm password"
            type={show1 ? 'text' : 'password'}
            onChange={(e) => setConfirmPws(e.target.value)}
            isRequired
          />
          <InputRightElement>
            <Button colorScheme="facebook" onClick={handelClick1}>
              {show1 ? 'Show' : 'Hide'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="facebook" width="80%" onClick={signinSubmit}>
        Sign In
      </Button>
    </VStack>
  );
}

export default Signin;
