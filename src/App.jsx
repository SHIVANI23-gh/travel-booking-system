import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchFilters from './components/SearchFilters';
import ListingGrid from './components/ListingGrid';
import SeatSelector from './components/SeatSelector';
import CheckoutForm from './components/CheckoutForm';
import BookingConfirmation from './components/BookingConfirmation';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { Star, ShieldCheck, MapPin, Compass, Heart } from 'lucide-react';

import { 
  mockFlights, 
  mockTrains,
  mockBuses,
  mockHotels, 
  mockPackages, 
  mockTestimonials, 
  faqList 
} from './data/mockData';

export default function App() {
  // Navigation / Router state: search, results, customize, checkout, confirmation, dashboard, wishlist
  const [view, setView] = useState('search');
  const [searchType, setSearchType] = useState('flights'); // flights, hotels, packages
  const [searchParams, setSearchParams] = useState(null);
  
  // Simulated Server Connection State
  const [isConnectingToServer, setIsConnectingToServer] = useState(false);
  const [connectionStepText, setConnectionStepText] = useState('');

  // Selected booking flow items
  const [selectedItem, setSelectedItem] = useState(null);
  const [customizations, setCustomizations] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);

  // Global Bookings list (stored in LocalStorage)
  const [bookings, setBookings] = useState([]);

  // Favorites/Wishlist state
  const [favorites, setFavorites] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sanchari_travels_is_logged_in') === 'true';
  });

  // Personal profile state
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('sanchari_travels_profile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      avatar: ''
    };
  });

  // Dynamic reviews state
  const [testimonials, setTestimonials] = useState(mockTestimonials);

  // Testimonials review form state
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', rating: 5, comment: '' });

  // Results page filter state
  const [filters, setFilters] = useState({
    maxPrice: 30000,
    ratings: [],
    stops: [],
    amenities: []
  });
  
  const [sortBy, setSortBy] = useState('price-low'); // price-low, price-high, rating

  // Load user data when logged in
  useEffect(() => {
    if (isLoggedIn && profile?.email) {
      // Load bookings scoped by email
      const userBookingsKey = `sanchari_travels_bookings_${profile.email.toLowerCase()}`;
      const savedBookings = localStorage.getItem(userBookingsKey);
      setBookings(savedBookings ? JSON.parse(savedBookings) : []);

      // Load favorites scoped by email
      const userFavoritesKey = `sanchari_travels_favorites_${profile.email.toLowerCase()}`;
      const savedFavorites = localStorage.getItem(userFavoritesKey);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    } else {
      setBookings([]);
      setFavorites([]);
    }
  }, [isLoggedIn, profile?.email]);

  // Load reviews globally on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('sanchari_travels_reviews');
    if (savedReviews) {
      setTestimonials(JSON.parse(savedReviews));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setProfile(userData);
    setIsLoggedIn(true);
    localStorage.setItem('sanchari_travels_is_logged_in', 'true');
    localStorage.setItem('sanchari_travels_profile', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile({
      name: '',
      email: '',
      phone: '',
      avatar: ''
    });
    localStorage.removeItem('sanchari_travels_is_logged_in');
    localStorage.removeItem('sanchari_travels_profile');
    setView('search'); // Reset view to search page
  };

  // Save bookings to localStorage
  const saveBookings = (newBookings) => {
    setBookings(newBookings);
    if (profile?.email) {
      const userBookingsKey = `sanchari_travels_bookings_${profile.email.toLowerCase()}`;
      localStorage.setItem(userBookingsKey, JSON.stringify(newBookings));
    }
  };

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    if (profile?.email) {
      const userFavoritesKey = `sanchari_travels_favorites_${profile.email.toLowerCase()}`;
      localStorage.setItem(userFavoritesKey, JSON.stringify(newFavorites));
    }
  };

  const handleToggleFavorite = (item, itemType) => {
    const exists = favorites.some(fav => fav.id === item.id && fav.type === itemType);
    let updated;
    if (exists) {
      updated = favorites.filter(fav => !(fav.id === item.id && fav.type === itemType));
    } else {
      updated = [...favorites, { ...item, type: itemType }];
    }
    saveFavorites(updated);
  };

  const handleAddReview = (newReview) => {
    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('sanchari_travels_reviews', JSON.stringify(updated));
  };

  const handleBookFromWishlist = (item) => {
    setSearchType(item.type);
    setSelectedItem(item);
    setCustomizations(null);
    
    // Set safe defaults for search parameters so customize and checkout screens operate properly
    const dateVal = "2026-07-15";
    const checkInVal = "2026-07-15";
    const checkOutVal = "2026-07-22";

    setSearchParams({
      type: item.type,
      from: item.type === 'trains' ? 'DEL (New Delhi RS)' : item.type === 'buses' ? 'BLR (Kempegowda BS)' : 'DEL (New Delhi)',
      to: item.type === 'trains' ? 'BOM (Mumbai Central)' : item.type === 'buses' ? 'COK (Kochi Bus Stand)' : 'GOI (Goa)',
      date: dateVal,
      checkIn: checkInVal,
      checkOut: checkOutVal,
      travelers: 1,
      guests: 1,
      cabinClass: 'economy'
    });

    if (item.type === 'packages') {
      setView('checkout');
    } else {
      setView('customize');
    }
  };

  const handleUpdateProfile = (newProfileData) => {
    const updated = { ...profile, ...newProfileData };
    setProfile(updated);
    localStorage.setItem('sanchari_travels_profile', JSON.stringify(updated));
  };

  // Search Submit handler
  const handleSearch = (params) => {
    setSearchParams(params);
    setSearchType(params.type);
    
    // Reset filters for new search types
    setFilters({
      maxPrice: 
        params.type === 'flights' ? 30000 : 
        params.type === 'hotels' ? 90000 : 
        params.type === 'packages' ? 95000 : 
        params.type === 'trains' ? 10000 : 
        5000,
      ratings: [],
      stops: [],
      amenities: []
    });
    setSortBy('price-low');
    
    // Simulating Secure Server Handshakes
    setIsConnectingToServer(true);
    let steps = [];
    if (params.type === 'flights') {
      steps = [
        "📡 Initiating handshake with Sanchari reservation nodes...",
        "✈️ Verifying Vistara, IndiGo & Air India live flight seats...",
        "🏨 Checking room availability at Taj & Leela Palaces...",
        "💸 Fetching real-time tariffs & validating taxes database...",
        "🔒 Connection secured via SSL. Syncing local ticket buffers...",
        "✅ Sync complete! Opening search console..."
      ];
    } else if (params.type === 'hotels') {
      steps = [
        "📡 Querying global hotel endpoints for Indian cities...",
        "🏨 Scanning live room availability at Taj Resorts & Leela Palace...",
        "🏊 Checking amenities status (WiFi, private pools, beachfronts)...",
        "💸 Resolving seasonal discount tariffs & taxes...",
        "🔒 SSL tunnel active. Fetching luxury suite listings...",
        "✅ Rooms loaded successfully!"
      ];
    } else if (params.type === 'packages') {
      steps = [
        "📡 Connecting to tourism packages database...",
        "🌴 Bundling flight logs with Taj hotel suites reservations...",
        "⛵ Querying local tour guides and private yacht itineraries...",
        "💸 Applying up to 25% package discounts & pricing...",
        "🔒 Encryption complete. Synced holiday itinerary bundles...",
        "✅ Special deals ready!"
      ];
    } else if (params.type === 'trains') {
      steps = [
        "📡 Connecting to IRCTC Central Railway database servers...",
        "🚂 Querying train schedules & platforms for Delhi/Mumbai/Jaipur...",
        "🛤️ Checking AC coach availability (3A, 2A, 1A) on Rajdhani...",
        "💸 Validating dynamic pricing quotas & concession tariffs...",
        "🔒 Local token synced with station booking terminal...",
        "✅ Railway seat charts ready!"
      ];
    } else if (params.type === 'buses') {
      steps = [
        "📡 Accessing State Transport (MSRTC/KSRTC) terminal APIs...",
        "🚌 Scanning sleeper/seater berth grids on private Volvo fleets...",
        "🛣️ Exchanging route schedules, boarding gates & pickup points...",
        "💸 Resolving passenger insurance & local tollway fees...",
        "🔒 Connection secure. Cached local bus inventory loaded...",
        "✅ Bus boarding deck ready!"
      ];
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setConnectionStepText(step);
        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsConnectingToServer(false);
            setView('results');
          }, 300);
        }
      }, idx * 450);
    });
  };

  // Select Item for Booking (flight / hotel / package)
  const handleSelectListing = (item) => {
    setSelectedItem(item);
    setCustomizations(null);

    if (searchType === 'packages') {
      // Packages skip customizing seats, direct to checkout
      setView('checkout');
    } else {
      setView('customize');
    }
  };

  // Confirm Customizations (Seats/Rooms)
  const handleConfirmCustomizations = (customData) => {
    setCustomizations(customData);
    setView('checkout');
  };

  // Successful Checkout confirmation
  const handleCheckoutSuccess = (data) => {
    const newBooking = {
      id: 'bk-' + Math.random().toString(36).substr(2, 6),
      type: searchType,
      item: selectedItem,
      searchParams: searchParams,
      customizations: customizations,
      passenger: data.passenger,
      billing: data.billing,
      status: 'confirmed',
      bookingDate: new Date().toLocaleDateString()
    };

    const updatedBookings = [newBooking, ...bookings];
    saveBookings(updatedBookings);
    setLastBooking(newBooking);
    setView('confirmation');
  };

  // Cancellation Simulation
  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'canceled' };
      }
      return b;
    });
    saveBookings(updatedBookings);
  };

  // Edit Passenger Name Simulation
  const handleEditTraveler = (bookingId, newName) => {
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          passenger: { ...b.passenger, name: newName }
        };
      }
      return b;
    });
    saveBookings(updatedBookings);
  };

  // Get active listings matching search criteria and filters
  const getFilteredListings = () => {
    let rawList = [];
    if (searchType === 'flights') {
      rawList = [...mockFlights];
      // Filter by departure match if specified
      if (searchParams?.from) {
        rawList = rawList.filter(f => 
          f.departure.toLowerCase().includes(searchParams.from.split(' ')[0].toLowerCase())
        );
      }
      if (searchParams?.to) {
        rawList = rawList.filter(f => 
          f.arrival.toLowerCase().includes(searchParams.to.split(' ')[0].toLowerCase())
        );
      }
      // Apply filters
      rawList = rawList.filter(f => f.price <= filters.maxPrice);
      if (filters.stops.length > 0) {
        rawList = rawList.filter(f => filters.stops.includes(f.stops));
      }
    } else if (searchType === 'hotels') {
      rawList = [...mockHotels];
      // Filter by location
      if (searchParams?.destination) {
        rawList = rawList.filter(h => 
          h.location.toLowerCase().includes(searchParams.destination.split(',')[0].trim().toLowerCase())
        );
      }
      // Apply filters
      rawList = rawList.filter(h => h.price <= filters.maxPrice);
      if (filters.ratings.length > 0) {
        rawList = rawList.filter(h => {
          const starVal = Math.floor(h.rating);
          return filters.ratings.some(r => starVal >= r);
        });
      }
      if (filters.amenities.length > 0) {
        rawList = rawList.filter(h => 
          filters.amenities.every(amenity => h.amenities.includes(amenity))
        );
      }
    } else if (searchType === 'packages') {
      rawList = [...mockPackages];
      if (searchParams?.destination) {
        rawList = rawList.filter(p => 
          p.name.toLowerCase().includes(searchParams.destination.split(',')[0].trim().toLowerCase()) ||
          p.description.toLowerCase().includes(searchParams.destination.toLowerCase())
        );
      }
      // Apply filters
      rawList = rawList.filter(p => p.price <= filters.maxPrice);
      if (filters.ratings.length > 0) {
        rawList = rawList.filter(p => {
          const starVal = Math.floor(p.rating);
          return filters.ratings.some(r => starVal >= r);
        });
      }
    } else if (searchType === 'trains') {
      rawList = [...mockTrains];
      if (searchParams?.from) {
        rawList = rawList.filter(t => 
          t.departure.toLowerCase().includes(searchParams.from.toLowerCase()) ||
          t.departure.toLowerCase().includes(searchParams.from.split(' ')[0].toLowerCase())
        );
      }
      if (searchParams?.to) {
        rawList = rawList.filter(t => 
          t.arrival.toLowerCase().includes(searchParams.to.toLowerCase()) ||
          t.arrival.toLowerCase().includes(searchParams.to.split(' ')[0].toLowerCase())
        );
      }
      // Apply filters
      rawList = rawList.filter(t => t.price <= filters.maxPrice);
      if (filters.ratings.length > 0) {
        rawList = rawList.filter(t => {
          const starVal = Math.floor(t.rating);
          return filters.ratings.some(r => starVal >= r);
        });
      }
    } else if (searchType === 'buses') {
      rawList = [...mockBuses];
      if (searchParams?.from) {
        rawList = rawList.filter(b => 
          b.departure.toLowerCase().includes(searchParams.from.toLowerCase()) ||
          b.departure.toLowerCase().includes(searchParams.from.split(' ')[0].toLowerCase())
        );
      }
      if (searchParams?.to) {
        rawList = rawList.filter(b => 
          b.arrival.toLowerCase().includes(searchParams.to.toLowerCase()) ||
          b.arrival.toLowerCase().includes(searchParams.to.split(' ')[0].toLowerCase())
        );
      }
      // Apply filters
      rawList = rawList.filter(b => b.price <= filters.maxPrice);
      if (filters.ratings.length > 0) {
        rawList = rawList.filter(b => {
          const starVal = Math.floor(b.rating);
          return filters.ratings.some(r => starVal >= r);
        });
      }
      if (filters.amenities.length > 0) {
        rawList = rawList.filter(b => {
          return filters.amenities.every(opType => {
            if (opType === 'State Transport') return b.operator.includes('(State Transport)');
            if (opType === 'Private Fleet') return !b.operator.includes('(State Transport)');
            return true;
          });
        });
      }
    }

    // Sort listings
    if (sortBy === 'price-low') {
      rawList.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      rawList.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      rawList.sort((a, b) => b.rating - a.rating);
    }

    return rawList;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.role.trim() || !reviewForm.comment.trim()) {
      alert("Please fill out all fields.");
      return;
    }
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    ];
    const newReview = {
      id: 'rev-' + Math.random().toString(36).substr(2, 6),
      name: reviewForm.name,
      role: reviewForm.role,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      avatar: avatars[Math.floor(Math.random() * avatars.length)]
    };
    handleAddReview(newReview);
    setReviewForm({ name: '', role: '', rating: 5, comment: '' });
    alert("Thank you! Your review has been saved successfully.");
  };

  const filteredListings = getFilteredListings();
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  if (!isLoggedIn) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app-container">
      {/* Live Server Connecting Simulation Screen */}
      {isConnectingToServer && (
        <div className="server-connecting-screen">
          <div className="server-connecting-box">
            <div className="server-pulse-icon">
              <Compass size={38} className="loading-spinner-icon" style={{ animation: 'float 2s ease-in-out infinite' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>
              Connecting to Reservation Terminals...
            </h3>
            <div className="server-progress-bar">
              <div className="server-progress-fill"></div>
            </div>
            <div className="server-step-text">
              {connectionStepText}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              SSL Secure Handshake • API Version 4.1.2 • Sanchari Travels Cloud Engine
            </p>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar 
        currentView={view} 
        setView={setView} 
        bookingsCount={activeBookingsCount} 
        favoritesCount={favorites.length}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {view === 'search' && (
          <>
            <HeroSection onSearch={handleSearch} />
            
            {/* Featured Destinations Section */}
            <section className="container" style={{ padding: '80px 0' }}>
              <div className="section-header">
                <span className="section-tag">POPULAR GETAWAYS</span>
                <h2 className="section-title">Trending Destinations</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginTop: '40px' }}>
                {[
                  { name: "Goa", tag: "Beach Paradise", desc: "Soak in pristine sandy coastlines, private pool villas, and fresh seafood.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", price: "₹15,500/night" },
                  { name: "Mumbai", tag: "Urban Luxury", desc: "Experience historic Colaba architecture, Marine Drive, and Gateway views.", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80", price: "₹18,000/night" },
                  { name: "Srinagar (Kashmir)", tag: "Mountain Adventure", desc: "Cozy pine woods, gondola ride cable cars, and ski slopes of Gulmarg.", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&q=80", price: "₹14,500/night" },
                  { name: "Jaipur", tag: "Royal Heritage", desc: "Stay at imperial Maharaja palaces and explore historic Amer forts.", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80", price: "₹22,000/night" }
                ].map((dest, idx) => (
                  <div key={idx} className="package-card" style={{ cursor: 'pointer' }} onClick={() => handleSearch({ type: 'hotels', destination: dest.name, checkIn: '2026-07-15', checkOut: '2026-07-22', guests: 2 })}>
                    <div className="package-img-wrapper" style={{ height: '180px' }}>
                      <img src={dest.img} alt={dest.name} className="package-img" />
                      <span className="hotel-tag" style={{ color: 'var(--primary)', borderColor: 'rgba(255, 94, 132, 0.3)' }}>{dest.tag}</span>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{dest.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>{dest.desc}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From {dest.price}</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Explore resorts →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
              <div className="container">
                <div className="section-header">
                  <span className="section-tag">TESTIMONIALS</span>
                  <h2 className="section-title">What Our Travelers Say</h2>
                </div>
                <div className="testimonials-grid">
                  {testimonials.map((t) => (
                    <div key={t.id} className="testimonial-card">
                      <div>
                        <div style={{ display: 'flex', gap: '2px', color: 'var(--warning)', marginBottom: '16px' }}>
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={16} style={{ fill: 'currentColor' }} />
                          ))}
                        </div>
                        <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                          "{t.comment}"
                        </p>
                      </div>
                      <div className="testimonial-user">
                        <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                        <div>
                          <div className="testimonial-name">{t.name}</div>
                          <div className="testimonial-role">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Add Review Form */}
                <div className="add-review-form" style={{ marginTop: '50px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '32px', borderRadius: '16px', maxWidth: '600px', margin: '50px auto 0 auto', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>Share Your Experience</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Help other travelers map out their vacations by reviewing Sanchari Travels.</p>
                  
                  <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Aditya Sen" 
                          value={reviewForm.name} 
                          onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                          className="search-input" 
                          style={{ padding: '8px 12px', height: '40px', fontSize: '0.9rem', width: '100%', borderRadius: '8px' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Traveler Persona (e.g. Backpacker)</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Frequent Flyer" 
                          value={reviewForm.role} 
                          onChange={(e) => setReviewForm(prev => ({ ...prev, role: e.target.value }))}
                          className="search-input" 
                          style={{ padding: '8px 12px', height: '40px', fontSize: '0.9rem', width: '100%', borderRadius: '8px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Star Rating</label>
                      <div style={{ display: 'flex', gap: '6px', color: 'var(--warning)', cursor: 'pointer' }}>
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <Star 
                            key={stars} 
                            size={24} 
                            style={{ fill: stars <= reviewForm.rating ? 'currentColor' : 'none' }}
                            onClick={() => setReviewForm(prev => ({ ...prev, rating: stars }))} 
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Comments / Review</label>
                      <textarea 
                        required 
                        rows="3" 
                        placeholder="The booking experience was extremely seamless and visual ticket downloads were instant..." 
                        value={reviewForm.comment} 
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                        className="search-input" 
                        style={{ padding: '10px 12px', fontSize: '0.9rem', width: '100%', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical' }}
                      />
                    </div>

                    <button className="action-btn" type="submit" style={{ alignSelf: 'flex-start', background: 'var(--primary)' }}>
                      Submit Testimonial
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* FAQ section */}
            <section className="container" style={{ padding: '80px 0' }}>
              <div className="section-header">
                <span className="section-tag">FAQ</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
              </div>
              <div className="faq-grid">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h3 className="faq-question">Q: {faq.q}</h3>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view === 'results' && (
          <div className="container">
            {/* Search Engine Header widget */}
            <div style={{ marginTop: '32px' }}>
              <HeroSection onSearch={handleSearch} />
            </div>

            <div className="listings-layout">
              {/* Sidebar Filters */}
              <SearchFilters 
                type={searchType} 
                filters={filters} 
                setFilters={setFilters} 
              />
              
              {/* Main listings list */}
              <ListingGrid 
                type={searchType} 
                listings={filteredListings} 
                onSelect={handleSelectListing}
                sortBy={sortBy}
                setSortBy={setSortBy}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        )}

        {view === 'customize' && (
          <SeatSelector 
            type={searchType}
            selectedItem={selectedItem}
            searchParams={searchParams}
            onConfirm={handleConfirmCustomizations}
            onBack={() => setView('results')}
          />
        )}

        {view === 'checkout' && (
          <CheckoutForm 
            type={searchType}
            selectedItem={selectedItem}
            searchParams={searchParams}
            customizations={customizations}
            onPaymentSuccess={handleCheckoutSuccess}
            onBack={() => {
              if (searchType === 'packages') {
                setView('results');
              } else {
                setView('customize');
              }
            }}
            profile={profile}
          />
        )}

        {view === 'confirmation' && (
          <BookingConfirmation 
            booking={lastBooking} 
            setView={setView} 
          />
        )}

        {view === 'dashboard' && (
          <Dashboard 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
            onEditTraveler={handleEditTraveler}
            setView={setView} 
          />
        )}

        {view === 'wishlist' && (
          <Wishlist 
            favorites={favorites}
            onRemoveFavorite={handleToggleFavorite}
            onBookItem={handleBookFromWishlist}
            setView={setView}
          />
        )}

        {view === 'profile' && (
          <Profile 
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            bookingsCount={bookings.length}
            favoritesCount={favorites.length}
          />
        )}
      </main>

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', padding: '60px 0 20px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px', textAlign: 'left' }}>
          
          {/* Column 1: Brand & Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="logo" style={{ cursor: 'default', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={24} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 700 }}>Sanchari Travels</span>
            </div>
            <p style={{ lineHeight: '1.6', fontSize: '0.8rem' }}>
              Experience the best of India. Seamless airline, IRCTC railway, and state bus terminal handshakes mapped dynamically for you.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  href={`#${social.toLowerCase()}`} 
                  key={social} 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid var(--glass-border)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '20px', fontWeight: 600, fontSize: '0.95rem' }}>Explore Services</h4>
            <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><button onClick={() => { setSearchType('flights'); setView('results'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}>Book Flights</button></li>
              <li><button onClick={() => { setSearchType('hotels'); setView('results'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}>Luxury Hotel Stays</button></li>
              <li><button onClick={() => { setSearchType('packages'); setView('results'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}>Holiday Packages</button></li>
              <li><button onClick={() => { setSearchType('trains'); setView('results'); }} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}>IRCTC Railways</button></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '20px', fontWeight: 600, fontSize: '0.95rem' }}>Contact Support</h4>
            <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.8rem', lineHeight: '1.5' }}>
              <li>📞 1-800-SANCHARI (24/7 Helpline)</li>
              <li>📧 support@sancharitravels.com</li>
              <li>🏢 4th Floor, Taj Chambers, Colaba, Mumbai, India</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                All Terminals Live
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '20px', fontWeight: 600, fontSize: '0.95rem' }}>Newsletter Signup</h4>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '16px' }}>
              Subscribe to get seasonal holiday discount alerts directly in your inbox.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed! Check your mock inbox for verification."); e.target.reset(); }} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="email" 
                placeholder="email@example.com" 
                required
                className="search-input"
                style={{ padding: '8px 12px', fontSize: '0.8rem', width: '100%', height: '36px', borderRadius: '8px' }}
              />
              <button className="action-btn" type="submit" style={{ padding: '0 12px', fontSize: '0.8rem', height: '36px', background: 'var(--primary)', width: 'auto', border: 'none' }}>
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', fontSize: '0.75rem', textAlign: 'center' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <p>© 2026 Sanchari Travels Booking Inc. Built professionally using React & Vanilla CSS.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#cookie" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
