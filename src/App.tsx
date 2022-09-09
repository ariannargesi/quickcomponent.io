import { useSelector } from 'react-redux';
import { RootState } from './types';
import Header from './components/Header';
import ComponentView from './components/ComponentView';
import SelectorsPanel from './components/SelectorsPanel';
import Drawer from './components/Drawer';
import EmptyTree from './components/EmptyTree';
import TreeAndStyles from './components/Sider/TreeAndStyles';

function App() {
  const treeIsEmpty = useSelector(
    (state: RootState) => state.emptyTree
  );

  if (treeIsEmpty)
    return (
      <div className='App'>
        <Header />
        <EmptyTree />
        <Drawer />
      </div>
    );

  return (
    <div className='App'>
      <Header />
      <div className='main-container'>
        <SelectorsPanel />
        <TreeAndStyles />
        <ComponentView />
      </div>
      <Drawer />
    </div>
  );
}

export default App;
