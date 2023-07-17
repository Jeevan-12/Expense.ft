import { Box, Button, Container, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DashBoard from '../pages/DashBoard';
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
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Transfers() {
  const [transaction, setTransaction] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);

  const toast = useToast();

  useEffect(() => {
    fetchTrans();
  }, []);

  useEffect(() => {
    totalamount();
  }, [transaction]);

  const fetchTrans = async () => {
    const Id = JSON.parse(localStorage.getItem('userInfo'))._id;
    const { data } = await axios('http://localhost:8000/transaction');
    const myTrans = data.filter((item) => {
      return item.custId === Id;
    });
    setTransaction(myTrans);
  };

  const totalamount = () => {
    const transAmount = transaction.reduce((curr, item) => {
      return curr + item.amount;
    }, 0);
    setTotalCredits(transAmount);
  };

  const dleteHandeler = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8000/transaction/${id}`
    );
    toast({
      title: data,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });
    fetchTrans();
  };

  return (
    <DashBoard>
      <Box>
        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Sl no.</Th>
                <Th>Date</Th>
                <Th>Bank Name</Th>
                <Th>Acc No.</Th>
                <Th>Amount</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transaction.map((item, i) => {
                return (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.bank}</Td>
                    <Td>{item.accountNumber}</Td>
                    <Td>{item.amount}</Td>
                    <Td>
                      <Button
                        onClick={() => dleteHandeler(item._id)}
                        colorScheme="facebook"
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
                <Th>toal credit</Th>
                <Th fontSize="15px" fontWeight="bold">
                  {totalCredits}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </DashBoard>
  );
}

export default Transfers;
