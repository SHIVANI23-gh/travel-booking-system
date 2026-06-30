import React from 'react';
import { Filter, Star, Shield } from 'lucide-react';

export default function SearchFilters({ type, filters, setFilters }) {
  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => {
      const activeRatings = prev.ratings.includes(rating)
        ? prev.ratings.filter(r => r !== rating)
        : [...prev.ratings, rating];
      return { ...prev, ratings: activeRatings };
    });
  };

  const handleStopChange = (stopsCount) => {
    setFilters(prev => {
      const activeStops = prev.stops.includes(stopsCount)
        ? prev.stops.filter(s => s !== stopsCount)
        : [...prev.stops, stopsCount];
      return { ...prev, stops: activeStops };
    });
  };

  const handleAmenityChange = (amenity) => {
    setFilters(prev => {
      const activeAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: activeAmenities };
    });
  };

  const resetFilters = () => {
    setFilters({
      maxPrice: 
        type === 'flights' ? 30000 : 
        type === 'hotels' ? 90000 : 
        type === 'packages' ? 95000 : 
        type === 'trains' ? 10000 : 
        5000,
      ratings: [],
      stops: [],
      amenities: []
    });
  };

  return (
    <aside className="filters-sidebar">
      <div className="filter-section" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
        <h3 className="filter-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} />
            Filters
          </span>
          <button 
            onClick={resetFilters} 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Clear All
          </button>
        </h3>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-title" style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px' }}>Budget Limit</h4>
        <input 
          type="range" 
          min={type === 'flights' ? '2000' : type === 'hotels' ? '5000' : type === 'packages' ? '15000' : type === 'trains' ? '300' : '200'}
          max={type === 'flights' ? '30000' : type === 'hotels' ? '90000' : type === 'packages' ? '95000' : type === 'trains' ? '10000' : '5000'}
          value={filters.maxPrice} 
          onChange={handlePriceChange}
          style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
        <div className="filter-price-inputs">
          <div className="filter-price-box">Min: ${type === 'flights' ? '2,000' : type === 'hotels' ? '5,000' : type === 'packages' ? '15,000' : type === 'trains' ? '300' : '200'}</div>
          <div className="filter-price-box">Max: ${filters.maxPrice.toLocaleString()}</div>
        </div>
      </div>

      {/* Flight Specific Filters */}
      {type === 'flights' && (
        <div className="filter-section">
          <h4 className="filter-title" style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px' }}>Flight Stops</h4>
          <div className="filter-checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filters.stops.includes(0)} 
                onChange={() => handleStopChange(0)} 
              />
              Non-stop
            </label>
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={filters.stops.includes(1)} 
                onChange={() => handleStopChange(1)} 
              />
              1 Stop
            </label>
          </div>
        </div>
      )}

      {/* Hotel, Package, Train & Bus Star Rating */}
      {(type === 'hotels' || type === 'packages' || type === 'trains' || type === 'buses') && (
        <>
          <div className="filter-section">
            <h4 className="filter-title" style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px' }}>{type === 'trains' || type === 'buses' ? 'Rating' : 'Star Rating'}</h4>
            <div className="filter-checkbox-group">
              {[5, 4, 3].map(stars => (
                <label className="checkbox-label" key={stars}>
                  <input 
                    type="checkbox" 
                    checked={filters.ratings.includes(stars)}
                    onChange={() => handleRatingChange(stars)}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {stars} <Star size={14} className="star-rating" style={{ display: 'inline', color: 'var(--warning)', fill: 'var(--warning)' }} /> & Up
                  </span>
                </label>
              ))}
            </div>
          </div>

          {type === 'hotels' && (
            <div className="filter-section">
              <h4 className="filter-title" style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px' }}>Amenities</h4>
              <div className="filter-checkbox-group">
                {["WiFi", "Pool", "Spa", "Gym", "Private Beach", "Free Breakfast"].map(amenity => (
                  <label className="checkbox-label" key={amenity}>
                    <input 
                      type="checkbox" 
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          )}

          {type === 'buses' && (
            <div className="filter-section">
              <h4 className="filter-title" style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px' }}>Operator Type</h4>
              <div className="filter-checkbox-group">
                {["State Transport", "Private Fleet"].map(op => (
                  <label className="checkbox-label" key={op}>
                    <input 
                      type="checkbox" 
                      checked={filters.amenities.includes(op)}
                      onChange={() => handleAmenityChange(op)}
                    />
                    {op}
                  </label>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.1)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Shield size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
          <strong>Sanchari Clean Guarantee</strong>: Certified sanitization protocols enforced for all listing partners.
        </p>
      </div>
    </aside>
  );
}
