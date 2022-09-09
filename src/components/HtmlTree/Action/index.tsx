import { Plus, X } from 'react-feather';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  changeSelectedElement,
  deleteNode,
} from '../../../redux/slice/app';
import useToggleDrawer from '../../../hooks/useToggleDrawer';

interface Props {
  elementKey: string;
  addChild: boolean;
}

export const iconSize = 16;
export const iconColor = '#626262';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  justify-content: space-between;
  opacity: 0.4;
  &: hover {
    opacity: 1;
  }
`;

const Action = (props: Props) => {
  const dispatch = useDispatch();
  const toggleDrawer = useToggleDrawer();

  const key = props.elementKey;

  function addElement(event) {
    if (event.stopPropagation) event.stopPropagation();
    dispatch(changeSelectedElement({ key }));
    toggleDrawer();
  }

  function removeElement(event) {
    if (event.stopPropagation) event.stopPropagation();
    dispatch(deleteNode({ key }));
  }

  return (
    <Container>
      <X
        size={iconSize}
        color={iconColor}
        onClick={removeElement}
      />
      {props.addChild && (
        <Plus
          size={iconSize}
          color={iconColor}
          onClick={addElement}
        />
      )}
    </Container>
  );
};

export default Action;
