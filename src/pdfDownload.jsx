// components/PdfDownloadPage.js
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import resumeData from "./resumeData.json";

function PdfDownloadPage({ onBack, theme }) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const generatePDF = () => {
      try {
        const doc = new jsPDF();
        
        // Define colors for black and white theme
        const primaryColor = 0; // Black
        const secondaryColor = 60; // Dark gray
        const lightColor = 150; // Light gray
        
        // Set font styles for header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(primaryColor);
        doc.text(resumeData.name, doc.internal.pageSize.width - 20, 20, { align: 'right' });

        // Add line under name
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, 25, doc.internal.pageSize.width - 20, 25);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(secondaryColor);
        doc.text(resumeData.title, doc.internal.pageSize.width - 20, 35, { align: 'right' });
        
        doc.setFontSize(11);
        doc.setTextColor(secondaryColor);
        
        // Contact info aligned to the right
        doc.text(resumeData.contact.email, doc.internal.pageSize.width - 20, 45, { align: 'right' });
        doc.text(resumeData.contact.phone, doc.internal.pageSize.width - 20, 50, { align: 'right' });
        doc.text(resumeData.contact.location, doc.internal.pageSize.width - 20, 55, { align: 'right' });

        // Experience section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(primaryColor);
        doc.text("EXPERIENCE", 20, 70);
        
        // Add line under section title
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.line(20, 73, 100, 73);
        
        let experienceY = 80;
        
        // Add descriptions for experience
        resumeData.experience.forEach((exp) => {
          if (exp.description) {
            // Role and company
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(primaryColor);
            doc.text(`${exp.role}`, 20, experienceY);
            
            // Duration right-aligned
            doc.setFont("helvetica", "italic");
            doc.setTextColor(secondaryColor);
            doc.text(exp.duration, doc.internal.pageSize.width - 20, experienceY, { align: 'right' });
            
            // Company
            doc.setFont("helvetica", "normal");
            doc.setTextColor(secondaryColor);
            experienceY += 6;
            doc.text(exp.company, 20, experienceY);
            experienceY += 8;
            
            // Description with bullet points
            doc.setFont("helvetica", "normal");
            doc.setTextColor(secondaryColor);
            doc.setFontSize(11);
            
            if (Array.isArray(exp.description)) {
              exp.description.forEach((item) => {
                doc.text(`• ${item}`, 25, experienceY);
                experienceY += 7;
              });
            } else {
              // Handle as regular text with word wrapping
              const textLines = doc.splitTextToSize(exp.description, 170);
              doc.text(textLines, 25, experienceY);
              experienceY += textLines.length * 7;
            }
            
            experienceY += 5; // Space between experiences
          }
        });

        // Education section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(primaryColor);
        doc.text("EDUCATION", 20, experienceY + 10);
        
        // Add line under section title
        doc.line(20, experienceY + 13, 100, experienceY + 13);
        
        autoTable(doc, {
          startY: experienceY + 20,
          headStyles: {
            fillColor: [255, 255, 255], // White background
            textColor: [0], // Black text
            fontStyle: 'bold',
            halign: 'left',
            lineWidth: 0.5,
            lineColor: [0],
          },
          head: [["Degree", "Institution", "Year"]],
          body: resumeData.education.map((edu) => [
            edu.degree,
            edu.institution,
            edu.year,
          ]),
          bodyStyles: {
            textColor: [secondaryColor],
            lineWidth: 0.1,
            lineColor: [lightColor],
          },
          theme: 'plain',
          styles: {
            cellPadding: 5,
            fontSize: 11,
          },
        });

        // Skills section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(primaryColor);
        doc.text("SKILLS", 20, doc.lastAutoTable.finalY + 20);
        
        // Add line under section title
        doc.line(20, doc.lastAutoTable.finalY + 23, 100, doc.lastAutoTable.finalY + 23);
        
        let skillsY = doc.lastAutoTable.finalY + 35;
        
        // Display skills by category
        Object.entries(resumeData.skills).forEach(([category, skills]) => {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(primaryColor);
          doc.text(category + ":", 20, skillsY);
          
          doc.setFont("helvetica", "normal");
          doc.setTextColor(secondaryColor);
          doc.text(skills.join(", "), 90, skillsY);
          
          skillsY += 10;
        });

        // Projects section
        if (resumeData.projects && resumeData.projects.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.setTextColor(primaryColor);
          doc.text("PROJECTS", 20, skillsY + 10);
          
          // Add line under section title
          doc.line(20, skillsY + 13, 100, skillsY + 13);
          
          let projectsY = skillsY + 25;
          
          // Display projects
          resumeData.projects.forEach((project) => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(primaryColor);
            doc.text(project.name, 20, projectsY);
            
            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.setTextColor(secondaryColor);
            doc.text(`Technologies: ${project.technologies.join(", ")}`, 20, projectsY + 7);
            
            projectsY += 15;
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            
            if (Array.isArray(project.description)) {
              project.description.forEach((item) => {
                doc.text(`• ${item}`, 25, projectsY);
                
                // Calculate height based on text length
                const itemLines = doc.splitTextToSize(item, 165);
                projectsY += itemLines.length * 7;
              });
            } else {
              const textLines = doc.splitTextToSize(project.description, 165);
              doc.text(textLines, 25, projectsY);
              projectsY += textLines.length * 7;
            }
            
            projectsY += 8; // Space between projects
          });
          
          // Accomplishments section
          if (resumeData.accomplishments && resumeData.accomplishments.length > 0) {
            // Check if we need to add a new page for accomplishments
            if (projectsY > doc.internal.pageSize.height - 60) {
              doc.addPage();
              projectsY = 20;
            }
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(primaryColor);
            doc.text("ACCOMPLISHMENTS", 20, projectsY + 10);
            
            // Add line under section title
            doc.line(20, projectsY + 13, 140, projectsY + 13);
            
            let accompY = projectsY + 25;
            
            // Display accomplishments
            resumeData.accomplishments.forEach((accomplishment) => {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(12);
              doc.setTextColor(primaryColor);
              doc.text(accomplishment.title, 20, accompY);
              
              // Organization and date
              doc.setFont("helvetica", "italic");
              doc.setFontSize(11);
              doc.setTextColor(secondaryColor);
              doc.text(accomplishment.organization, 20, accompY + 7);
              doc.text(accomplishment.date, doc.internal.pageSize.width - 20, accompY + 7, { align: 'right' });
              
              accompY += 15;
              
              // Description
              doc.setFont("helvetica", "normal");
              
              if (Array.isArray(accomplishment.description)) {
                accomplishment.description.forEach((item) => {
                  doc.text(`• ${item}`, 25, accompY);
                  
                  // Calculate height based on text length
                  const itemLines = doc.splitTextToSize(item, 165);
                  accompY += itemLines.length * 7;
                });
              } else {
                const textLines = doc.splitTextToSize(accomplishment.description, 165);
                doc.text(textLines, 25, accompY);
                accompY += textLines.length * 7;
              }
              
              accompY += 8; // Space between accomplishments
            });
          }
        }

        // Add links section
        if (resumeData.links && resumeData.links.length > 0) {
          // Add footer with links
          const linkY = doc.internal.pageSize.height - 25;
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(primaryColor);
          doc.text("Links:", 20, linkY);
          
          let linkX = 50;
          resumeData.links.forEach((link) => {
            doc.setFont("helvetica", "normal");
            doc.text(`${link.name}: ${link.url}`, linkX, linkY);
            linkX += 80; // Space between links
          });
        }

        // Add page border
        doc.setDrawColor(lightColor);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

        // Footer with date
        const date = new Date().toLocaleDateString();
        doc.setFontSize(9);
        doc.setTextColor(lightColor);
        doc.text(`Generated on: ${date}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10, { align: 'right' });

        // Save the PDF
        doc.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
        setDownloadComplete(true);
        setIsGenerating(false);
      } catch (error) {
        console.error("Error generating PDF:", error);
        setIsGenerating(false);
      }
    };

    // Delay PDF generation for a better user experience
    const timer = setTimeout(() => {
      generatePDF();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pdf-page">
      {isGenerating ? (
        <>
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
          </div>
          <p>Generating your resume PDF...</p>
        </>
      ) : (
        <>
          <div className="success-icon">✓</div>
          <h2>PDF Downloaded Successfully!</h2>
          <p>Your resume has been generated and downloaded.</p>
        </>
      )}
      <button onClick={onBack} className="back-btn">
        Return to Resume
      </button>
    </div>
  );
}

export default PdfDownloadPage;
