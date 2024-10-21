import React from 'react';
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fDate } from '../../utils/formatTime';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostReaction from './PostReaction';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from './postSlice';
import EditIcon from '@mui/icons-material/Edit';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post._id));
    }
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: 'block', color: 'text.secondary' }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            {currentUser?._id === post.author._id && (
              <>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton
                  component={RouterLink}
                  to={`/edit-post/${post._id}`}
                >
                  <EditIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </>
            )}
            <IconButton>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              height: 300,
              '& img': { objectFit: 'cover', width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
