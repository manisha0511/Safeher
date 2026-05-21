export const startAIDetection = (
  activateSOS
) => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert(
      "Speech Recognition not supported"
    );

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.continuous = true;

  recognition.lang = "en-US";

  recognition.onresult = (event) => {

    const transcript =
      event.results[
        event.results.length - 1
      ][0].transcript.toLowerCase();

    console.log(
      "Detected:",
      transcript
    );

    // DANGER WORDS
    const dangerWords = [

      "help",
      "save me",
      "danger",
      "bachao",
      "emergency",
      "stop him",
      "please help",

    ];

    const detected =
      dangerWords.some((word) =>
        transcript.includes(word)
      );

    if (detected) {

      activateSOS();

      alert(
        "🚨 Danger Detected Automatically!"
      );

    }

  };

  recognition.start();

};