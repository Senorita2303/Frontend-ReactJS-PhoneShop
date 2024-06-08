import { PropTypes } from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui 
import { TextField, Autocomplete } from "@mui/material";

RHFAutocomplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
};

export default function RHFAutocomplete({ name, label, helperText, ...other }) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <Autocomplete
                        {...field}
                        fullWidth
                        value={
                            typeof field.value === "number" && field.value === 0
                                ? ""
                                : field.value
                        }
                        id="tags-filled"
                        onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                        error={!!error}
                        {...other}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={error ? error.message : helperText}
                            />
                        )}
                    />
                )
            }}
        />
    )
}