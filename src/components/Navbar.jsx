import React from 'react';
import { Compass, Briefcase, User, Moon, Sun } from 'lucide-react';

export default function Navbar({ currentView, setView, bookingsCount }) {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="logo" onClick={() => setView('search')}>
          <Compass size={28} />
          <span>Sanchari Travels</span>
        </div>

        <ul className="nav-links">
          <li>
            <button 
              className={`nav-link ${currentView === 'search' || currentView === 'results' || currentView === 'customize' || currentView === 'checkout' || currentView === 'confirmation' ? 'active' : ''}`}
              onClick={() => setView('search')}
            >
              <Compass size={18} />
              <span>Explore</span>
            </button>
          </li>
          <li>
            <button 
              className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setView('dashboard')}
            >
              <Briefcase size={18} />
              <span>My Bookings</span>
              {bookingsCount > 0 && (
                <span className="badge">{bookingsCount}</span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
