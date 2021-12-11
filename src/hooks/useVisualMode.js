import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace) => {
    const newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    setHistory([...newHistory, newMode]);
  };
    
  const back = () => {
    if (history.length < 2) return;
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };
    
  const mode = history[history.length - 1];

  return { mode, transition, back };
};