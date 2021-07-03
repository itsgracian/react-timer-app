import React, { useState, ChangeEvent } from "react";
import "./Timer.css";
import { useTimer } from "use-timer";
import { Icon } from "@iconify/react";
import MediaPlayIcon from "@iconify-icons/cil/media-play";
import PauseIcon from "@iconify-icons/cil/media-pause";
import { minutesToSeconds } from "date-fns";
import { convertSecondToTime } from "./Helper";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>();

  const [autoStart, setAutoStart] = useState<boolean>(false);

  const handleTimeOver = () => {
    setAutoStart(false);

    return undefined;
  };

  const { time, reset } = useTimer({
    initialTime: seconds,
    timerType: "DECREMENTAL",
    autostart: autoStart,
    endTime: 0,
    onTimeOver: handleTimeOver
  });

  const handleMilleSeconds = (e: ChangeEvent<HTMLInputElement>) => {
    setSeconds(minutesToSeconds(Number(e.target.value)));
  };

  const handleStart = () => {
    if (autoStart) {
      setAutoStart(false);

      reset();
    } else {
      setAutoStart(true);

      setSeconds(seconds);
    }

    return undefined;
  };

  const t = convertSecondToTime(time || 0);

  return (
    <div className="timer">
      <div className="container">
        <div className="hourMin">
          {t.hours}:{t.minutes}
        </div>
        <div className="seconds">{t.seconds}</div>
        <div className="setMin">
          <input
            type="number"
            placeholder="set min"
            onChange={handleMilleSeconds}
          />
        </div>
        <div className="play">
          <button type="button" onClick={handleStart}>
            <Icon icon={autoStart ? PauseIcon : MediaPlayIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
