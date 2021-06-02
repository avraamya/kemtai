import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./Camera.module.css";

//Input for the exercise
const Reps = {
  TimeOfMove: [1, 2, 3, 3.5, 4.5, 5, 6, 10, 12, 13, 14, 15.5],
  ScoreOfMove: [60, 72, 10, 60, 70, 80, 90, 100, 90, 40, 0, 20],
};

//incremental for setTimeout
let i = 0;

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
    //setInterval(() => {
    setTimeout(() => {
      setTime(Reps.ScoreOfMove[i]);
      i++;
    }, Reps.TimeOfMove[i] * 1000);
  }, [time]);

  //setTimeout for graph visualization at the bottom
  useEffect(() => {
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
    }, Reps.TimeOfMove[i] * 1000);
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
            <CountdownCircleTimer
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
            </CountdownCircleTimer>
          </div>
        </div>
        <div className={styles.camera}>
          <video muted autoPlay className="videoFeed"></video>
        </div>
        <div className={styles.chartBar}>
          <div className={styles.chart}>
            {i < totalScore.length ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Camera;
