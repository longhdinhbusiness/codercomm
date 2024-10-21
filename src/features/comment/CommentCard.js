import React from 'react';
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { fDate } from '../../utils/formatTime';
import CommentReaction from './CommentReaction';
import { useDispatch } from 'react-redux';
import { deleteComment } from './commentSlice';
import DeleteIcon from '@mui/icons-material/Delete';

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(comment._id));
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgColor: 'background.neutral' }}>
        <Stack
          direction="row"
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CommentReaction comment={comment} />
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
