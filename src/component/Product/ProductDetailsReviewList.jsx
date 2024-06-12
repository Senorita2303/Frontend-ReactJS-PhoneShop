import PropTypes from 'prop-types';
import Iconify from "../../component/iconify";
// material
import { Rating, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { fDateTimeSuffix } from '../../utils/formatTime';
// utils
ReviewItem.propTypes = {
    review: PropTypes.object
};

function ReviewItem({ review }) {
    const { message, rating, createdAt, user: { userName, avatarUrl } } = review;

    return (
        <>
            <div className="mb-4 pb-4 border-b-slate-400" style={{ borderBottomStyle: 'solid', borderBottomWidth: '1px' }}>
                <div className="flex items-center">
                    <Avatar
                        src={avatarUrl}
                        sx={{
                            mr: 2,
                            width: 32,
                            height: 32
                        }}
                    />
                    <div className='items-center flex gap-[15px]'>
                        <span className='font-semibold text-[15px]'> {userName}</span>
                        <div className='items-center flex text-[12px] gap-[5px] pt-[3px] text-right'>
                            <p className='flex'>
                                <Iconify icon="tabler:clock" width={15} />
                                &nbsp;{fDateTimeSuffix(createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-10 pt-[10px] pr-[15px] pb-0 pl-0">
                    <div className="flex-wrap text-12 gap-[10px]">
                        <Rating readOnly value={parseInt(rating)} precision={0.1} />
                    </div>
                    <div className="flex flex-col text-12 mt-[15px] justify-between">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

ProductDetailsReviewList.propTypes = {
    product: PropTypes.object
};

export default function ProductDetailsReviewList({ product, filteredReviews }) {
    const { reviews } = useSelector((state) => state.review);

    return (
        <>
            {filteredReviews.length !== 0 ? (
                <div className="mt-8 mx-0 mb-4 w-full">
                    {filteredReviews?.map((review, index) => (
                        <ReviewItem key={review.id || index} review={review} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <img alt="Di động" src="https://didongviet.vn/images/pc/noreview.png" />
                    <p className="text-16 text-center">Chưa có đánh giá</p>
                </div>
            )}
        </>
    );
}