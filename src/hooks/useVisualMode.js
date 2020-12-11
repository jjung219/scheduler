import { useState } from 'react';
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode, replace = false) {
    if (replace) { //don't set a history, replacing the current mode with the new mode
      setMode(newMode)
    } else {
      setHistory([...history, mode])
      setMode(newMode);
    }
  }

  function back () {
    if (history.length >= 1) {
      setMode(history.pop())
    }
  }

  return { mode, transition, back };
}