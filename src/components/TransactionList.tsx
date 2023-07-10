'use client'
import Paper from '@mui/material/Paper';
import {ChangeEvent, useMemo, useState} from 'react'
import {
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Add, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, Remove} from "@mui/icons-material";
import {LabelDto, TransactionDto} from "@/lib/api";
import LabelInput from "@/components/LabelInput";


function centsToEuroString(x: number): string {
    return (x / 100).toFixed(2)
}

function getColor(x: number): string {
    return x >= 0 ? '#4db6ac' : '#c62828'
}

type TransactionDtoWithLabels = TransactionDto & {
    labels: Omit<LabelDto, 'id' | 'description'>[]
}
export default function TransactionList(props: {
    transactions: TransactionDtoWithLabels[],
    labels: LabelDto[]
}) {
    const {transactions, labels} = props

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transactionEditMode, setTransactionEditMode] = useState(false)

    const [open, setOpen] = useState(-1)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

    const visibleRows = useMemo(
        () =>
            transactions.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [page, rowsPerPage, transactions],
    );

    async function addLabelToTransaction(transaction: TransactionDtoWithLabels) {
        const data = {
            transactions: {
                add: [transaction.id]
            }
        }
        const res = await fetch("http://localhost:3000/api/labels/1", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        const {name, color} = await res.json()
        transaction.labels.push({color, name})
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Account</TableCell>
                            <TableCell align="left">Purpose</TableCell>

                            <TableCell>Labels</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" sx={{width: "8%"}}>
                                    {new Date(row.date).toLocaleDateString("de")}
                                </TableCell>
                                <TableCell align="left" sx={{width: "20%"}}>{row.account}</TableCell>
                                <TableCell sx={{
                                    maxWidth: "40ch",
                                    minWidth: "40ch",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap"
                                }}>{row.purpose}</TableCell>
                                <TableCell sx={{width: "20%"}}>
                                    {row.labels.map(label => <Chip variant="outlined"
                                                                   sx={{color: label.color, borderColor: label.color}}
                                                                   key={label.name}
                                                                   label={label.name}></Chip>)}
                                    <IconButton onClick={() => row.id === open ? setOpen(-1) : setOpen(row.id)}>
                                        {transactionEditMode ? <Remove></Remove> : <Add></Add>}
                                    </IconButton>
                                    {open === row.id && <LabelInput transaction={row} labels={labels}></LabelInput>}
                                </TableCell>

                                <TableCell align="right"
                                           sx={{color: getColor(row.value)}}>{centsToEuroString(row.value)}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 20]}
                                count={transactions.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            ></TablePagination>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPage/>
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft/>
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight/>
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPage/>
            </IconButton>
        </Box>
    );
}
