import React, { Fragment } from 'react';
import { useField } from 'formik';
import { Radio } from 'antd';

import {
  Label,
  NoteInput,
  ErrorInput,
  RadioStyled,
  RadioGroupStyled,
} from './StyledComponents';

const RadioGroup = ({ label, note, options, ...props }) => {
  const [field, meta, { setValue, setTouched }] = useField(props);

  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>

      <RadioGroupStyled
        as={Radio.Group}
        {...field}
        {...props}
        // onChange={(e) => {
        //   setTouched(true);
        //   setValue(e.target.value);
        // }}
      >
        {options.map((option, index) => {
          return (
            <RadioStyled as={Radio.Button} value={option.value} key={index}>
              {option.text}
            </RadioStyled>
          );
        })}
      </RadioGroupStyled>

      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default RadioGroup;
