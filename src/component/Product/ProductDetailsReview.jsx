import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { Divider, Collapse } from '@mui/material';
import ProductDetailsReviewForm from './ProductDetailsReviewForm';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';

ProductDetailsReview.propTypes = {
    product: PropTypes.object
};

export default function ProductDetailsReview({ product }) {
    const [reviewBox, setReviewBox] = useState(false);

    const handleOpenReviewBox = () => {
        setReviewBox((prev) => !prev);
    };

    const handleCloseReviewBox = () => {
        setReviewBox((prev) => !prev);
    };

    return (
        <>
            <ProductDetailsReviewOverview product={product} onOpen={handleOpenReviewBox} />
            <Divider />
            <Collapse in={reviewBox}>
                <ProductDetailsReviewForm onClose={handleCloseReviewBox} product={product} />
                <Divider />
            </Collapse>
        </>
    );
}