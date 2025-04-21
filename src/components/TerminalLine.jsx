import React from 'react';

const TerminalLine = ({ command }) => {
  return (
    <div className="terminal-line">
      <div className="terminal-prompt">tanay@portfolio:~$</div>
      <div className="terminal-output">{command}</div>
    </div>
  );
};

export default TerminalLine; 