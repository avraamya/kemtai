import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./Camera.module.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedProgressProvider from "../../util/AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

//Input for the exercise
const Reps = {
  TimeOfMove: [1, 2, 3, 3.5, 4.5, 5, 6, 10, 12, 13, 14, 15.5],
  //TimeOfMove: [1, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
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

  var color = totalScore.map((x) => "rgb(207,207,207)");

  function argMax(array: number[]) {
    if (array.length === 0) {
      return;
    }
    return array
      .map((x: any, i: number) => [x, i])
      .reduce((r: any, a: any) => (a[0] > r[0] ? a : r))[1];
  }

  color[argMax(totalScore)] = "green";

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
            {/* <CountdownCircleTimer
              size={50}
              isPlaying
              duration={60}
              colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
              ]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer> */}
            {/* <CircularProgressbar
              value={0}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathTransitionDuration: 0.5,
              })}
            /> */}
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
                      pathColor: "rgb(100,100,100)",
                      trailColor: "rgb(207,207,207)",
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
              {/* <li>
                <span
                  style={{
                    height: "70%",
                    backgroundColor: "red",
                    borderRadius: "50px",
                  }}
                ></span>
              </li> */}
              {totalScore.map((score, index) => {
                return (
                  <li>
                    <span
                      style={{
                        height: `${(score / maxScore) * 100 + 5}%`,
                        backgroundColor: `${color[index]}`,
                        borderRadius: "50px",
                      }}
                    ></span>
                  </li>
                );
              })}
            </ul>

            {/* {i < totalScore.length ? (
              <ul className={styles.chart}>
                {totalScore.map((score, index) => {
                  return (
                    <li>
                      <span style={{ height: "50%" }}>{"check"}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null} */}

            {/* {i < totalScore.length ? (
              <Bar
                type="bar"
                data={{
                  labels: Array(totalScore.length).fill(""),
                  datasets: [
                    {
                      label: "",
                      data: totalScore,
                      backgroundColor: color,
                    },
                  ],
                }}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            ) : null} */}
          </div>
          {/* <ul
            style={{
              display: "table",
              tableLayout: "fixed",
              width: "60%",
              maxWidth: "700px",
              height: "200px",
              margin: "0 auto",
              backgroundImage:
                "linear-gradient(bottom, rgba(0, 0, 0, 0.1) 2%, transparent 2%)",
              backgroundSize: " 100% 50px",
              backgroundPosition: "left top",
            }}
          >
            <li
              style={{
                position: "relative",
                display: "table-cell",
                verticalAlign: "bottom",
                height: "200px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  top: "100%",
                  padding: "5px 1em 0",
                  display: "block",
                  textAlign: "center",
                }}
              ></div>
              <span
                style={{
                  margin: "0 1em",
                  display: "block",
                  background: "rgba(#d1ecfa, .75)",
                  animation: "draw 1s ease-in-out",
                  borderRadius: "50px",
                  height: "50%",
                }}
                title="ActionScript"
              ></span>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Camera;
