import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { API, formatDate } from '../config';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Comment from './Comment';

axios.defaults.withCredentials = true;


const BoardView = () => {
    const location = useLocation();
    const param = location.state;
    const [data, setData] = useState([]);
    const [comment, setComment] = useState();
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        axios.get(`${API.BOAREDETAIL}`, {
            params: {
                boardNo: param.boardNo
            }
        })
        .then((res) => {
            console.log(res);
            setData({
                ...res.data.data,
                boardDate: formatDate(res.data.data.boardDetail.frsRgtDtm)
            });
            setCommentList(res.data.data.commentList);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const rgstComment = (e) => {
        if(!comment) {
            alert("댓글을 입력하세요");
        } else {
            axios.post(`${API.REGISTCOMMENT}`, {
                comments: comment,
                boardNo: param.boardNo
            })
            .then((res) => {
                axios.get(`${API.GETCOMMENT}`, {
                  params: { boardNo: param.boardNo }
                })
                .then((res2) => {
                    setCommentList(res2.data.commentList);
                    console.log(res2);
                })
                .catch((err2) => {
                    console.log(err2);
                })
            })
            .catch((err) => {
                console.log(err);
                alert("로그인하세요.");
            })
        }
    };

    return (
        <div className="body">
            {
                data.boardDetail &&
                <TableContainer style={{ width:'98%', padding: '20px 20px 20px 20px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>게시글 제목</TableCell>
                                <TableCell>{data.boardDetail.boardTitle}</TableCell>
                            </TableRow>
                            <TableRow style={{height: '400px'}}>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>게시글 내용</TableCell>
                                <TableCell>{data.boardDetail.boardContent}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>작성자</TableCell>
                                <TableCell>{data.boardDetail.userId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ width: '150px', fontWeight: 'bold' }}>작성일시</TableCell>
                                <TableCell>{data.boardDate}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <br />
            <hr />
            <div>
                <input style={{width:"80%"}} placeholder='댓글을 등록하세요' onChange={(e) => setComment(e.target.value)}/>
                <button className='buttonStyle' onClick={rgstComment} >댓글 등록</button>
            </div>
            {
                commentList && commentList.length > 0 ? (
                    commentList.map((el, idx) => {
                        const commentTime = formatDate(el.frsRgtDtm);

                        return (
                            <Comment
                                key={el.commentNo}
                                author={el.userId}
                                content={el.commentContent}
                                time={commentTime}
                            />
                        );
                    })
                ) : (
                    <Typography variant="body2" color="textSecondary">댓글이 없습니다.</Typography>
                )
            }
        </div>
    )
}

export default BoardView
