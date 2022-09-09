import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../redux/slice/app';

const useToggleDrawer = () => {
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleDrawer());
  };
  return toggle;
};

export default useToggleDrawer;
