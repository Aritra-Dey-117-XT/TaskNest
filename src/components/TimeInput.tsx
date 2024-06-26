import React, { useState, useEffect } from "react";
import {toast} from "react-hot-toast"

function TimeInput(props: any) {
  const [currentTime, setCurrentTime] = useState("00:00");
  const [alertTime, setAlertTime] = useState("00:00");
  const {time, setTime} = props

  function getMaxTime(value1: any, value2: any) {
    const [hours1, minutes1] = value1.split(":").map(Number);
    const [hours2, minutes2] = value2.split(":").map(Number);
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    const maxMinutes = Math.max(totalMinutes1, totalMinutes2);
    const maxHours = Math.floor(maxMinutes / 60);
    const maxMins = maxMinutes % 60;

    return `${`0${maxHours}`.slice(-2)}:${`0${maxMins}`.slice(-2)}`;
  }

  const timeToAlert = () => {
    const now = new Date();
    let alertHours = `0${now.getHours()}`.slice(-2);
    let alertMinutes = `0${(now.getMinutes() + 2) % 60}`.slice(-2);
    if(Number(alertMinutes) > 59) {
      alertHours = `0${Number(alertHours) + 1}`.slice(-2)
      alertMinutes = `0${Number(alertMinutes) % 60}`.slice(-2)
    }
    const newAlertTime = `${alertHours}:${alertMinutes}`;
    setAlertTime(newAlertTime);

    if (getMaxTime(time, newAlertTime) != time) {
      setTime(newAlertTime);
    }
  };

  useEffect(() => {
    setInterval(() => {
      const time = new Date().toString().slice(16, 21);
      setCurrentTime(time);
    }, 1000);
  }, []);

  useEffect(() => {
    timeToAlert();
  }, [currentTime]);

  const handleChange = (event: any) => {
    if(getMaxTime(event.target.value, alertTime) == alertTime) {
      toast.dismiss()
      toast.error("You can only set alert after 2 minutes of current time!", {
        style: {
          background: "yellow",
          color: "red"
        }
      })
    }
    setTime(getMaxTime(event.target.value, alertTime));
  };

  return (
    <div className="inline">
      <input
        type="time"
        name="timeInput"
        id="timeInput"
        value={time}
        onChange={handleChange}
        className="w-24 p-2 m-2 border-2 border-blue-500 rounded-md text-blue-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      />
    </div>
  );
}

export default TimeInput;
