import React from 'react';
import { CheckCircle, Printer, Calendar, Plane, Hotel, ArrowRight, Train, Bus } from 'lucide-react';

export default function BookingConfirmation({ booking, setView }) {
  if (!booking) return null;
  
  const { id, type, item, searchParams, customizations, passenger, billing } = booking;
  const isHotel = type === 'hotels';
  const isPackage = type === 'packages';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="boarding-pass-wrapper" style={{ animation: 'slideUp 0.4s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <CheckCircle size={56} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-display)' }}>Booking Confirmed!</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Your itinerary is locked. We've sent a digital voucher copy to <strong>{passenger.email}</strong>.
        </p>
      </div>

      <div className="boarding-pass">
        <div className="boarding-pass-header" style={{ background: type === 'buses' ? 'rgba(46, 196, 182, 0.1)' : 'rgba(255, 94, 132, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isHotel ? (
              <Hotel size={20} />
            ) : type === 'trains' ? (
              <Train size={20} style={{ color: 'var(--primary)' }} />
            ) : type === 'buses' ? (
              <Bus size={20} style={{ color: 'var(--secondary)' }} />
            ) : (
              <Plane size={20} style={{ transform: 'rotate(45deg)' }} />
            )}
            <span style={{ fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              {isHotel ? 'Hotel Voucher' : isPackage ? 'Tour Package Pass' : type === 'trains' ? 'IRCTC E-Ticket' : type === 'buses' ? 'Bus Travel Ticket' : 'Boarding Pass'}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {isHotel ? 'CHECK-IN VOUCHER' : type === 'trains' ? 'INDIAN RAILWAYS E-TICKET' : type === 'buses' ? 'STATE/PRIVATE BUS TICKET' : 'BOARDING TICKET'}
          </div>
        </div>

        <div className="boarding-pass-body">
          {/* Main Route/Destination display */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {isHotel ? item.name : isPackage ? item.name : item.departure.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {isHotel ? item.location : isPackage ? 'Special Destination' : item.departure}
              </div>
            </div>
            
            {!isHotel && !isPackage && (
              <div style={{ color: type === 'buses' ? 'var(--secondary)' : 'var(--primary)' }}>
                <ArrowRight size={24} />
              </div>
            )}

            {!isHotel && !isPackage && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{item.arrival.split(' ')[0]}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.arrival}</div>
              </div>
            )}
          </div>

          <div className="pass-grid">
            <div>
              <div className="pass-field-label">Passenger</div>
              <div className="pass-field-val">{passenger.name}</div>
            </div>
            
            <div>
              <div className="pass-field-label">Dates / Schedule</div>
              <div className="pass-field-val">
                {isHotel ? searchParams.checkIn : isPackage ? searchParams.date : `${searchParams.date} (${item.departureTime})`}
              </div>
            </div>

            <div>
              <div className="pass-field-label">Reference ID</div>
              <div className="pass-field-val" style={{ fontFamily: 'monospace', color: type === 'buses' ? 'var(--secondary)' : 'var(--primary)' }}>
                {id.toUpperCase()}
              </div>
            </div>

            <div>
              <div className="pass-field-label">
                {isHotel ? 'Room Tier' : isPackage ? 'Duration' : type === 'trains' ? 'Coach / Berth' : type === 'buses' ? 'Bus Seat(s)' : 'Cabin Seat'}
              </div>
              <div className="pass-field-val">
                {isHotel ? (
                  customizations?.selectedRoom?.name || 'Deluxe'
                ) : isPackage ? (
                  `${item.durationDays} Days`
                ) : type === 'trains' ? (
                  `${searchParams.cabinClass === 'first' ? '1AC' : searchParams.cabinClass === 'business' ? '2AC' : '3AC'} (Berth: ${customizations?.selectedSeats?.join(', ')})`
                ) : type === 'buses' ? (
                  `${searchParams.cabinClass === 'business' ? 'AC Sleeper' : 'Luxury Seater'} (Seat: ${customizations?.selectedSeats?.join(', ')})`
                ) : (
                  `${searchParams.cabinClass.toUpperCase()} (Seat: ${customizations?.selectedSeats?.join(', ')})`
                )}
              </div>
            </div>

            <div>
              <div className="pass-field-label">Amount Paid</div>
              <div className="pass-field-val" style={{ color: 'var(--secondary)' }}>
                ₹{billing.totalPaid.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="pass-field-label">Status</div>
              <div className="pass-field-val" style={{ color: 'var(--secondary)' }}>
                Confirmed
              </div>
            </div>
          </div>
        </div>

        {/* Boarding Pass cutouts */}
        <div className="pass-divider">
          <div className="pass-dash-line"></div>
        </div>

        <div className="pass-barcode-area">
          <svg className="barcode-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            {/* Simple mock barcode */}
            <g fill="currentColor">
              <rect x="2" width="1" height="20" />
              <rect x="4" width="2" height="20" />
              <rect x="7" width="1" height="20" />
              <rect x="9" width="3" height="20" />
              <rect x="13" width="1" height="20" />
              <rect x="15" width="2" height="20" />
              <rect x="18" width="1" height="20" />
              <rect x="20" width="3" height="20" />
              <rect x="24" width="1" height="20" />
              <rect x="26" width="2" height="20" />
              <rect x="29" width="4" height="20" />
              <rect x="34" width="1" height="20" />
              <rect x="36" width="2" height="20" />
              <rect x="39" width="1" height="20" />
              <rect x="41" width="3" height="20" />
              <rect x="45" width="2" height="20" />
              <rect x="48" width="1" height="20" />
              <rect x="50" width="3" height="20" />
              <rect x="54" width="1" height="20" />
              <rect x="56" width="2" height="20" />
              <rect x="59" width="4" height="20" />
              <rect x="64" width="1" height="20" />
              <rect x="66" width="2" height="20" />
              <rect x="69" width="1" height="20" />
              <rect x="71" width="3" height="20" />
              <rect x="75" width="2" height="20" />
              <rect x="78" width="1" height="20" />
              <rect x="80" width="3" height="20" />
              <rect x="84" width="1" height="20" />
              <rect x="86" width="2" height="20" />
              <rect x="89" width="4" height="20" />
              <rect x="94" width="1" height="20" />
              <rect x="96" width="2" height="20" />
            </g>
          </svg>
          <div className="ticket-reference">{id.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
        <button className="action-btn btn-secondary" onClick={handlePrint}>
          <Printer size={18} />
          Print Ticket
        </button>
        <button className="action-btn" onClick={() => setView('dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
