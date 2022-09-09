import styles from './styles.module.sass';
import useApplyStyle from '../../hooks/useApplyStyle';
import useStyleValue from '../../hooks/useStyleValue';
import { getNumbericValue, getUnit } from '../../helper';
import Slider from '../Slider';

const FontSize = () => {
  const applyStyle = useApplyStyle();
  const fontSize = useStyleValue('fontSize') || '16px';
  const fontSizeUnit = getUnit(fontSize);
  const fontSizeValue = getNumbericValue(fontSize);

  return (
    <div className={styles.container}>
      <Slider
        label='Font size'
        value={fontSizeValue}
        onChange={(value) => {
          applyStyle('fontSize', value + fontSizeUnit);
        }}
      />
    </div>
  );
};

export default FontSize;
