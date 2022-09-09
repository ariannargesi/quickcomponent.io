import { useSelector, useDispatch } from 'react-redux';
import {
  cssToCamelCase,
  findNodeInTree,
  getParentNode,
  isTextNode,
} from '../../helper';
import { removeStyle } from '../../redux/slice/app';
import { X } from 'react-feather';
import { RootState, ComponentMember } from '../../types';
import {
  Title,
  Text,
  TitleWrapper,
  Content,
} from '../Styled';
import styled from 'styled-components';

interface ItemProps {
  title: string;
  cssKey: string;
  cssValue: string;
}

const Container = styled.div`
  background: #d9d9d9;
  display: inline-flex;
  align-items: center;
  margin: 4px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 12px;
  svg {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const ActiveStylesItem = (props: ItemProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    const key = props.title.split(':')[0];
    dispatch(removeStyle(key));
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Text bold>{props.cssKey}</Text>
        <Text
          bold
          style={{
            borderLeft: '1px solid darkgray',
            marginLeft: '6px',
            paddingLeft: '6px',
            maxWidth: '100px',
            display: 'inline-block',
            overflow: 'unset',
            whiteSpace: 'unset',
            textOverflow: 'unset',
          }}
        >
          {props.cssValue}
        </Text>
      </div>
      <X size={14} onClick={handleRemove} />
    </Container>
  );
};

const getStyles = (
  key: string,
  html: ComponentMember[]
) => {
  let element = findNodeInTree(html, key);
  if (isTextNode(element)) {
    element = getParentNode(html, key);
  }

  if (!element.props.style) {
    return null;
  } else return element.props.style;
};

const ActiveStyles: React.FC = () => {
  const stylesList = useSelector((state: RootState) => {
    return getStyles(state.selectedKey, state.map);
  });

  let styleKeys = [];
  if (stylesList) {
    styleKeys = Object.keys(stylesList);
  }

  return (
    <div style={{ height: '50%', background: 'white' }}>
      <TitleWrapper>
        <Title.Medium>Active styles</Title.Medium>
      </TitleWrapper>
      <Content style={{ padding: '0 8px' }}>
        {styleKeys.length === 0 ? (
          <Text>You dont have any style at the moment</Text>
        ) : (
          styleKeys.map((key) => {
            const cssKey = cssToCamelCase(key);
            const cssValue = stylesList[key];
            return (
              <ActiveStylesItem
                cssKey={cssKey}
                cssValue={cssValue}
                title={`${cssKey}: ${cssValue}`}
                key={key}
              />
            );
          })
        )}
      </Content>
    </div>
  );
};

export default ActiveStyles;
