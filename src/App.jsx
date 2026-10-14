import { useState, useEffect } from 'react'
import './App.css'
function Timer() {
  const [seconds, setSeconds] = useState(1500)
  const [isRunning, setIsRunning] = useState(false)
  const [work, setWorking] = useState("Working")
  const [cycles, setCycles] = useState(0)
  const [hourDone, setHourDone] = useState(false)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  useEffect(() => {
    let timer
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        if (seconds === 1 && work === "Working"){
          setSeconds(300)
          setWorking("Pause")
        } else if (seconds === 1 && work === "Pause"){
          setWorking("Working")
          setSeconds(1500)
          setCycles(cycles + 1)
          if ((cycles + 1) % 2 === 0) {
            setIsRunning(false)
            setHourDone(true)
          }
        } else {
          setSeconds((seconds)=> seconds - 1)
        }
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, seconds, work, cycles])
  return (
    <main className={`app ${work === "Working" ? "mode-work" : "mode-break"}`}>
      <header className="header">
        <h1>Pomodoro</h1>
        <p className="mode">{work}</p>
      </header>

      <p className="timer" role="timer">
        {minutes}:{remainingSeconds.toString().padStart(2, '0')}
      </p>
      <p className="cycles">Completed cycles: {cycles}</p>

      {hourDone ? (
        <div className="hour-choice">
          <p>One hour done. Do you want to keep going?</p>
          <div className="controls">
            <button type="button" className="btn btn-primary" onClick={() => {setHourDone(false); setIsRunning(true)}}>Continue</button>
            <button type="button" className="btn btn-secondary" onClick={() => {setHourDone(false); setCycles(0)}}>Stop</button>
          </div>
        </div>
      ) : (
        <div className="controls">
          <button type="button" className="btn btn-primary" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={()=> {setSeconds(1500); setIsRunning(false); setWorking("Working"); setCycles(0); setHourDone(false)} }>Restart</button>
        </div>
      )}

      <footer className="footer">
        <section className="info">
          <h2>Informations</h2>
          <p>
            This app helps people to be productive by the Pomodoro technique. Here, the link if you're curious: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noreferrer">Pomodoro Technique</a>.
          </p>
          <p>You can start a timer, take breaks, and track your progress efficiently.</p>
          <p>Give it a try and improve your productivity today!</p>
        </section>
        <section className="info">
          <h2>Made by ZED</h2>
          <p>
            This app helps people to be productive by the Pomodoro technique. Here, the link if you're curious: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noreferrer">Pomodoro Technique</a>.
          </p>
          <p>You can start a timer, take breaks, and track your progress efficiently.</p>
          <p>Give it a try and improve your productivity today!</p>
          <ul className="links">
            <li>
              <a href="https://github.com/Ghostwatching-ZED" target="_blank" rel="noreferrer">
                <svg className="link-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </main>
  )
}

export default Timer
