import React, { useEffect } from "react";

//Input for the exercise
const Reps = {
  TimeOfMove: [1, 2.5, 3, 3.1, 4.5, 5],
  ScoreOfMove: [60, 85, 42, 60, 70, 80],
};

function Camera() {

  //turn on camera.
  useEffect(() => {
    startVideo()
  }, []);

  //camera function.
  const startVideo = () => {
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let outerHtmlElement : any = document.getElementsByClassName("videoFeed"); 
        let video = outerHtmlElement[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

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
