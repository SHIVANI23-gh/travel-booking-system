import React from 'react';
import { Plane, Star, MapPin, Check, Briefcase, Calendar, Clock, DollarSign, ArrowRight, Train, Bus } from 'lucide-react';

export default function ListingGrid({ type, listings, onSelect, sortBy, setSortBy }) {
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="listings-container">
      <div className="listings-header">
        <div className="listings-count">
          Found <span>{listings.length}</span> {listings.length === 1 ? 'option' : 'options'}
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

      {listings.length === 0 ? (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '60px 24px', borderRadius: '16px', textAlignment: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Briefcase size={48} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.4rem' }}>No Listings Found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            We couldn't find any results matching your search filters. Try adjusting your budget slider or clearing your selection checkmarks.
          </p>
        </div>
      ) : (
        <div className="cards-grid">
          {listings.map((item) => {
            if (type === 'flights') {
              return (
                <div key={item.id} className="flight-card">
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
                    <div className="price-tag">₹{item.price.toLocaleString()}</div>
                    <div className="price-sub">per traveler</div>
                    <button className="book-now-btn" onClick={() => onSelect(item)}>
                      Choose Seats
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            } else if (type === 'trains') {
              return (
                <div key={item.id} className="flight-card">
                  <div className="airline-info">
                    <div className="airline-icon-bg" style={{ background: 'rgba(255, 94, 132, 0.1)', color: 'var(--primary)' }}>
                      <Train size={24} />
                    </div>
                    <div>
                      <div className="airline-name">{item.name}</div>
                      <div className="flight-code" style={{ color: 'var(--primary)' }}>IRCTC #{item.code}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                <div key={item.id} className="flight-card">
                  <div className="airline-info">
                    <div className="airline-icon-bg" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                      <Bus size={24} />
                    </div>
                    <div>
                      <div className="airline-name">{item.operator}</div>
                      <div className="flight-code" style={{ color: 'var(--secondary)' }}>{item.type}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
              return (
                <div key={item.id} className="hotel-card">
                  <div className="hotel-img-wrapper">
                    <img src={item.image} alt={item.name} className="hotel-img" />
                    <span className="hotel-tag">Popular choice</span>
                  </div>
                  <div className="hotel-details">
                    <div>
                      <div className="hotel-meta">
                        <span className="star-rating">
                          <Star size={14} style={{ fill: 'currentColor' }} />
                          {item.rating}
                        </span>
                        <span className="reviews-count">({item.reviews} reviews)</span>
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
                        <div className="price-tag">₹{item.price.toLocaleString()}</div>
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
              return (
                <div key={item.id} className="package-card">
                  <div className="package-img-wrapper">
                    <img src={item.image} alt={item.name} className="package-img" />
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
                        <div className="price-tag">₹{item.price.toLocaleString()}</div>
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
