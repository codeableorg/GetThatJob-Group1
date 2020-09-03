import React, { Fragment, useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import Table from '../Table';
import { getLocalDate } from '../../utils';
import { format } from 'date-fns';
import ApplicationProfessional from './ApplicationProfessional';

export const APPLICATIONS_PROFESSIONAL = gql`
  query ApplicationsCurrentProfessional {
    applicationsCurrentProfessional {
      id
      insertedAt
      professionalExperience
      reason
      job {
        id
        title
        introduction
        expected
        lookingFor
        requirements
        jobType {
          id
          name
        }
        recruiter {
          id
          companyName
          companyDescription
        }
        city {
          id
          name
        }
      }
    }
  }
`;

const ApplicationsProfessional = () => {
  const [getApplications, { error, data, loading, called }] = useLazyQuery(
    APPLICATIONS_PROFESSIONAL
  );

  const [application, setApplication] = useState(null);

  useEffect(() => {
    getApplications();
    return () => {};
  }, [getApplications]);

  if (error) return null;
  if (!called || loading) return null;

  const { applicationsCurrentProfessional: applications } = data;

  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Company</th>
            <th>City</th>
            <th>Date sent</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            return (
              <tr
                key={application.id}
                onClick={() => {
                  setApplication(application);
                }}
              >
                <td>{application.job.title}</td>
                <td>{application.job.jobType.name}</td>
                <td>{application.job.recruiter.companyName}</td>
                <td>{application.job.city.name}</td>
                <td>
                  {format(getLocalDate(application.insertedAt), 'MMMM dd, y')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ApplicationProfessional
        application={application}
        setApplication={setApplication}
      />
    </Fragment>
  );
};

export default ApplicationsProfessional;
