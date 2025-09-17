
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-700 text-white mt-12">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} XXXXXX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
