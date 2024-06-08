import React, { useState } from 'react';
import UserAvatar from '../UserAvatar';

import styles from './UserForm.module.css';

const UploadButton = ({ user, onChange, ...props }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxWidth = 62;
                const maxHeight = 62;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const resizedDataURL = canvas.toDataURL('image/jpeg');

                setImagePreview(resizedDataURL);
                onChange(file);
            };
        };
        reader.readAsDataURL(file);
    };


    return (
        <div className={styles.uploadButtonWrapper}>
            {imagePreview ? (
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            ) : (
                <UserAvatar user={user} />
            )}

            <label className={styles.uploadButton}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 0H6C2.68629 0 0 2.68629 0 6V18C0 21.3137 2.68629 24 6 24H18C21.3137 24 24 21.3137 24 18V6C24 2.68629 21.3137 0 18 0Z"
                        fill="#BEDBB0"
                    />
                    <path
                        d="M12 9.08337V14.9167"
                        stroke="#161616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.0835 12H14.9168"
                        stroke="#161616"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <input
                    type="file"
                    accept="image/*"
                    className={styles.uploadInput}
                    onChange={handleUpload}
                    {...props}
                />
            </label>
        </div>
    );
};

export default UploadButton;