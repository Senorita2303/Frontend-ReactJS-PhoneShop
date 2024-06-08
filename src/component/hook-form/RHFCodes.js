import { useRef } from 'react';
import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';

const RHFCodes = ({keyName = '', inputs = [], ...other}) => {
    const codesRef = useRef(null);

    const {control} = useFormContext();

    const handleChangeWithNextField = (event, handleChange) => {
        
            const {maxLength, value, name} = event.target;

            const fieldIndex = name.replace(keyName, "");

            const fieldIntIndex = Number(fieldIndex);

            const nextField = document.querySelector(
              `input[name=${keyName}${fieldIndex + 1}]`
            );

            if (value.length > maxLength) {
                event.target.value = value[0];
            }

            if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
                nextField.focus();
            }   
        
        handleChange(event);
    }

  return (    
      <Stack spacing={2} direction={"row"} justifyContent={"center"} ref={codesRef}>
        {inputs.map((name, index) => (
          <Controller
            key={name}
            name={`${keyName}${index + 1}`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                autoFocus={index === 0}
                placeholder={"-"}
                onChange={(event) => {
                    handleChangeWithNextField(event, field.onChange);
                }}

                onFocus={(event) => event.currentTarget.select()}
                InputProps={{
                    sx: {
                        width: {xs: 36, sm: 56},
                        height: {xs: 36, sm: 56},
                        '& input' : {p: 0, textAlign: "center"}
                    }
                }}
                inputProps={{
                    maxLength: 1,
                    type: "number"
                }}
                {...other}
              />
            )}
          ></Controller>
        ))}
      </Stack>  
  );
}

export default RHFCodes;