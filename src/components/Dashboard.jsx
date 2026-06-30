import React, { useState } from 'react';
import { Briefcase, Plane, Hotel, Gift, Calendar, User, Trash2, Edit2, Check, RefreshCw, Train, Bus, ShieldCheck } from 'lucide-react';

export default function Dashboard({ bookings, onCancelBooking, onEditTraveler, setView }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // all, confirmed (upcoming), canceled

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

  // Calculations for stats
  const totalBookings = bookings.length;
  const confirmedTripsCount = bookings.filter(b => b.status === 'confirmed').length;
  const refundCredits = bookings
    .filter(b => b.status === 'canceled')
    .reduce((sum, b) => sum + (b.billing?.totalPaid || 0), 0);

  // Filtered bookings
  const filteredBookings = bookings.filter(b => {
    if (filterTab === 'confirmed') return b.status === 'confirmed';
    if (filterTab === 'canceled') return b.status === 'canceled';
    return true;
  });

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '80px', animation: 'slideUp 0.4s ease-out' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)' }}>My Bookings</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage passenger credentials, view boarding slips, and request refunds.</p>
        </div>
        <button className="action-btn" onClick={() => setView('search')}>
          Book New Trip
        </button>
      </div>

      {/* Stats Summary Panel */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Total Transactions</span>
          <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{totalBookings}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flights, stays & train rides booked</span>
        </div>
        
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Upcoming Journeys</span>
          <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--secondary)' }}>{confirmedTripsCount}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confirmed and ready to travel</span>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)', padding: '4px 8px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 600 }}>SIMULATOR</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Refund Balance Wallet</span>
          <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)' }}>₹{refundCredits.toLocaleString()}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Credited immediately on cancellation</span>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '32px' }}>
        {[
          { id: 'all', label: `All Trips (${totalBookings})` },
          { id: 'confirmed', label: `Upcoming (${confirmedTripsCount})` },
          { id: 'canceled', label: `Cancelled (${totalBookings - confirmedTripsCount})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              background: filterTab === tab.id ? 'var(--primary)' : 'transparent',
              color: filterTab === tab.id ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Display Area */}
      {filteredBookings.length === 0 ? (
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
          <Briefcase size={64} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>No Bookings Match Filters</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
            No tickets fit this category right now. Browse our catalog of flight routes, packages, and premium resorts.
          </p>
          <button className="action-btn" style={{ background: 'var(--primary)' }} onClick={() => setView('search')}>
            Explore Travel Categories
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {filteredBookings.map((booking) => {
            const { id, type, item, searchParams, customizations, passenger, billing, status } = booking;
            const isHotel = type === 'hotels';
            const isPackage = type === 'packages';
            const isFlight = type === 'flights';
            const isTrain = type === 'trains';
            const isBus = type === 'buses';
            const isCanceled = status === 'canceled';

            return (
              <div 
                key={id} 
                className="dashboard-card" 
                style={{ 
                  borderLeft: 'none', 
                  padding: '0', 
                  overflow: 'hidden', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Visual Ticket Header */}
                <div style={{ 
                  background: isCanceled ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 94, 132, 0.05)',
                  padding: '20px 28px',
                  borderBottom: '1px dashed var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  position: 'relative'
                }}>
                  {/* Ticket notched design cuts */}
                  <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--glass-border)' }}></div>
                  <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--bg-main)', border: '1px solid var(--glass-border)' }}></div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      background: 
                        isHotel ? 'rgba(16, 185, 129, 0.1)' : 
                        isPackage ? 'rgba(99, 102, 241, 0.1)' : 
                        isTrain ? 'rgba(255, 94, 132, 0.1)' : 
                        isBus ? 'rgba(46, 196, 182, 0.1)' : 
                        'rgba(14, 165, 233, 0.1)', 
                      color: 
                        isHotel ? 'var(--secondary)' : 
                        isPackage ? 'var(--accent)' : 
                        isTrain ? 'var(--primary)' : 
                        isBus ? 'var(--secondary)' : 
                        'var(--primary)', 
                      padding: '10px', 
                      borderRadius: '50%' 
                    }}>
                      {isHotel ? <Hotel size={20} /> : isPackage ? <Gift size={20} /> : isTrain ? <Train size={20} /> : isBus ? <Bus size={20} /> : <Plane size={20} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', color: 'var(--text-main)' }}>
                           {isHotel ? 'Hotel Stay Voucher' : isPackage ? 'Tour Package' : isFlight ? 'Flight Boarding Pass' : isTrain ? 'Train E-Ticket' : 'Express Bus Ticket'}
                        </span>
                        <span className={`dashboard-card-status ${status}`} style={{ position: 'static', margin: '0' }}>
                          {status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                        BOOKING ID: #{id.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Date of Booking</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{booking.bookingDate || 'Recent'}</span>
                  </div>
                </div>

                {/* Ticket Details Body */}
                <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', position: 'relative' }}>
                  {/* Origin & Destination route indicators */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {isHotel ? 'Resort Name & Location' : isPackage ? 'Package Details' : 'Routing Details'}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '1.25rem', marginTop: '4px', color: 'var(--text-main)' }}>
                      {isHotel ? item.name : isPackage ? item.name : `${item.departure} → ${item.arrival}`}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {isHotel ? item.location : isPackage ? item.description : `${item.duration} duration | ${isFlight ? (item.stops === 0 ? 'Nonstop' : `${item.stops} stop`) : isTrain ? `${item.stops} Station Halts` : 'Direct service'}`}
                    </div>
                  </div>

                  {/* Date & Schedule */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {isHotel ? 'Check-in / Check-out' : 'Travel Schedule'}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} className="color-primary" style={{ color: 'var(--primary)' }} />
                      <span>
                        {isHotel ? `${searchParams.checkIn} to ${searchParams.checkOut}` : isPackage ? searchParams.date : `${searchParams.date}`}
                      </span>
                    </div>
                    {!isHotel && !isPackage && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Departure Time: <strong>{item.departureTime}</strong> {item.arrivalTime ? `| Arrival: ${item.arrivalTime}` : ''}
                      </div>
                    )}
                  </div>

                  {/* Traveler & Allotted Seats */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Passenger Information
                    </span>
                    {editingId === id ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="search-input" 
                          style={{ padding: '4px 12px', height: '36px', fontSize: '0.9rem', width: '180px', borderRadius: '8px' }}
                        />
                        <button 
                          className="action-btn" 
                          style={{ padding: '0', height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => saveEditing(id)}
                          title="Save Name"
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{passenger.name}</strong>
                        {!isCanceled && (
                          <button 
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                            onClick={() => startEditing(id, passenger.name)}
                            title="Edit passenger spelling"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                      </div>
                    )}
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {isHotel ? (
                        `Allotted Tier: ${customizations?.selectedRoom?.name || 'Standard Deluxe'}`
                      ) : isPackage ? (
                        `All-Inclusive Travel Package (${item.durationDays} Days / ${item.durationDays - 1} Nights)`
                      ) : isTrain ? (
                        `Berths: ${customizations?.selectedSeats?.join(', ')} | Class: ${searchParams.cabinClass === 'first' ? 'AC First (1A)' : searchParams.cabinClass === 'business' ? 'AC 2 Tier (2A)' : 'AC 3 Tier (3A)'}`
                      ) : isBus ? (
                        `Seats: ${customizations?.selectedSeats?.join(', ')} | Deck: Volvo AC Sleeper`
                      ) : (
                        `Seats: ${customizations?.selectedSeats?.join(', ')} | Cabin Class: ${searchParams.cabinClass.toUpperCase()}`
                      )}
                    </div>
                  </div>
                </div>

                {/* Ticket Notch Separator line */}
                <div style={{ borderTop: '1px dashed var(--glass-border)', margin: '0 28px' }}></div>

                {/* Billing Summary & Actions */}
                <div style={{ 
                  padding: '20px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  {/* Paid details */}
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount Paid via Card</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isCanceled ? 'var(--text-muted)' : 'var(--secondary)' }}>
                      ₹{billing.totalPaid.toLocaleString()}
                    </div>
                  </div>

                  {/* Simulated barcode for tickets */}
                  {!isCanceled && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', height: '32px', background: 'transparent', opacity: 0.8 }}>
                        {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1].map((w, idx) => (
                          <div key={idx} style={{ width: `${w}px`, background: 'var(--text-main)', height: '100%' }}></div>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>SECURE BOARDING TOKEN</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div>
                    {!isCanceled ? (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          className="action-btn btn-secondary"
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                          onClick={() => window.print()}
                        >
                          Print E-Ticket
                        </button>
                        <button 
                          className="action-btn btn-danger btn-secondary" 
                          style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#fff', border: 'none', background: 'var(--danger)' }}
                          onClick={() => {
                            if (confirm("Are you sure you want to cancel this trip? Sanchari simulation will credit ₹" + billing.totalPaid.toLocaleString() + " back to your wallet instantly.")) {
                              onCancelBooking(id);
                            }
                          }}
                        >
                          <Trash2 size={14} />
                          Cancel Journey
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
                        <ShieldCheck size={18} />
                        Simulated Credit Refund Complete
                      </div>
                    )}
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
