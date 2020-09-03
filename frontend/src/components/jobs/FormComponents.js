import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { useField, Field } from 'formik';

import uploadIcon from '../../assets/upload-icon.png';
import clipIcon from '../../assets/clip-icon.png';

const FormControl = styled.div`
  margin-bottom: 15px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  width: 100%;
  color: #262626;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.375rem;
`;

const FileLabel = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  padding: 8px 16px 8px 45px;
  background-color: #ffffff;
  background-image: url(${uploadIcon});
  background-position: 16px center;
  background-repeat: no-repeat;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;

  &:active {
    box-shadow: 0 0 0 2px #333333;
  }
`;

const FileName = styled.div`
  margin-bottom: 5px;
  padding-left: 15px;
  background-image: url(${clipIcon});
  background-position: 0 center;
  background-repeat: no-repeat;
  color: #3c2dff;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25rem;
`;

const TextInput = styled(Field)`
  display: block;
  margin-bottom: 7px;
  width: 100%;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  resize: none;
`;

const Alert = styled.div`
  margin-bottom: 5px;
  color: #f5222d;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25rem;
`;

const Note = styled.div`
  color: #8c8c8c;
  font-size: 0.875rem;
  line-height: 1.25;
`;

function FullField({ label, note, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl>
      <Label htmlFor={props.id}>{label}</Label>
      <TextInput {...field} {...props} />
      {meta.touched && meta.error && <Alert>{meta.error}</Alert>}
      {note && <Note>{note}</Note>}
    </FormControl>
  );
}

function FileField({ label, note, setFieldValue, ...props }) {
  const [fileName, setFileName] = useState(null);
  const fileInput = useRef();
  const [, meta] = useField(props);

  const handleChange = (event) => {
    setFileName(fileInput.current.files[0].name);
    setFieldValue(props.name, event.currentTarget.files[0]);
  };

  return (
    <FormControl>
      <Label>{label}</Label>
      <FileLabel htmlFor={props.id}>Upload</FileLabel>
      {fileName && <FileName>{fileName}</FileName>}
      <input ref={fileInput} onChange={handleChange} {...props} hidden />
      {meta.touched && meta.error && <Alert>{meta.error}</Alert>}
      {note && <Note>{note}</Note>}
    </FormControl>
  );
}

export {
  FormControl,
  Label,
  FileLabel,
  TextInput,
  Note,
  Alert,
  FullField,
  FileField,
};
