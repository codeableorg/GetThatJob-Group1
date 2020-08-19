import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container, Button } from './StyledComponents';
import heroImage from '../assets/hero-image.png';

const Wrapper = styled.section`
padding: 30px 0;
background: #f7fafc;

${Container} {
  display: flex;
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
}

.description__title {
  width: 100%;
  margin-bottom: 20px;
  color: #000000;
  font-family: Montserrat;
  font-size: 3rem;
  font-weight: 900;
  line-height: 4rem;
}

.description__body {
  width: 100%;
  margin-bottom: 20px;
  color: #000000;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 2.5rem;
}

.figure {
  width: 50%;
  padding: 0 30px;
  text-align: center;
}

.figure__image {
  width: 100%;
  max-width: 500px;
}
`;

export default function Hero() {
  return (
    <Wrapper>
      <Container>
        <article className="description">
          <h1 className="description__title">
            <div>The place where</div>
            <div>you get that job</div>
          </h1>
          <p className="description__body">
            With our Machine learning algorithm you will get that job in no
            time. We promise you! Just give us the money and we will take care
            of it.
          </p>
          <Link to="/sign-up/professional">
            <Button>CREATE YOUR ACCOUNT NOW</Button>
          </Link>
        </article>

        <figure className="figure">
          <img className="figure__image" src={heroImage} alt="get-that-job" />
        </figure>
      </Container>
    </Wrapper>
  );
}
