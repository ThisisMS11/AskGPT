import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/joy/Typography';
import Paper from '@mui/material/Paper';
import Header from '../home/header';
function createData(Question, ReplyUsersInfo, NoReplyUsers, NoViews) {
    return { Question, ReplyUsersInfo, NoReplyUsers, NoViews };
}

const rows = [
    createData('Delete Item from specific location in list in Python [duplicate]',
        [
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development'
        ], 24, 10),
    createData('Understanding Nested Arrays in JavaScript',
        [
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development',
        ], 24, 10),
    createData('How to make dependent attributes from parent class in python?',
        [
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development'
        ], 24, 10),

    createData('How to remove an element from a list by index',
        [
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development',
            'https://source.unsplash.com/500x300/?web-development'
        ], 24, 10),

    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
];

export default function QuestionPanelReview() {


    return (<>
        <Header />
        <TableContainer component={Paper} sx={{ width: '80%', marginX: 'auto', marginTop: "2rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 25, opacity: '0.8' }}>Topic</TableCell>
                        <TableCell align="right" sx={{ fontSize: 25, opacity: '0.8' }}>Users</TableCell>
                        <TableCell align="right" sx={{ fontSize: 25, opacity: '0.8' }}>Replies</TableCell>
                        <TableCell align="right" sx={{ fontSize: 25, opacity: '0.8' }}>Views</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.Question}>
                            <TableCell component="th" scope="row" sx={{ fontSize: 17 }}>
                                <Typography fontWeight="xl">
                                    {row.Question}

                                </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ display: 'flex' }}>
                                {row.ReplyUsersInfo.map((e) => {
                                    return <img src={e} alt="image not found" className='w-10 h-10 rounded-full mx-1' />
                                })}
                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="xl">
                                    {row.NoReplyUsers}

                                </Typography>

                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="xl">
                                    {row.NoViews}


                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    );
}