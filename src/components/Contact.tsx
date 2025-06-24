'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    });

    try {
      // EmailJS configuration - you'll need to set these up
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "OnWT0IXouvLV_qiQ4";
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_l1ktpna";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_9sc8d2j";

      // Initialize EmailJS
      emailjs.init(publicKey);
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Portfolio Contact Form',
        message: formData.message,
        to_name: 'Abdul Wahab',
        to_email: 'abdulwahabawan82@gmail.com',
        reply_to: formData.email
      };

      const response = await emailjs.send(serviceId, templateId, templateParams);
      
      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I&apos;ll get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly at abdulwahabawan82@gmail.com'
      });
    }
  };

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abdul-wahab-7bb7b490/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: '#0077B5'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/abdulwab',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: '#333'
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/923219424726',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: '#25D366'
    },
    {
      label: 'Email',
      href: 'mailto:abdulwahabawan82@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: '#EA4335'
    }
  ];

  return (
    <section id="contact" className="section-spacing bg-[var(--background-secondary)]">
      <div className="container-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            Get in Touch
          </h2>
          <p className="text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into intelligent AI solutions? 
            Let&apos;s discuss your next project and bring innovation to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-theme-card rounded-2xl border border-[var(--card-border)] p-8 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-theme-primary mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-theme-secondary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-primary)]
                             text-theme-primary placeholder-theme-secondary focus:border-[var(--accent-ai)]
                             focus:outline-none transition-colors duration-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-theme-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-primary)]
                             text-theme-primary placeholder-theme-secondary focus:border-[var(--accent-ai)]
                             focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-theme-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-primary)]
                           text-theme-primary placeholder-theme-secondary focus:border-[var(--accent-ai)]
                           focus:outline-none transition-colors duration-300"
                  placeholder="Project discussion, collaboration, etc."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-theme-secondary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border-primary)]
                           text-theme-primary placeholder-theme-secondary focus:border-[var(--accent-ai)]
                           focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project, requirements, or any questions you have..."
                />
              </div>
              
              {/* Status Message */}
              {status.type !== 'idle' && (
                <motion.div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    status.type === 'success'
                      ? 'bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30'
                      : status.type === 'error'
                      ? 'bg-[var(--error)]/20 text-[var(--error)] border border-[var(--error)]/30'
                      : 'bg-[var(--warning)]/20 text-[var(--warning)] border border-[var(--warning)]/30'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status.message}
                </motion.div>
              )}
              
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full px-6 py-4 bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)]
                         text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--accent-ai)]/30
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3"
                whileHover={{ scale: status.type === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status.type === 'loading' ? 1 : 0.98 }}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-theme-card rounded-2xl border border-[var(--card-border)] p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-theme-primary mb-6">Let&apos;s Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--accent-ai)] to-[var(--accent-iot)]
                                flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-theme-primary">Email</h4>
                    <p className="text-theme-secondary">abdulwahabawan82@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--accent-iot)] to-[var(--accent-web)]
                                flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-theme-primary">WhatsApp</h4>
                    <p className="text-theme-secondary">+92 321 942 4726</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--accent-iot)] to-[var(--accent-web)]
                                flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-theme-primary">Response Time</h4>
                    <p className="text-theme-secondary">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-theme-card rounded-2xl border border-[var(--card-border)] p-8 shadow-xl">
              <h3 className="text-xl font-bold text-theme-primary mb-6">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[var(--background)] border border-[var(--border-primary)]
                             flex items-center justify-center text-theme-secondary hover:text-white
                             hover:bg-gradient-to-r hover:from-[var(--accent-ai)] hover:to-[var(--accent-iot)]
                             hover:border-transparent transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-16 pt-8 border-t border-[var(--border-primary)] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-theme-secondary">
            Built with ❤️ using{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" 
               className="text-[var(--accent-ai)] hover:underline">
              Next.js
            </a>
            {' & '}
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer"
               className="text-[var(--accent-iot)] hover:underline">
              Tailwind CSS
            </a>
          </p>
        </motion.footer>
      </div>
    </section>
  );
} 