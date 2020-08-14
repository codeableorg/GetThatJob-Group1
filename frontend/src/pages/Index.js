import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import { Container } from '../components/StyledComponents';
import Button from '../components/Button';
import heroImage from '../assets/hero-image.png';
import testimonialsAvatar from '../assets/testimonials-avatar.png';

const HeroWrapper = styled.section`
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

const TestimonialsWrapper = styled.section`
  .testimonial {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 90px 0;
    margin: auto;
  }

  .testimonial__avatar {
    margin-bottom: 15px;
  }

  .testimonial__body {
    margin-bottom: 15px;
    color: #000000;
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 3rem;
    text-align: center;
  }

  .testimonial__author-name {
    color: #000000;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 2rem;
    text-align: center;
  }

  .testimonial__author-position {
    color: #000000;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5rem;
    text-align: center;
  }
`;

function Hero() {
  return (
    <HeroWrapper>
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
    </HeroWrapper>
  );
}

function Testimonials() {
  return (
    <TestimonialsWrapper>
      <Container>
        <article class="testimonial">
          <img
            src={testimonialsAvatar}
            className="testimonial__avatar"
            alt="get-that-jop"
          />
          <p className="testimonial__body">
            "Amazing experience, I love it a lot. Thanks to the team I got that
            Job, great!"
          </p>
          <div class="testimonial__author-name">Lassy Chester</div>
          <div class="testimonial__author-position">Art Director</div>
        </article>
      </Container>
    </TestimonialsWrapper>
  );
}

export default function Index() {
  return (
    <Layout>
      <Hero />
      <Testimonials />
    </Layout>
  );
}
