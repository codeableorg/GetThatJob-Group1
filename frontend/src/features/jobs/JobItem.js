import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  padding: 15px 20px;
  background: #ffffff;
`;

export default function JobItem({ job, className }) {
  return (
    <Wrapper className={className}>
      <div>Able</div>
      <div>
        <div className="title">{job.title}</div>
        <div className="metadata">{job.location}</div>
      </div>
      <div className="date">Date</div>
    </Wrapper>
  );
}
