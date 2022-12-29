import { useRef, useState } from "react";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [title, setTitle] = useState("Let the countdown begin!!");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const mins = padTime(Math.floor(timeLeft / 60));
  const sec = padTime(timeLeft - mins * 60);

  const intervalRef = useRef(null);
  // start the timer
  function startTimer() {
    if (intervalRef.current !== null) return;

    setTitle("You are doing great");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  // stop the timer
  function stopTimer() {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Keep it up!");
    setIsRunning(false);
  }

  // reset  the timer
  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("consistency is the key");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  return (
    <div className="h-screen bg-teal-300">
      <div className="mx-auto w-1/2">
        <div className="p-10">
          <div className="py-12 text-center">
            <h1 className="py-7	text-4xl text-slate-500">{title}</h1>
            <span className="text-8xl	text-slate-500">{mins}</span>
            <span className="text-8xl	text-slate-500">:</span>
            <span className="text-8xl	text-slate-500">{sec}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {!isRunning &&
            <button
              className="gap-px rounded bg-blue-400 py-2 px-2 text-2xl text-white hover:bg-blue-300"
              onClick={startTimer}
            >
              Start
            </button> }
            <button
              className="gap-px rounded bg-blue-400 py-2 px-2 text-2xl text-white hover:bg-blue-300"
              onClick={resetTimer}
            >
              Reset
            </button>
            {isRunning &&
            <button
              className="gap-px rounded bg-blue-400 py-2 px-2 text-2xl text-white hover:bg-blue-300"
              onClick={stopTimer}
            >
              Stop
            </button> }
          </div>
        </div>
      </div>
    </div>
  );
}
