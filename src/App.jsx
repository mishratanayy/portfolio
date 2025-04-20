// App.js
import React, { useState, useEffect } from "react";
import Resume from "./resume";
import PdfDownloadPage from "./pdfDownload";
import ContactPage from "./ContactPage";
import { 
  RocketLaunch, 
  PaperPlaneTilt, 
  FileArrowDown, 
  Moon, 
  Sun, 
  Envelope
} from "phosphor-react";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState("resume"); // resume, pdf, contact
  const [isVisible, setIsVisible] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderPage = () => {
    switch(currentPage) {
      case "pdf":
        return (
          <PdfDownloadPage 
            onBack={() => setCurrentPage("resume")} 
            theme={theme} 
          />
        );
      case "contact":
        return (
          <ContactPage
            onBack={() => setCurrentPage("resume")}
            theme={theme}
          />
        );
      case "resume":
      default:
        return <Resume theme={theme} />;
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className={theme === "light" ? "theme-light" : "theme-dark"}>
      <div className="action-sidebar">
        <div className="action-button theme-button" onClick={toggleTheme}> 
          {theme === "light" 
            ? <Moon weight="duotone" className="action-icon" /> 
            : <Sun weight="duotone" className="action-icon" />
          }
          <span className="button-tooltip">Toggle Theme</span>
        </div>
        
        <div 
          className={`action-button download-button ${currentPage === "pdf" ? "active" : ""}`}
          onClick={() => setCurrentPage("pdf")}
        >
          <FileArrowDown weight="duotone" className="action-icon" />
          <span className="button-tooltip">Download Resume</span>
        </div>
        
        <div 
          className={`action-button contact-button ${currentPage === "contact" ? "active" : ""}`}
          onClick={() => setCurrentPage("contact")}
        >
          <Envelope weight="duotone" className="action-icon" />
          <span className="button-tooltip">Contact Me</span>
        </div>
      </div>
      
      {renderPage()}
    </main>
  );
}
