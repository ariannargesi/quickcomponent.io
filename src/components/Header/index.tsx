import styles from './styles.module.sass';
import { GitHub } from 'react-feather';

const url =
  'https://github.com/ariannargesi/quickcomponent';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href={url}>
        <GitHub color='white' size={20} />
      </a>
    </header>
  );
};

export default Header;
