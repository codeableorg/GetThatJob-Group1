import React, { Fragment } from 'react';
import { useField, useFormik } from 'formik';

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
          setValue(files[0].filename);
          handleChange(e);
          setFieldValue(`${props.name}_meta`, files[0]);
        }}
      />
      {note ? <NoteInput>{note}</NoteInput> : null}
      {meta.touched && meta.error ? (
        <ErrorInput>{meta.error}</ErrorInput>
      ) : null}
      {meta.touched && formik.errors.company_logo_meta ? (
        <ErrorInput>{formik.errors.company_logo_meta}</ErrorInput>
      ) : null}
    </Fragment>
  );
};

export default FileInput;
