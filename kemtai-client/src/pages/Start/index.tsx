//style
import styles from './Start.module.css';

import { Link } from "react-router-dom";

function Start() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Link className={styles.link} to="/camera">
          START
        </Link>
      </div>
    </div>
  );
}

export default Start;
