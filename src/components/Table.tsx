import React from 'react';
import { getDate, getStatusTable } from '../utils';
import {
  IconButton,
  Paper,
  Table as TableWrapper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Data } from 'types';
import { removeData } from 'utils/firebaseUtils';
import { useToast } from 'providers/ToastProvider';

interface TableProps {
  data: Data[];
  uid: string;
}

export const Table: React.FC<TableProps> = ({ data, uid }) => {
  const { showToast } = useToast();

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#1769aa',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const remove = async (index: number) => {
    try {
      await removeData(index, uid, data);
      showToast({ text: 'Data removed successfully!' });
    } catch (error) {
      console.error('Error removing data:', error);
      showToast({ text: 'Error removing data!', type: 'error' });
    }
  };

  return (
    <>
      <TableContainer component={Paper} className="mt-10">
        <TableWrapper>
          <TableHead>
            <TableRow className="m-auto">
              <StyledTableCell align="center">Weight</StyledTableCell>
              <StyledTableCell align="center">BMI</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.length ? (
              <StyledTableCell align="center">No data</StyledTableCell>
            ) : (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {item.weight} kg
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.bmi}</StyledTableCell>
                  <StyledTableCell align="center">
                    {getStatusTable(parseFloat(item.bmi))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getDate(item.date)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </TableWrapper>
      </TableContainer>
    </>
  );
};
