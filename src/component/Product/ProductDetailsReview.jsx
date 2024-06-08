import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createComment, clearErrors, clearMessage } from "../../redux/slices/commentSlice";
import { ReactComponent as StarIcon } from "../../Image/icons/star.svg";
import FormProvider, {
    RHFTextField, RHFRating
} from "../hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
export default function ProductDetailsReview({ product }) {
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.comment);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [dispatch, error, message]);
    let ReviewSchema = Yup.object().shape({
        star: Yup.mixed().required('Rating is required'),
        content: Yup.string().required('Review is required'),
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required')
    });
    if (user) {
        ReviewSchema = Yup.object().shape({
            star: Yup.mixed().required('Rating is required'),
            content: Yup.string().required('Review is required')
        });
    }

    const defaultValues = {
        star: null,
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
        let commentData = {};
        if (user) {
            commentData = {
                product: product,
                author: user,
                content: data.content,
                star: data.star
            };
        } else {
            commentData = {
                product: product,
                name: data.name,
                email: data.email,
                content: data.content,
                star: data.star
            };
        };
        // try {
        //     dispatch(createComment(commentData));
        // } catch (error) {
        //     reset();
        // }
    });
    return (
        <>
            <div class="rounded-lg bg-white py-3 px-3">
                <h2 class="text-20 text-ddv font-bold ">Đánh giá và nhận xét {product.name}</h2>
                <div class="flex overflow-hidden h-40 mb-5 pb-5">
                    <div class="flex flex-col mr-8 w-2/5 justify-center items-center border-r border-solid border-r-stone-700">
                        <p class="text-2xl font-bold m-0 p-0">4.9/5</p>
                        <div class="h-6 mr-0 w-32">
                        </div>
                        <p class="text-sky-600 cursor-pointer underline"><strong>137</strong> đánh giá</p>
                    </div>
                    <div class="flex flex-col w-3/5 justify-center">
                        <div class="flex items-center justify-center">
                            <div class="flex items-center">
                                <span class="font-bold">5</span>
                                <div class="fill-yellow-500 ml-0.5 w-3.5">
                                    <StarIcon />
                                </div>
                            </div>
                            <progress max="137" class="m-0 overflow-hidden w-3/5" value="126"></progress>
                            <span class="text-xs">126 đánh giá</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-2 rounded-lg bg-white py-3 px-3">
                <div>
                    <div class="flex-col">
                        <p class="text-20 text-ddv font-bold">Bình luận</p>
                        <div class="mb-5">
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <div class="flex flex-wrap md:flex-nowrap w-full items-start h-full justify-between my-2">
                                    <div class="w-full md:w-7/12 h-full mb-3 md:mb-0">
                                        <Stack spacing={2}>
                                            <RHFRating name="star" label="Star"></RHFRating>
                                            <RHFTextField
                                                name="content"
                                                multiline
                                                rows={6}
                                                label="Xin mời chia sẻ một số cảm nhận về sản phẩm"
                                            />
                                        </Stack>
                                    </div>
                                    <div class="w-full md:w-5/12 flex flex-col md:px-2">
                                        <Stack spacing={2}>
                                            {!user &&
                                                (<RHFTextField name="name" label="Họ và tên" />)}
                                            {!user &&
                                                (<RHFTextField name="email" label="Email" />)}
                                            <LoadingButton
                                                fullWidth
                                                color="error"
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                loading={isSubmitting}
                                            >
                                                Gửi
                                            </LoadingButton>

                                        </Stack>
                                    </div>
                                </div>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-col md:hidden bg-white py-4">

            </div>
        </>
    );
}