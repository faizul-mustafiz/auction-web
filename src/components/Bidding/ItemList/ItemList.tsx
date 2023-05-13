import { FC, memo } from 'react';
import { makeStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ItemActionButton } from '../ItemActionButton';
export interface ItemListProps {
  items: any[];
}

const ItemList: FC<ItemListProps> = (props: ItemListProps) => {
  const { items } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="items table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Starting Price</TableCell>
            <TableCell align="right">Time Window(hour)</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.startingPrice}</TableCell>
              <TableCell align="right">{item.duration}</TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right">
                <ItemActionButton item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const areEqual = (prevProps: ItemListProps, nextProps: ItemListProps) => {
  return prevProps.items === nextProps.items;
};

export default memo(ItemList, areEqual);
