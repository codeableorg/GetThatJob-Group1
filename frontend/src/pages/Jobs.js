import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import 'react-input-range/lib/css/index.css';

import Sidebar from '../components/Sidebar';
import FilterForm from '../components/jobs/FilterForm';
import { Button } from '../components/StyledComponents';
import JobCard from '../features/jobs/JobCard';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;
`;

const MyTitle = styled.h1`
  margin-bottom: 15px;
  color: #000000;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.75rem;
`;

const MyJobsSection = styled.section`
  padding: 15px;

  .job {
    margin-bottom: 15px;
  }
`;

const MyFooter = styled.footer`
  text-align: center;
`;

const JOBS = gql`
  query Jobs($filter: JobFilter) {
    jobs(filter: $filter) {
      id
      title
      location
      salary
      type
      seniority
      insertedAt
      recruiter {
        companyName
        companyLogoPath
      }
    }
  }
`;

export default function Jobs() {
  const initialFormData = {
    matching: '',
    country: '',
    type: '',
    salaryRange: {
      low: 0,
      high: 10000,
    },
    seniority: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [filterData, setFilterData] = useState(null);

  const { loading, data } = useQuery(JOBS, {
    variables: { filter: filterData },
    skip: !filterData,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      const keys = Object.keys(formData);
      const filter = keys.reduce((obj, key) => {
        if (formData[key]) obj[key] = formData[key];
        return obj;
      }, {});

      console.log(filter);
      setFilterData(filter);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [formData]);

  return (
    <Wrapper>
      <Sidebar />

      <MyJobsSection>
        <MyTitle>Jobs For you</MyTitle>

        <FilterForm formData={formData} setFormData={setFormData} />

        {loading && 'Loading...'}

        {data &&
          data.jobs &&
          data.jobs.map((job) => (
            <JobCard job={job} key={job.id} className="job" />
          ))}

        <MyFooter>
          <Button>Load More</Button>
        </MyFooter>
      </MyJobsSection>
    </Wrapper>
  );
}
