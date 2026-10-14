import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
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
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
          <h1>Pomodoro App</h1>
        <p className="State"> {work} </p>
        <p className="timer-remaining">
          Time Remaining {minutes}:{remainingSeconds.toString().padStart(2, '0')}
        </p>
        <p className="cycles">Completed cycles: {cycles}</p>
        {hourDone ? (
          <div className="hour-choice">
            <p>One hour done! Do you want to keep going?</p>
            <button type="button" onClick={() => {setHourDone(false); setIsRunning(true)}}>Continue</button>
            <button type="button" onClick={() => {setHourDone(false); setCycles(0)}}>Stop</button>
          </div>
        ) : (
          <button type="button" className="timer-control" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
        )}
        <button type="button" className="timer-restart" onClick={()=> {setSeconds(1500); setIsRunning(false); setWorking("Working"); setCycles(0); setHourDone(false)} }>Restart</button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Informations</h2>
          <p>
            This app helps people to be productive by the Pomodoro technique. Here, the link if you're curious: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">Pomodoro Technique</a>.</p>
          <p>You can start a timer, take breaks, and track your progress efficiently.</p>
          <p>Give it a try and improve your productivity today!</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Made by ZED</h2>
          <p>
            This app helps people to be productive by the Pomodoro technique. Here, the link if you're curious: <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">Pomodoro Technique</a>.</p>
          <p>You can start a timer, take breaks, and track your progress efficiently.</p>
          <p>Give it a try and improve your productivity today!</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Timer
