import React, { useState } from 'react';
import { Armchair, Check, Users, Coffee, Waves, Wifi, Tv } from 'lucide-react';

export default function SeatSelector({ type, selectedItem, searchParams, onConfirm, onBack }) {
  const travelers = searchParams.travelers || searchParams.guests || 1;
  
  // Seat Selector States (Flights)
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Room Selector State (Hotels)
  const [selectedRoom, setSelectedRoom] = useState(selectedItem?.rooms?.[0]?.id || null);

  // Mock flight seat availability
  const rows = [
    { num: 1, type: 'first' },
    { num: 2, type: 'first' },
    { num: 3, type: 'first' },
    { num: 4, type: 'business' },
    { num: 5, type: 'business' },
    { num: 6, type: 'business' },
    { num: 7, type: 'economy' },
    { num: 8, type: 'economy' },
    { num: 9, type: 'economy' },
    { num: 10, type: 'economy' },
    { num: 11, type: 'economy' },
    { num: 12, type: 'economy' }
  ];
  
  const seatsInRow = ['A', 'B', 'C', 'aisle', 'D', 'E', 'F'];
  const occupiedSeats = ['1B', '2E', '4C', '5A', '5F', '8B', '9E', '11C', '12F'];

  const getSeatPremium = (seatType) => {
    if (seatType === 'first') return 1500;
    if (seatType === 'business') return 750;
    return 0;
  };

  const handleSeatClick = (seatCode, seatType) => {
    if (occupiedSeats.includes(seatCode)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatCode)) {
        return prev.filter(s => s !== seatCode);
      }
      if (prev.length >= travelers) {
        // If maxed, remove first and add new one
        return [...prev.slice(1), seatCode];
      }
      return [...prev, seatCode];
    });
  };

  const getSeatClassPrice = () => {
    let extra = 0;
    selectedSeats.forEach(seat => {
      const rowNum = parseInt(seat);
      const rowData = rows.find(r => r.num === rowNum);
      if (rowData) {
        extra += getSeatPremium(rowData.type);
      }
    });
    return extra;
  };

  const handleConfirmFlightSeats = () => {
    if (selectedSeats.length !== travelers) {
      alert(`Please select exactly ${travelers} seat(s) for your passenger(s).`);
      return;
    }
    onConfirm({
      selectedSeats,
      seatUpgradeCost: getSeatClassPrice()
    });
  };

  const handleConfirmHotelRoom = () => {
    const room = selectedItem.rooms.find(r => r.id === selectedRoom);
    onConfirm({
      selectedRoom: room
    });
  };

  // Occupied definitions
  const occupiedBerths = ['3', '4', '8', '11', '12', '16', '19', '20'];
  const occupiedBusSeats = ['L2', 'L5', 'L9', 'U1', 'U8', 'U12'];

  const handleConfirmTrainBerths = () => {
    if (selectedSeats.length !== travelers) {
      alert(`Please select exactly ${travelers} berth(s) for your journey.`);
      return;
    }
    onConfirm({
      selectedSeats,
      seatUpgradeCost: 0
    });
  };

  const handleConfirmBusSeats = () => {
    if (selectedSeats.length !== travelers) {
      alert(`Please select exactly ${travelers} seat(s) for your trip.`);
      return;
    }
    onConfirm({
      selectedSeats,
      seatUpgradeCost: 0
    });
  };

  return (
    <div className="container">
      {/* FLIGHT SEAT SELECTOR */}
      {type === 'flights' && (
        <div className="seat-selection-container" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <h2 className="screen-title">Choose Flight Seats</h2>
          <p className="screen-subtitle">
            Please select <strong>{travelers} seat(s)</strong>. {selectedSeats.length} of {travelers} selected.
          </p>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--accent)' }}></div>
              <span>First Class (+₹1,500)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--primary)' }}></div>
              <span>Business Class (+₹750)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}></div>
              <span>Economy (+₹0)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
              <span>Occupied</span>
            </div>
          </div>

          <div className="airplane-layout">
            {rows.map((row) => (
              <div key={row.num} className="seat-row">
                <span className="seat-row-number">{row.num}</span>
                {seatsInRow.map((seatCol, idx) => {
                  if (seatCol === 'aisle') {
                    return <div key="aisle" className="seat-aisle"></div>;
                  }
                  
                  const seatCode = `${row.num}${seatCol}`;
                  const isOccupied = occupiedSeats.includes(seatCode);
                  const isSelected = selectedSeats.includes(seatCode);
                  
                  return (
                    <button
                      type="button"
                      key={seatCol}
                      onClick={() => handleSeatClick(seatCode, row.type)}
                      className={`seat ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''} ${row.type === 'first' ? 'first-class' : row.type === 'business' ? 'business-class' : ''}`}
                      disabled={isOccupied}
                      title={isOccupied ? 'Occupied' : `Seat ${seatCode}`}
                    >
                      {seatCol}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
            <button type="button" className="action-btn btn-secondary" onClick={onBack}>
              Back to Listings
            </button>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Seat Upgrade Charges:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>
                +₹{getSeatClassPrice().toLocaleString()}
              </div>
              <button type="button" className="action-btn" onClick={handleConfirmFlightSeats}>
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOTEL ROOM SELECTOR */}
      {type === 'hotels' && (
        <div className="seat-selection-container" style={{ maxWidth: '800px', animation: 'slideUp 0.4s ease-out' }}>
          <h2 className="screen-title">Choose Room Preference</h2>
          <p className="screen-subtitle">Select the perfect lodging option for {travelers} guest(s).</p>

          <div className="rooms-grid">
            {selectedItem.rooms.map((room) => {
              const isSelected = selectedRoom === room.id;
              return (
                <div 
                  key={room.id}
                  className={`room-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', color: isSelected ? 'var(--secondary)' : 'var(--text-muted)' }}>
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{room.name}</h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Wifi size={12} /> Free WiFi
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Coffee size={12} /> Free Breakfast
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Tv size={12} /> UHD TV
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px', marginTop: '8px', display: 'inline-block' }}>
                        Fits up to {room.maxOccupancy} Guests
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{room.price.toLocaleString()}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/night</span>
                    </div>
                    {isSelected ? (
                      <span style={{ background: 'var(--secondary)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyAlignment: 'center', padding: '4px' }}>
                        <Check size={16} />
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Select Tier</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', marginTop: '32px' }}>
            <button type="button" className="action-btn btn-secondary" onClick={onBack}>
              Back to Listings
            </button>
            <button type="button" className="action-btn" onClick={handleConfirmHotelRoom}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* TRAIN BERTH SELECTOR */}
      {type === 'trains' && (
        <div className="seat-selection-container" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <h2 className="screen-title">Choose Coach Berths</h2>
          <p className="screen-subtitle">
            Please select <strong>{travelers} berth(s)</strong>. {selectedSeats.length} of {travelers} selected.
          </p>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--primary)' }}></div>
              <span>Selected Berth</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}></div>
              <span>Available Berth</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'rgba(0, 0, 0, 0.05)' }}></div>
              <span>Booked / Occupied</span>
            </div>
          </div>

          <div className="train-bays-container">
            {[
              { bay: "Bay 1", start: 1 },
              { bay: "Bay 2", start: 9 },
              { bay: "Bay 3", start: 17 }
            ].map(bayInfo => {
              const classCode = searchParams?.cabinClass || 'economy';
              const isBusiness = classCode === 'business'; // AC 2-Tier: LB/UB + SL/SU (6 berths per bay)
              const berthsCount = isBusiness ? 6 : 8;
              
              return (
                <div key={bayInfo.bay} className="train-bay">
                  <div className="train-bay-title">
                    <span>{bayInfo.bay} Compartment</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                      {isBusiness ? 'AC 2-Tier Coach (2A)' : 'AC 3-Tier Coach (3A)'}
                    </span>
                  </div>

                  {/* Left Side Cabin Berths */}
                  <div className="berth-group">
                    {isBusiness ? (
                      <>
                        {/* 2A: LB, UB */}
                        {[
                          { num: String(bayInfo.start), label: "Lower" },
                          { num: String(bayInfo.start + 1), label: "Upper" }
                        ].map(b => {
                          const isOccupied = occupiedBerths.includes(b.num);
                          const isSelected = selectedSeats.includes(b.num);
                          return (
                            <div 
                              key={b.num}
                              onClick={() => !isOccupied && handleSeatClick(b.num, 'train')}
                              className={`berth-cell ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                            >
                              <span>{b.num}</span>
                              <span className="berth-label">{b.label}</span>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {/* 3A: LB, MB, UB */}
                        {[
                          { num: String(bayInfo.start), label: "Lower" },
                          { num: String(bayInfo.start + 1), label: "Middle" },
                          { num: String(bayInfo.start + 2), label: "Upper" }
                        ].map(b => {
                          const isOccupied = occupiedBerths.includes(b.num);
                          const isSelected = selectedSeats.includes(b.num);
                          return (
                            <div 
                              key={b.num}
                              onClick={() => !isOccupied && handleSeatClick(b.num, 'train')}
                              className={`berth-cell ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                            >
                              <span>{b.num}</span>
                              <span className="berth-label">{b.label}</span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="train-walkway">Walkway</div>

                  {/* Right Side Cabin Berths */}
                  <div className="berth-group">
                    {isBusiness ? (
                      <>
                        {/* 2A: LB, UB */}
                        {[
                          { num: String(bayInfo.start + 2), label: "Lower" },
                          { num: String(bayInfo.start + 3), label: "Upper" }
                        ].map(b => {
                          const isOccupied = occupiedBerths.includes(b.num);
                          const isSelected = selectedSeats.includes(b.num);
                          return (
                            <div 
                              key={b.num}
                              onClick={() => !isOccupied && handleSeatClick(b.num, 'train')}
                              className={`berth-cell ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                            >
                              <span>{b.num}</span>
                              <span className="berth-label">{b.label}</span>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        {/* 3A: LB, MB, UB */}
                        {[
                          { num: String(bayInfo.start + 3), label: "Lower" },
                          { num: String(bayInfo.start + 4), label: "Middle" },
                          { num: String(bayInfo.start + 5), label: "Upper" }
                        ].map(b => {
                          const isOccupied = occupiedBerths.includes(b.num);
                          const isSelected = selectedSeats.includes(b.num);
                          return (
                            <div 
                              key={b.num}
                              onClick={() => !isOccupied && handleSeatClick(b.num, 'train')}
                              className={`berth-cell ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                            >
                              <span>{b.num}</span>
                              <span className="berth-label">{b.label}</span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="train-walkway">Aisle</div>

                  {/* Side Berths */}
                  <div className="berth-group">
                    {[
                      { num: String(bayInfo.start + (isBusiness ? 4 : 6)), label: "Side Lower" },
                      { num: String(bayInfo.start + (isBusiness ? 5 : 7)), label: "Side Upper" }
                    ].map(b => {
                      const isOccupied = occupiedBerths.includes(b.num);
                      const isSelected = selectedSeats.includes(b.num);
                      return (
                        <div 
                          key={b.num}
                          onClick={() => !isOccupied && handleSeatClick(b.num, 'train')}
                          className={`berth-cell ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                        >
                          <span>{b.num}</span>
                          <span className="berth-label">{b.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', marginTop: '24px' }}>
            <button type="button" className="action-btn btn-secondary" onClick={onBack}>
              Back to Listings
            </button>
            <button type="button" className="action-btn" onClick={handleConfirmTrainBerths}>
              Confirm Berths
            </button>
          </div>
        </div>
      )}

      {/* BUS SEAT SELECTOR */}
      {type === 'buses' && (
        <div className="seat-selection-container" style={{ animation: 'slideUp 0.4s ease-out' }}>
          <h2 className="screen-title">Choose Bus Seats</h2>
          <p className="screen-subtitle">
            Please select <strong>{travelers} seat(s)</strong>. {selectedSeats.length} of {travelers} selected.
          </p>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--secondary)' }}></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: 'rgba(0, 0, 0, 0.05)' }}></div>
              <span>Booked</span>
            </div>
          </div>

          <div className="bus-decks-container">
            {/* LOWER DECK */}
            <div className="bus-deck">
              <div className="bus-deck-title">Lower Deck</div>
              <div className="bus-driver-area">
                <span>🚍 Driver Cabin</span>
                <span>Steer Wheel</span>
              </div>
              <div className="bus-grid">
                {[
                  { num: "L1", type: "sleeper" }, { num: "L2", type: "sleeper" },
                  { num: "L3", type: "sleeper" }, { num: "L4", type: "sleeper" },
                  { num: "L5", type: "sleeper" }, { num: "L6", type: "sleeper" },
                  { num: "L7", type: "sleeper" }, { num: "L8", type: "sleeper" }
                ].map((s, idx) => {
                  const isOccupied = occupiedBusSeats.includes(s.num);
                  const isSelected = selectedSeats.includes(s.num);
                  const isAisle = idx % 2 === 1 && idx !== 7;
                  
                  return (
                    <React.Fragment key={s.num}>
                      <button
                        type="button"
                        onClick={() => !isOccupied && handleSeatClick(s.num, 'bus')}
                        className={`bus-seat sleeper ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                        disabled={isOccupied}
                      >
                        <span>{s.num}</span>
                        <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>Sleeper</span>
                      </button>
                      {isAisle && <div className="bus-aisle-space"></div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* UPPER DECK */}
            <div className="bus-deck">
              <div className="bus-deck-title">Upper Deck</div>
              <div className="bus-driver-area" style={{ opacity: 0.5 }}>
                <span>🌅 Vista Window</span>
                <span>Upper Berth Area</span>
              </div>
              <div className="bus-grid">
                {[
                  { num: "U1", type: "sleeper" }, { num: "U2", type: "sleeper" },
                  { num: "U3", type: "sleeper" }, { num: "U4", type: "sleeper" },
                  { num: "U5", type: "sleeper" }, { num: "U6", type: "sleeper" },
                  { num: "U7", type: "sleeper" }, { num: "U8", type: "sleeper" }
                ].map((s, idx) => {
                  const isOccupied = occupiedBusSeats.includes(s.num);
                  const isSelected = selectedSeats.includes(s.num);
                  const isAisle = idx % 2 === 1 && idx !== 7;
                  
                  return (
                    <React.Fragment key={s.num}>
                      <button
                        type="button"
                        onClick={() => !isOccupied && handleSeatClick(s.num, 'bus')}
                        className={`bus-seat sleeper ${isOccupied ? 'occupied' : 'available'} ${isSelected ? 'selected' : ''}`}
                        disabled={isOccupied}
                      >
                        <span>{s.num}</span>
                        <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>Sleeper</span>
                      </button>
                      {isAisle && <div className="bus-aisle-space"></div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px', marginTop: '24px' }}>
            <button type="button" className="action-btn btn-secondary" onClick={onBack}>
              Back to Listings
            </button>
            <button type="button" className="action-btn" style={{ background: 'var(--secondary)' }} onClick={handleConfirmBusSeats}>
              Confirm Seats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
