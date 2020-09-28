import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import CurrentUser from '../components/auth/CurrentUser';
import { formatErrors } from '../lib/AuthHelper';
import {
  FormContainer,
  FormStyled,
  GeneralSubmitStyled,
} from '../components/form/StyledComponents';
import TextInput from '../components/form/TextInput';
import TextAreaInput from '../components/form/TextAreaInput';
import SelectInput from '../components/form/SelectInput';
import RadioGroup from '../components/form/RadioGroup';
import { BlueTitle } from '../components/StyledComponents';
import { JOBS_RECRUITER } from '../components/jobs/JobsRecruiter';

const GET_AVALIABLE_OPTIONS = gql`
  query GetAvaliableOptions {
    seniorities {
      id
      name
    }
    jobTypes {
      id
      name
    }
    cities {
      id
      name
      country {
        id
        name
      }
    }
  }
`;

const CREATE_JOB_MUTATION = gql`
  mutation CreateJob(
    $title: String!
    $typeId: Int!
    $seniorityId: Int!
    $salary: Int
    $cityId: Int!
    $introduction: String!
    $expected: String!
    $lookingFor: String!
    $requirements: String!
  ) {
    createJob(
      title: $title
      typeId: $typeId
      seniorityId: $seniorityId
      salary: $salary
      cityId: $cityId
      introduction: $introduction
      expected: $expected
      lookingFor: $lookingFor
      requirements: $requirements
    ) {
      id
      title
      jobType {
        id
        name
      }
      seniority {
        id
        name
      }
      salary
      city {
        id
        name
      }
      introduction
      expected
      lookingFor
      requirements
    }
  }
`;

const NewJob = () => {
  let history = useHistory();
  let client = useApolloClient();

  const [
    getQuery,
    { error, data: data_query, loading: loading_query, called },
  ] = useLazyQuery(GET_AVALIABLE_OPTIONS);

  const [createJob, { loading_mutation }] = useMutation(CREATE_JOB_MUTATION, {
    onCompleted({ createJob }) {
      const jobsRecruiter = client.readQuery({
        query: JOBS_RECRUITER,
      });

      const newJobsRecruiter = [
        ...jobsRecruiter.jobsCurrentRecruiter,
        createJob,
      ];

      client.writeQuery({
        query: JOBS_RECRUITER,
        data: { jobsCurrentRecruiter: newJobsRecruiter },
      });

      history.replace('/jobs');
    },
  });

  useEffect(() => {
    getQuery();
    return () => {};
  }, [getQuery]);

  if (error) return null;
  if (!called || loading_query) return null;

  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (loaded && currentUser.type !== 'Recruiter') {
          return <Redirect to="/jobs" />;
        } else {
          return (
            <FormContainer>
              <BlueTitle>Post a new job</BlueTitle>
              <Formik
                initialValues={{
                  title: '',
                  typeId: '',
                  seniorityId: '',
                  salary: '',
                  cityId: '',
                  introduction: '',
                  expected: '',
                  lookingFor: '',
                  requirements: '',
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required('Required'),
                  typeId: Yup.number()
                    .oneOf(
                      data_query.jobTypes.map((jobType) => parseInt(jobType.id))
                    )
                    .required('Required'),
                  seniorityId: Yup.number()
                    .oneOf(
                      data_query.seniorities.map((seniority) =>
                        parseInt(seniority.id)
                      )
                    )
                    .required('Required'),
                  salary: Yup.number().integer(),
                  cityId: Yup.number()
                    .oneOf(data_query.cities.map((city) => parseInt(city.id)))
                    .required('Required'),
                  introduction: Yup.string().required('Required'),
                  expected: Yup.string().required('Required'),
                  lookingFor: Yup.string().required('Required'),
                  requirements: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  ['typeId', 'seniorityId', 'cityId'].forEach((key) => {
                    values[key] = parseInt(values[key]);
                  });
                  createJob({ variables: values }).catch(
                    ({ graphQLErrors }) => {
                      setErrors(formatErrors(graphQLErrors[0].details));
                      setSubmitting(false);
                    }
                  );
                }}
              >
                <FormStyled>
                  <TextInput label="Title" name="title" type="text" />
                  <TextInput label="Salary" name="salary" type="number" />
                  <SelectInput
                    label="Location"
                    name="cityId"
                    type="number"
                    options={data_query.cities.map((city) => {
                      return {
                        value: city.id,
                        text: `${city.name} - ${city.country.name}`,
                      };
                    })}
                  />
                  <RadioGroup
                    label="Type"
                    name="typeId"
                    type="number"
                    options={data_query.jobTypes.map((jobTypes) => {
                      return {
                        value: jobTypes.id,
                        text: jobTypes.name,
                      };
                    })}
                  />
                  <RadioGroup
                    label="Seniority"
                    name="seniorityId"
                    type="number"
                    options={data_query.seniorities.map((seniority) => {
                      return {
                        value: seniority.id,
                        text: seniority.name,
                      };
                    })}
                  />
                  <TextAreaInput
                    label="Job introduction"
                    name="introduction"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="What will be expected from the candidate?"
                    name="expected"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="What you are looking for?"
                    name="lookingFor"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="Job requirements:"
                    name="requirements"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <GeneralSubmitStyled
                    type="submit"
                    disabled={loading_mutation}
                  >
                    Post this job!
                  </GeneralSubmitStyled>
                </FormStyled>
              </Formik>
            </FormContainer>
          );
        }
      }}
    </CurrentUser>
  );
};

export default NewJob;
