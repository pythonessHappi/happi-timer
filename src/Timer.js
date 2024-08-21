import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(25);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    if (!isActive && time === 0) {
      setTime(duration * 60);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(duration * 60);
  };

  const handleDurationChange = (e) => {
    const newDuration = Math.max(1, parseInt(e.target.value) || 0);
    setDuration(newDuration);
    if (!isActive) {
      setTime(newDuration * 60);
    }
  };

  const progress = 1 - (time / (duration * 60));
  const rotation = progress * 360;

  return (
    <div>
      <div className="timer-container">
        <div className="timer-face">
          <div 
            className="timer-progress" 
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${rotation <= 180 ? 50 + 50 * Math.tan(rotation * Math.PI / 360) : 100}% 0%, 100% ${rotation <= 180 ? 0 : 100 - 50 * Math.tan((rotation - 180) * Math.PI / 360)}%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
            }}
          ></div>
          <div 
            className="timer-hand"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          <div className="timer-text">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      <div className="controls">
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          min="1"
        />
        <span>minutes</span>
        <div>
          <button onClick={toggleTimer} disabled={isActive && time === 0}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;