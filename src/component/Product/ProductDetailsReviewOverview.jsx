import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import Iconify from "../../component/iconify";
// material
import { Grid, Rating, Button, Typography, LinearProgress, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fShortenNumber } from '../../utils/formatNumber';
import { getAllReviews, clearErrors, clearMessage } from '../../redux/slices/reviewSlice';

ProgressItem.propTypes = {
    star: PropTypes.object,
    total: PropTypes.number
};

function ProgressItem({ star, total }) {
    const { name } = star;
    return (
        <div className="mb-1">
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography variant="subtitle2">
                    {name}
                </Typography>
                <Iconify icon="twemoji:shooting-star" />
                <LinearProgress
                    variant="determinate"
                    value={(star.total / total) * 100}
                    sx={{
                        mx: 2,
                        flexGrow: 1,
                        bgcolor: 'divider'
                    }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
                    {fShortenNumber(star.total)} đánh giá
                </Typography>
            </Stack>
        </div>
    );
}

ProductDetailsReviewOverview.propTypes = {
    product: PropTypes.object,
    onOpen: PropTypes.func
};

export default function ProductDetailsReviewOverview({ product, onOpen }) {
    const dispatch = useDispatch();
    const { error, message, reviews, review } = useSelector((state) => state.review);
    const { user } = useSelector((state) => state.user);
    const [totalStar, setTotalStar] = useState(0);
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

    useEffect(() => {
        dispatch(getAllReviews(product?.id));
    }, [dispatch, review]);

    useEffect(() => {
        let star = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < reviews?.length; i++) {
            star += Number(reviews[i].rating);
        }
        star /= reviews?.length;
        const starTemp = Math.round(star * 10) / 10;
        setTotalStar(starTemp);
    }, [reviews]);

    const ratingCount = reviews?.reduce((acc, review) => {
        const rating = parseInt(review.rating);
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});
    const ratingArray = [5, 4, 3, 2, 1].map(rating => ({
        name: `${rating}`,
        total: ratingCount[rating] || 0
    }));

    return (
        <>
            <div className="rounded-lg bg-white py-3 px-3">
                <h2 className="text-20 text-ddv font-bold mb-5">Đánh giá và nhận xét {product.name}</h2>
                <div className="flex mb-5 overflow-hidden pb-5 border-b-blue-600">
                    <div className="flex flex-col mr-[5%] w-2/5 items-center justify-center">
                        <p className="text-review font-semibold m-0 p-0">
                            {totalStar || 0}/5
                        </p>
                        <Rating readOnly value={totalStar} precision={0.1} />
                        <p className="text-cyan-500 cursor-pointer underline">
                            <strong>{fShortenNumber(reviews.length)}</strong>
                            &nbsp;đánh giá
                        </p>
                    </div>
                    <div className="flex flex-col w-3/5 justify-evenly">
                        {ratingArray?.map((rating) => (
                            <ProgressItem key={rating.name} star={rating} total={reviews.length} />
                        ))}
                    </div>
                </div>
                <div className="mb-5 pb-5">
                    <p className="text-center mb-[0.5rem] mt-[0.5rem] text-[1rem]">Bạn đánh giá sao về sản phẩm này?</p>
                    <div className="text-center">
                        <button className="bg-red-600 rounded-md my-2.5 py-2.5 px-7 text-white" onClick={onOpen}>Đánh giá ngay</button>
                    </div>
                </div>
                {/* <Grid container>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={1.5} sx={{ width: 1 }}>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Iconify icon="eva:edit-2-outline" />}>
                            Viết bình luận của bạn
                        </Button>
                    </Grid>
                </Grid> */}
                {/* <div className="grid grid-cols-3 gap-4 my-4">
                    <div className="col-span-1">
                        <div className="flex-col">
                            <div className="flex items-center">
                                <p className="text-36 font-bold mr-2 pb-2">0.0</p>
                                <span style={{ display: 'inline-block', direction: 'ltr' }}>
                                    <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                        <span><StarIcon1 /></span>
                                        <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '0%' }}>
                                            <StarIcon2 />
                                        </span>
                                    </span>
                                    <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                        <span><StarIcon1 /></span>
                                        <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '0%' }}>
                                            <StarIcon2 />
                                        </span>
                                    </span>
                                    <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                        <span><StarIcon1 /></span>
                                        <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '0%' }}>
                                            <StarIcon2 />
                                        </span>
                                    </span>
                                    <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                        <span><StarIcon1 /></span>
                                        <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '0%' }}>
                                            <StarIcon2 />
                                        </span>
                                    </span>
                                    <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                        <span><StarIcon1 /></span>
                                        <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '0%' }}>
                                            <StarIcon2 />
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <p className="text-16 mt-2">0 người đánh giá</p>
                            <button className="flex mt-2">
                                <img alt="Di động" src="https://didongviet.vn/icon/product/pen.png" width="18" height="17" style={{ height: '17px', objectFit: 'contain' }}></img>
                                <p className="text-16 text-link ml-2">Viết đánh giá của bạn</p>
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex justify-start items-center w-full">
                            <p className="text-16">5</p>
                            <div className="ml-2 mr-4"><StarIcon /></div>
                            <div className="w-9/12">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                    <div className="bg-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-16 text-right">0%</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <p className="text-16">4</p>
                            <div className="ml-2 mr-4"><StarIcon /></div>
                            <div className="w-9/12">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                    <div className="bg-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-16 text-right">0%</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <p className="text-16">3</p>
                            <div className="ml-2 mr-4"><StarIcon /></div>
                            <div className="w-9/12">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                    <div className="bg-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-16 text-right">0%</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <p className="text-16">2</p>
                            <div className="ml-2 mr-4"><StarIcon /></div>
                            <div className="w-9/12">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                    <div className="bg-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-16 text-right">0%</p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center w-full">
                            <p className="text-16">1</p>
                            <div className="ml-2 mr-4"><StarIcon /></div>
                            <div className="w-9/12">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                    <div className="bg-orange h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-16 text-right">0%</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="flex items-center justify-start">
                    <p className="text-18">Lọc đánh giá theo:</p>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-ddv" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-white">Tất cả</p>
                    </button>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-white" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-brow">5 sao</p>
                    </button>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-white" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-brow">4 sao</p>
                    </button>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-white" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-brow">3 sao</p>
                    </button>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-white" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-brow">2 sao</p>
                    </button>
                    <button className="px-2 border-border border-1 rounded mx-2 bg-white" style={{ width: '87px', height: '25px' }}>
                        <p className="text-14  text-brow">1 sao</p>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img alt="Di động" src="https://didongviet.vn/images/pc/noreview.png" />
                    <p className="text-16 text-center">Chưa có đánh giá</p>
                </div>
                <div className="relative"></div>
            </div>
        </>
    );
}