import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { API } from '../config';
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

  useEffect(() => {
    axios.get(`${API.MAIN}`, {
    })
    .then((res) => {
      setData(res.data.data);      
      console.log(res.data);
    })
    .catch((err) => {console.log(err)})
  }, []); //빈배열을 넣으면 첫 랜더링시에만 진행    
  
  useEffect(() => {
    if (data.teamList) {
      console.log(data.teamList);
    }
  }, [data]);

  const logoClick = (e) => {
    console.log(e);
  }

  return (
    <div className="body">
      <div className='searchArea'>
        <input style={{"width":"50%"}}/>
        <button className='buttonStyle' style={{"margin-left":"20px"}}>검색</button>
      </div>
      <br/>
      <div className='team-button-container'>
        {
          data.teamList && 
          data.teamList.map((el, idx) => {
            const logo = teamLogos[el.sponsor];
            return(
            <button key={idx} onClick={logoClick}>
              <img className="btnImage" src={logo} alt={`${el.sponsor} logo`}/>
            </button>
            );
          })
        }
      </div>
      <br/>
      <hr/>
      <div>HOT 게시글</div>
      <hr/>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Stack direction="row" spacing={20} alignItems="center" justifyContent="center">
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>제목</Typography>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>작성자</Typography>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>작성일시</Typography>
        </Stack>
        
      { data.boardList &&
          data.boardList.map((el, idx) => {
            const dateString = el.frsRgtDtm;
            const formattedDate = new Date(
              `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}T${dateString.substring(8, 10)}:${dateString.substring(10, 12)}:${dateString.substring(12, 14)}`
            );
            
            // 날짜와 시간 부분을 각각 포맷
            const formattedDateOnly = formattedDate.toLocaleDateString('ko-KR');
            const formattedTimeOnly = formattedDate.toLocaleTimeString('ko-KR', { hour12: false });

            return(
                <Stack key={idx} direction="row" spacing={20} alignItems="center">
                  <Typography variant="body2" style={{ marginRight: '8px' }}>{el.boardTitle}</Typography>
                  <Typography variant="body2" style={{ marginRight: '8px' }}>{el.userId}</Typography>
                  <Typography variant="caption" color="textSecondary">{`${formattedDateOnly} ${formattedTimeOnly}`}</Typography>
                </Stack>
            );
          })
      }
      </Stack>

    </div>
  )
}

export default MainContent
