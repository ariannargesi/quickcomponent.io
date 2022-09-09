import style from './styles.module.sass';
import Radio from '../Radio';
import Slider from '../Slider';
import { Text } from '../Styled';
import useStyleValue from '../../hooks/useStyleValue';
import useApplyStyle from '../../hooks/useApplyStyle';
import {
  getUnit,
  getNumbericValue as getValue,
} from '../../helper';
const units = ['px', 'rem'];

const WidthAndHeight = () => {
  const applyStyle = useApplyStyle();
  const width = useStyleValue('width');
  const widthUnit = getUnit(width);
  const widthValue = getValue(width);
  const height = useStyleValue('height');
  const heightUnit = getUnit(height);
  const heightValue = getValue(height);
  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <Text>Width:</Text>
          <Radio
            options={units}
            activeItem={widthUnit}
            onChange={(value) => {
              applyStyle('width', widthValue + value);
            }}
          />
        </div>
        <div className={style.body}>
          <Slider
            min={0}
            max={500}
            value={widthValue}
            onChange={(value) => {
              applyStyle('width', value + widthUnit);
            }}
          />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.header}>
          <Text>Height</Text>
          <Radio
            options={units}
            activeItem={heightUnit}
            onChange={(value) => {
              applyStyle('height', heightValue + value);
            }}
          />
        </div>
        <div className={style.body}>
          <Slider
            min={0}
            max={500}
            value={heightValue}
            onChange={(value) => {
              applyStyle('height', value + heightUnit);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default WidthAndHeight;
