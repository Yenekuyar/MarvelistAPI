import React, { useState } from 'react';
import './DarkMode.css';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export default function DarkMode() {

  const [theme, setTheme] = useState(Theme.LIGHT);

  const toggleTheme = () => {
    if (theme === Theme.LIGHT) {
      setTheme(Theme.DARK);
      document.body.classList.add(Theme.DARK);
    } else {
      setTheme(Theme.LIGHT);
      document.body.classList.remove(Theme.DARK);
    }
  };

  return (
    <label className="switch">
        <input type="checkbox" id='darkmode-button' onClick={toggleTheme}/>
        <span className="slider round"></span>
    </label>
  )
}
