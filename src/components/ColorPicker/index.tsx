import styles from '../Selectors/styles.module.sass';
import { Text } from '../Styled';
interface PickerProps {
  label: string;
  onChange: (value: string) => void;
  value?: string;
  noPadding?: boolean;
  allowGradient?: boolean;
}

const ColorPicker = (props: PickerProps) => {
  const handleChange = ({ style }) => {
    props.onChange(style);
  };

  const classname = [
    props.noPadding ? undefined : styles.container,
    styles.header,
  ].join(' ');

  return (
    <div className={classname}>
      <Text>{props.label}</Text>
      <input
        type='color'
        onChange={(event) => {
          handleChange({ style: event.target.value });
        }}
      />
    </div>
  );
};

export default ColorPicker;
