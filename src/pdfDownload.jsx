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
        
        // Set font styles
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(74, 123, 255);
        doc.text(resumeData.name, 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 50);
        doc.text(resumeData.title, 20, 30);
        
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(resumeData.contact.email, 20, 40);
        doc.text(resumeData.contact.phone, 20, 45);
        doc.text(resumeData.contact.location, 20, 50);

        // Experience section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(74, 123, 255);
        doc.text("Experience", 20, 65);
        
        autoTable(doc, {
          startY: 70,
          headStyles: {
            fillColor: [74, 123, 255],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
          },
          head: [["Role", "Company", "Duration"]],
          body: resumeData.experience.map((exp) => [
            exp.role,
            exp.company,
            exp.duration,
          ]),
          bodyStyles: {
            textColor: [50, 50, 50],
          },
          didDrawPage: (data) => {
            doc.setDrawColor(74, 123, 255);
            doc.setLineWidth(0.5);
            doc.line(20, data.cursor.y + 5, 190, data.cursor.y + 5);
          },
        });

        // Education section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(74, 123, 255);
        doc.text("Education", 20, doc.lastAutoTable.finalY + 20);
        
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 25,
          headStyles: {
            fillColor: [74, 123, 255],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
          },
          head: [["Degree", "Institution", "Year"]],
          body: resumeData.education.map((edu) => [
            edu.degree,
            edu.institution,
            edu.year,
          ]),
          bodyStyles: {
            textColor: [50, 50, 50],
          },
        });

        // Skills section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(74, 123, 255);
        doc.text("Skills", 20, doc.lastAutoTable.finalY + 20);
        
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 25,
          headStyles: {
            fillColor: [74, 123, 255],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
          },
          head: [["Skills"]],
          body: [resumeData.skills.join(", ")],
          bodyStyles: {
            textColor: [50, 50, 50],
          },
        });

        // Projects section
        if (resumeData.projects && resumeData.projects.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.setTextColor(74, 123, 255);
          doc.text("Projects", 20, doc.lastAutoTable.finalY + 20);
          
          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 25,
            headStyles: {
              fillColor: [74, 123, 255],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
            },
            head: [["Name", "Description"]],
            body: resumeData.projects.map((project) => [
              project.name,
              project.description,
            ]),
            bodyStyles: {
              textColor: [50, 50, 50],
            },
          });
        }

        // Add links section
        if (resumeData.links && resumeData.links.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.setTextColor(74, 123, 255);
          doc.text("Links", 20, doc.lastAutoTable.finalY + 20);
          
          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 25,
            headStyles: {
              fillColor: [74, 123, 255],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
            },
            head: [["Name", "URL"]],
            body: resumeData.links.map((link) => [
              link.name,
              link.url,
            ]),
            bodyStyles: {
              textColor: [50, 50, 50],
            },
          });
        }

        // Footer with date
        const date = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${date}`, 20, doc.internal.pageSize.height - 10);

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
