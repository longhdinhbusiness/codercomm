// OutgoingRequests.js
import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Card,
  Pagination,
  Grid,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOutgoingRequests } from './friendSlice';
import UserCard from './UserCard';

function OutgoingRequests() {
  const [page, setPage] = useState(1);
  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOutgoingRequests({ page }));
  }, [page, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Outgoing Friend Requests
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography
            variant="subtitle"
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            {totalUsers > 1
              ? `${totalUsers} requests found`
              : totalUsers === 1
              ? `${totalUsers} request found`
              : 'No requests found'}
          </Typography>

          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid key={user._id} item xs={12} md={4}>
                <UserCard profile={user} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Stack>
      </Card>
    </Container>
  );
}

export default OutgoingRequests;
