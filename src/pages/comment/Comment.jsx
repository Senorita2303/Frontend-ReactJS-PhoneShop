import { toast } from "react-toastify";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { clearErrors, createComment, updateComment, deleteComment } from '../../redux/slices/commentSlice';
import { Avatar } from "@mui/material";
import { fDateTimeSuffix } from '../../utils/formatTime';
import Iconify from "../../component/iconify";
export function Comment({
    id,
    message,
    user,
    createdAt
}) {
    // const [areChildrenHidden, setAreChildrenHidden] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { error, isLoading, comments } = useSelector((state) => state.comment);
    const { product } = useSelector((state) => state.product);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const commentsByParentId = useMemo(() => {
        const group = {}
        comments.forEach(comment => {
            group[comment.parentCommentId] ||= []
            group[comment.parentCommentId].push(comment)
        })
        return group
    }, [comments]);

    const getReplies = (parentId) => {
        return commentsByParentId[parentId]
    }
    // const createCommentFn = useAsyncFn(createComment)
    // const updateCommentFn = useAsyncFn(updateComment)
    // const deleteCommentFn = useAsyncFn(deleteComment)
    // const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
    // const childComments = getReplies(id)
    // const currentUser = useUser()

    const onCommentReply = async (message) => {
        dispatch(createComment({ productId: product.id, message: message, parentCommentId: id }));
        setIsReplying(false)
    }

    // const onCommentUpdate = async (message) => {
    //     setIsEditing(false)
    //     dispatch(updateComment({ id: id, productId: product.id, message: message }));
    // }

    // const onCommentDelete = async () => {
    //     dispatch(deleteComment({ productId: product.id, id: id }));
    // };

    const childComments = getReplies(id)
    return (
        <>
            <div className="flex items-center justify-start">
                <Avatar src={user.avatarUrl} classes="rounded-[22px] h-11 w-11 overflow-hidden" />
                <div className="flex-col items-center justify-center pl-2 w-11/12">
                    <div className="flex items-center">
                        <p className="text-ddv font-bold text-16">{user.userName}</p>
                        <p className="text-brow text-sm mx-2">{fDateTimeSuffix(createdAt)}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-16 ">{message}</p>
                    </div>
                </div>
                {/* {isEditing ? (
                    <CommentForm
                        autoFocus
                        initialValue={message}
                        onSubmit={onCommentUpdate}
                    />
                ) : (
                    <></>
                )} */}
            </div>
            <div className="flex-col items-center justify-center ml-12 mt-2 cursor-pointer">
                <div className="flex items-center px-1">
                    <button className="inline-flex" onClick={() => setIsReplying(prev => !prev)}>
                        <Iconify icon="entypo:reply" width={18} />
                        <p className="text-14 mx-2 text-black font-medium">Bình luận</p>
                    </button>
                    {/* <IconBtn
                        onClick={() => setIsReplying(prev => !prev)}
                        isActive={isReplying}
                        Icon={FaReply}
                        aria-label={isReplying ? "Cancel Reply" : "Reply"}
                    /> */}
                    {/* {user.id && (
                            <> */}
                    {/* <IconBtn
                        onClick={() => setIsEditing(prev => !prev)}
                        isActive={isEditing}
                        Icon={FaEdit}
                        aria-label={isEditing ? "Cancel Edit" : "Edit"}
                    />
                    <IconBtn
                        disabled={isLoading}
                        onClick={onCommentDelete}
                        Icon={FaTrash}
                        aria-label="Delete"
                        color="danger"
                    /> */}
                    {/* </>
                        )} */}
                </div>
            </div>

            {isReplying && (
                <div className="mt-1 ml-3">
                    <CommentForm
                        autoFocus
                        onSubmit={onCommentReply}
                    />
                </div>
            )}

            {childComments?.length > 0 && (
                <>
                    <div className='ml-10 mt-3 my-2 relative flex-col'>
                        <div className="pl-3">
                            <CommentList comments={childComments} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
