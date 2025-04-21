// App.js
import React, { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal';
import './App.css';

function App() {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setVisible(true), 500);
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="app">
      {visible && (
        <div className={`terminal ${minimized ? 'minimized' : ''} ${expanded ? 'expanded' : ''}`}>
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="terminal-control close" onClick={handleClose}></div>
              <div className="terminal-control minimize" onClick={handleMinimize}></div>
              <div className="terminal-control expand" onClick={handleExpand}></div>
            </div>
            <div className="terminal-title">tanay@portfolio:~</div>
            <div></div>
          </div>
          {!minimized && <Terminal />}
        </div>
      )}
    </div>
  );
}

export default App;
