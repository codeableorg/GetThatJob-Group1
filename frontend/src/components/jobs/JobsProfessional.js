import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import 'react-input-range/lib/css/index.css';

import FilterForm from './FilterForm';
import JobCardProfessional from '../../features/jobs/JobCardProfessional';
import { MyTitle, MyJobsSection } from './StyledComponents';

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
    closed: false,
  };

  const [filterData, setFilterData] = useState(initialFilterData);
  const [initialLoad, setinitialLoad] = useState(true);

  const [loadJobs, { error, data, loading, called, refetch }] = useLazyQuery(
    JOBS
  );

  useEffect(() => {
    const keys = Object.keys(filterData);
    const filter = keys.reduce((obj, key) => {
      if (filterData[key] || filterData[key] === false)
        obj[key] = filterData[key];
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
            <JobCardProfessional job={job} className="job" />
          </Link>
        ))}

      {/* <MyFooter>
        <Button>Load More</Button>
      </MyFooter> */}
    </MyJobsSection>
  );
}
