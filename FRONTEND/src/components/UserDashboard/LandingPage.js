

import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Landing.css';
import img from './fitzhore.png';
import img4 from './img4.webp';
import img1 from './img1.webp';
import img2 from './img2.webp';
import img3 from './img3.webp';
import img5 from './img6.jpg';

// Navigation Component
const Navigation = ({ scrollToContact }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-contain ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={img} alt="Yogastic" />
        {/* <span className="logo-text">FIT AYBL</span> */}
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#pages">Pages</a>
        <a href="#team">Team</a>
        <a href="#blog">Blog</a>
      </div>
      <button className="contact-button" onClick={scrollToContact}>Contact Us</button>
    </nav>
  );
};

// SocialLinks Component
const SocialLinks = () => {
  const socialAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 1000,
  });

  return (
    <animated.div style={socialAnimation} className="social-links">
      <a href="#facebook" aria-label="Facebook"><Facebook size={24} /></a>
      <a href="#twitter" aria-label="Twitter"><Twitter size={24} /></a>
      <a href="#linkedin" aria-label="LinkedIn"><Linkedin size={24} /></a>
    </animated.div>
  );
};

// HeroContent Component
const HeroContent = () => {
  const navigate = useNavigate();

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle,
  });

  const descriptionAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
    config: config.gentle,
  });

  const handleGetStartedClick = () => {
    navigate('/register-select');
  };

  return (
    <div className="hero-content">
      <animated.span style={titleAnimation} className="hero-subtitle">
        FIND YOUR FITNESS JOURNEY
      </animated.span>
      <animated.h1 style={titleAnimation} className="hero-title">
        Reclaim Your Mind, Body & Strength
      </animated.h1>
      <animated.p style={descriptionAnimation} className="hero-description">
        Discover the balance between strength and wellness. Empower yourself with personalized coaching, real-time progress tracking, and a community built to support your goals.
      </animated.p>
      <animated.div style={descriptionAnimation}>
        <button className="get-started-button" onClick={handleGetStartedClick}>
          Start Your Journey
        </button>
      </animated.div>
    </div>
  );
};

// HeroImage Component
const HeroImage = () => {
  const imageAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 800,
    config: config.gentle,
  });

  return (
    <animated.div style={imageAnimation} className="hero-image-container">
      <img src={img5} alt="Woman practicing yoga" className="hero-image" />
    </animated.div>
  );
};


// ScrollIndicator Component
const ScrollIndicator = () => {
  const bounceAnimation = useSpring({
    from: { transform: 'translateY(0)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(10px)' });
        await next({ transform: 'translateY(0)' });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={bounceAnimation} className="scroll-indicator">
      <ChevronDown size={32} color="white" />
    </animated.div>
  );
};

// DecorativeElements Component
const DecorativeElements = () => (
  <>
    <img src="/path-to-your-leaf.svg" alt="" className="decorative-leaf leaf-top-left" />
    <img src="/path-to-your-leaf.svg" alt="" className="decorative-leaf leaf-bottom-right" />
  </>
);

// Define the YogaComponent for the About Us section
const YogaComponent = () => {
  return (
    <div className="yoga-container" id="about">
      <div className="yoga-content">
        <div className="yoga-image">
          <img
            src={img4}
            alt="Yoga Pose"
            className="image"
          />
        </div>
        <div className="yoga-text">
    <h2 className="head">Elevate Your Wellness Journey</h2>
    <p className="sub">
        At Fitaybl, we’re dedicated to helping you reach new heights in your fitness and well-being. Our mission is to bring you a personalized experience that supports both your body and mind.
    </p>
    <p className="highlit">
        Connect with expert coaches, set achievable goals, and transform your health journey with a community built for growth and inspiration.
    </p>
    <button className="ct-button">Get Started</button>
</div>

      </div>
    </div>
  );
};


// Define the Services section here
const Services = () => {
  return (
    <div className="services-section" id="services">
    <h2>Our Services</h2>
    <p>Practice Wherever You Want, Whenever You Need</p>
    <div className="services-container">
        <div className="service-item">
            <img src={img1} alt="Prenatal Yoga" />
            <h3>Prenatal Yoga</h3>
            <p>Gentle guidance tailored for moms-to-be, enhancing strength, relaxation, and connection.</p>
        </div>
        <div className="service-item">
            <img src={img2} alt="Personal Coaching" />
            <h3>Personal Coaching</h3>
            <p>1-on-1 sessions with expert coaches offering personalized plans and continuous support.</p>
        </div>
        <div className="service-item">
            <img src={img3} alt="Wellness Workshops" />
            <h3>Wellness Workshops</h3>
            <p>Exclusive access to workshops on mental wellness, fitness techniques, and balanced lifestyles.</p>
        </div>
    </div>
</div>

  );
};
// ContactForm Component
const ContactForm = () => (
  <div className="contact-container">
    <div className="contact-form">
    <h4>Get in Touch.</h4>
<h2>Send Us a Message</h2>
<p>Have a question or need support on your wellness journey? Our team is here to help, guide, and inspire you every step of the way.</p>

      <form>
        <div className="form-group">
          <input type="text" placeholder="Full Name" required />
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Phone" required />
          <input type="email" placeholder="Email" required />
        </div>
        <textarea placeholder="Message" required></textarea>
        <button type="submit" className="submit-button">Get Started</button>
      </form>
    </div>
    <div className="contact-info">
      <div className="info-item">
        <i className="icon location-icon"></i>
        <div><h4>Location</h4><p>Mariddy Lane, Uduvil, Jaffna, Northen Province, Srilanka</p></div>
      </div>
      <div className="info-item">
        <i className="icon phone-icon"></i>
        <div><h4>Phone</h4><p>(+94 76 078 3412)<br /> (021 225 0161)</p></div>
      </div>
      <div className="info-item">
        <i className="icon email-icon"></i>
        <div><h4>Email</h4><p>info@fitaybl.com<br /> fitaybl@gmail.com</p></div>
      </div>
    </div>
  </div>
);

// Newsletter Component
const Newsletter = () => (
  <div className="newsletter-container">
    <motion.div
      className="newsletter-content"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h4>Stay informed about new features, expert tips, and wellness insights directly in your inbox. Join our community and be the first to know about exclusive offers and events!</h4>
      <p>Subscribe Now</p>
      <input type="email" placeholder="Enter Your Email" />
      <button className="subscribe-button">Subscribe</button>
    </motion.div>
  </div>
);
// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-section footer-about">
      <h3>FitAybl</h3>
      <p>Your go-to app for holistic wellness and fitness. We empower you to achieve your health goals with personalized guidance and community support.</p>
      <div className="social-icons">
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>
    <div className="footer-section footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
    <div className="footer-section footer-contact">
      <h4>Contact Info</h4>
      <p><i className="fas fa-phone"></i> +94 76 078 3412</p>
      <p><i className="fas fa-envelope"></i> fitaybl@gmail.com</p>
      <p><i className="fas fa-map-marker-alt"></i> Mariddy Lane, Uduvil, Jaffna, Northern Province, Sri Lanka</p>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 FitAybl. All rights reserved.</p>
    </div>
  </footer>
);


const LandingPage = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-container">
      <div className="hero-background" />
      <Navigation scrollToContact={scrollToContact} />
      <SocialLinks />
      <div className="hero-content-wrapper">
        <HeroContent />
        <HeroImage />
      </div>
      <ScrollIndicator />
      <DecorativeElements />
      
      {/* About Us Section */}
      <YogaComponent />

      {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <div ref={contactRef}>
        <ContactForm />
      </div>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
