import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


const SimpleBoardList = ({data, boardDate = []}) => {
    useEffect(() => {
        console.log("SimpleBoardList;");
        console.log(data);
        console.log(boardDate);
    },);

    return (
        <div>
            {
                data &&
                <TableContainer style={{ width:'98%', padding: '20px 20px 20px 20px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>게시글 제목</TableCell>
                                <TableCell>{data.boardTitle}</TableCell>
                            </TableRow>
                            <TableRow style={{height: '400px'}}>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>게시글 내용</TableCell>
                                <TableCell>{data.boardContent}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>작성자</TableCell>
                                <TableCell>{data.userId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>작성일시</TableCell>
                                <TableCell>{boardDate}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            
        </div>
    )
}

export default SimpleBoardList
