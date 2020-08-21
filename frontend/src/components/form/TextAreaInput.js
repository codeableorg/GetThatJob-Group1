import React, { Fragment } from 'react';
import { useField } from 'formik';

import {
  Label,
  TextAreaInputStyled,
  NoteInput,
  ErrorInput,
} from './StyledComponents';

const TextAreaInput = ({ label, note, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextAreaInputStyled {...field} {...props} />
      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default TextAreaInput;
