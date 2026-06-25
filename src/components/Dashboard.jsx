import React, { useState } from 'react';
import { Briefcase, Plane, Hotel, Gift, Calendar, User, Trash2, Edit2, Check, RefreshCw, Train, Bus } from 'lucide-react';

export default function Dashboard({ bookings, onCancelBooking, onEditTraveler, setView }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const startEditing = (bookingId, currentName) => {
    setEditingId(bookingId);
    setEditName(currentName);
  };

  const saveEditing = (bookingId) => {
    if (!editName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    onEditTraveler(bookingId, editName);
    setEditingId(null);
  };

  return (
    <div className="container" style={{ marginTop: '40px', animation: 'slideUp 0.4s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)' }}>My Bookings Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage passenger details and cancellation requests.</p>
        </div>
        <button className="action-btn" onClick={() => setView('search')}>
          Book New Trip
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '80px 24px', borderRadius: '16px', textAlignment: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Briefcase size={64} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.5rem' }}>No Bookings Yet</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            You haven't scheduled any upcoming trips on this account yet. Search our inventory of flights and beachfront hotels to get started!
          </p>
          <button className="action-btn" style={{ background: 'var(--primary)' }} onClick={() => setView('search')}>
            Browse Flights & Hotels
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {bookings.map((booking) => {
            const { id, type, item, searchParams, customizations, passenger, billing, status } = booking;
            const isHotel = type === 'hotels';
            const isPackage = type === 'packages';
            const isCanceled = status === 'canceled';

            return (
              <div key={id} className="dashboard-card" style={{ borderLeft: isCanceled ? '4px solid var(--danger)' : '4px solid var(--secondary)' }}>
                <span className={`dashboard-card-status ${status}`}>
                  {status}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ 
                    background: 
                      isHotel ? 'rgba(16, 185, 129, 0.1)' : 
                      isPackage ? 'rgba(99, 102, 241, 0.1)' : 
                      type === 'trains' ? 'rgba(255, 94, 132, 0.1)' : 
                      type === 'buses' ? 'rgba(46, 196, 182, 0.1)' : 
                      'rgba(14, 165, 233, 0.1)', 
                    color: 
                      isHotel ? 'var(--secondary)' : 
                      isPackage ? 'var(--accent)' : 
                      type === 'trains' ? 'var(--primary)' : 
                      type === 'buses' ? 'var(--secondary)' : 
                      'var(--primary)', 
                    padding: '10px', 
                    borderRadius: '8px' 
                  }}>
                    {isHotel ? <Hotel size={20} /> : isPackage ? <Gift size={20} /> : type === 'trains' ? <Train size={20} /> : type === 'buses' ? <Bus size={20} /> : <Plane size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                      {isHotel ? item.name : isPackage ? item.name : `${item.departure.split(' ')[0]} to ${item.arrival.split(' ')[0]}`}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      REF: #{id.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <Calendar size={16} />
                    <span>
                      {isHotel ? `${searchParams.checkIn} to ${searchParams.checkOut}` : isPackage ? searchParams.date : `${searchParams.date} (${item.departureTime})`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <User size={16} />
                    {editingId === id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="search-input" 
                          style={{ padding: '4px 8px', height: '30px', fontSize: '0.85rem', width: '160px' }}
                        />
                        <button 
                          className="action-btn" 
                          style={{ padding: '4px', height: '30px', width: '30px' }}
                          onClick={() => saveEditing(id)}
                          title="Save Name"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span>{passenger.name}</span>
                        {!isCanceled && (
                          <button 
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => startEditing(id, passenger.name)}
                            title="Edit Traveler Name"
                          >
                            <Edit2 size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Details:</strong>{' '}
                    {isHotel ? (
                      customizations?.selectedRoom?.name || 'Deluxe'
                    ) : isPackage ? (
                      `${item.durationDays} Days`
                    ) : type === 'trains' ? (
                      `Berth: ${customizations?.selectedSeats?.join(', ')} (${searchParams.cabinClass === 'first' ? 'AC First Class' : searchParams.cabinClass === 'business' ? 'AC 2 Tier' : 'AC 3 Tier'})`
                    ) : type === 'buses' ? (
                      `Seat: ${customizations?.selectedSeats?.join(', ')} (${searchParams.cabinClass === 'business' ? 'AC Sleeper' : 'Seater'})`
                    ) : (
                      `Seat: ${customizations?.selectedSeats?.join(', ')} (${searchParams.cabinClass.toUpperCase()})`
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Paid Amount</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isCanceled ? 'var(--text-muted)' : 'var(--secondary)' }}>
                      ₹{billing.totalPaid.toLocaleString()}
                    </div>
                  </div>

                  {!isCanceled && (
                    <button 
                      className="action-btn btn-danger btn-secondary" 
                      style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#fff', border: 'none' }}
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel this booking? You will receive a full refund simulator credit.")) {
                          onCancelBooking(id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                      Cancel Trip
                    </button>
                  )}

                  {isCanceled && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <RefreshCw size={14} />
                      Refunded to card
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
