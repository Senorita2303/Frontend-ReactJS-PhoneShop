import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/slices/reviewSlice";
import FormProvider, {
    RHFTextField, RHFRating
} from "../hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Typography, Stack } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';

ProductDetailsReviewForm.propTypes = {
    onClose: PropTypes.func
};

export default function ProductDetailsReviewForm({ onClose, product }) {
    const dispatch = useDispatch();
    const { reviews, isLoading } = useSelector((state) => state.review);
    const { user } = useSelector((state) => state.user);

    let ReviewSchema = Yup.object().shape({
        star: Yup.number().required('Rating is required'),
        content: Yup.string().required('Review is required')
    });

    const defaultValues = {
        star: 0,
        content: '',
    };

    const methods = useForm({
        resolver: yupResolver(ReviewSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        let reviewData = {};
        reviewData = {
            content: data.content,
            star: data.star,
            productId: product.id,
            userId: user.id,
        };
        try {
            dispatch(createReview(reviewData));
            onClose();
            reset();
        } catch (error) {
            reset();
        }
    });

    const onCancel = () => {
        onClose();
        reset();
    };


    return (
        <>
            <div className="rounded-lg bg-white py-3 px-3 mt-4">
                <Typography variant="subtitle1" gutterBottom>
                    Thêm bình luận
                </Typography>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}>
                            <Typography variant="body2">Nhận xét của bạn về sản phẩm này:</Typography>
                            <RHFRating name="star" />
                        </Stack>
                        <RHFTextField
                            name="content"
                            multiline
                            rows={6}
                            label="Xin mời chia sẻ một số cảm nhận về sản phẩm"
                        />
                        <Stack direction="row" justifyContent="flex-end">
                            <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ mr: 1.5 }}>
                                Hủy
                            </Button>
                            <LoadingButton
                                fullWidth
                                color="primary"
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                            >
                                Gửi
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </FormProvider>
            </div>
        </>
    );
}
