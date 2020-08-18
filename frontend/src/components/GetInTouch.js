import React from 'react';
import styled from '@emotion/styled';

import { Container } from './StyledComponents';
import mailIcon from '../assets/mail-icon.png';

const Wrapper = styled.section`
  padding: 100px 0;
  background: #f7fafc;

  ${Container} {
    display: flex;
  }

  .description {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .description__small {
    margin-bottom: 10px;
    color: #999999;
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.25rem;
  }

  .description__title {
    color: #000000;
    font-family: Montserrat;
    font-size: 3rem;
    font-weight: bold;
    line-height: 4rem;
  }

  .description__body {
    color: #000000;
    font-weight: bold;
    font-size: 1rem;
    line-height: 2rem;
  }

  .description__info {
    margin-top: auto;
    color: #000000;
    font-size: 1rem;
    font-weight: 300;
    line-height: 24px;
  }

  .form {
    width: 50%;
  }

  .form__input,
  .form__textarea {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 15px 30px;
    border: 1px solid #c9ccd4;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.75rem;
  }

  .form__textarea {
    min-height: 150px;
    resize: none;
  }

  .form__button {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    background: #171717;
    border: 0;
    border-radius: 6px;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    line-height: 2rem;
  }

  .form__button-icon {
    margin-right: 15px;
  }
`;

export default function GetInTouch() {
  return (
    <Wrapper>
      <Container>
        <article className="description">
          <small className="description__small">Contacts</small>
          <h2 className="description__title">Get In Touch</h2>
          <div className="description__body">
            If you are not sure yet, shoot us a message!
          </div>
          <div class="description__info">
            <div>hello@getthatjob.com</div>
            <div>Jose Galvez 692, 7th Floor. The Board</div>
          </div>
        </article>
        <form class="form">
          <input type="text" className="form__input" placeholder="Your email" />
          <input type="text" className="form__input" placeholder="Name" />
          <textarea className="form__textarea" />
          <button class="form__button">
            <img
              src={mailIcon}
              className="form__button-icon"
              alt="get-that-job"
            />
            <span>Submit Message</span>
          </button>
        </form>
      </Container>
    </Wrapper>
  );
}
