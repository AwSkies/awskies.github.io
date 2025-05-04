import classNames from 'classnames';
import styles from './Home.module.css';
import contentStyles from './Content.module.css'

export default function Home() {
  return (
    <div className={classNames(styles.home, contentStyles.content)}>
      <h1>Akash W. Shah</h1>
      <h2>AwSky / AwSkies</h2>
    </div>
  );
}
