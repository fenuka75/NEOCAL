import React from 'react';

interface HeaderProps {
  view: 'directory' | 'interactions';
  setView: (view: 'directory' | 'interactions') => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView }) => {
  const linkClasses = "cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-blue-700 text-white";
  const inactiveLinkClasses = "text-blue-100 hover:bg-blue-500 hover:text-white";

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">XXX</h1>
        <nav className="flex space-x-2 md:space-x-4">
          <a
            onClick={() => setView('directory')}
            className={`${linkClasses} ${view === 'directory' ? activeLinkClasses : inactiveLinkClasses}`}
            aria-current={view === 'directory' ? 'page' : undefined}
          >
            Directorio
          </a>
          <a
            onClick={() => setView('interactions')}
            className={`${linkClasses} ${view === 'interactions' ? activeLinkClasses : inactiveLinkClasses}`}
            aria-current={view === 'interactions' ? 'page' : undefined}
          >
            Interacciones
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;