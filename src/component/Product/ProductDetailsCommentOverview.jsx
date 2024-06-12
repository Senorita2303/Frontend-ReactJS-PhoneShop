import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField } from "../../component/hook-form";
import { getAllComments, clearErrors, createComment } from '../../redux/slices/commentSlice';
import { CommentForm } from "../../pages/comment/CommentForm";
import { CommentList } from "../../pages/comment/CommentList";

ProductDetailsCommentOverview.propTypes = {
    product: PropTypes.object,
};

export default function ProductDetailsCommentOverview({ product }) {
    const dispatch = useDispatch();
    const { error, comments, comment } = useSelector((state) => state.comment);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    useEffect(() => {
        dispatch(getAllComments(product?.id));
    }, [dispatch, comment]);

    const CommentSchema = Yup.object().shape({
        comment: Yup.string().required("Comment is required"),
    });

    const defaultValues = {
        comment: "",
    };

    const methods = useForm({
        resolver: yupResolver(CommentSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            formData.set("userId", user.id);
            formData.set("productId", product.id);
            formData.set("message", data.comment);
            formData.set("parentCommentId", null);
            dispatch(createComment(formData));
        } catch (error) {
            reset();
        }
    });

    const onCommentCreate = async (message) => {
        dispatch(createComment({ productId: product.id, message: message }));
    };
    const commentsByParentId = useMemo(() => {
        const group = {}
        comments.forEach(comment => {
            group[comment.parentCommentId] ||= []
            group[comment.parentCommentId].push(comment)
        })
        return group
    }, [comments]);

    const rootComments = commentsByParentId[null];
    return (
        <>
            <div className='my-2 rounded-lg bg-white py-3 px-3'>
                <div>
                    <div className='flex-col'>
                        <p className='text-20 text-ddv font-bold '>Hỏi và đáp</p>
                        <div className='mb-5'>
                            <CommentForm onSubmit={onCommentCreate} />
                        </div>
                        <div className='relative'>
                            <section>
                                {rootComments != null && rootComments.length > 0 && (
                                    <div className="mt-4">
                                        <CommentList comments={rootComments} />
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}