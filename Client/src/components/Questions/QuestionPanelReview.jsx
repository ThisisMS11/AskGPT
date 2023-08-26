import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/joy/Typography';
import Paper from '@mui/material/Paper';
import Header from '../home/header';
import axios from 'axios';
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
    const [userposts, setUserposts] = useState([]);

    useEffect(() => {
        async function callAllPosts() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'authorisation': `Bearer ${token}`
                }
            }

            await axios.get('https://stack-overflow-a2dm.onrender.com/api/v1/all_posts/', config).then((res) => {
                if (res.data.success) {
                    setUserposts(res.data.posts)
                }
                console.log('all posts', res.data.posts)
            })
        }

        callAllPosts();
    }, [])

    const showmeuserposts = () => {
        console.log('userposts', userposts)
    }



    return (<>
        <Header />
        <TableContainer component={Paper} sx={{ width: '80%', marginX: 'auto', marginTop: "2rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 25, opacity: '0.8' }}>Topic</TableCell>
                        <TableCell align="right" sx={{ fontSize: 25, opacity: '0.8' }}>Replies</TableCell>
                        <TableCell align="right" sx={{ fontSize: 25, opacity: '0.8' }}>Views</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {userposts.map((post) => (
                        <TableRow key={post._id}>
                            <TableCell component="th" scope="row" sx={{ fontSize: 17 }}>
                                <Typography fontWeight="xl">
                                    {post.MainQuestion}
                                </Typography>
                            </TableCell>
                      

                            <TableCell align="right">
                                <Typography fontWeight="xl">
                                    {post.comments[0].content.length}

                                </Typography>

                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="xl">
                                    {post.comments[0].content.length * 3}


                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                {/* <button onClick={showmeuserposts}>click me </button> */}
            </Table>
        </TableContainer>
    </>
    );
}