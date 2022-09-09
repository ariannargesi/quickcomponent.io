import ColorPicker from '../ColorPicker';
import useApplyStyle from '../../hooks/useApplyStyle';
import useStyleValue from '../../hooks/useStyleValue';

const Color = () => {
  const applyStyle = useApplyStyle();
  const color = useStyleValue('color') || '';
  return (
    <ColorPicker
      label='Color'
      value={color}
      onChange={(value) => {
        applyStyle('color', value);
      }}
    />
  );
};

export default Color;
