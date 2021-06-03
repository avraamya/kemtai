import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Camera.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../../util/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

//Input for the exercise
const Reps = {
  TimeOfMove: [1, 2, 3, 3.5, 4.5, 5, 6, 10, 12, 13, 14, 15.5],
  ScoreOfMove: [60, 72, 10, 60, 70, 80, 90, 100, 90, 40, 0, 20],
};

//incremental for setTimeout
let i = 0;

//max score
let maxScore = 100;

function Camera() {
  //turn on camera.
  useEffect(() => {
    startVideo();
  }, []);

  //camera function.
  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let outerHtmlElement: any =
          document.getElementsByClassName("videoFeed");
        let video = outerHtmlElement[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  //redirect utilities

  const history = useHistory();
  let timeToRedirect = true;
  const timeRedirectInSeconds = 60;

  //redirect to next screen after 'timeRedirectInSeconds' second.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (timeToRedirect) {
      timeout = setTimeout(() => {
        let outerHtmlElement: any =
          document.getElementsByClassName("videoFeed");
        let video = outerHtmlElement[0];
        video.srcObject.getTracks()[0].stop();
        history.push("/end");
      }, timeRedirectInSeconds * 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [history, timeToRedirect]);

  //utilities for setTimeout
  const [time, setTime] = useState<number>();
  const [totalScore, setTotalScore] = useState<number[]>([]);

  //setTimeout for Numeric value on the top left
  useEffect(() => {
    const asyncTimer = async () => {
      await new Promise((resolve) =>
        //setInterval(() => {
        setTimeout(() => {
          setTime(Reps.ScoreOfMove[i]);
          i++;
        }, Reps.TimeOfMove[i] * 1000)
      );
    };

    asyncTimer();
  }, [time]);

  //setTimeout for graph visualization at the bottom
  useEffect(() => {
    const asyncTimer = async () => {
      await new Promise((resolve) =>
        //setInterval(() => {
        setTimeout(() => {
          setTotalScore(
            Reps.ScoreOfMove.map((score, index) => {
              if (index < i) {
                return score;
              } else {
                return 0;
              }
            })
          );
        }, Reps.TimeOfMove[i] * 1000)
      );
    };

    asyncTimer();
  }, [totalScore]);

  //chart utilities

  var color = totalScore.map(
    (x) =>
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(190,190,190,1) 100%)"
  );

  function argMax(array: number[]) {
    if (array.length === 0) {
      return;
    }
    return array
      .map((x: any, i: number) => [x, i])
      .reduce((r: any, a: any) => (a[0] > r[0] ? a : r))[1];
  }

  color[argMax(totalScore)] =
    "linear-gradient(0deg, rgba(255,224,0,1) 0%, rgba(120,255,0,1) 100%)";

  return (
    <div>
      {i === 0 || i === 1 ? (
        <div className={styles.start}>
          <div>{"GO"}</div>
        </div>
      ) : null}
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.barItem}>
            <div className={styles.text}>{time}</div>
          </div>
          <div className={styles.timer}>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={100}
              duration={15}
              easingFunction={easeQuadInOut}
            >
              {(value: any) => {
                return (
                  <CircularProgressbar
                    value={value}
                    strokeWidth={50}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor: "rgb(207,207,207)",
                      trailColor: "rgb(50,50,50)",
                    })}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
        </div>
        <div className={styles.camera}>
          <video muted autoPlay className="videoFeed"></video>
        </div>
        <div className={styles.chartBar}>
          <div className={styles.chartWrapper}>
            <ul className={styles.chart}>
              {totalScore.map((score, index) => {
                return (
                  <li>
                    <span
                      style={{
                        height: `${(score / maxScore) * 100 + 5}%`,
                        background: `${color[index]}`,
                        borderRadius: "50px",
                      }}
                    ></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
