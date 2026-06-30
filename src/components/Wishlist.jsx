import React from 'react';
import { Heart, Trash2, Plane, Hotel, Gift, Train, Bus, MapPin, Star, ArrowRight } from 'lucide-react';

export default function Wishlist({ favorites, onRemoveFavorite, onBookItem, setView }) {
  
  const getCategoryIcon = (type) => {
    switch (type) {
      case 'flights': return <Plane size={18} style={{ transform: 'rotate(45deg)' }} />;
      case 'hotels': return <Hotel size={18} />;
      case 'packages': return <Gift size={18} />;
      case 'trains': return <Train size={18} />;
      case 'buses': return <Bus size={18} />;
      default: return <Plane size={18} />;
    }
  };

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px', animation: 'slideUp 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)' }}>My Wishlist</h2>
          <p style={{ color: 'var(--text-muted)' }}>Your saved destinations, stays, and travel plans.</p>
        </div>
        <button className="action-btn" onClick={() => setView('search')}>
          Explore More Listings
        </button>
      </div>

      {favorites.length === 0 ? (
        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--glass-border)', 
          padding: '80px 24px', 
          borderRadius: '16px', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '20px' 
        }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: 'rgba(255, 94, 132, 0.1)', 
            color: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <Heart size={40} style={{ fill: 'var(--primary)' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Your Wishlist is Empty</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '1.6' }}>
            Tap the heart icon on any flight, resort, train, or vacation package to save it here for later.
          </p>
          <button className="action-btn" style={{ background: 'var(--primary)' }} onClick={() => setView('search')}>
            Browse Deals Now
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {favorites.map((item) => {
            const isHotel = item.type === 'hotels';
            const isPackage = item.type === 'packages';
            const isFlight = item.type === 'flights';
            const isTrain = item.type === 'trains';
            const isBus = item.type === 'buses';

            return (
              <div 
                key={`${item.type}-${item.id}`} 
                className="flight-card" 
                style={{ 
                  flexDirection: 'column', 
                  alignItems: 'stretch',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Visual Image Header for Hotel/Package Favorites */}
                {(isHotel || isPackage) && (
                  <div style={{ height: '160px', width: '100%', position: 'relative', margin: '-24px -24px 20px -24px', alignSelf: 'center', overflow: 'hidden' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--bg-blur)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: '#fff', border: '1px solid var(--glass-border)' }}>
                      {item.type.toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Card Title & Type header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                    {getCategoryIcon(item.type)}
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.type.slice(0, -1)}
                    </span>
                  </div>
                  <button 
                    onClick={() => onRemoveFavorite(item, item.type)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--danger)', 
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s'
                    }}
                    title="Remove from favorites"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Card Body Contents */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', lineHeight: '1.3', fontWeight: 600 }}>
                      {isHotel || isPackage ? item.name : `${item.departure} to ${item.arrival}`}
                    </h3>

                    {/* Meta info */}
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', flexWrap: 'wrap' }}>
                      {item.rating && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)', fontWeight: 600 }}>
                          <Star size={14} style={{ fill: 'currentColor' }} />
                          {item.rating}
                        </span>
                      )}
                      
                      {isHotel && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={14} />
                          {item.location}
                        </span>
                      )}

                      {isFlight && (
                        <span>{item.airline} • {item.code}</span>
                      )}

                      {isTrain && (
                        <span>{item.name} • #{item.code}</span>
                      )}

                      {isBus && (
                        <span>{item.operator}</span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description || (isFlight ? `Round-trip/One-way direct flight. Standard luggage allowance of ${item.baggage} included.` : isTrain ? `Premium high-speed service with halts at ${item.stops} stations.` : `Operator: ${item.operator}. Class type: ${item.type}.`)}
                    </p>
                  </div>

                  {/* Price & Book now action */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderTop: '1px solid var(--glass-border)', 
                    paddingTop: '16px',
                    marginTop: 'auto'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        ₹{item.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {isHotel ? 'per night' : isPackage ? 'per person' : 'base fare'}
                      </div>
                    </div>
                    
                    <button 
                      className="book-now-btn" 
                      onClick={() => onBookItem(item)}
                      style={{ 
                        padding: '8px 16px', 
                        fontSize: '0.85rem',
                        background: 'var(--primary)'
                      }}
                    >
                      Book Now
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
