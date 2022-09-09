import { useState } from 'react';
import styled from 'styled-components';
import { ChevronUp, ChevronDown } from 'react-feather';
import { fontFamily } from '../../Styled';

const Container = styled.div`
  background: #eee;
  padding: 4px;
  font-family: ${fontFamily};
  & > div:first-child {
    background: white;
    padding: 16px 8px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }
`;
const ChildsContainer = styled.div`
  padding: 16px 8px;
`;

interface Props {
  title: string;
  children: React.ReactNode;
}

export default (props: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Container>
      <div onClick={toggle}>
        {props.title}
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>
      {open && (
        <ChildsContainer>{props.children}</ChildsContainer>
      )}
    </Container>
  );
};
