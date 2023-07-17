import { Box, Button, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DashBoard from '../pages/DashBoard';
import CloseIcon from '@mui/icons-material/Close';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';
import { TotalState } from '../context/ContextProvider';

function ExpenseList() {
  const [list, setList] = useState([]);
  // const [spend, setSpend]=useState()
  const { spend, setSpend } = TotalState();

  const toast = useToast();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    totalSpend();
  }, [list]);

  const getData = async () => {
    const Id = JSON.parse(localStorage.getItem('userInfo'))._id;
    const { data } = await axios('http://localhost:8000/addexpense/list');
    const myList = data.filter((item) => {
      return item.custerId === Id;
    });
    setList(myList);
  };

  const totalSpend = () => {
    const totalAmount = list.reduce((cur, item) => {
      return cur + item.amount;
    }, 0);
    setSpend(totalAmount);
  };

  const dleteHandeler = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/addexpense/${id}`
    );
    toast({
      title: data,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });

    getData();
  };

  return (
    <DashBoard>
      <Box paddingBottom="5px">
        <Text fontSize="25px" fontWeight="bold">
          Your expense list
        </Text>
      </Box>
      <Box>
        {list.length > 0 ? (
          <TableContainer>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Sl no.</Th>
                  <Th>Date</Th>
                  <Th>Catogary</Th>
                  <Th>Discription</Th>
                  <Th>Amount</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list.map((item, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{item.date}</Td>
                      <Td>{item.catogary}</Td>
                      <Td>{item.discription}</Td>
                      <Td>{item.amount}</Td>
                      <Td>
                        <Button
                          onClick={() => dleteHandeler(item._id)}
                          colorScheme="facebook"
                          size="large"
                        >
                          <CloseIcon />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th>toal spend</Th>
                  <Th>{spend}</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        ) : (
          <Box>
            <Text fontSize="15px" fontWeight="bold">
              No expense to display
            </Text>
          </Box>
        )}
      </Box>
    </DashBoard>
  );
}

export default ExpenseList;
