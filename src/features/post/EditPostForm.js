import React, { useEffect } from 'react';
import { Box, Card, Stack } from '@mui/material';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { updatePost, getPost } from './postSlice';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';

const yupSchema = Yup.object().shape({
  content: Yup.string().required('Content is required'),
  image: Yup.mixed(),
});

const defaultValues = {
  content: '',
  image: null,
};

function EditPostForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post, reset]);

  const onSubmit = (data) => {
    if (data.image instanceof File) {
    }
    dispatch(updatePost({ id, ...data }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Edit your post..."
          />
          <FUploadImage name="image" />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Update Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default EditPostForm;
