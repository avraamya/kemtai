import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

//Input for the exercise
const Reps = {
  TimeOfMove: [1, 2, 3, 3.5, 4.5, 5, 6, 10, 12, 13, 14, 15.5],
  ScoreOfMove: [60, 72, 10, 60, 70, 80, 90, 100, 90, 40, 0, 20],
};

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

  return (
    <div className="camera">
      <video
        height="800"
        width="800"
        muted
        autoPlay
        className="videoFeed"
      ></video>
    </div>
  );
}

export default Camera;
