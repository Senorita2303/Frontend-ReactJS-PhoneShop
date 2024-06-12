import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import Iconify from "../../component/iconify";
// material
import { Rating, Typography, LinearProgress, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fShortenNumber } from '../../utils/formatNumber';
import { getAllReviews, clearErrors, clearMessage } from '../../redux/slices/reviewSlice';
import ProductDetailsReviewList from './ProductDetailsReviewList';

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
    const [totalStar, setTotalStar] = useState(0);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const ratingButtons = [5, 4, 3, 2, 1];
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
        setFilteredReviews(reviews);
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

    const handler = (rating) => {
        setSelectedRating(rating);
        if (rating) {
            const filtered = reviews.filter(review => review.rating === rating);
            setFilteredReviews(filtered);
        } else {
            setFilteredReviews(reviews);
        }
    };

    return (
        <>
            <div className="rounded-lg bg-white py-3 px-3">
                <h2 className="text-20 text-ddv font-bold mb-5">Đánh giá và nhận xét {product.name}</h2>
                <div className="flex mb-5 overflow-hidden pb-5 border-b-slate-400" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
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
                <div className="mb-5 pb-5 border-b-slate-400" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                    <p className="text-center mb-[0.5rem] mt-[0.5rem] text-[1rem]">Bạn đánh giá sao về sản phẩm này?</p>
                    <div className="text-center">
                        <button className="bg-red-600 rounded-md my-2.5 py-2.5 px-7 text-white" onClick={onOpen}>Đánh giá ngay</button>
                    </div>
                </div>
                <div className="mt-2.5">
                    <div className="text-[18px]/[1.125] font-semibold mb-2.5">
                        Lọc theo
                    </div>
                    <div className="flex gap-[10px] mb-2.5 overflow-auto w-full">
                        <button onClick={() => handler(null)} className={`items-center border-solid border-[1px] border-gray-400 rounded-[15px] cursor-pointer flex text-[14px] py-[3px] px-3 ${selectedRating === null ? 'bg-red-600 text-white' : ''}`}>
                            Tất cả
                        </button>
                        <div className="items-center border-solid border-[1px] border-gray-400 rounded-[15px] cursor-pointer flex text-[14px] py-[3px] px-3">
                            Có hình ảnh
                        </div>
                        <div className="items-center border-solid border-[1px] border-gray-400 rounded-[15px] cursor-pointer flex text-[14px] py-[3px] px-3">
                            Đã mua hàng
                        </div>
                    </div>
                    <div className="flex gap-[10px] mb-2.5 overflow-auto w-full">
                        {ratingButtons.map(rating => (
                            <button
                                key={rating}
                                onClick={() => handler(rating.toString())}
                                className={`items-center border-solid border-[1px] border-gray-400 rounded-[15px] cursor-pointer flex text-[15px] py-[3px] px-[10px] gap-[5px] ${selectedRating === rating.toString() ? 'bg-red-600 text-white' : ''}`}
                            >
                                {rating} <Iconify icon="twemoji:shooting-star" width={15} />
                            </button>
                        ))}
                    </div>
                </div>
                <ProductDetailsReviewList product={product} filteredReviews={filteredReviews} />
            </div>
        </>
    );
}