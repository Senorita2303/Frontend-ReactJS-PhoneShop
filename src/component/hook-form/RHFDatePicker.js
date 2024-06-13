import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
const RHFDatePicker = ({ name, ...other }) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        format="DD/MM/YYYY"
                        dayOfWeekFormatter={day => day.toString().substring(0, 3)}
                        // dayOfWeekFormatter={(day) => day.toString()}
                        onChange={onChange}
                        value={value}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!error,
                                helperText: error?.message,
                            },
                        }}
                        {...other}
                    />
                </LocalizationProvider>
            )}
        />
    )
}

export default RHFDatePicker