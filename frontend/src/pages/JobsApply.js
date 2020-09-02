import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Sidebar from '../components/Sidebar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;
`;

const ApplySection = styled.section`
  padding: 60px 100px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #262626;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;

  .blue {
    color: #4e79fb;
  }
`;

const Label = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 15px;
`;

const MyField = styled(Field)`
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px 15px;
  border: 1px solid #cccccc;
  border-radius: 5px;
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
      <Sidebar />

      <ApplySection>
        <Title>
          <span className="blue">Get this job: </span>
          <span>{data && data.job.title}</span>
        </Title>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('name is required'),
          })}
          onSubmit={(values) => {
            console.log('formik');
            console.log({ values });
          }}
        >
          <Form>
            <Label htmlFor="name">Name</Label>
            <MyField id="name" name="name" type="text" autoComplete="off" />
            <ErrorMessage name="name" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </ApplySection>
    </Wrapper>
  );
}
