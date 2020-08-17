import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { DownIcon } from './Icons';

const Wrapper = styled.div`
  position: relative;

  .button {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    background: transparent;
    border: 0;
    font-family: Hind;
    font-size: 1rem;
    font-weight: 700;
  }

  .button__title {
    color: ${(props) => props.color || '#333333'};
    margin-right: 5px;
  }

  .menu {
    position: absolute;
    top: 45px;
    left: 0;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    padding: 10px 0;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  }

  .menu > * {
    padding: 8px 15px;
    color: #595959;
  }

  .menu a {
    color: inherit;
    text-decoration: none;
    color: #595959;
  }
`;

export default function Dropdown({ title, color = '#333333', children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const toggleMenu = (event) => {
      if (dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(!isMenuOpen);
      } else {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', toggleMenu);
    return () => document.removeEventListener('click', toggleMenu);
  }, [isMenuOpen]);

  return (
    <Wrapper ref={dropdownRef} color={color}>
      <button className="button">
        <span className="button__title">{title}</span>
        <DownIcon color={color} />
      </button>
      {isMenuOpen && <div className="menu">{children}</div>}
    </Wrapper>
  );
}
