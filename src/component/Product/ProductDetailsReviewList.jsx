import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, clearErrors, clearMessage } from "../../redux/slices/commentSlice";
import { Box, List, Button, Rating, Avatar, ListItem, Pagination, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "../iconify";
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from '../../utils/formatNumber';
ProductDetailsReviewList.propTypes = {
    product: PropTypes.object
};

export default function ProductDetailsReviewList({ product }) {
    const dispatch = useDispatch();
    const { error, comments } = useSelector((state) => state.comment);
    const [temp, setTemp] = useState(false);
    const [isHelpful, setHelpfuls] = useState(false);
    const handleClickHelpful = () => {
        setHelpfuls((prev) => !prev);
    };

    // useEffect(() => {
    //     if (temp === false) {
    //         dispatch(getAllComments(product._id));
    //         setTemp(true);
    //     }
    //     if (error) {
    //         toast.error(error);
    //         dispatch(clearErrors());
    //     }
    // }, [dispatch, error, temp, product]);

    if (!comments || comments.length < 1) {
        return null;
    }

    return (
        <Box sx={{ pt: 3, px: 2, pb: 5 }}>
            <List disablePadding>
                {comments?.map((review) => {
                    const { author, content, star, anonymousAuthor, createdAt } = review;
                    return (
                        <>
                            <ListItem
                                disableGutters
                                sx={{
                                    mb: 5,
                                    alignItems: 'flex-start',
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Box
                                    sx={{
                                        mr: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: { xs: 2, sm: 0 },
                                        minWidth: { xs: 160, md: 240 },
                                        textAlign: { sm: 'center' },
                                        flexDirection: { sm: 'column' }
                                    }}
                                >
                                    <Avatar
                                        src={author?.avatar?.url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/900px-Cat03.jpg'}
                                        sx={{
                                            mr: { xs: 2, sm: 0 },
                                            mb: { sm: 2 },
                                            width: { md: 64 },
                                            height: { md: 64 }
                                        }}
                                    />
                                    <div>
                                        <Typography variant="subtitle2" noWrap>
                                            {review?.author ? `${review?.author?.name}` : review?.anonymousAuthor?.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                                            {/* {fDate(createdAt)} */}
                                        </Typography>
                                    </div>
                                </Box>

                                <div>
                                    <Rating size="small" value={star} precision={0.1} readOnly />

                                    {content && (
                                        <Typography variant="caption" sx={{ my: 1, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                                            <Iconify icon="ic:round-thumb-up" width={16} height={16} />
                                            &nbsp;Đã mua hàng
                                        </Typography>
                                    )}

                                    <Typography variant="body2">{content}</Typography>

                                    <Stack mt={1} direction="row" alignItems="center" flexWrap="wrap">
                                        {!isHelpful && (
                                            <Typography variant="body2" sx={{ mr: 1 }}>
                                                Helpful
                                            </Typography>
                                        )}

                                        <Button
                                            size="small"
                                            color="inherit"
                                            startIcon={<Iconify icon={!isHelpful ? "ic:round-thumb-down" : "eva:checkmark-fill"} />}
                                            onClick={handleClickHelpful}
                                        >
                                            {isHelpful ? 'Thích' : 'Thích'}&nbsp;(
                                            {fShortenNumber(!isHelpful ? 1 + Math.floor(Math.random() * 10) : 11 + 1)})
                                        </Button>
                                    </Stack>
                                </div>
                            </ListItem>
                        </>
                    )
                    // <ReviewItem key={review._id} review={review} />
                })}
            </List>
        </Box>
    );
}

// ReviewItem.propTypes = {
//     review: PropTypes.object
// };

// function ReviewItem({ review }) {
//     const [isHelpful, setHelpfuls] = useState(false);
//     const { author, content, star, anonymousAuthor, createdAt } = review;
//     const handleClickHelpful = () => {
//         setHelpfuls((prev) => !prev);
//     };

//     return (
//         <>
//             <ListItem
//                 disableGutters
//                 sx={{
//                     mb: 5,
//                     alignItems: 'flex-start',
//                     flexDirection: { xs: 'column', sm: 'row' }
//                 }}
//             >
//                 <Box
//                     sx={{
//                         mr: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         mb: { xs: 2, sm: 0 },
//                         minWidth: { xs: 160, md: 240 },
//                         textAlign: { sm: 'center' },
//                         flexDirection: { sm: 'column' }
//                     }}
//                 >
//                     <Avatar
//                         src={author?.avatar.url || ''}
//                         sx={{
//                             mr: { xs: 2, sm: 0 },
//                             mb: { sm: 2 },
//                             width: { md: 64 },
//                             height: { md: 64 }
//                         }}
//                     />
//                     <div>
//                         <Typography variant="subtitle2" noWrap>
//                             {author ? `${author?.lastName} ${author?.firstName}` : anonymousAuthor.name}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
//                             {/* {fDate(createdAt)} */}
//                         </Typography>
//                     </div>
//                 </Box>

//                 <div>
//                     <Rating size="small" value={star} precision={0.1} readOnly />

//                     {content && (
//                         <Typography variant="caption" sx={{ my: 1, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
//                             <Iconify icon="ic:round-thumb-up" width={16} height={16} />
//                             &nbsp;Đã mua hàng
//                         </Typography>
//                     )}

//                     <Typography variant="body2">{content}</Typography>

//                     <Stack mt={1} direction="row" alignItems="center" flexWrap="wrap">
//                         {!isHelpful && (
//                             <Typography variant="body2" sx={{ mr: 1 }}>
//                                 Helpful
//                             </Typography>
//                         )}

//                         <Button
//                             size="small"
//                             color="inherit"
//                             startIcon={<Iconify icon={!isHelpful ? "ic:round-thumb-down" : "eva:checkmark-fill"} />}
//                             onClick={handleClickHelpful}
//                         >
//                             {isHelpful ? 'Thích' : 'Thích'}&nbsp;(
//                             {fShortenNumber(!isHelpful ? 1 + Math.floor(Math.random() * 10) : 11 + 1)})
//                         </Button>
//                     </Stack>
//                 </div>
//             </ListItem>
//         </>
//     );
// }