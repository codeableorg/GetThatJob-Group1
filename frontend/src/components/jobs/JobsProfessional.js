import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import 'react-input-range/lib/css/index.css';

import FilterForm from './FilterForm';
import { Button } from '../StyledComponents';
import JobCard from '../../features/jobs/JobCard';
import { MyTitle, MyJobsSection, MyFooter } from './StyledComponents';

const JOBS = gql`
  query Jobs($filter: JobFilter) {
    jobs(filter: $filter) {
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
      city {
        id
        name
        country {
          id
          flagPath
          name
        }
      }
      salary
      insertedAt
      recruiter {
        id
        companyName
        companyLogoPath
      }
    }
  }
`;

export default function JobsProfessional() {
  const initialFilterData = {
    matching: '',
    country: '',
    jobType: '',
    salaryRange: {
      low: 0,
      high: 10000,
    },
    seniority: '',
  };

  const [filterData, setFilterData] = useState(initialFilterData);
  const [initialLoad, setinitialLoad] = useState(true);

  const [loadJobs, { error, data, loading, called, refetch }] = useLazyQuery(
    JOBS
  );

  useEffect(() => {
    const keys = Object.keys(filterData);
    const filter = keys.reduce((obj, key) => {
      if (filterData[key]) obj[key] = filterData[key];
      return obj;
    }, {});

    if (initialLoad) {
      loadJobs({ filter: filter });
      setinitialLoad(false);
    } else {
      refetch({ filter: filter });
    }

    return () => {};
  }, [filterData]);

  if (error) return null;
  if (!called || loading) return null;

  return (
    <MyJobsSection>
      <MyTitle>Jobs For you</MyTitle>

      <FilterForm
        setFilterData={setFilterData}
        initialFilterData={initialFilterData}
      />

      {loading && 'Loading...'}

      {data &&
        data.jobs &&
        data.jobs.map((job) => (
          <Link to={`/jobs/${job.id}`} key={job.id}>
            <JobCard job={job} className="job" />
          </Link>
        ))}

      <MyFooter>
        <Button>Load More</Button>
      </MyFooter>
    </MyJobsSection>
  );
}
