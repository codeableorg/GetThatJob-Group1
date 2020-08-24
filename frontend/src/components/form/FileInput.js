import React, { Fragment } from 'react';
import { useField } from 'formik';

import {
  Label,
  TextInputStyled,
  NoteInput,
  ErrorInput,
} from './StyledComponents';

const FileInput = ({ formik, label, note, ...props }) => {
  const [field, meta, { setValue }] = useField(props);
  let { setFieldValue, handleChange } = formik;

  return (
    <Fragment>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextInputStyled
        {...field}
        {...props}
        onChange={(e) => {
          let files = e.currentTarget.files;
          console.log(e.currentTarget.files);
          if (files.length === 0) {
            setValue(null);
            handleChange(e);
            setFieldValue(`${props.name}Meta`, null);
          } else {
            setValue(files[0].filename);
            handleChange(e);
            setFieldValue(`${props.name}Meta`, files[0]);
          }
        }}
      />
      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
      {meta.touched && formik.errors[`${props.name}Meta`] ? (
        <ErrorInput>{formik.errors[`${props.name}Meta`]}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default FileInput;
