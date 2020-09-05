import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { DownIcon } from './Icons';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  background: #ffffff;
  border: 0;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.shadow
      ? '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
      : 'none'};
  font-family: Hind;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;

const Title = styled.span`
  margin-right: 5px;
  color: ${(props) => props.color || '#333333'};
  white-space: nowrap;
`;

const Menu = styled.div`
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
  color: #595959;

  & > * {
    width: auto;
    padding: 8px 15px;
    color: #595959;
    white-space: nowrap;
  }
`;

export default function Dropdown({
  title,
  color = '#333333',
  shadow = false,
  children,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const toggleMenu = (event) => {
      if (buttonRef.current.contains(event.target)) {
        setIsMenuOpen(!isMenuOpen);
      } else if (dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', toggleMenu);
    return () => document.removeEventListener('click', toggleMenu);
  }, [isMenuOpen]);

  return (
    <Wrapper ref={dropdownRef}>
      <Button ref={buttonRef} type="button" shadow={shadow}>
        <Title color={color}>{title}</Title>
        <DownIcon color={color} />
      </Button>

      {isMenuOpen && <Menu>{children}</Menu>}
    </Wrapper>
  );
}
