import React from 'react';

const Footer = () => {
  return (
    <footer className="hidden md:flex w-full flex-col md:flex-row justify-between items-center py-8 px-6 lg:px-16 border-t border-outline-variant/10 bg-surface/50 backdrop-blur-sm relative z-10">
      <div className="mb-4 md:mb-0">
        <strong className="text-primary text-lg">RoiScholar</strong>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
        <a href="#privacy" className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#terms" className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">Terms of Service</a>
        <a href="#security" className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">Security</a>
        <a href="#help" className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors">Help Center</a>
      </div>
      <div className="text-on-surface-variant text-sm">
        &copy; {new Date().getFullYear()} RoiScholar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
