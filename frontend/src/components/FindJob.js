import React from 'react';
import styled from '@emotion/styled';
import { useQuery, gql } from '@apollo/client';

import { Container } from './StyledComponents';

const Wrapper = styled.section`
  background: #3c2dff;
  padding: 60px 0;

  ${Container} {
    display: flex;
  }

  .description {
    width: 50%;
  }

  .description__title {
    margin-bottom: 20px;
    color: #ffffff;
    font-family: Montserrat;
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 3rem;
  }

  .description__paragraph {
    margin-bottom: 20px;
    color: #ffffff;
    font-size: 1.125rem;
    line-height: 1.5rem;
  }

  .description__paragraph:last-child {
    margin-bottom: 0;
  }

  .jobs-list {
    width: 50%;
    padding-left: 60px;
  }

  .job {
    margin-bottom: 20px;
  }
`;

const JOBS = gql`
  query Jobs {
    jobs {
      title
      location
    }
  }
`;

export default function FindJob() {
  const { loading, data, error } = useQuery(JOBS);

  return (
    <Wrapper>
      <Container>
        <section className="description">
          <h2 className="description__title">Find your next tech job</h2>
          <p className="description__paragraph">
            Our Machine learning algorithm is so good that it’s even illegal in
            some countries. Join us to use our barelly legal algorithm that is
            actually a group of interns that work on our basement.
          </p>
          <p className="description__paragraph">
            We have a job for you, no matter your background or previous
            experience. Is sending random memes through chat your only skill?
            That’s ok, we got you, our Rock Star Meme Curator role is here for
            you.
          </p>
        </section>

        <section className="jobs-list">
          {loading && 'Loading...'}
          {error && console.log(error)}
          {data && console.log(data.jobs)}
        </section>
      </Container>
    </Wrapper>
  );
}
