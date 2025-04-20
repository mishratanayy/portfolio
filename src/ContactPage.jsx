import React, { useState } from "react";
import { 
  ArrowLeft, 
  PaperPlaneTilt, 
  User, 
  ChatText, 
  Envelope, 
  CheckCircle 
} from "phosphor-react";
import resumeData from "./resumeData.json";

function ContactPage({ onBack, theme }) {
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      const mailtoLink = `mailto:${resumeData.contact.email}?subject=Contact from Portfolio&body=${encodeURIComponent(contactMessage)}`;
      window.open(mailtoLink);
      setSending(false);
      setSent(true);
      
      // Reset form after successful send
      setTimeout(() => {
        setContactEmail("");
        setContactMessage("");
      }, 500);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="back-button" onClick={onBack}>
        <ArrowLeft weight="bold" />
        <span>Back to Resume</span>
      </div>

      <div className="contact-card">
        <div className="contact-header">
          <div className="contact-icon">
            <Envelope weight="duotone" />
          </div>
          <h2>Get In Touch</h2>
          <p>Send me a message and I'll get back to you soon</p>
        </div>

        {sent ? (
          <div className="success-message">
            <div className="success-icon">
              <CheckCircle weight="fill" />
            </div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll respond as soon as possible.</p>
            <button onClick={() => setSent(false)} className="new-message-btn">
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="contact-form">
            <div className="form-group">
              <label>
                <User weight="duotone" className="input-icon" />
                <span>Your Email</span>
              </label>
              <input 
                type="email" 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                required 
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label>
                <ChatText weight="duotone" className="input-icon" />
                <span>Message</span>
              </label>
              <textarea 
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)} 
                required 
                rows="5"
                placeholder="Write your message here..."
              />
            </div>
            
            <button 
              type="submit" 
              className={`send-button ${sending ? 'sending' : ''}`}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Message'}
              <PaperPlaneTilt weight="bold" className="send-icon" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage; 