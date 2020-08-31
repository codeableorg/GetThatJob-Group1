import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import InputRange from 'react-input-range';
import { gql, useLazyQuery } from '@apollo/client';

import Dropdown from '../Dropdown';
import searchIcon from '../../assets/search-icon.png';

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(5, auto) 1fr;
  column-gap: 15px;
  width: 100%;
  margin-bottom: 30px;

  .input-text {
    padding: 5px 20px 5px 35px;
    background-image: url(${searchIcon});
    background-position: 10px center;
    background-size: auto 15px;
    background-repeat: no-repeat;
    border: 0;
    border-radius: 4px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
    font-family: Hind;
    font-size: 1rem;
    font-weight: 300;
  }

  .input-range {
    min-width: 200px;
    margin: 15px 0;
    padding-right: 30px;
  }
`;

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
    countries {
      id
      name
    }
  }
`;

export default function FilterForm({ setFilterData, initialFilterData }) {
  const [getQuery, { error, data, loading, called }] = useLazyQuery(
    GET_AVALIABLE_OPTIONS
  );

  const [formData, setFormData] = useState(initialFilterData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFilterData({ ...formData, [name]: value });
  };

  const handleRange = (value) => {
    setFormData({
      ...formData,
      salaryRange: { low: value.min, high: value.max },
    });
  };

  useEffect(() => {
    getQuery();
    return () => {};
  }, []);

  if (error) return null;
  if (!called || loading) return null;

  return (
    <Wrapper>
      <input
        type="text"
        name="matching"
        className="input-text"
        placeholder="Find that job!"
        autoComplete="off"
        value={formData.matching}
        onChange={handleChange}
      />

      <Dropdown title="Country" shadow>
        <label>
          <input
            type="radio"
            name="country"
            value=""
            checked={formData.country === ''}
            onChange={handleChange}
          />
          <span> All</span>
        </label>

        {data.countries.map((country) => {
          return (
            <label key={country.id}>
              <input
                type="radio"
                name="country"
                value={country.name}
                checked={formData.country === country.name}
                onChange={handleChange}
              />
              <span> {country.name}</span>
            </label>
          );
        })}
      </Dropdown>

      <Dropdown title="Type" shadow>
        <label>
          <input
            type="radio"
            name="jobType"
            value=""
            checked={formData.jobType === ''}
            onChange={handleChange}
          />
          <span> All</span>
        </label>

        {data.jobTypes.map((jobType) => {
          return (
            <label key={jobType.id}>
              <input
                type="radio"
                name="jobType"
                value={jobType.name}
                checked={formData.jobType === jobType.name}
                onChange={handleChange}
              />
              <span> {jobType.name}</span>
            </label>
          );
        })}
      </Dropdown>

      <Dropdown title="Salary Range" shadow>
        <div>
          <InputRange
            name="salaryRange"
            className="filter__range"
            minValue={0}
            maxValue={10000}
            value={{
              min: formData.salaryRange.low,
              max: formData.salaryRange.high,
            }}
            onChange={handleRange}
            onChangeComplete={() => {
              setFilterData(formData);
            }}
          />
        </div>
      </Dropdown>

      <Dropdown title="Seniority" shadow>
        <label>
          <input
            type="radio"
            name="seniority"
            value=""
            checked={formData.seniority === ''}
            onChange={handleChange}
          />
          <span> All</span>
        </label>

        {data.seniorities.map((seniority) => {
          return (
            <label key={seniority.id}>
              <input
                type="radio"
                name="seniority"
                value={seniority.name}
                checked={formData.seniority === seniority.name}
                onChange={handleChange}
              />
              <span> {seniority.name}</span>
            </label>
          );
        })}
      </Dropdown>
    </Wrapper>
  );
}
