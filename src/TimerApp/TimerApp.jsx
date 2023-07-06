import './style.css';

import { useMemo, useRef, useState, useEffect, useCallback } from 'react';



export default function TimerApp() {
  console.log("RENDER TimerApp");

  let renderCount = useRef(0);
  let [pressCount, setPressCount] = useState(0);
  let [timerKeys, setTimerKey] = useState([1234]);

  const newTimer = useCallback(function() {
    let newKey = Math.floor(Math.random() * 1000000);
    setTimerKey(old => [...old, newKey]);
  },[timerKeys]);

  const handleDelete = useCallback(function(alias) {
    setTimerKey(old => old.filter(k => k != alias));
  },[timerKeys]);
  const _handleDelete = useCallback(function(alias) {
    //setTimerKey(old => old.filter(k => k != alias));
  });

  let strawberryBox =  useMemo(() => {
    return <Box name="Strawberry Box" desc="Render when timer count changes." />;
  }, [timerKeys]);

  let raisinBox =  useMemo(() => {
    return <Box name="Raisin Box" desc="No dep, never re-render" />;
  }, []);

  let pumpkinBox =  useMemo(() => {
    return <Box name="Pumpkin Box" desc="dep on newTimer and changeState" />;
  }, [timerKeys, pressCount]);


  renderCount.current = renderCount.current + 1;
  return (
    <div className="TimerApp _box">
      <div className="Stopwatch">

        {timerKeys.map(k => <TimeSince key={k} alias={k} onDelete={handleDelete} />)}

        <div className="new-button-wrapper">
        <input
          className="new"
          type="button" value="+ New Timer"
          onClick={() => newTimer()}/>

        </div>

        <hr/>

        <div>renderCount: {renderCount.current}</div>
        <button value=""
                onClick={() => setPressCount(c => c + 1)}>change state</button>
        <Box name="Peach Box" desc="no memo" />

        {strawberryBox}
        {raisinBox}
        {pumpkinBox}
   </div>
    </div>
  );


}

function Box({name, desc}) {
  let renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  return (
    <div className="box">
      Box: {name}
      <br />
      {desc}
      <br />
      Render Count: {renderCount.current}
    </div>
  );
}

function TimeSince({alias, onDelete}) {
  let [counter, setCounter] = useState(0);

  let renderCount = useRef(0);
  let interval = useRef(undefined);
  let [startTime, setStartTime] = useState();
  let [stopTime, setStopTime] = useState();
  let [accumulated, setAccumulated] = useState(0);

  let isRunning = startTime && !stopTime;
  let isStopped = startTime && stopTime;

  const handleReset = useCallback(() => {
    setStartTime(null);
    setStopTime(null);
    setAccumulated(0);
  }, [startTime, stopTime]);

  const handleStart = useCallback(() => {
    const now = Date.now();
    setStartTime(now - accumulated);
    setStopTime(null);
    //setAccumulated(a => a + (stopTime - startTime));
  }, [startTime, stopTime, accumulated]);

  const handleStop = useCallback(() => {
    const now = Date.now();
    setStopTime(now);
    setAccumulated(now - startTime);
  }, [stopTime, startTime, accumulated]);

  let stop = stopTime || Date.now();

  let ms = 0;
  let msTen = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  if (isRunning || (startTime && stopTime)) {
    ms = Math.floor((stop - startTime)) % 1000;
    msTen = Math.floor(ms / 100);
    seconds = Math.floor((stop - startTime) / 1000) % 60;
    minutes = Math.floor((stop - startTime) / 1000 / 60) % 60;
    hours = Math.floor((stop - startTime) / 1000 / 60 / 60);
  }

  let secondsDisplay = (seconds + "").padStart(2, "0");
  let minutesDisplay = (minutes + "").padStart(2, "0");
  let hoursDisplay = hours;

  const removeInterval = () => {
    console.log("# # # # clearInterval");
    interval.current && clearInterval(interval.current);
    interval.current = null;
  };

  useEffect(() => {
    if (!interval.current && isRunning) {
      console.log('################ create interval');
      interval.current = setInterval(() => {
        setCounter(c => c+1);
      }, 33);
    }
  });


  if(!isRunning) {
    removeInterval();
  };

  let startLabel = "Start";
  let stopLabel = "Stop";
  if (isRunning) {
    startLabel = "Restart";
  }

  renderCount.current = renderCount.current + 1;
  return (
    <div className="box TimerSince">

      <div className="time">
        {hoursDisplay}:{minutesDisplay}:{secondsDisplay}
        {/* {minutesDisplay}:{secondsDisplay}.{msTen} */}
      </div>

      <div className="buttons">

        <input
          className="reset"
          type="button"
          value="Reset"
          onClick={() => handleReset()}/>
        {isRunning
         ? <input
         className="stop"
         type="button"
         value={stopLabel}
         onClick={() => handleStop()}/>
         : <input
         className="start"
         type="button"
         value={startLabel}
         onClick={() => handleStart()}/>
        }
      </div>

        <input
          className=""
          type="button"
          value="add 50s"
          onClick={() => setStartTime(t => t - 50*1000)}/>

        <input
          className=""
          type="button"
          value="add 10m"
          onClick={() => setStartTime(t => t - 10*60*1000)}/>


      <div>renderCount: {renderCount.current}</div>

      <input
        className="delete"
        type="button"
        value={"X"}
        onClick={() => onDelete(alias)}/>


    </div>
  );
}
