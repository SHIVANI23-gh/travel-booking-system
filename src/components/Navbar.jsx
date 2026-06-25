import React from 'react';
import { Compass, Briefcase, Heart, User } from 'lucide-react';

export default function Navbar({ currentView, setView, bookingsCount, favoritesCount = 0 }) {
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
              className={`nav-link ${currentView === 'wishlist' ? 'active' : ''}`}
              onClick={() => setView('wishlist')}
            >
              <Heart size={18} />
              <span>Wishlist</span>
              {favoritesCount > 0 && (
                <span className="badge" style={{ backgroundColor: 'var(--primary)' }}>{favoritesCount}</span>
              )}
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
          <li>
            <button 
              className={`nav-link ${currentView === 'profile' ? 'active' : ''}`}
              onClick={() => setView('profile')}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
