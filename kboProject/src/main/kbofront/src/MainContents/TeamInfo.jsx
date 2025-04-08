import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { API, formatDate } from '../config';
import { DataGrid } from '@mui/x-data-grid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

import kia from "../images/emblums/kiaTigers.jpg"
import samsung from "../images/emblums/samsungLions.jpg"
import kiwoom from "../images/emblums/kiwoomHeroes.jpg"
import lg from "../images/emblums/lgTwins.jpg"
import kt from "../images/emblums/ktWiz.jpg"
import ssg from "../images/emblums/ssgLanders.jpg"
import doosan from "../images/emblums/doosanBears.jpg"
import lotte from "../images/emblums/lotteGiants.jpg"
import hanhwa from "../images/emblums/hanhwaEagles.jpg"
import nc from "../images/emblums/ncDinos.jpg"

import './MainContentsStyle/Main.css'

axios.defaults.withCredentials = true;

const teamLogos = {
  kia: kia,
  samsung: samsung,
  kiwoom: kiwoom,
  lg: lg,
  kt: kt,
  ssg: ssg,
  doosan: doosan,
  lotte: lotte,
  hanhwa: hanhwa,
  nc: nc,
};

const TeamInfo = () => {
    const location = useLocation();
    const param = location.state; // 전달된 데이터
    const [data, setData] = useState([]);
    const [teamLogo, setTeamLogo] = useState('kia');
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'boardNo', headerName: '게시글번호', width: 200 },
        { field: 'boardTitle', headerName: '제목', width: 1000 },
        { field: 'userId', headerName: '작성자', type: 'text', width: 300 },
        { field: 'boardDate', headerName: '작성일시', width: 300 },
    ];

    useEffect(() => {
        axios.get(`${API.TEAMPAGE}`, {
            params: {
                teamNo: param.teamNo
            }
        })
        .then((res) => {
            setData(res.data.data);
            setTeamLogo(teamLogos[res.data.data.teamInfo.sponsor]);
            setRows(res.data.data.boardList);
            const rowsWithId = res.data.data.boardList.map((item, index) => ({
                ...item,
                id: item.boardNo,
                boardDate: formatDate(item.frsRgtDtm)
            }));
            console.log(rowsWithId);
            setRows(rowsWithId);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    if(!data.teamInfo){
        return(
            <div>준비중!</div>
        );
    }
    return (
        <div className='body'>
            <TableContainer style={{ width:'98%', padding: '20px 20px 20px 20px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* 첫 번째 셀에 구단 로고를 넣고 나머지 셀은 비워둠 */}
                            {
                                data.teamInfo &&
                                <>
                                    <TableCell rowSpan={2} style={{ width: '20%' }}>
                                        <img src={teamLogo} alt="구단 로고" style={{ width: '80%', height: 'auto' }} />
                                    </TableCell>
                                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                                        <Typography variant="h5">{data.teamInfo.teamName} 구단 정보</Typography>
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    </TableHead>
                    {
                        data.teamInfo &&
                        <TableBody>
                            <TableRow>
                                <TableCell>구단 이름</TableCell>
                                <TableCell>{data.teamInfo.teamName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>창단 연도</TableCell>
                                <TableCell>{data.teamInfo.founded}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>홈 구장</TableCell>
                                <TableCell>{data.teamInfo.stadium}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>감독</TableCell>
                                <TableCell>{data.teamInfo.headCoach}</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>구단홈페이지</TableCell>
                                <TableCell>
                                <a href={data.teamInfo.teamWeb} target="_blank" rel="noopener noreferrer">{data.teamInfo.teamWeb}</a>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                    
                </Table>
            </TableContainer>
            {
                data.boardList ?
                <div style={{ padding: '0 20px' }}>
                    <DataGrid rows={rows} columns={columns} hideFooter />
                </div>
                :
                <div>Loading.</div>
            }
        </div>
    )
}

export default TeamInfo
