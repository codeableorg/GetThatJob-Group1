import React, { Fragment } from 'react';
import { useField } from 'formik';

import {
  Label,
  TextInputStyled,
  NoteInput,
  ErrorInput,
} from './StyledComponents';

const SelectInput = ({ label, note, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextInputStyled as="select" {...field} {...props}>
        <option disabled hidden></option>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </TextInputStyled>
      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default SelectInput;
