import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import { API, formatDate } from '../config';
import axios from 'axios';

const Comment = ({ time, replies, data = [] }) => {

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0); 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    console.log(data);
    setLikes(data.commentLike);
  }, []);

  // 좋아요 클릭 시 처리
  const handleLike = () => {
    
    let likeCount = 0;
    if (liked) {
      likeCount = likes - 1;
    } else {
      likeCount = likes + 1;
    }
    console.log(data.commentNo);
    console.log(likeCount);
    axios.post(`${API.UPDATECOMMENTLIKE}`, {
        commentNo : data.commentNo,
        like : likeCount
      }
    )
    .then((res) => {
      console.log(res);
      setLikes(res.data);
      setLiked(!liked);
    })
    .catch((err) => {
      console.log(err);
      alert("로그인 하세요");
    })

  };

  return (
    // <Box ml={replies.length > 0 ? 4 : 0} mt={2}>
    <Box ml={4} mt={2}>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1} display="flex" justifyContent="center">
            <Typography variant="body2" color="text.secondary">
              {data.userId} · {time}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>

            {/* 좋아요 아이콘 */}
            <IconButton
              size="small"
              onClick={handleLike}
              sx={{
                color: liked ? 'primary.main' : 'text.secondary',  // 활성화 시 파란색, 비활성화 시 회색
              }}
            >
              <ThumbUpIcon fontSize="small" />
              <Typography variant="body2" ml={1}>{likes}</Typography>
            </IconButton>
            <IconButton size="small">
              <ReplyIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Typography
          variant="body1"
          sx={{
            mt: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.commentContent}
        </Typography>
      </Paper>

      {/* 대댓글 */}
      {/* {replies.map((reply, idx) => (
        <Comment key={idx} {...reply} />
      ))} */}
    </Box>
  );
};

export default Comment;