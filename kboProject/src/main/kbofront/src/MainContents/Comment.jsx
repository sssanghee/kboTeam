import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';

const Comment = ({ author, content, time, replies = [] }) => {

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0); 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // 좋아요 클릭 시 처리
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1); 
    }
    setLiked(!liked); 
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };

  // 싫어요 클릭 시 처리
  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1); 
    } else {
      setDislikes(dislikes + 1); 
    }
    setDisliked(!disliked); 
    if (liked) { 
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <Box ml={replies.length > 0 ? 4 : 0} mt={2}>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fafafa' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1} display="flex" justifyContent="center">
            <Typography variant="body2" color="text.secondary">
              {author} · {time}
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

            {/* 싫어요 아이콘 */}
            <IconButton
              size="small"
              onClick={handleDislike}
              sx={{
                color: disliked ? 'error.main' : 'text.secondary',  // 활성화 시 빨간색, 비활성화 시 회색
              }}
            >
              <ThumbDownIcon fontSize="small" />
              <Typography variant="body2" ml={1}>{dislikes}</Typography>
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
          {content}
        </Typography>
      </Paper>

      {/* 대댓글 */}
      {replies.map((reply, idx) => (
        <Comment key={idx} {...reply} />
      ))}
    </Box>
  );
};

export default Comment;