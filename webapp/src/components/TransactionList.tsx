'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Transaction} from "@/services/transaction-service";

export default function TransactionList(props: {transactions: Transaction[]}) {
    const {transactions} = props

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Account</TableCell>
                            <TableCell align="right">Purpose</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row: Transaction) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell align="left">{row.account}</TableCell>
                                <TableCell align="left">{row.purpose}</TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
        )
}
