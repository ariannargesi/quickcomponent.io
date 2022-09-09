import { useDispatch } from 'react-redux';
import { applyStyle } from '../redux/slice/app';

const useApplyStyle = () => {
  const dispatch = useDispatch();
  function apply(key, value) {
    dispatch(
      applyStyle({
        key,
        value,
      })
    );
  }
  return apply;
};

export default useApplyStyle;
