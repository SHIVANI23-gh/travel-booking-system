import React, { useState } from 'react';
import { Plane, Hotel, Gift, MapPin, Calendar, Users, Award, Search, Train, Bus } from 'lucide-react';

export default function HeroSection({ onSearch }) {
  const [activeTab, setActiveTab] = useState('flights'); // flights, hotels, packages, trains, buses
  const [activeDropdown, setActiveDropdown] = useState(null); // null, 'flights', 'hotels', 'packages', 'trains', 'buses'

  // Search Fields state
  const [flightFrom, setFlightFrom] = useState('DEL (New Delhi)');
  const [flightTo, setFlightTo] = useState('GOI (Goa)');
  const [flightDate, setFlightDate] = useState('2026-07-15');
  const [flightTravelers, setFlightTravelers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');

  const [hotelDest, setHotelDest] = useState('Goa');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-07-15');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-07-22');
  const [hotelGuests, setHotelGuests] = useState(2);

  const [pkgDest, setPkgDest] = useState('Kashmir');
  const [pkgDate, setPkgDate] = useState('2026-08-10');
  const [pkgTravelers, setPkgTravelers] = useState(2);

  // Train state
  const [trainFrom, setTrainFrom] = useState('DEL (New Delhi RS)');
  const [trainTo, setTrainTo] = useState('BOM (Mumbai Central)');
  const [trainDate, setTrainDate] = useState('2026-07-15');
  const [trainTravelers, setTrainTravelers] = useState(1);
  const [trainClass, setTrainClass] = useState('economy'); // economy: 3A, business: 2A, first: 1A

  // Bus state
  const [busFrom, setBusFrom] = useState('BLR (Majestic, Bengaluru)');
  const [busTo, setBusTo] = useState('COK (Kochi Bus Stand)');
  const [busDate, setBusDate] = useState('2026-07-15');
  const [busTravelers, setBusTravelers] = useState(1);
  const [busClass, setBusClass] = useState('economy'); // economy: Seater, business: Sleeper

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'flights') {
      onSearch({
        type: 'flights',
        from: flightFrom,
        to: flightTo,
        date: flightDate,
        travelers: parseInt(flightTravelers),
        cabinClass: flightClass
      });
    } else if (activeTab === 'hotels') {
      onSearch({
        type: 'hotels',
        destination: hotelDest,
        checkIn: hotelCheckIn,
        checkOut: hotelCheckOut,
        guests: parseInt(hotelGuests)
      });
    } else if (activeTab === 'packages') {
      onSearch({
        type: 'packages',
        destination: pkgDest,
        date: pkgDate,
        travelers: parseInt(pkgTravelers)
      });
    } else if (activeTab === 'trains') {
      onSearch({
        type: 'trains',
        from: trainFrom,
        to: trainTo,
        date: trainDate,
        travelers: parseInt(trainTravelers),
        cabinClass: trainClass
      });
    } else if (activeTab === 'buses') {
      onSearch({
        type: 'buses',
        from: busFrom,
        to: busTo,
        date: busDate,
        travelers: parseInt(busTravelers),
        cabinClass: busClass
      });
    }
  };

  return (
    <header className="hero">
      <div className="container">
        <h1 className="hero-title">
          Explore the World, <span>Your Way</span>
        </h1>
        <p className="hero-subtitle">
          Book flight tickets, premium resorts, and curated tour packages instantly with exclusive member rates.
        </p>

        <div className="search-widget">
          <div className="search-tabs">
            <button 
              className={`search-tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              <Plane size={18} />
              Flights
            </button>
            <button 
              className={`search-tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
              type="button"
            >
              <Hotel size={18} />
              Hotels
            </button>
            <button 
              className={`search-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
              onClick={() => setActiveTab('packages')}
              type="button"
            >
              <Gift size={18} />
              Packages
            </button>
            <button 
              className={`search-tab-btn ${activeTab === 'trains' ? 'active' : ''}`}
              onClick={() => setActiveTab('trains')}
              type="button"
            >
              <Train size={18} />
              Trains
            </button>
            <button 
              className={`search-tab-btn ${activeTab === 'buses' ? 'active' : ''}`}
              onClick={() => setActiveTab('buses')}
              type="button"
            >
              <Bus size={18} />
              Buses
            </button>
          </div>

          <form onSubmit={handleSearchSubmit}>
            {activeTab === 'flights' && (
              <div className="search-grid">
                <div className="search-input-group">
                  <label>From</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Origin City/Airport" 
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>To</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Destination City/Airport" 
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Depart</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={flightDate}
                      min="2026-06-25"
                      onChange={(e) => setFlightDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <label>Travelers</label>
                  <div className="search-input-wrapper">
                    <Users size={18} />
                    <button
                      type="button"
                      className="search-input"
                      style={{ paddingLeft: '40px', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', cursor: 'pointer', height: '48px', display: 'flex', alignItems: 'center' }}
                      onClick={() => setActiveDropdown(activeDropdown === 'flights' ? null : 'flights')}
                    >
                      {flightTravelers} Traveler{flightTravelers > 1 ? 's' : ''}
                    </button>
                    {activeDropdown === 'flights' && (
                      <div className="traveler-popover" style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        zIndex: 50,
                        width: '280px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(255, 94, 132, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Adults</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Age 12+</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              disabled={flightTravelers <= 1}
                              onClick={() => setFlightTravelers(prev => Math.max(1, prev - 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            <span style={{ minWidth: '15px', textAlign: 'center', fontWeight: 'bold' }}>{flightTravelers}</span>
                            <button
                              type="button"
                              disabled={flightTravelers >= 9}
                              onClick={() => setFlightTravelers(prev => Math.min(9, prev + 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(null)}
                          className="action-btn"
                          style={{ width: '100%', height: '32px', fontSize: '0.8rem', padding: 0 }}
                        >
                          Apply Choices
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Class</label>
                  <div className="search-input-wrapper">
                    <Award size={18} />
                    <select 
                      className="search-input" 
                      style={{ paddingLeft: '40px', WebkitAppearance: 'none' }}
                      value={flightClass}
                      onChange={(e) => setFlightClass(e.target.value)}
                    >
                      <option value="economy">Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="search-grid">
                <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>Destination</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Where are you staying?" 
                      value={hotelDest}
                      onChange={(e) => setHotelDest(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Check In</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={hotelCheckIn}
                      min="2026-06-25"
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Check Out</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={hotelCheckOut}
                      min="2026-06-26"
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <label>Guests</label>
                  <div className="search-input-wrapper">
                    <Users size={18} />
                    <button
                      type="button"
                      className="search-input"
                      style={{ paddingLeft: '40px', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', cursor: 'pointer', height: '48px', display: 'flex', alignItems: 'center' }}
                      onClick={() => setActiveDropdown(activeDropdown === 'hotels' ? null : 'hotels')}
                    >
                      {hotelGuests} Guest{hotelGuests > 1 ? 's' : ''}
                    </button>
                    {activeDropdown === 'hotels' && (
                      <div className="traveler-popover" style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        zIndex: 50,
                        width: '280px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(255, 94, 132, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Guests</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Room occupancy</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              disabled={hotelGuests <= 1}
                              onClick={() => setHotelGuests(prev => Math.max(1, prev - 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            <span style={{ minWidth: '15px', textAlign: 'center', fontWeight: 'bold' }}>{hotelGuests}</span>
                            <button
                              type="button"
                              disabled={hotelGuests >= 12}
                              onClick={() => setHotelGuests(prev => Math.min(12, prev + 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(null)}
                          className="action-btn"
                          style={{ width: '100%', height: '32px', fontSize: '0.8rem', padding: 0 }}
                        >
                          Apply Choices
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="search-grid">
                <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>Destination</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Destination or Package Name" 
                      value={pkgDest}
                      onChange={(e) => setPkgDest(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Depart Date</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={pkgDate}
                      min="2026-06-25"
                      onChange={(e) => setPkgDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <label>Travelers</label>
                  <div className="search-input-wrapper">
                    <Users size={18} />
                    <button
                      type="button"
                      className="search-input"
                      style={{ paddingLeft: '40px', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', cursor: 'pointer', height: '48px', display: 'flex', alignItems: 'center' }}
                      onClick={() => setActiveDropdown(activeDropdown === 'packages' ? null : 'packages')}
                    >
                      {pkgTravelers} Traveler{pkgTravelers > 1 ? 's' : ''}
                    </button>
                    {activeDropdown === 'packages' && (
                      <div className="traveler-popover" style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        zIndex: 50,
                        width: '280px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(255, 94, 132, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Travelers</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Curated tour bundle</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              disabled={pkgTravelers <= 1}
                              onClick={() => setPkgTravelers(prev => Math.max(1, prev - 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            <span style={{ minWidth: '15px', textAlign: 'center', fontWeight: 'bold' }}>{pkgTravelers}</span>
                            <button
                              type="button"
                              disabled={pkgTravelers >= 10}
                              onClick={() => setPkgTravelers(prev => Math.min(10, prev + 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(null)}
                          className="action-btn"
                          style={{ width: '100%', height: '32px', fontSize: '0.8rem', padding: 0 }}
                        >
                          Apply Choices
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trains' && (
              <div className="search-grid">
                <div className="search-input-group">
                  <label>From Railway Station</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Origin Station" 
                      value={trainFrom}
                      onChange={(e) => setTrainFrom(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>To Railway Station</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Destination Station" 
                      value={trainTo}
                      onChange={(e) => setTrainTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Journey Date</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={trainDate}
                      min="2026-06-25"
                      onChange={(e) => setTrainDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <label>Travelers</label>
                  <div className="search-input-wrapper">
                    <Users size={18} />
                    <button
                      type="button"
                      className="search-input"
                      style={{ paddingLeft: '40px', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', cursor: 'pointer', height: '48px', display: 'flex', alignItems: 'center' }}
                      onClick={() => setActiveDropdown(activeDropdown === 'trains' ? null : 'trains')}
                    >
                      {trainTravelers} Traveler{trainTravelers > 1 ? 's' : ''}
                    </button>
                    {activeDropdown === 'trains' && (
                      <div className="traveler-popover" style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        zIndex: 50,
                        width: '280px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(255, 94, 132, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Passengers</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Railway bookings</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              disabled={trainTravelers <= 1}
                              onClick={() => setTrainTravelers(prev => Math.max(1, prev - 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            <span style={{ minWidth: '15px', textAlign: 'center', fontWeight: 'bold' }}>{trainTravelers}</span>
                            <button
                              type="button"
                              disabled={trainTravelers >= 6}
                              onClick={() => setTrainTravelers(prev => Math.min(6, prev + 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(null)}
                          className="action-btn"
                          style={{ width: '100%', height: '32px', fontSize: '0.8rem', padding: 0 }}
                        >
                          Apply Choices
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Quota Class</label>
                  <div className="search-input-wrapper">
                    <Award size={18} />
                    <select 
                      className="search-input" 
                      style={{ paddingLeft: '40px', WebkitAppearance: 'none' }}
                      value={trainClass}
                      onChange={(e) => setTrainClass(e.target.value)}
                    >
                      <option value="economy">AC 3 Tier (3A)</option>
                      <option value="business">AC 2 Tier (2A)</option>
                      <option value="first">AC First Class (1A)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'buses' && (
              <div className="search-grid">
                <div className="search-input-group">
                  <label>From Bus Stand</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Origin Boarding Point" 
                      value={busFrom}
                      onChange={(e) => setBusFrom(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>To Bus Stand</label>
                  <div className="search-input-wrapper">
                    <MapPin size={18} />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Destination Dropoff Point" 
                      value={busTo}
                      onChange={(e) => setBusTo(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Travel Date</label>
                  <div className="search-input-wrapper">
                    <Calendar size={18} />
                    <input 
                      type="date" 
                      className="search-input" 
                      value={busDate}
                      min="2026-06-25"
                      onChange={(e) => setBusDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="search-input-group" style={{ position: 'relative' }}>
                  <label>Travelers</label>
                  <div className="search-input-wrapper">
                    <Users size={18} />
                    <button
                      type="button"
                      className="search-input"
                      style={{ paddingLeft: '40px', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', cursor: 'pointer', height: '48px', display: 'flex', alignItems: 'center' }}
                      onClick={() => setActiveDropdown(activeDropdown === 'buses' ? null : 'buses')}
                    >
                      {busTravelers} Traveler{busTravelers > 1 ? 's' : ''}
                    </button>
                    {activeDropdown === 'buses' && (
                      <div className="traveler-popover" style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        zIndex: 50,
                        width: '280px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(255, 94, 132, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Passengers</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Coach reservations</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button
                              type="button"
                              disabled={busTravelers <= 1}
                              onClick={() => setBusTravelers(prev => Math.max(1, prev - 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >-</button>
                            <span style={{ minWidth: '15px', textAlign: 'center', fontWeight: 'bold' }}>{busTravelers}</span>
                            <button
                              type="button"
                              disabled={busTravelers >= 6}
                              onClick={() => setBusTravelers(prev => Math.min(6, prev + 1))}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--glass-border)', background: 'var(--bg-tertiary)', cursor: 'pointer', fontWeight: 'bold' }}
                            >+</button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(null)}
                          className="action-btn"
                          style={{ width: '100%', height: '32px', fontSize: '0.8rem', padding: 0 }}
                        >
                          Apply Choices
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="search-input-group">
                  <label>Seating Type</label>
                  <div className="search-input-wrapper">
                    <Award size={18} />
                    <select 
                      className="search-input" 
                      style={{ paddingLeft: '40px', WebkitAppearance: 'none' }}
                      value={busClass}
                      onChange={(e) => setBusClass(e.target.value)}
                    >
                      <option value="economy">Seater (Luxury)</option>
                      <option value="business">AC Sleeper (Premium)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="search-btn">
              <Search size={20} />
              Search Options
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
