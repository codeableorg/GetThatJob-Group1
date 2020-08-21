import React, { Fragment } from 'react';
import { useField } from 'formik';

import {
  Label,
  TextInputStyled,
  NoteInput,
  ErrorInput,
} from './StyledComponents';

const TextInput = ({ label, note, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextInputStyled {...field} {...props} />
      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default TextInput;
