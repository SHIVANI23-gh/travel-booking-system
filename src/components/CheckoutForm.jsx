import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Ticket, UserCheck, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ type, selectedItem, searchParams, customizations, onPaymentSuccess, onBack, profile }) {
  const travelers = searchParams.travelers || searchParams.guests || 1;
  const isHotel = type === 'hotels';
  const isPackage = type === 'packages';
  
  // Passenger Form State prefilled from Customer Profile
  const [passengerName, setPassengerName] = useState(profile?.name || '');
  const [passengerEmail, setPassengerEmail] = useState(profile?.email || '');
  const [passengerPhone, setPassengerPhone] = useState(profile?.phone || '');
  const [passportNumber, setPassportNumber] = useState('');
  
  // Billing/Card States
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Discount/Promo States
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percentage
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Calculations
  const getSubtotal = () => {
    if (isHotel) {
      const roomPrice = customizations?.selectedRoom?.price || selectedItem.price;
      // Calculate total nights
      const checkIn = new Date(searchParams.checkIn);
      const checkOut = new Date(searchParams.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return roomPrice * nights;
    } else if (isPackage) {
      return selectedItem.price * travelers;
    } else {
      // Flights, Trains, Buses
      const selectedClassKey = searchParams?.cabinClass || 'economy';
      const classPrice = selectedItem.cabinClasses?.[selectedClassKey]?.price || selectedItem.price;
      const baseCost = classPrice * travelers;
      const upgradeCost = customizations?.seatUpgradeCost || 0;
      return baseCost + upgradeCost;
    }
  };

  const subtotal = getSubtotal();
  const taxes = Math.round(subtotal * 0.08); // 8% taxes
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const total = subtotal + taxes - discountAmount;

  // Format Card Number
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Group by 4 digits
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  // Format Expiry Date
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  // Handle CVV input
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardCvv(value);
  };

  // Apply Coupon Code
  const applyPromo = () => {
    setCouponError('');
    setCouponSuccess('');
    
    if (couponCode.toUpperCase() === 'SANCHARI25') {
      setAppliedDiscount(25);
      setCouponSuccess('Promo SANCHARI25 applied: 25% discount!');
    } else {
      setCouponError('Invalid promotion code. Try SANCHARI25.');
    }
  };

  // Submit payment
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!passengerName || !passengerEmail || !passengerPhone) {
      alert('Please fill out the passenger credentials.');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16 || cardExpiry.length !== 5 || cardCvv.length !== 3) {
      alert('Please enter a valid credit card layout.');
      return;
    }

    onPaymentSuccess({
      passenger: {
        name: passengerName,
        email: passengerEmail,
        phone: passengerPhone,
        passport: passportNumber || 'N/A'
      },
      billing: {
        cardholder: cardName,
        totalPaid: total
      }
    });
  };

  return (
    <div className="container" style={{ animation: 'slideUp 0.4s ease-out' }}>
      <h2 className="screen-title" style={{ marginBottom: '8px' }}>Checkout & Billing</h2>
      <p className="screen-subtitle">Secure reservation system. Confirm your itinerary below.</p>

      <form onSubmit={handleCheckoutSubmit} className="checkout-layout">
        {/* Left Form: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Passenger Information */}
          <div className="checkout-box">
            <h3 className="checkout-section-title">
              <UserCheck size={20} style={{ color: 'var(--primary)' }} />
              Traveler Credentials
            </h3>
            
            <div className="checkout-form-grid">
              <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                <label>Primary Passenger Full Name</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="e.g. Johnathan Doe" 
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  required
                />
              </div>

              <div className="search-input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="john@example.com" 
                  value={passengerEmail}
                  onChange={(e) => setPassengerEmail(e.target.value)}
                  required
                />
              </div>

              <div className="search-input-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="+91 98765 43210" 
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  required
                />
              </div>

              {(!isHotel) && (
                <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>Passport / National ID Number</label>
                  <input 
                    type="text" 
                    className="search-input" 
                    style={{ paddingLeft: '16px' }}
                    placeholder="e.g. A99887766 or National ID" 
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Billing/Card Info */}
          <div className="checkout-box">
            <h3 className="checkout-section-title">
              <CreditCard size={20} style={{ color: 'var(--accent)' }} />
              Payment Details (Mock Simulator)
            </h3>
            
            {/* Interactive Credit Card */}
            <div className="card-preview-wrapper">
              <div 
                className={`credit-card-visual ${isCardFlipped ? 'flipped' : ''}`}
                onClick={() => setIsCardFlipped(!isCardFlipped)}
              >
                {/* Front face */}
                <div className="card-face front">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-chip"></div>
                    <div className="card-logo">SANCHARI</div>
                  </div>
                  <div className="card-number-display">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="card-footer">
                    <div>
                      <div className="card-label">Card Holder</div>
                      <div className="card-val">{cardName.toUpperCase() || 'YOUR NAME'}</div>
                    </div>
                    <div>
                      <div className="card-label">Expires</div>
                      <div className="card-val">{cardExpiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* Back face */}
                <div className="card-face back">
                  <div className="card-black-strip"></div>
                  <div className="card-signature-area">
                    <div className="card-cvv-val">{cardCvv || '•••'}</div>
                  </div>
                  <div style={{ padding: '0 24px', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: '20px', lineHeight: '1.3' }}>
                    This is a secure mock payment terminal. All entries are simulated client-side.
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-form-grid">
              <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="Cardholder Name" 
                  value={cardName}
                  onFocus={() => setIsCardFlipped(false)}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="search-input-group" style={{ gridColumn: 'span 2' }}>
                <label>Card Number</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="0000 0000 0000 0000" 
                  value={cardNumber}
                  onFocus={() => setIsCardFlipped(false)}
                  onChange={handleCardNumberChange}
                  required
                />
              </div>

              <div className="search-input-group">
                <label>Expiration Date</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="MM/YY" 
                  value={cardExpiry}
                  onFocus={() => setIsCardFlipped(false)}
                  onChange={handleExpiryChange}
                  required
                />
              </div>

              <div className="search-input-group">
                <label>CVV</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="•••" 
                  value={cardCvv}
                  onFocus={() => setIsCardFlipped(true)}
                  onBlur={() => setIsCardFlipped(false)}
                  onChange={handleCvvChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Form: Order Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="checkout-box" style={{ background: 'var(--bg-tertiary)' }}>
            <h3 className="checkout-section-title" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              Order Itinerary
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {isHotel || isPackage ? selectedItem.name : `${selectedItem.departure.split(' ')[0]} to ${selectedItem.arrival.split(' ')[0]}`}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isHotel ? (
                  `${searchParams.guests} Guest(s) • Room: ${customizations?.selectedRoom?.name || 'Deluxe'}`
                ) : isPackage ? (
                  `${searchParams.travelers} Guest(s) • ${selectedItem.durationDays} Days`
                ) : type === 'trains' ? (
                  `Train: ${selectedItem.name} (${selectedItem.code}) • Class: ${searchParams.cabinClass === 'first' ? 'AC First Class' : searchParams.cabinClass === 'business' ? 'AC 2 Tier' : 'AC 3 Tier'} • Berth: ${customizations?.selectedSeats?.join(', ')}`
                ) : type === 'buses' ? (
                  `Bus: ${selectedItem.operator} • Type: ${selectedItem.type} • Seats: ${customizations?.selectedSeats?.join(', ')}`
                ) : (
                  `Flight Class: ${searchParams.cabinClass.toUpperCase()} • Seat: ${customizations?.selectedSeats?.join(', ')}`
                )}
              </div>
            </div>

            <div className="order-summary-list">
              <div className="summary-item">
                <span>Base Fare</span>
                <span>₹{(isHotel ? (customizations?.selectedRoom?.price || selectedItem.price) : (selectedItem.cabinClasses?.[searchParams?.cabinClass || 'economy']?.price || selectedItem.price)).toLocaleString()} {isHotel ? '/ night' : `x ${travelers}`}</span>
              </div>
              
              {!isHotel && !isPackage && (customizations?.seatUpgradeCost > 0) && (
                <div className="summary-item">
                  <span>Seat Upgrades</span>
                  <span>+₹{customizations.seatUpgradeCost.toLocaleString()}</span>
                </div>
              )}

              <div className="summary-item">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="summary-item">
                <span>Taxes & Fees (8%)</span>
                <span>+₹{taxes.toLocaleString()}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="summary-item" style={{ color: 'var(--secondary)' }}>
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="summary-item total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="coupon-section">
              <input 
                type="text" 
                className="search-input" 
                style={{ paddingLeft: '16px', height: '42px' }}
                placeholder="PROMO CODE" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button 
                type="button" 
                className="action-btn btn-secondary" 
                style={{ height: '42px', padding: '0 16px' }}
                onClick={applyPromo}
              >
                Apply
              </button>
            </div>
            
            {couponError && (
              <div style={{ display: 'flex', gap: '6px', color: 'var(--danger)', fontSize: '0.8rem', marginBottom: '16px', alignItems: 'center' }}>
                <AlertCircle size={14} />
                <span>{couponError}</span>
              </div>
            )}
            
            {couponSuccess && (
              <div style={{ display: 'flex', gap: '6px', color: 'var(--secondary)', fontSize: '0.8rem', marginBottom: '16px', alignItems: 'center' }}>
                <Ticket size={14} />
                <span>{couponSuccess}</span>
              </div>
            )}

            <button type="submit" className="action-btn" style={{ width: '100%' }}>
              <ShieldCheck size={18} />
              Confirm & Book (₹{total.toLocaleString()})
            </button>
            
            <button 
              type="button" 
              className="action-btn btn-secondary" 
              style={{ width: '100%', marginTop: '12px' }} 
              onClick={onBack}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
