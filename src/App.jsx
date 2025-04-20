// App.js
import React, { useState } from "react";
import Resume from "./resume";
import PdfDownloadPage from "./pdfDownload";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [showPdfPage, setShowPdfPage] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className={theme === "light" ? "theme-light" : "theme-dark"}>
      <div className="theme-toggle" onClick={toggleTheme}> 
        <div className="theme-toggle-circle"></div>
      </div>
      {showPdfPage ? (
        <PdfDownloadPage 
          onBack={() => setShowPdfPage(false)} 
          theme={theme} 
        />
      ) : (
        <Resume 
          onDownloadClick={() => setShowPdfPage(true)} 
          theme={theme} 
        />
      )}
    </main>
  );
}
