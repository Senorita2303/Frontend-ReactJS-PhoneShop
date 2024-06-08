import { PropTypes } from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui 
import Rating from '@mui/material/Rating';

RHFRatings.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
};

export default function RHFRatings({ name, label, helperText }) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Rating
                    value={field.value}
                    onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                    onBlur={field.onBlur}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                />
            )}
        />
    );
}