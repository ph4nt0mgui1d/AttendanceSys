import React, { useState } from "react";

function getCurrentDateString() {
  const date = new Date().getDate() //current date
  const month = new Date().getMonth() + 1 //current month
  const year = new Date().getFullYear() //current year
  const hours = new Date().getHours() //current hours
  const min = new Date().getMinutes() //current minutes
  const sec = new Date().getSeconds() //current seconds

  return date + '/' + month + '/' + year + '    ' + hours + ':' + min + ':' + sec
}

const Attendance = () => {
  const [currentdate, setCurrentdate] = useState(getCurrentDateString())

  return (
    <>
      <p>Showing current date and time</p>
      <p></p>
      <button
        onPress={() => setCurrentdate(getCurrentDateString())}>click</button>
    </>
  );
}

export default Attendance;
