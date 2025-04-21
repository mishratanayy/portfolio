// components/Resume.js
import React, { useState, useEffect, useRef } from "react";
import resumeData from "./resumeData.json";
import { 
  Code, 
  Database, 
  Browsers, 
  Cloud, 
  Wrench,
  Trophy,
  ArrowLeft,
  ArrowsClockwise
} from "phosphor-react";

function Resume({ theme }) {
  const [flippedExperience, setFlippedExperience] = useState(null);
  const [flippedProject, setFlippedProject] = useState(null);
  const [flippedAccomplishment, setFlippedAccomplishment] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [displayedBio, setDisplayedBio] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    // Nothing needed here since we're setting isVisible to true by default
    // Or you could add a small delay if you want
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!resumeData.bio) return;
    
    let i = 0;
    const typingSpeed = 30; // Adjust for faster/slower typing
    
    const typingInterval = setInterval(() => {
      if (i < resumeData.bio.length) {
        setDisplayedBio(prev => prev + resumeData.bio.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);

  const toggleExperienceFlip = (idx) => {
    setFlippedExperience(flippedExperience === idx ? null : idx);
  };

  const toggleProjectFlip = (idx) => {
    setFlippedProject(flippedProject === idx ? null : idx);
  };

  const toggleAccomplishmentFlip = (idx) => {
    setFlippedAccomplishment(flippedAccomplishment === idx ? null : idx);
  };

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  // Map category names to their icons
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Frontend':
        return <Browsers weight="duotone" />;
      case 'Backend':
        return <Code weight="duotone" />;
      case 'Database':
        return <Database weight="duotone" />;
      case 'DevOps':
        return <Cloud weight="duotone" />;
      case 'Tools':
        return <Wrench weight="duotone" />;
      default:
        return <Code weight="duotone" />;
    }
  };

  // Render description as text or list based on type
  const renderDescription = (description) => {
    if (Array.isArray(description)) {
      return (
        <ul className="description-list">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p>{description}</p>;
  };

  return (
    <div className={`resume-layout ${isVisible ? 'fade-in-animation' : ''}`}>
      <div className="resume-header">
        <h1 className="animated-name">{resumeData.name}</h1>
        <div className="title-container">
          <p className="title">{resumeData.title}</p>
        </div>
        <p className="contact">
          {resumeData.contact.email} | {resumeData.contact.phone} | {resumeData.contact.location}
        </p>
      </div>

      {/* Bio section with typing animation */}
      <div className="bio-container">
        <p className="bio-text">
          {displayedBio}
          <span className={`cursor ${isTypingComplete ? 'blink' : ''}`}></span>
        </p>
      </div>

      <div className="resume-columns">
        <div className="left-pane">
          <section 
            className={`section-card ${activeSection === 'education' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('education')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Education</h2>
            <div className="education-cards">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="card education-card">
                  <div className="card-header">
                    <h3>{edu.degree}</h3>
                    <span className="education-year">{edu.year}</span>
                  </div>
                  <p className="institution">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>

          <section 
            className={`section-card ${activeSection === 'skills' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('skills')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Skills</h2>
            <div className="skills-categories">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <div key={category} className="skill-category">
                  <div className="category-header">
                    <div className="category-icon">
                      {getCategoryIcon(category)}
                    </div>
                    <h3>{category}</h3>
                  </div>
                  <div className="skills-grid">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section 
            className={`section-card ${activeSection === 'links' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('links')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Links</h2>
            <ul className="links-list">
              {resumeData.links.map((link, idx) => (
                <li key={idx}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a></li>
              ))}
            </ul>
          </section>
        </div>

        <div className="right-pane">
          <section 
            className={`section-card experience-section ${activeSection === 'experience' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('experience')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Experience</h2>
            {resumeData.experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`flip-card ${flippedExperience === idx ? 'flipped' : ''}`} 
                onClick={() => toggleExperienceFlip(idx)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front experience-card-front">
                    <div className="card-indicator">Experience</div>
                    <h3>{exp.role}</h3>
                    <div className="subtitle">
                      <span>{exp.company}</span>
                      <span>{exp.duration}</span>
                    </div>
                    {Array.isArray(exp.description) && exp.description.length > 0 ? (
                      <div className="card-preview">{exp.description[0]}</div>
                    ) : (
                      <div className="card-preview">{exp.description}</div>
                    )}
                    <div className="flip-indicator">
                      <ArrowsClockwise weight="duotone" />
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="content">
                      {renderDescription(exp.description)}
                    </div>
                    <button className="flip-back-btn" onClick={(e) => {
                      e.stopPropagation();
                      toggleExperienceFlip(idx);
                    }}>
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section 
            className={`section-card accomplishments-section ${activeSection === 'accomplishments' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('accomplishments')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>
              <Trophy weight="duotone" className="section-icon" />
              Accomplishments
            </h2>
            
            <div className="accomplishments-grid">
              {resumeData.accomplishments && resumeData.accomplishments.map((accomplishment, idx) => (
                <div 
                  key={idx} 
                  className={`flip-card ${flippedAccomplishment === idx ? 'flipped' : ''}`} 
                  onClick={() => toggleAccomplishmentFlip(idx)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front accomplishment-card-front">
                      <div className="card-indicator">Achievement</div>
                      <h3>{accomplishment.title}</h3>
                      <div className="subtitle">
                        <span>{accomplishment.organization}</span>
                        <span>{accomplishment.date}</span>
                      </div>
                      {Array.isArray(accomplishment.description) && accomplishment.description.length > 0 ? (
                        <div className="card-preview">{accomplishment.description[0]}</div>
                      ) : (
                        <div className="card-preview">{accomplishment.description}</div>
                      )}
                      <div className="flip-indicator">
                        <ArrowsClockwise weight="duotone" />
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div className="content">
                        {renderDescription(accomplishment.description)}
                      </div>
                      <button className="flip-back-btn" onClick={(e) => {
                        e.stopPropagation();
                        toggleAccomplishmentFlip(idx);
                      }}>
                        <ArrowLeft size={16} />
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section 
            className={`section-card projects-section ${activeSection === 'projects' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('projects')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Projects</h2>
            {resumeData.projects.map((project, idx) => (
              <div 
                key={idx} 
                className={`flip-card ${flippedProject === idx ? 'flipped' : ''}`} 
                onClick={() => toggleProjectFlip(idx)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front project-card-front">
                    <div className="card-indicator">Project</div>
                    <h3>{project.name}</h3>
                    {Array.isArray(project.description) && project.description.length > 0 ? (
                      <div className="card-preview">{project.description[0]}</div>
                    ) : (
                      <div className="card-preview">{project.description}</div>
                    )}
                    <div className="tech-preview">
                      {project.technologies && project.technologies.slice(0, 3).map((tech, techIdx) => (
                        <span key={techIdx} className="tech-badge">{tech}</span>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
                        <span className="tech-badge">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <div className="flip-indicator">
                      <ArrowsClockwise weight="duotone" />
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="content">
                      {renderDescription(project.description)}
                      <div className="technologies">
                        {project.technologies && project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <button className="flip-back-btn" onClick={(e) => {
                      e.stopPropagation();
                      toggleProjectFlip(idx);
                    }}>
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Resume;
