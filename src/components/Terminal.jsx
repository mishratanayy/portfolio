import React, { useState, useEffect, useRef } from 'react';
import resumeData from '../resumeData.json';
import TerminalLine from './TerminalLine';
import TerminalOutput from './TerminalOutput';

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const terminalContentRef = useRef(null);
  const inputRef = useRef(null);

  // Available commands
  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        return (
          <div className="help-output">
            <p className="command-info">Available commands:</p>
            {Object.keys(commands).map((cmd) => (
              <p key={cmd}>
                <span className="command-success">{cmd}</span>: {commands[cmd].description}
              </p>
            ))}
          </div>
        );
      },
    },
    clear: {
      description: 'Clear the terminal',
      execute: () => {
        setHistory([]);
        return null;
      },
    },
    about: {
      description: 'Show information about me',
      execute: () => {
        return (
          <div className="about-output">
            <p>{resumeData.bio}</p>
            <p>
              <span className="command-info">Contact:</span> {resumeData.contact.email} | {resumeData.contact.location}
            </p>
          </div>
        );
      },
    },
    ls: {
      description: 'List available sections and files',
      execute: () => {
        return (
          <div className="ls-output">
            <div className="files-list">
              <span className="dir">experience/</span>
              <span className="dir">education/</span>
              <span className="dir">skills/</span>
              <span className="dir">projects/</span>
              <span className="dir">accomplishments/</span>
              <span className="file">about.txt</span>
              <span className="file">contact.txt</span>
            </div>
          </div>
        );
      },
    },
    cat: {
      description: 'View file contents (e.g., cat about.txt)',
      execute: (args) => {
        if (!args || !args.length) {
          return <p className="command-error">Usage: cat [filename]</p>;
        }

        const filename = args[0].toLowerCase();
        if (filename === 'about.txt') {
          return (
            <div className="file-content">
              <p className="command-info">File: about.txt</p>
              {commands.about.execute()}
            </div>
          );
        } else if (filename === 'contact.txt') {
          return (
            <div className="file-content">
              <p className="command-info">File: contact.txt</p>
              {commands.contact.execute()}
            </div>
          );
        } else {
          return <p className="command-error">File not found: {filename}</p>;
        }
      },
    },
    cd: {
      description: 'Change directory (e.g., cd projects)',
      execute: (args) => {
        if (!args || !args.length) {
          return <p className="command-info">Current directory: ~/portfolio</p>;
        }

        const dir = args[0].toLowerCase();
        if (dir === 'experience' || dir === 'experience/') {
          return commands.experience.execute();
        } else if (dir === 'education' || dir === 'education/') {
          return commands.education.execute();
        } else if (dir === 'skills' || dir === 'skills/') {
          return commands.skills.execute();
        } else if (dir === 'projects' || dir === 'projects/') {
          return commands.projects.execute();
        } else if (dir === 'accomplishments' || dir === 'accomplishments/') {
          return commands.accomplishments.execute();
        } else {
          return <p className="command-error">Directory not found: {dir}</p>;
        }
      },
    },
    experience: {
      description: 'Show my work experience',
      execute: () => {
        return (
          <div className="experience-output">
            <h2 className="section-title">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <div>
                    <span className="experience-role">{exp.role}</span> at <span className="experience-company">{exp.company}</span>
                  </div>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
                <div className="experience-description">
                  {Array.isArray(exp.description) ? (
                    <ul>
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    education: {
      description: 'Show my education',
      execute: () => {
        return (
          <div className="education-output">
            <h2 className="section-title">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-degree">{edu.degree}</div>
                <div className="education-details">
                  <span className="education-institution">{edu.institution}</span> • <span className="education-year">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    skills: {
      description: 'Show my technical skills',
      execute: () => {
        return (
          <div className="skills-output">
            <h2 className="section-title">Skills</h2>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="skill-category">
                <div className="skill-category-name">{category}:</div>
                <div className="skill-list">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    projects: {
      description: 'Show my projects',
      execute: () => {
        return (
          <div className="projects-output">
            <h2 className="section-title">Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <span className="project-name">{project.name}</span>
                </div>
                <div className="project-description">
                  {Array.isArray(project.description) ? (
                    <ul>
                      {project.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{project.description}</p>
                  )}
                </div>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="skill-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    accomplishments: {
      description: 'Show my accomplishments',
      execute: () => {
        return (
          <div className="accomplishments-output">
            <h2 className="section-title">Accomplishments</h2>
            {resumeData.accomplishments.map((acc, index) => (
              <div key={index} className="accomplishment-item">
                <div className="accomplishment-title">{acc.title}</div>
                <div className="accomplishment-details">
                  <span className="accomplishment-org">{acc.organization}</span> • <span className="accomplishment-date">{acc.date}</span>
                </div>
                <div className="accomplishment-description">
                  {Array.isArray(acc.description) ? (
                    <ul>
                      {acc.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{acc.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    contact: {
      description: 'Show my contact information',
      execute: () => {
        return (
          <div className="contact-output">
            <h2 className="section-title">Contact Information</h2>
            <p><span className="command-info">Email:</span> {resumeData.contact.email}</p>
            <p><span className="command-info">Location:</span> {resumeData.contact.location}</p>
            <div className="links-output">
              <h3>Links:</h3>
              <ul>
                {resumeData.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      },
    },
    welcome: {
      description: 'Show the welcome message',
      execute: () => {
        return generateWelcomeMessage();
      },
    },
  };

  // Generate welcome message
  const generateWelcomeMessage = () => {
    return (
      <div className="welcome-message">
        <pre className="ascii-art">
          {`
  _______                     __  __ _     _               
 |__   __|                   |  \\/  (_)   | |              
    | | __ _ _ __   __ _ _   | \\  / |_ ___| |__  _ __ __ _ 
    | |/ _\` | '_ \\ / _\` | | | | |\\/| | / __| '_ \\| '__/ _\` |
    | | (_| | | | | (_| | |_| | |  | | \\__ \\ | | | | | (_| |
    |_|\\__,_|_| |_|\\__,_|\\__, |_|  |_|_|___/_| |_|_|  \\__,_|
                          __/ |                             
                         |___/                              
          `}
        </pre>
        <p>Welcome to my terminal portfolio! Type <span className="command-success">help</span> to see available commands.</p>
        <p>Current directory: <span className="command-info">~/portfolio</span></p>
      </div>
    );
  };

  // Generate autocomplete suggestions
  const generateSuggestions = (input) => {
    if (!input) {
      return [];
    }

    const availableCommands = Object.keys(commands);
    const lowerInput = input.toLowerCase();
    
    // Filter commands that start with the input
    return availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(lowerInput)
    );
  };

  // Handle command execution
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    
    if (!trimmedCmd) {
      return null;
    }

    const args = trimmedCmd.split(' ');
    const command = args[0].toLowerCase();

    if (commands[command]) {
      return commands[command].execute(args.slice(1));
    } else {
      return (
        <p className="command-error">
          Command not found: {command}. Type <span className="command-success">help</span> to see available commands.
        </p>
      );
    }
  };

  // Handle command input and autocomplete
  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const cmd = currentCommand;
      
      // Add command to history
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: executeCommand(cmd),
        },
      ]);
      
      // Clear current command and suggestions
      setCurrentCommand('');
      setCursorPosition(0);
      setSuggestions([]);
      setSelectedSuggestion(-1);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      if (suggestions.length > 0) {
        // If suggestions are available, use the selected one or the first one
        const suggestionToUse = selectedSuggestion >= 0 ? 
          suggestions[selectedSuggestion] : 
          suggestions[0];
        
        setCurrentCommand(suggestionToUse);
        setCursorPosition(suggestionToUse.length);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navigate history up
      if (history.length > 0) {
        const lastCommand = history[history.length - 1].command;
        setCurrentCommand(lastCommand);
        setCursorPosition(lastCommand.length);
        setSuggestions([]);
        setSelectedSuggestion(-1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Clear current command when down arrow is pressed
      setCurrentCommand('');
      setCursorPosition(0);
      setSuggestions([]);
      setSelectedSuggestion(-1);
    } else if (e.key === 'ArrowRight' && suggestions.length > 0) {
      e.preventDefault();
      // Navigate through suggestions
      const nextSelected = (selectedSuggestion + 1) % suggestions.length;
      setSelectedSuggestion(nextSelected);
    } else if (e.key === 'ArrowLeft' && suggestions.length > 0) {
      e.preventDefault();
      // Navigate through suggestions
      const prevSelected = selectedSuggestion <= 0 ? 
        suggestions.length - 1 : 
        selectedSuggestion - 1;
      setSelectedSuggestion(prevSelected);
    }
  };

  // Update suggestions when current command changes
  useEffect(() => {
    setSuggestions(generateSuggestions(currentCommand));
    setSelectedSuggestion(-1);
  }, [currentCommand]);

  // Handle terminal click to focus on input
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [history, currentCommand, suggestions]);

  // Show welcome message on mount
  useEffect(() => {
    if (showWelcome) {
      setHistory([
        {
          command: 'welcome',
          output: generateWelcomeMessage(),
        },
      ]);
      setShowWelcome(false);
    }

    // Focus on input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showWelcome]);

  return (
    <div className="terminal-content" ref={terminalContentRef} onClick={handleTerminalClick}>
      {/* Command history */}
      {history.map((item, index) => (
        <div key={index}>
          <TerminalLine command={item.command} />
          <TerminalOutput>{item.output}</TerminalOutput>
        </div>
      ))}

      {/* Current command input */}
      <div className="terminal-line">
        <div className="terminal-prompt">tanay@portfolio:~$</div>
        <div className="terminal-input-wrapper">
          <span className="terminal-input">{currentCommand}</span>
          <span className="terminal-cursor"></span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-hidden-input"
            value={currentCommand}
            onChange={(e) => {
              setCurrentCommand(e.target.value);
              setCursorPosition(e.target.selectionStart || 0);
            }}
            onKeyDown={handleCommand}
            autoFocus
            style={{ 
              opacity: 0, 
              position: 'absolute', 
              left: -9999,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
      
      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className={`suggestion ${index === selectedSuggestion ? 'selected' : ''}`}
            >
              {suggestion}
            </div>
          ))}
          <div className="suggestion-hint">Press Tab to autocomplete</div>
        </div>
      )}
    </div>
  );
};

export default Terminal; 