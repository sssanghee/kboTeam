import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MainContentsStyle/Main.css'

const MainContent = () => {
    const [data, setData] = useState('')

    useEffect(() => {
        axios.get('/api/data')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, []);
  return (
    <div className="body">
      This is Main.
      
      받아온 값 : {data}
    </div>
  )
}

export default MainContent
