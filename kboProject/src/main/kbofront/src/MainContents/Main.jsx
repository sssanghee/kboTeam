import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { API, formatDate  } from '../config';

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
import { Stack, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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

const MainContent = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [keyWord, setKeyWord] = useState();

  const columns = [
    { field: 'boardNo', headerName: '게시글번호', width: 100 },
    { field: 'boardTitle', headerName: '제목', width: 800 },
    { field: 'userId', headerName: '작성자', type: 'text', width: 200 },
    { field: 'boardDate', headerName: '작성일시', width: 200 },
  ];

  //로드시 데이터가져오기
  useEffect(() => {
    axios.get(`${API.MAIN}`, {
    })
    .then((res) => {
      setData(res.data.data);
      const rowsWithId = res.data.data.boardList.map((item, idx) => ({
        ...item,
        id: item.boardNo,
        boardDate: formatDate(item.frsRgtDtm)
      }));
      setRows(rowsWithId);
    })
    .catch((err) => {console.log(err)})
  }, []); //빈배열을 넣으면 첫 랜더링시에만 진행    

  //로고 클릭 시, 이벤트
  const logoClick = (e) => {
    const data = {teamNo: e.target.id};
    navigate('/teamInfo', {state: data});
  };

  //엘라스틱서치 조회
  const esSearch = (e) => {
    console.log(keyWord);
    
    axios.get(`${API.ESSEARCH}`, {
      params: {
        keyWord: keyWord
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="body">
      <div className='searchArea'>
        <input style={{"width":"50%"}} onChange={(e) => setKeyWord(e.target.value)}/>
        <button className='buttonStyle' style={{"marginLeft":"20px"}} onClick={esSearch}>검색</button>
      </div>
      <br/>
      <div className='team-button-container'>
        {
          data.teamList && 
          data.teamList.map((el, idx) => {
            const logo = teamLogos[el.sponsor];
            return(
            <button key={idx} onClick={logoClick}>
              <img className="btnImage" id={el.teamNo} src={logo} alt={`${el.sponsor} logo`}/>
            </button>
            );
          })
        }
      </div>
      <br/>
      <hr/>
      <div>HOT 게시글</div>
      <hr/>
      { data.boardList &&
          <div style={{ padding: '0 20px' }}>
            <DataGrid rows={rows} columns={columns} hideFooter />
          </div>
      }

    </div>
  )
}

export default MainContent
