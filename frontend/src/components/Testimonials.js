import React from 'react';
import styled from '@emotion/styled';

import { Container } from '../components/StyledComponents';
import testimonialsAvatar from '../assets/testimonials-avatar.png';

const Wrapper = styled.section`
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

export default function Testimonials() {
  return (
    <Wrapper>
      <Container>
        <article className="testimonial">
          <img
            src={testimonialsAvatar}
            className="testimonial__avatar"
            alt="get-that-jop"
          />
          <p className="testimonial__body">
            "Amazing experience, I love it a lot. Thanks to the team I got that
            Job, great!"
          </p>
          <div className="testimonial__author-name">Lassy Chester</div>
          <div className="testimonial__author-position">Art Director</div>
        </article>
      </Container>
    </Wrapper>
  );
}
