import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace === false) {
      setHistory(prev => [...prev, newMode])
    }
    else {
      setHistory(prev => [...prev.slice(0, -1), newMode])
    }
  }

  const back = () => {

    if (history.length > 1) {
      // the two setState will be rendered together since all setState will be rendered together, that's why prev is a better practive than just spread the state.
      // prev is a must if there are two setStates in one func
      const newHistory = [...history].slice(0, -1)
      setHistory(newHistory)
      const lastItem = newHistory[newHistory.length - 1];
      setMode(lastItem);

    }

  }

  return { mode, transition, back };
}