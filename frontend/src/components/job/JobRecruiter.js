import React, { useEffect, Fragment } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import {
  TitleWithoutMargin,
  PostedText,
  Table,
  LinkCloseJob,
} from './StyledComponents';
import { getLocalDate, getTimeSince } from '../../utils';
import CloseJob from './CloseJob';

const JOB_RECRUITER = gql`
  query JobCurrentRecruiter($id: Int!) {
    jobCurrentRecruiter(id: $id) {
      id
      title
      closed
      insertedAt
      applications {
        id
        professional {
          id
          name
          phoneNumber
          description
          user {
            id
            email
          }
        }
      }
    }
  }
`;

const JobRecruiter = ({ jobId }) => {
  const [getJob, { error, data, loading, called }] = useLazyQuery(
    JOB_RECRUITER,
    { variables: { id: parseInt(jobId) } }
  );

  useEffect(() => {
    getJob();
    return () => {};
  }, [getJob]);

  if (error) return null;
  if (!called || loading) return null;

  const { jobCurrentRecruiter: job } = data;

  if (job === null) return <Redirect to="/jobs" />;

  return (
    <Fragment>
      <TitleWithoutMargin>{job.title}</TitleWithoutMargin>
      <PostedText>
        Posted {getTimeSince(getLocalDate(job.insertedAt))}
      </PostedText>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profesional Description</th>
          </tr>
        </thead>
        <tbody>
          {job.applications.map((application) => {
            return (
              <tr key={application.id}>
                <td>{application.professional.name}</td>
                <td>{application.professional.user.email}</td>
                <td>{application.professional.phoneNumber}</td>
                <td>{application.professional.description}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CloseJob job={job} />
    </Fragment>
  );
};

export default JobRecruiter;
