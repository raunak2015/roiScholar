import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-brand">
        <strong>RoiScholar</strong>
      </div>
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#security">Security</a>
        <a href="#help">Help Center</a>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} RoiScholar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
