import { useState } from 'react';
// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

export default function useVisualMode (initial) {
  // const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode, replace = false) {
    if (replace) { //don't set a history, replacing the current mode with the new mode
      setHistory(prev => [...prev.slice(0, -1), newMode])
      // setMode(newMode)
    } else {
      setHistory(prev => [...prev, newMode])
      // setMode(newMode);
    }
  }

  function back () {
    if (history.length >= 1) {
      // setMode(history[history.length-2]);
      setHistory(prev => prev.slice(0, -1));
    }
  }

  return { mode: history[history.length - 1], transition, back };
}