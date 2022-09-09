import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedElementProp } from '../../redux/slice/app';
import { Input, Button, Text } from '../Styled';
import styles from './styles.module.sass';
export default () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = function () {
      const blob = new Blob([fr.result]);
      const url = URL.createObjectURL(blob);

      dispatch(
        updateSelectedElementProp({
          src: url,
          name: file.name,
        })
      );
    };
  };

  const handleURLChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleURLKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        updateSelectedElementProp({
          src: inputValue,
          name: null,
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <Text>Image picker</Text>
      <br />
      <Button onClick={handleClick} full>
        Upload from your computer{' '}
      </Button>
      <Text
        style={{ display: 'block', textAlign: 'center' }}
      >
        Or
      </Text>
      <Input
        value={inputValue}
        accept='image/png, image/gif, image/jpeg'
        onChange={handleURLChange}
        placeholder='Enter image url and press enter '
        onKeyDown={handleURLKeyDown}
      />
      <input
        type='file'
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
};
