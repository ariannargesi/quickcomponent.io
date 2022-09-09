import ReactDOM from 'react-dom';
import './styles.sass';
import App from './App';
import store from './redux';
import { Provider } from 'react-redux';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Export from './components/Export';

const Main = () => {
  const isBigEnough = useMediaQuery({
    query: '(min-width: 768px)',
  });

  if (!isBigEnough)
    return (
      <div
        style={{
          padding: '32px',
        }}
      >
        <h2>
          Oh, This website is not optimized for mobile
        </h2>
        <h3>
          Please Come back with a bigger screen. It's worth
          it 😉
        </h3>
      </div>
    );

  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/export' element={<Export />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

const root = document.getElementById('root');

ReactDOM.render(<Main />, root);
