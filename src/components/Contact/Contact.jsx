import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Contact.module.css';
import { personal } from '../../data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [responseMsg, setResponseMsg] = useState('');

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are an AI assistant representing Raj Kumar Mishra. 
        A user just submitted a contact form on his portfolio.
        User Name: ${formData.name}
        User Email: ${formData.email}
        Message: ${formData.message}
        
        Write a short, professional, and friendly acknowledgment message (2-3 sentences) thanking them for reaching out to Raj. Mention that Raj will get back to them soon.
      `;
      
      const result = await model.generateContent(prompt);
      setResponseMsg(result.response.text());
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
      setResponseMsg('Thank you for your message! (Note: AI acknowledgment failed, but your message intent is appreciated).');
    }
  };

  return (
    <section ref={sectionRef} className="section" id="contact">
      <div className={`${styles.container} container`}>
        <h2 className={styles.heading}>
          <span className={styles.italic}>Let's Build</span><br />
          Something <br />
          <span className={styles.accentText}>Real.</span>
        </h2>
        
        <div className={styles.contentRow}>
          <div className={styles.terminalCard}>
            <div className={styles.terminalHeader}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.terminalBody}>
              <p>&gt; {personal.email}</p>
              <p>&gt; {personal.location}</p>
              <p>&gt; {personal.github.replace('https://', '')}</p>
              <p className={styles.terminalHighlight}>&gt; Currently open to: Internships & Full-time</p>
              <p className={styles.cursor}>_</p>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            {status === 'success' || status === 'error' ? (
              <div className={styles.successMessage}>
                <h4>Message Sent</h4>
                <p>{responseMsg}</p>
                <button onClick={() => setStatus('idle')} className={styles.resetBtn}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <textarea 
                    placeholder="Message" 
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className={styles.ctaRow}>
                  <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Email Raj \u2192'}
                  </button>
                  <a href={personal.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                    GitHub Profile <ArrowUpRight size={16} />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
