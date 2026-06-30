import React, { useState } from 'react';
import { Plane, Star, MapPin, Check, Briefcase, Calendar, Clock, DollarSign, ArrowRight, Train, Bus, Heart, Search } from 'lucide-react';

export default function ListingGrid({ type, listings, onSelect, sortBy, setSortBy, favorites = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePills, setActivePills] = useState([]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const togglePill = (pillId) => {
    setActivePills(prev => 
      prev.includes(pillId) ? prev.filter(p => p !== pillId) : [...prev, pillId]
    );
  };

  // Real-time search and pills filtering logic
  const filteredListings = listings.filter(item => {
    // 1. Text Search Query Match
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      if (type === 'flights') {
        const matchesAirline = item.airline.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesDep = item.departure.toLowerCase().includes(query);
        const matchesArr = item.arrival.toLowerCase().includes(query);
        if (!matchesAirline && !matchesCode && !matchesDep && !matchesArr) return false;
      } else if (type === 'hotels') {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc && !matchesDesc) return false;
      } else if (type === 'packages') {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      } else if (type === 'trains') {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCode = item.code.toLowerCase().includes(query);
        const matchesDep = item.departure.toLowerCase().includes(query);
        const matchesArr = item.arrival.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesDep && !matchesArr) return false;
      } else if (type === 'buses') {
        const matchesOp = item.operator.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesDep = item.departure.toLowerCase().includes(query);
        const matchesArr = item.arrival.toLowerCase().includes(query);
        if (!matchesOp && !matchesType && !matchesDep && !matchesArr) return false;
      }
    }

    // 2. Pill Filter Match
    if (activePills.length > 0) {
      for (const pill of activePills) {
        if (pill === 'highly-rated' && item.rating < 4.7) {
          return false;
        }
        if (pill === 'non-stop' && item.stops !== undefined && item.stops > 0) {
          return false;
        }
        if (pill === 'free-breakfast' && type === 'hotels') {
          const hasBreakfast = item.amenities && item.amenities.some(a => a.toLowerCase().includes('breakfast'));
          if (!hasBreakfast) return false;
        }
        if (pill === 'sleeper' && type === 'buses') {
          if (!item.type.toLowerCase().includes('sleeper')) return false;
        }
        if (pill === 'state-transport' && type === 'buses') {
          if (!item.operator.toLowerCase().includes('state transport')) return false;
        }
      }
    }

    return true;
  });

  // Render Pill Filters according to listing type
  const renderPills = () => {
    const pills = [
      { id: 'highly-rated', label: '⭐ Rated 4.7+' }
    ];

    if (type === 'flights') {
      pills.push({ id: 'non-stop', label: '✈️ Non-stop flights' });
    } else if (type === 'hotels') {
      pills.push({ id: 'free-breakfast', label: '🍳 Free Breakfast Included' });
    } else if (type === 'buses') {
      pills.push({ id: 'sleeper', label: '🛌 Sleeper Berths' });
      pills.push({ id: 'state-transport', label: '🚌 State Transport buses' });
    }

    return (
      <div className="quick-filter-pills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0 20px 0' }}>
        {pills.map(p => {
          const isActive = activePills.includes(p.id);
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => togglePill(p.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                border: '1px solid var(--glass-border)',
                background: isActive ? 'var(--primary)' : 'var(--bg-secondary)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="listings-container">
      {/* Dynamic Search & Filter Input Bar */}
      <div className="search-filter-bar-wrapper" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ position: 'relative', display: 'flex', width: '100%', alignItems: 'center' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="search-input"
            placeholder={
              type === 'flights' ? 'Search by airline, code (e.g. AI-101), or airport...' :
              type === 'hotels' ? 'Search hotels by name, city, or features...' :
              type === 'packages' ? 'Search packages by destination name...' :
              type === 'trains' ? 'Search train by express name or station...' :
              'Search buses by operator, sleeper type, or boarding stand...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              paddingLeft: '48px', 
              paddingRight: '16px', 
              height: '48px', 
              borderRadius: '24px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              fontSize: '0.9rem'
            }}
          />
        </div>
        {renderPills()}
      </div>

      <div className="listings-header">
        <div className="listings-count">
          Found <span>{filteredListings.length}</span> {filteredListings.length === 1 ? 'option' : 'options'}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</label>
          <select className="sort-select" value={sortBy} onChange={handleSortChange}>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">User Rating</option>
          </select>
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '60px 24px', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Briefcase size={48} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.4rem' }}>No Listings Found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            We couldn't find any results matching your search terms or filters. Try adjusting your search query, budget limit, or clearing active pills.
          </p>
        </div>
      ) : (
        <div className="cards-grid">
          {filteredListings.map((item) => {
            const isFav = favorites.some(fav => fav.id === item.id && fav.type === type);

            // Universal Heart Button Markup
            const heartButton = (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item, type);
                }}
                className={`favorite-toggle-btn ${isFav ? 'active' : ''}`}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--bg-blur)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--glass-border)',
                  color: isFav ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                }}
                title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={16} style={{ fill: isFav ? 'var(--primary)' : 'none', strokeWidth: 2 }} />
              </button>
            );

            if (type === 'flights') {
              // Custom discount indicator for Flights
              const discount = 900;
              const originalPrice = item.price + discount;

              return (
                <div key={item.id} className="flight-card" style={{ position: 'relative' }}>
                  {heartButton}
                  <div className="airline-info">
                    <div className="airline-icon-bg">
                      <Plane size={24} style={{ transform: 'rotate(45deg)' }} />
                    </div>
                    <div>
                      <div className="airline-name">{item.airline}</div>
                      <div className="flight-code">{item.code}</div>
                    </div>
                  </div>

                  <div className="flight-timeline">
                    <div className="timeline-node">
                      <div className="timeline-time">{item.departureTime}</div>
                      <div className="timeline-city">{item.departure.split(' ')[0]}</div>
                    </div>
                    
                    <div className="timeline-path">
                      <span className="timeline-duration">{item.duration}</span>
                      <div className="timeline-line"></div>
                      <span className={`timeline-stops ${item.stops === 0 ? 'non-stop' : 'stops-count'}`}>
                        {item.stops === 0 ? 'Nonstop' : `${item.stops} stop`}
                      </span>
                    </div>

                    <div className="timeline-node">
                      <div className="timeline-time">{item.arrivalTime}</div>
                      <div className="timeline-city">{item.arrival.split(' ')[0]}</div>
                    </div>
                  </div>

                  <div className="flight-action-block">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'center' }}>
                      <span style={{ textDecoration: 'line-through', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        ₹{originalPrice.toLocaleString()}
                      </span>
                      <span className="price-tag">₹{item.price.toLocaleString()}</span>
                    </div>
                    <div className="price-sub" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Save ₹{discount}! per traveler</div>
                    <button className="book-now-btn" onClick={() => onSelect(item)}>
                      Choose Seats
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            } else if (type === 'trains') {
              return (
                <div key={item.id} className="flight-card" style={{ position: 'relative' }}>
                  {heartButton}
                  <div className="airline-info">
                    <div className="airline-icon-bg" style={{ background: 'rgba(255, 94, 132, 0.1)', color: 'var(--primary)' }}>
                      <Train size={24} />
                    </div>
                    <div>
                      <div className="airline-name">{item.name}</div>
                      <div className="flight-code" style={{ color: 'var(--primary)' }}>Express Train #{item.code}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '36px' }}>
                      <span className="star-rating">
                        <Star size={12} style={{ fill: 'currentColor' }} />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flight-timeline">
                    <div className="timeline-node">
                      <div className="timeline-time">{item.departureTime}</div>
                      <div className="timeline-city" title={item.departure}>{item.departure}</div>
                    </div>
                    
                    <div className="timeline-path">
                      <span className="timeline-duration">{item.duration}</span>
                      <div className="timeline-line" style={{ borderTop: '2px dashed var(--primary)' }}></div>
                      <span className="timeline-stops stops-count" style={{ background: 'rgba(255, 94, 132, 0.05)', color: 'var(--primary)' }}>
                        {item.stops} halts
                      </span>
                    </div>

                    <div className="timeline-node">
                      <div className="timeline-time">{item.arrivalTime}</div>
                      <div className="timeline-city" title={item.arrival}>{item.arrival}</div>
                    </div>
                  </div>

                  <div className="flight-action-block">
                    <div className="price-tag">₹{item.price.toLocaleString()}</div>
                    <div className="price-sub">AC 3-Tier base</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', marginBottom: '8px', fontWeight: 600 }}>
                      {item.seatsAvailable} berths left
                    </div>
                    <button className="book-now-btn" onClick={() => onSelect(item)}>
                      Select Berth
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            } else if (type === 'buses') {
              return (
                <div key={item.id} className="flight-card" style={{ position: 'relative' }}>
                  {heartButton}
                  <div className="airline-info">
                    <div className="airline-icon-bg" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                      <Bus size={24} />
                    </div>
                    <div>
                      <div className="airline-name">{item.operator}</div>
                      <div className="flight-code" style={{ color: 'var(--secondary)' }}>{item.type}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '36px' }}>
                      <span className="star-rating" style={{ color: 'var(--secondary)', background: 'rgba(16, 185, 129, 0.1)' }}>
                        <Star size={12} style={{ fill: 'currentColor' }} />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flight-timeline">
                    <div className="timeline-node">
                      <div className="timeline-time">{item.departureTime}</div>
                      <div className="timeline-city" title={item.departure}>{item.departure}</div>
                    </div>
                    
                    <div className="timeline-path">
                      <span className="timeline-duration">{item.duration}</span>
                      <div className="timeline-line" style={{ borderTop: '2px dotted var(--secondary)' }}></div>
                      <span className="timeline-stops stops-count" style={{ background: 'rgba(16, 185, 129, 0.05)', color: 'var(--secondary)' }}>
                        Direct
                      </span>
                    </div>

                    <div className="timeline-node">
                      <div className="timeline-time">{item.arrivalTime}</div>
                      <div className="timeline-city" title={item.arrival}>{item.arrival}</div>
                    </div>
                  </div>

                  <div className="flight-action-block">
                    <div className="price-tag">₹{item.price.toLocaleString()}</div>
                    <div className="price-sub">standard fare</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--danger)', marginBottom: '8px', fontWeight: 600 }}>
                      {item.seatsAvailable} seats left
                    </div>
                    <button className="book-now-btn" style={{ background: 'var(--secondary)' }} onClick={() => onSelect(item)}>
                      Choose Seat
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            } else if (type === 'hotels') {
              const originalPrice = Math.floor(item.price * 1.25);
              return (
                <div key={item.id} className="hotel-card" style={{ position: 'relative' }}>
                  {heartButton}
                  <div className="hotel-img-wrapper" style={{ overflow: 'hidden' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="hotel-img" 
                      style={{ transition: 'transform 0.4s ease' }} 
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <span className="hotel-tag" style={{ border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                      Popular Choice
                    </span>
                  </div>
                  <div className="hotel-details">
                    <div>
                      <div className="hotel-meta">
                        <span className="star-rating">
                          <Star size={14} style={{ fill: 'currentColor' }} />
                          {item.rating}
                        </span>
                        <span className="reviews-count">({item.reviews} reviews)</span>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(255, 94, 132, 0.1)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', marginLeft: 'auto', fontWeight: 600 }}>
                          25% OFF
                        </span>
                      </div>
                      <h3 className="hotel-title">{item.name}</h3>
                      <div className="hotel-location">
                        <MapPin size={14} />
                        {item.location}
                      </div>
                      <p className="hotel-desc">{item.description}</p>
                      
                      <div className="hotel-amenities">
                        {item.amenities.slice(0, 4).map(amenity => (
                          <span key={amenity} className="amenity-badge">{amenity}</span>
                        ))}
                        {item.amenities.length > 4 && (
                          <span className="amenity-badge">+{item.amenities.length - 4} more</span>
                        )}
                      </div>
                    </div>

                    <div className="hotel-footer">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ textDecoration: 'line-through', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            ₹{originalPrice.toLocaleString()}
                          </span>
                          <span className="price-tag">₹{item.price.toLocaleString()}</span>
                        </div>
                        <div className="price-sub">per night</div>
                      </div>
                      <button className="book-now-btn" onClick={() => onSelect(item)}>
                        Select Room
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else if (type === 'packages') {
              const originalPrice = Math.floor(item.price * 1.15);
              return (
                <div key={item.id} className="package-card" style={{ position: 'relative' }}>
                  {heartButton}
                  <div className="package-img-wrapper" style={{ overflow: 'hidden' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="package-img" 
                      style={{ transition: 'transform 0.4s ease' }} 
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <span className="package-duration">
                      <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {item.durationDays} Days / {item.durationDays - 1} Nights
                    </span>
                  </div>
                  <div className="package-details">
                    <div>
                      <div className="hotel-meta" style={{ marginBottom: '8px' }}>
                        <span className="star-rating">
                          <Star size={14} style={{ fill: 'currentColor' }} />
                          {item.rating}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>All-Inclusive Deal</span>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '10px', marginLeft: 'auto', fontWeight: 600 }}>
                          Best Seller
                        </span>
                      </div>
                      <h3 className="package-title">{item.name}</h3>
                      <p className="hotel-desc" style={{ marginBottom: '16px' }}>{item.description}</p>
                      
                      <ul className="package-inclusions">
                        {item.inclusions.slice(0, 3).map((inclusion, idx) => (
                          <li key={idx}>
                            <Check size={14} />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="package-footer">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ textDecoration: 'line-through', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            ₹{originalPrice.toLocaleString()}
                          </span>
                          <span className="price-tag">₹{item.price.toLocaleString()}</span>
                        </div>
                        <div className="price-sub">total per person</div>
                      </div>
                      <button className="book-now-btn" onClick={() => onSelect(item)}>
                        Book Package
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
