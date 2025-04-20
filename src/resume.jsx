// components/Resume.js
import React, { useState, useEffect } from "react";
import resumeData from "./resumeData.json";

function Resume({ onDownloadClick, theme }) {
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleExperience = (idx) => {
    setExpandedExperience(expandedExperience === idx ? null : idx);
  };

  const toggleProject = (idx) => {
    setExpandedProject(expandedProject === idx ? null : idx);
  };

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  return (
    <div className={`resume-layout ${isVisible ? 'fade-in' : ''}`}>
      <div className="resume-header">
        <h1 className="animated-name">{resumeData.name}</h1>
        <div className="title-container">
          <p className="title">{resumeData.title}</p>
        </div>
        <p className="contact">
          {resumeData.contact.email} | {resumeData.contact.phone} | {resumeData.contact.location}
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
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="card education-card">
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </section>

          <section 
            className={`section-card ${activeSection === 'skills' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('skills')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Skills</h2>
            <div className="skills">
              {resumeData.skills.map((skill, idx) => (
                <span key={idx} className="skill-pill">{skill}</span>
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
            className={`section-card ${activeSection === 'experience' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('experience')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Experience</h2>
            {resumeData.experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`card experience-card ${expandedExperience === idx ? 'expanded' : ''}`} 
                onClick={() => toggleExperience(idx)}
              >
                <div className="card-header">
                  <h3>{exp.role}</h3>
                  <span className="expand-icon">{expandedExperience === idx ? '−' : '+'}</span>
                </div>
                <p className="subtitle">{exp.company} • {exp.duration}</p>
                <div className={`description ${expandedExperience === idx ? 'show' : ''}`}>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </section>

          <section 
            className={`section-card ${activeSection === 'projects' ? 'active-section' : ''}`}
            onMouseEnter={() => handleSectionHover('projects')}
            onMouseLeave={() => handleSectionHover(null)}
          >
            <h2>Projects</h2>
            {resumeData.projects.map((project, idx) => (
              <div 
                key={idx} 
                className={`card project-card ${expandedProject === idx ? 'expanded' : ''}`} 
                onClick={() => toggleProject(idx)}
              >
                <div className="card-header">
                  <h3>{project.name}</h3>
                  <span className="expand-icon">{expandedProject === idx ? '−' : '+'}</span>
                </div>
                <div className={`description ${expandedProject === idx ? 'show' : ''}`}>
                  <p>{project.description}</p>
                  <div className="technologies">
                    {project.technologies && project.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="download-btn-container">
            <button onClick={onDownloadClick} className="download-btn">
              <span className="btn-text">Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
