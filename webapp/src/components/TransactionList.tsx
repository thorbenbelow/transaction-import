'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Transaction} from "@/services/transaction-service";

function centsToEuroString(x: number): string {
    return (x / 100).toFixed(2)
}
function getColor(x: number): string {
    return x >= 0 ? '#4db6ac' : '#c62828'
}

export default function TransactionList(props: { transactions: Transaction[] }) {
    const {transactions} = props

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Account</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row: Transaction) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.date.split('T')[0]}
                            </TableCell>
                            <TableCell align="left">{row.account}</TableCell>
                            <TableCell  align="right" sx={{color: getColor(row.value)}}>{centsToEuroString(row.value)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
