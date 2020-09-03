import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { GeneralSubmitStyled as Button } from '../components/form/StyledComponents';
import uploadIcon from '../assets/upload-icon.png';

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

const FullField = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  width: 100%;
  color: #262626;
  font-size: 0.875rem;
  line-height: 1.375rem;
`;

const TextInput = styled(Field)`
  display: block;
  margin-bottom: 5px;
  width: 100%;
  min-height: 120px;
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  resize: none;
`;

const FileLabel = styled.label`
  display: table;
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

const Notes = styled.div`
  color: #8c8c8c;
  font-size: 0.875rem;
  line-height: 1.375rem;
`;

const Error = styled.div`
  color: #f5222d;
  font-size: 0.75rem;
  line-height: 1.25rem;
`;

const JOB = gql`
  query Job($id: Integer!) {
    job(id: $id) {
      id
      title
    }
  }
`;

export default function JobsApply() {
  const { jobId } = useParams();
  const { data } = useQuery(JOB, { variables: { id: Number(jobId) } });

  return (
    <Wrapper>
      <Title>
        <span className="blue">Get this job: </span>
        <span>{data && data.job.title}</span>
      </Title>

      <Formik
        initialValues={{
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
        <Form>
          <FullField>
            <Label>
              <strong>Upload your CV</strong>
            </Label>
            <FileLabel htmlFor="file">Upload</FileLabel>
            <input id="file" type="file" hidden />
            <Notes>PDF files only. 5MB max file size.</Notes>
          </FullField>

          <FullField>
            <Label htmlFor="professional_experience">
              <strong>Professional Experience</strong>
            </Label>
            <TextInput
              id="professional_experience"
              name="professional_experience"
              component="textarea"
              placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
            />
            <ErrorMessage name="professional_experience" component={Error} />
            <Notes>Between 300 and 2000 characters.</Notes>
          </FullField>

          <FullField>
            <Label htmlFor="why_interested">
              <strong>Why are you interested in working at Able.co?</strong>
            </Label>
            <TextInput
              id="why_interested"
              name="why_interested"
              component="textarea"
              placeholder="Mention things about Able.co that excite you. Why would you be a good fit?"
            />
            <ErrorMessage name="why_interested" component={Error} />
            <Notes>Between 50 and 1000 characters.</Notes>
          </FullField>

          <Button type="submit">Get this job!</Button>
        </Form>
      </Formik>
    </Wrapper>
  );
}
