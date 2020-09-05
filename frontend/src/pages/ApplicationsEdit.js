import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FullField, FileField } from '../components/jobs/FormComponents';
import { GeneralSubmitStyled as Button } from '../components/form/StyledComponents';

const Wrapper = styled.div`
  background: #f7fafc;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #262626;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;

  & .blue {
    color: #4e79fb;
  }
`;

export default function ApplicationsEdit() {
  const { id } = useParams();

  return (
    <Wrapper>
      <Title>
        <span className="blue">Edit your application: </span>
        <span>{id}</span>
      </Title>

      <Formik
        initialValues={{
          file: null,
          professional_experience: '',
          why_interested: '',
        }}
        validationSchema={Yup.object({
          professional_experience: Yup.string().min(300).max(2000).required(),
          why_interested: Yup.string().min(50).max(1000).required(),
        })}
        onSubmit={(values) => {
          console.log('formik');
          console.log({ values });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <FileField
              type="file"
              id="file"
              name="file"
              label="Upload your CV"
              note="PDF files only. 5MB max file size."
              setFieldValue={setFieldValue}
            />

            <FullField
              id="professional_experience"
              name="professional_experience"
              label="Professional Experience"
              component="textarea"
              placeholder="Worked 6 years in a bitcoin farm until I decided to change my life...."
              rows="5"
              note="Between 300 and 2000 characters."
            />

            <FullField
              id="why_interested"
              name="why_interested"
              label="Why are you interested in working at Able.co?"
              component="textarea"
              placeholder="Mention things about Able.co that excite you. Why would you be a good fit?"
              rows="5"
              note="Between 50 and 1000 characters."
            />

            <Button type="submit">Update!</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}
