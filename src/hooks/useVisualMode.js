import React, { useState } from "react";


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
        // the two setState will be rendered together since in a same func??
        const lastItem = history[history.length-2];
        setMode(lastItem);
        setHistory(history.slice(0, -1));
       console.log(history);
      
      }

    }

    return { mode, transition, back };
  }