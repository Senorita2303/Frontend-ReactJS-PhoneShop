import React from 'react';
import { Rating, Stack, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const RHFRating = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const value = Number(field.value);
                return (
                    <Stack spacing={1} direction='row' alignItems='center'>
                        <Rating
                            {...field}
                            value={isNaN(value) ? 0 : value}
                            {...other}
                        />
                        <Typography variant='caption' color='error'>{error?.message}</Typography>
                    </Stack>
                );
            }}
        />
    );
};

export default RHFRating;