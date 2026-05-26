import { useEffect, useRef, useState } from "react";

function CameraRecorder() {

  const videoRef = useRef(null);

  const mediaRecorderRef = useRef(null);

  const chunksRef = useRef([]);

  const [stream, setStream] = useState(null);

  const [cameraOn, setCameraOn] = useState(false);

  const [recording, setRecording] = useState(false);

  // START CAMERA
  async function startCamera() {

    try {

      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);

      setCameraOn(true);

    } catch (error) {
      console.log(error);
    }

  }

  // STOP CAMERA
  function stopCamera() {

    if (stream) {

      stream.getTracks().forEach((track) => {
        track.stop();
      });

    }

    setCameraOn(false);
  }

  // START RECORDING
  function startRecording() {

    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;

    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {

      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }

    };

    mediaRecorder.onstop = () => {

      const blob = new Blob(chunksRef.current, {
        type: "video/webm",
      });

      const videoURL = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = videoURL;

      a.download = "safeher-recording.webm";

      a.click();

    };

    mediaRecorder.start();

    setRecording(true);
  }

  // STOP RECORDING
  function stopRecording() {

    mediaRecorderRef.current.stop();

    setRecording(false);
  }

  // AUTO START CAMERA
  useEffect(() => {
    startCamera();
  }, []);

  return (

    <div className="mt-6 w-full">

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-[250px] sm:h-[350px] object-cover rounded-3xl border border-red-500/30"
      />

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

        {!cameraOn ? (

          <button
            onClick={startCamera}
            className="bg-green-500 text-white py-3 rounded-2xl text-sm sm:text-base"
          >
            Start Camera
          </button>

        ) : (

          <button
            onClick={stopCamera}
            className="bg-red-600 text-white py-3 rounded-2xl text-sm sm:text-base"
          >
            Stop Camera
          </button>

        )}

        {!recording ? (

          <button
            onClick={startRecording}
            className="bg-pink-500 text-white py-3 rounded-2xl text-sm sm:text-base"
          >
            Start Recording
          </button>

        ) : (

          <button
            onClick={stopRecording}
            className="bg-yellow-500 text-black py-3 rounded-2xl text-sm sm:text-base"
          >
            Stop Recording
          </button>

        )}

      </div>

    </div>
  );
}

export default CameraRecorder;