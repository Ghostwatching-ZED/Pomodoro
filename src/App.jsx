import { useState, useEffect } from 'react'
import './App.css'

const breakSound = new Audio('/break.mp3')
const hourSound = new Audio('/break.mp3')

function playHourSound() {
  hourSound.currentTime = 0
  hourSound.play()
  hourSound.addEventListener('ended', () => hourSound.play(), { once: true })
}

const ACCENTS = [
  { name: 'Tomato', value: '#c4513a' },
  { name: 'Red', value: '#d12f3f' },
  { name: 'Pink', value: '#d6478a' },
  { name: 'Orange', value: '#d9822b' },
  { name: 'Yellow', value: '#d4a514' },
  { name: 'Lime', value: '#7ea32a' },
  { name: 'Green', value: '#4d7a62' },
  { name: 'Emerald', value: '#1f9d6b' },
  { name: 'Teal', value: '#1f8a8a' },
  { name: 'Sky', value: '#2f9bd6' },
  { name: 'Blue', value: '#3b6fd4' },
  { name: 'Indigo', value: '#4b4bc4' },
  { name: 'Purple', value: '#7c5cc4' },
  { name: 'Brown', value: '#8a5a3c' },
  { name: 'Slate', value: '#5b6677' },
  { name: 'Black', value: '#1f1d1a' },
]
const BACKGROUNDS = [
  { name: 'Cream', value: '#faf6f1' },
  { name: 'White', value: '#ffffff' },
  { name: 'Light gray', value: '#eeeeee' },
  { name: 'Rose', value: '#fbeeee' },
  { name: 'Peach', value: '#fcefe3' },
  { name: 'Lemon', value: '#fbf7dc' },
  { name: 'Sage', value: '#eef3ee' },
  { name: 'Mint', value: '#e5f5ee' },
  { name: 'Sky', value: '#eaf1fa' },
  { name: 'Lavender', value: '#f1ecfa' },
  { name: 'Slate', value: '#2b3240' },
  { name: 'Forest', value: '#16241c' },
  { name: 'Navy', value: '#12203a' },
  { name: 'Wine', value: '#2a1218' },
  { name: 'Night', value: '#1a1716' },
  { name: 'Black', value: '#0e0e0e' },
]
const TEXTS = [
  { name: 'Dark', value: '#1f1d1a' },
  { name: 'Light', value: '#f1ece6' },
  { name: 'White', value: '#ffffff' },
  { name: 'Gray', value: '#6b6b6b' },
  { name: 'Navy', value: '#1b2a4a' },
  { name: 'Brown', value: '#4a3426' },
  { name: 'Forest', value: '#1f4a35' },
  { name: 'Wine', value: '#6b1f2e' },
  { name: 'Purple', value: '#4a2f7a' },
  { name: 'Gold', value: '#e8c46a' },
  { name: 'Mint', value: '#9be0c0' },
  { name: 'Sky', value: '#9cc7f0' },
]
function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

function buildTheme({ accent, bg, text }) {
  const theme = {}
  if (bg) theme['--bg'] = bg
  const textColor = text ?? (bg ? (isLight(bg) ? '#1f1d1a' : '#f1ece6') : null)
  if (textColor) {
    theme['--text'] = textColor
    theme['--muted'] = `color-mix(in srgb, ${textColor} 60%, transparent)`
    theme['--border'] = `color-mix(in srgb, ${textColor} 18%, transparent)`
    theme['--icon-filter'] = isLight(textColor) ? 'invert(1) brightness(2)' : 'none'
  }
  if (accent) {
    theme['--accent'] = accent
    theme['--on-accent'] = isLight(accent) ? '#1a1716' : '#ffffff'
  }
  return theme
}

function Palette({ label, options, value, onChange }) {
  return (
    <div className="setting">
      <p className="setting-row">{label}</p>
      <div className="swatches">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="swatch"
            style={{ background: option.value }}
            aria-label={option.name}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  )
}

function Timer() {
  const [seconds, setSeconds] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [work, setWorking] = useState("Working")
  const [cycles, setCycles] = useState(0)
  const [hourDone, setHourDone] = useState(false)
  const [settings, setSettings] = useState(false)
  const [sounds, setSounds] = useState (true)
  const [volume, setVolume] = useState(0.3)
  const [accent, setAccent] = useState(null)
  const [bg, setBg] = useState(null)
  const [textColor, setTextColor] = useState(null)
  const theme = buildTheme({ accent, bg, text: textColor })
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  useEffect(() => {
    breakSound.volume = volume
    hourSound.volume = volume
  }, [volume])
  
  useEffect(() => {
    let timer
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        if (seconds === 1 && work === "Working"){
          setSeconds(3)
          setWorking("Pause")
          if (sounds) breakSound.play()
        } else if (seconds === 1 && work === "Pause"){
          setWorking("Working")
          setSeconds(5)
          setCycles(cycles + 1)
          if ((cycles + 1) % 2 === 0) {
            setIsRunning(false)
            setHourDone(true)
            if (sounds) playHourSound()
          }
        } else {
          setSeconds((seconds)=> seconds - 1)
        }
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning, seconds, work, cycles, sounds])
  return (
    <main className={`app ${work === "Working" ? "mode-work" : "mode-break"}`} style={theme}>
      <header className="header">
        <h1>Pomodoro</h1>
        <p className="mode">{work}</p>
        <button type="button" className='btn-settings' aria-label="Settings" onClick={()=> setSettings(!settings)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      {settings && (
        <div className="modal-overlay" onClick={() => setSettings(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id="settings-title">Settings</h2>
              <button type="button" className="modal-close" aria-label="Close" onClick={() => setSettings(false)}>×</button>
            </div>

            <div className="setting">
              <label className="setting-row">
                <span>Sound</span>
                <input type="checkbox" checked={sounds} onChange={() => setSounds(!sounds)} />
              </label>
            </div>

            <div className="setting">
              <label className="setting-row">
                <span>Volume</span>
                <span className="setting-value">{Math.round(volume * 100)}%</span>
              </label>
              <input type="range" min="0" max="1" step="0.05" value={volume} disabled={!sounds} onChange={(e) => setVolume(Number(e.target.value))}/>
            </div>

                          <Palette label="Buttons" options={ACCENTS} value={accent} onChange={setAccent} />
                          <Palette label="Background" options={BACKGROUNDS} value={bg} onChange={setBg} />
                          <Palette label="Text" options={TEXTS} value={textColor} onChange={setTextColor} />

                          <button
                            type="button"
                            className="reset-colors"
                            onClick={() => { setAccent(null); setBg(null); setTextColor(null) }}
                          >
                            Reset colors
                          </button>          </div>
        </div>
      )}

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
          <button type="button" className="btn btn-secondary" onClick={()=> {setSeconds(5); setIsRunning(false); setWorking("Working"); setCycles(0); setHourDone(false)} }>Restart</button>
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
