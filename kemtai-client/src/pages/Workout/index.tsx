import { useState } from "react";
import { Link } from "react-router-dom";

//style
import styles from "./Workout.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Timer } from "../../images/timer.svg";
import cardioImage from "../../images/cardio.png";
import strenghtImage from "../../images/strenght.png";
import flexabilityImage from "../../images/flexability.png";
const TOGGLE_CARDIO = 1;
const TOGGLE_STRENGHT = 2;
const TOGGLE_FLEXABILITY = 3;

function Start() {
  const [workoutChosen, setWorkoutChosen] = useState<number[]>([]);

  let cardioClass =
    workoutChosen.length === 0 || workoutChosen === undefined
      ? styles.card
      : workoutChosen.includes(TOGGLE_CARDIO)
      ? styles.cardselect
      : styles.cardunselected;

  let strenghtClass =
    workoutChosen.length === 0 || workoutChosen === undefined
      ? styles.card
      : workoutChosen.includes(TOGGLE_STRENGHT)
      ? styles.cardselect
      : styles.cardunselected;

  let flexabilityClass =
    workoutChosen.length === 0 || workoutChosen === undefined
      ? styles.card
      : workoutChosen.includes(TOGGLE_FLEXABILITY)
      ? styles.cardselect
      : styles.cardunselected;

  const ToggleWorkoutChosen = (value: number) => {
    const currentIndex = workoutChosen.indexOf(value);
    const newToggleSection: number[] = [];
    if (currentIndex === -1) {
      newToggleSection.push(value);
    } else {
      newToggleSection.splice(currentIndex, 1);
    }

    setWorkoutChosen(newToggleSection);
  };

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Logo className={styles.logoimage} />
      </div>
      <div className={styles.header}>
        {workoutChosen.length === 0 ? (
          "Choose a short workout"
        ) : (
          <Link className={styles.link} to="/camera">
            Let's Go
          </Link>
        )}
      </div>
      <div className={styles.cards}>
        <div
          className={cardioClass}
          style={{
            backgroundImage: `url(${cardioImage})`,
          }}
          onClick={() => {
            ToggleWorkoutChosen(TOGGLE_CARDIO);
          }}
        >
          <div className={styles.timer}>
            <Timer className={styles.timerLogo} />
            <div className={styles.timerText}>2 min</div>
          </div>
          <div className={styles.title}>Cardio</div>
        </div>
        <div
          className={strenghtClass}
          style={{
            backgroundImage: `url(${strenghtImage})`,
          }}
          onClick={() => {
            ToggleWorkoutChosen(TOGGLE_STRENGHT);
          }}
        >
          <div className={styles.timer}>
            <Timer className={styles.timerLogo} />
            <div className={styles.timerText}>2 min</div>
          </div>
          <div className={styles.title}>Strenght</div>
        </div>
        <div
          className={flexabilityClass}
          style={{
            backgroundImage: `url(${flexabilityImage})`,
          }}
          onClick={() => {
            ToggleWorkoutChosen(TOGGLE_FLEXABILITY);
          }}
        >
          <div className={styles.timer}>
            <Timer className={styles.timerLogo} />
            <div className={styles.timerText}>2 min</div>
          </div>
          <div className={styles.title}>Flexability</div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footertest}>Already Using Kemtai</div>
      </div>
    </div>
  );
}

export default Start;
