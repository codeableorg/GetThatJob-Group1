import React from 'react';
import styled from '@emotion/styled';
import InputRange from 'react-input-range';

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

export default function FilterForm({ formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRange = (value) => {
    setFormData({
      ...formData,
      salaryRange: { low: value.min, high: value.max },
    });
  };

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

        <label>
          <input
            type="radio"
            name="country"
            value="Peru"
            checked={formData.country === 'Peru'}
            onChange={handleChange}
          />
          <span> Peru</span>
        </label>

        <label>
          <input
            type="radio"
            name="country"
            value="Colombia"
            checked={formData.country === 'Colombia'}
            onChange={handleChange}
          />
          <span> Colombia</span>
        </label>
      </Dropdown>

      <Dropdown title="Type" shadow>
        <label>
          <input
            type="radio"
            name="type"
            value=""
            checked={formData.type === ''}
            onChange={handleChange}
          />
          <span> All</span>
        </label>

        <label>
          <input
            type="radio"
            name="type"
            value="full_time"
            checked={formData.type === 'full_time'}
            onChange={handleChange}
          />
          <span> Full Time</span>
        </label>

        <label>
          <input
            type="radio"
            name="type"
            value="part_time"
            checked={formData.type === 'part_time'}
            onChange={handleChange}
          />
          <span> Part Time</span>
        </label>

        <label>
          <input
            type="radio"
            name="type"
            value="freelance"
            checked={formData.type === 'freelance'}
            onChange={handleChange}
          />
          <span> Freelance</span>
        </label>

        <label>
          <input
            type="radio"
            name="type"
            value="internship"
            checked={formData.type === 'internship'}
            onChange={handleChange}
          />
          <span> Internship</span>
        </label>
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

        <label>
          <input
            type="radio"
            name="seniority"
            value="junior"
            checked={formData.seniority === 'junior'}
            onChange={handleChange}
          />
          <span> Junior</span>
        </label>

        <label>
          <input
            type="radio"
            name="seniority"
            value="semi_senior"
            checked={formData.seniority === 'semi_senior'}
            onChange={handleChange}
          />
          <span> Semi Senior</span>
        </label>

        <label>
          <input
            type="radio"
            name="seniority"
            value="senior"
            checked={formData.seniority === 'senior'}
            onChange={handleChange}
          />
          <span> Senior</span>
        </label>
      </Dropdown>
    </Wrapper>
  );
}
