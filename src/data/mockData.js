export const mockFlights = [
  {
    id: "f1",
    airline: "Singapore Airlines",
    logo: "singapore",
    code: "SQ-321",
    departure: "SIN (Singapore Changi)",
    arrival: "HND (Tokyo Haneda)",
    departureTime: "06:00 PM",
    arrivalTime: "01:45 AM (+1 day)",
    duration: "6h 45m",
    stops: 0,
    price: 28000,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (25kg)",
    rating: 4.9,
    seatsAvailable: 28,
    cabinClasses: {
      economy: { price: 28000, name: "Economy Class" },
      business: { price: 98000, name: "Business Class" },
      first: { price: 180000, name: "First Class Suite" }
    }
  },
  {
    id: "f2",
    airline: "IndiGo",
    logo: "indigo",
    code: "6E-512",
    departure: "DEL (New Delhi)",
    arrival: "GOI (Goa)",
    departureTime: "11:15 AM",
    arrivalTime: "01:55 PM",
    duration: "2h 40m",
    stops: 0,
    price: 4500,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (15kg)",
    rating: 4.7,
    seatsAvailable: 15,
    cabinClasses: {
      economy: { price: 4500, name: "Economy Class" },
      business: { price: 9500, name: "Business Class" },
      first: { price: 16000, name: "First Class" }
    }
  },
  {
    id: "f3",
    airline: "British Airways",
    logo: "britishairways",
    code: "BA-227",
    departure: "LHR (London Heathrow)",
    arrival: "JFK (New York)",
    departureTime: "08:30 AM",
    arrivalTime: "11:45 AM",
    duration: "8h 15m",
    stops: 0,
    price: 35000,
    class: "Economy",
    baggage: "1 Carry-on (10kg), 1 Checked (23kg)",
    rating: 4.6,
    seatsAvailable: 42,
    cabinClasses: {
      economy: { price: 35000, name: "Economy Class" },
      business: { price: 120000, name: "Club World Business" },
      first: { price: 250000, name: "First Class" }
    }
  },
  {
    id: "f4",
    airline: "Vistara",
    logo: "vistara",
    code: "UK-810",
    departure: "BOM (Mumbai)",
    arrival: "BLR (Bengaluru)",
    departureTime: "06:00 PM",
    arrivalTime: "07:45 PM",
    duration: "1h 45m",
    stops: 0,
    price: 3800,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (20kg)",
    rating: 4.8,
    seatsAvailable: 28,
    cabinClasses: {
      economy: { price: 3800, name: "Economy Class" },
      business: { price: 8500, name: "Business Class" },
      first: { price: 14500, name: "First Class" }
    }
  },
  {
    id: "f5",
    airline: "Emirates",
    logo: "emirates",
    code: "EK-412",
    departure: "DXB (Dubai International)",
    arrival: "CDG (Paris)",
    departureTime: "11:15 AM",
    arrivalTime: "04:25 PM",
    duration: "7h 10m",
    stops: 0,
    price: 42000,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (20kg)",
    rating: 4.8,
    seatsAvailable: 15,
    cabinClasses: {
      economy: { price: 42000, name: "Economy Class" },
      business: { price: 145000, name: "Business Class" },
      first: { price: 280000, name: "First Class Suite" }
    }
  },
  {
    id: "f6",
    airline: "Air India",
    logo: "airindia",
    code: "AI-101",
    departure: "DEL (New Delhi)",
    arrival: "BOM (Mumbai)",
    departureTime: "07:30 AM",
    arrivalTime: "09:45 AM",
    duration: "2h 15m",
    stops: 0,
    price: 4200,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (25kg)",
    rating: 4.6,
    seatsAvailable: 42,
    cabinClasses: {
      economy: { price: 4200, name: "Economy Class" },
      business: { price: 8800, name: "Business Class" },
      first: { price: 15000, name: "First Class" }
    }
  }
];

export const mockTrains = [
  {
    id: "t1",
    name: "Eurostar High-Speed Link",
    code: "EST-9040",
    departure: "STP (London St Pancras)",
    arrival: "GDN (Paris Gare du Nord)",
    departureTime: "05:35 PM",
    arrivalTime: "08:50 PM",
    duration: "2h 15m",
    stops: 1,
    price: 6800,
    rating: 4.7,
    seatsAvailable: 110,
    cabinClasses: {
      economy: { price: 6800, name: "Standard Class" },
      business: { price: 11500, name: "Standard Premier" },
      first: { price: 18000, name: "Business Premier Luxury" }
    }
  },
  {
    id: "t2",
    name: "Mumbai Rajdhani Express",
    code: "12952",
    departure: "DEL (New Delhi RS)",
    arrival: "BOM (Mumbai Central)",
    departureTime: "04:55 PM",
    arrivalTime: "08:35 AM (+1 day)",
    duration: "15h 40m",
    stops: 5,
    price: 2450,
    rating: 4.8,
    seatsAvailable: 64,
    cabinClasses: {
      economy: { price: 2450, name: "AC 3 Tier (3A)" },
      business: { price: 3850, name: "AC 2 Tier (2A)" },
      first: { price: 4750, name: "AC First Class (1A)" }
    }
  },
  {
    id: "t3",
    name: "Shinkansen Bullet Train (Nozomi)",
    code: "SHIN-71",
    departure: "TYO (Tokyo Station)",
    arrival: "OSA (Shin-Osaka)",
    departureTime: "04:10 PM",
    arrivalTime: "06:40 PM",
    duration: "2h 30m",
    stops: 3,
    price: 8800,
    rating: 4.9,
    seatsAvailable: 64,
    cabinClasses: {
      economy: { price: 8800, name: "Ordinary Reserved Seat" },
      business: { price: 13500, name: "Green Car Premium" },
      first: { price: 22000, name: "Gran Class Luxury Suite" }
    }
  },
  {
    id: "t4",
    name: "Goa Madgaon Tejas Express",
    code: "22119",
    departure: "BOM (Chhatrapati Shivaji T)",
    arrival: "GOI (Madgaon Junction)",
    departureTime: "05:50 AM",
    arrivalTime: "02:40 PM",
    duration: "8h 50m",
    stops: 7,
    price: 1850,
    rating: 4.7,
    seatsAvailable: 35,
    cabinClasses: {
      economy: { price: 1850, name: "AC Chair Car (CC)" },
      business: { price: 3200, name: "Executive Chair Car (EC)" }
    }
  }
];

export const mockBuses = [
  {
    id: "b1",
    operator: "FlixBus Premium (Europe)",
    type: "Double-Decker Mercedes Coach AC",
    code: "FB-PAR-AMS-01",
    departure: "PAR (Paris Bercy Seine)",
    arrival: "AMS (Amsterdam Sloterdijk)",
    departureTime: "09:30 PM",
    arrivalTime: "05:45 AM (+1 day)",
    duration: "8h 15m",
    price: 2000,
    rating: 4.6,
    seatsAvailable: 18,
    cabinClasses: {
      economy: { price: 2000, name: "Standard Recliner" },
      business: { price: 3600, name: "Panorama Sleeper Deck" }
    }
  },
  {
    id: "b2",
    operator: "KSRTC Swift (State Transport)",
    type: "Airavat Club Class Multiaxle AC",
    code: "KS-BLR-COK-01",
    departure: "BLR (Kempegowda BS, Majestic)",
    arrival: "COK (Kochi Bus Stand)",
    departureTime: "09:30 PM",
    arrivalTime: "06:45 AM (+1 day)",
    duration: "9h 15m",
    price: 1250,
    rating: 4.6,
    seatsAvailable: 18,
    cabinClasses: {
      economy: { price: 1250, name: "Luxury Seater" },
      business: { price: 1750, name: "Premium Sleeper Berth" }
    }
  },
  {
    id: "b3",
    operator: "Greyhound Express (USA)",
    type: "Prevost X3-45 Luxury Cruiser",
    code: "GH-NYC-BOS-08",
    departure: "NYC (Port Authority, NY)",
    arrival: "BOS (South Station, Boston)",
    departureTime: "07:00 PM",
    arrivalTime: "11:30 PM",
    duration: "4h 30m",
    price: 2400,
    rating: 4.3,
    seatsAvailable: 12,
    cabinClasses: {
      economy: { price: 2400, name: "Standard Seater" },
      business: { price: 4000, name: "Extra Legroom Premium" }
    }
  },
  {
    id: "b4",
    operator: "Orange Travels (Volvo Sleeper)",
    type: "Volvo Multi-Axle AC Sleeper (2+1)",
    code: "OT-BOM-BLR-44",
    departure: "BOM (Borivali East)",
    arrival: "BLR (Anand Rao Circle)",
    departureTime: "04:30 PM",
    arrivalTime: "08:30 AM (+1 day)",
    duration: "16h 00m",
    price: 2400,
    rating: 4.7,
    seatsAvailable: 7,
    cabinClasses: {
      economy: { price: 2400, name: "Single Sleeper" },
      business: { price: 3600, name: "Double Spacious Sleeper" }
    }
  }
];

export const mockHotels = [
  {
    id: "h1",
    name: "The Ritz-Carlton Paris",
    location: "Place Vendôme, Paris",
    rating: 4.9,
    reviews: 844,
    price: 28000,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Indoor Pool", "Spa", "Private Gardens", "Fitness Center", "Michelin Dining", "Butler Service"],
    description: "Nestled in the heart of Paris, this historic palace offers world-class French dining, private garden terraces, and majestic neo-classical suites.",
    rooms: [
      { id: "h1-r1", name: "Superior Room - Queen Bed", price: 28000, maxOccupancy: 2 },
      { id: "h1-r2", name: "Deluxe Suite - King Bed", price: 45000, maxOccupancy: 3 },
      { id: "h1-r3", name: "Imperial Palace Suite with Balcony", price: 95000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h2",
    name: "Taj Exotica Resort & Spa",
    location: "Benaulim, Goa",
    rating: 4.9,
    reviews: 844,
    price: 15500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Pool", "Spa", "Beachfront", "Fitness Center", "Fine Dining", "Golf Course"],
    description: "Spread across 56 acres of lush gardens, this Mediterranean-style resort offers private villas, sea-facing pools, and direct beachfront lounges in Goa.",
    rooms: [
      { id: "h2-r1", name: "Garden Villa - Twin Bed", price: 15500, maxOccupancy: 2 },
      { id: "h2-r2", name: "Premium Sea View - King Bed", price: 19800, maxOccupancy: 3 },
      { id: "h2-r3", name: "Presidential Luxury Suite with Plunge Pool", price: 38000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h3",
    name: "Burj Al Arab Jumeirah",
    location: "Jumeirah Beach, Dubai",
    rating: 4.9,
    reviews: 2450,
    price: 68000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Infinity Pool", "Private Beach", "24/7 Butler Service", "Underwater Restaurant", "Helipad Access"],
    description: "An iconic sail-shaped luxury hotel standing on an artificial island. Featuring double-floor suites, private gold plated fixtures, and signature helicopter transfers.",
    rooms: [
      { id: "h3-r1", name: "Deluxe Marina One-Bedroom Suite", price: 68000, maxOccupancy: 2 },
      { id: "h3-r2", name: "Sky Marina Two-Bedroom Suite", price: 115000, maxOccupancy: 4 },
      { id: "h3-r3", name: "Grand Royal Presidential Suite", price: 280000, maxOccupancy: 5 }
    ]
  },
  {
    id: "h4",
    name: "Taj Mahal Palace Hotel",
    location: "Colaba, Mumbai",
    rating: 4.9,
    reviews: 2450,
    price: 18000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Pool", "Gym", "24/7 Butler Service", "Free Breakfast", "Gateway View"],
    description: "An iconic landmark facing the Arabian Sea and Gateway of India. Featuring historic architecture, legendary hospitality, and signature fine dining in Mumbai.",
    rooms: [
      { id: "h4-r1", name: "Tower Wing Deluxe City View", price: 18000, maxOccupancy: 2 },
      { id: "h4-r2", name: "Palace Wing Luxury Sea View", price: 27000, maxOccupancy: 3 },
      { id: "h4-r3", name: "Grand Luxury Theme Suite", price: 65000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h5",
    name: "Marina Bay Sands Singapore",
    location: "Bayfront Avenue, Singapore",
    rating: 4.8,
    reviews: 980,
    price: 35000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "SkyPark Infinity Pool", "Rooftop Club", "Casino", "Banyan Tree Spa", "VIP Lounge"],
    description: "Three soaring towers connected by the breathtaking Sands SkyPark. Swim in the world's largest rooftop infinity pool with panoramic skyline views.",
    rooms: [
      { id: "h5-r1", name: "Sands Deluxe City View Room", price: 35000, maxOccupancy: 2 },
      { id: "h5-r2", name: "Sands Premier King Room", price: 50000, maxOccupancy: 3 },
      { id: "h5-r3", name: "Straits Luxury Suite with Sky Lounge", price: 110000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h6",
    name: "Rambagh Palace Hotel",
    location: "Bhawani Singh Road, Jaipur",
    rating: 4.9,
    reviews: 732,
    price: 22000,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Royal Gardens", "Indoor Pool", "Peacock Viewing", "Polo Lounge"],
    description: "The former residence of the Maharaja of Jaipur. Live like royalty in India amidst marble corridors, detailed frescoes, and expansive Mughal lawns.",
    rooms: [
      { id: "h6-r1", name: "Palace Queen Chamber", price: 22000, maxOccupancy: 2 },
      { id: "h6-r2", name: "Historical Suite - King Bed", price: 35000, maxOccupancy: 3 },
      { id: "h6-r3", name: "Grand Maharaja Theme Suite", price: 82000, maxOccupancy: 4 }
    ]
  }
];

export const mockPackages = [
  {
    id: "p1",
    name: "Paris & French Riviera Escape",
    flightId: "f5",
    hotelId: "h1",
    durationDays: 6,
    rating: 4.9,
    price: 115000,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate European getaway. Includes round-trip flights to Paris, luxury suite lodging at The Ritz-Carlton, and a private Seine dinner cruise.",
    inclusions: ["Roundtrip Airfare (Emirates)", "5 Nights Deluxe Suite Accommodation", "Daily Gourmet Buffet Breakfast", "Private Airport Limousine Transfers", "Seine Sunset Dinner Cruise with Champagne"]
  },
  {
    id: "p2",
    name: "Goa Beach Romantic Escape",
    flightId: "f2",
    hotelId: "h2",
    durationDays: 5,
    rating: 4.9,
    price: 34500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate Indian coastal getaway. Includes round-trip flights from New Delhi, beach villa lodging at Taj Exotica Goa, and a private sunset yacht cruise.",
    inclusions: ["Roundtrip Airfare (IndiGo)", "4 Nights Garden Villa Accommodation", "Daily Buffet Breakfast & Dinner", "Private Airport Cab Transfers", "Sunset Yacht Cruise with Drinks"]
  },
  {
    id: "p3",
    name: "Japan Imperial Heritage Tour",
    flightId: "f1",
    hotelId: "h5",
    durationDays: 7,
    rating: 4.9,
    price: 145000,
    image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
    description: "Explore traditional Japan. Includes flights, luxury suites at Aman Tokyo, Shinkansen bullet train passes to Kyoto, and guided temple tours.",
    inclusions: ["Roundtrip Airfare (Singapore Airlines)", "6 Nights Luxury Skyline Suite", "7-Day Unlimited Shinkansen Passes", "Private Tour Guide in Kyoto & Nara", "Zen Spa Onsen Packages"]
  },
  {
    id: "p4",
    name: "Kashmir Valley Snow Paradise",
    flightId: "f6",
    hotelId: "h6",
    durationDays: 6,
    rating: 4.8,
    price: 39900,
    image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
    description: "Explore the snowy valleys of Kashmir. Includes flights, luxury hotel rooms, Gondola cable car passes, and ski rentals.",
    inclusions: ["Roundtrip Airfare (Air India)", "5 Nights Premium Room Stay", "Gondola Phase-1 Cable Car Passes", "Full Day Srinagar Boat Tour", "Ski Gear & Instructor Assistance"]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Alex Mercer",
    role: "Travel Vlogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "Sanchari Travels saved me over ₹15,000 on my Paris vacation package! The seat selection map was extremely simple and responsive.",
    rating: 5
  },
  {
    id: 2,
    name: "Priyanjali Sen",
    role: "Corporate Executive",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    comment: "The ticketing details are highly comprehensive. I had to change a spelling mistake in passenger details, and the dashboard edit was instant.",
    rating: 5
  },
  {
    id: 3,
    name: "Kenji Sato",
    role: "Retired Professor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    comment: "Booked the Japan Imperial Tour. The system simulated connecting directly to airline databases to grab Singapore Airlines seat records perfectly.",
    rating: 4
  }
];

export const faqList = [
  {
    q: "How does the refund policy work?",
    a: "All bookings canceled at least 24 hours prior to travel date receive a 100% full refund to their mock credit card. Cancelations within 24 hours incur a 15% booking charge."
  },
  {
    q: "Are the baggage fees included in the flight/train tickets?",
    a: "Yes! Standard baggage information is displayed on every card. Flights include carry-on and checked luggage. Trains allow up to 2 checked bags in cabin storage without extra fees."
  },
  {
    q: "Can I choose my specific cabin/seat preference in trains?",
    a: "Yes, our interactive seat selector maps the layout of the railway coaches. You can choose Upper/Lower berths or standard/aisle window seats before payment."
  },
  {
    q: "Are the bus bookings connected with local transport hubs?",
    a: "Absolutely. Sanchari Travels works with premium global coach lines (FlixBus, Greyhound, National Express) and premium local networks (KSRTC, Orange Travels). All ticket vouchers list specific terminal details and pickup gate locations."
  }
];

export const chatbotResponseTree = [
  {
    triggers: ["hello", "hi", "hey", "start", "welcome"],
    response: "Hello! I am Sanchari, your virtual travel companion. How can I help you map out your next adventure today? You can ask about: \n- **Baggage Policy** \n- **How to Refund/Cancel** \n- **Trains & Buses routes** \n- **Promotions**"
  },
  {
    triggers: ["baggage", "luggage", "carry-on", "checked"],
    response: "Flights allow 7-10kg carry-on and 20-25kg checked. High-speed trains allow up to 2 luggage bags inside compartments. Buses allow up to 2 large bags in the luggage hold."
  },
  {
    triggers: ["train", "railway", "bullet", "berth", "eurostar"],
    response: "We offer direct ticketing for high-speed railways including Eurostar, Shinkansen, Venice Simplon-Orient-Express, and domestic lines like Rajdhani. You can select premium berths or standard seating. Select the 'Trains' tab on the homepage search console!"
  },
  {
    triggers: ["bus", "greyhound", "flixbus", "coach", "sleeper"],
    response: "Sanchari Travels features live connections with international express lines (FlixBus, Greyhound) and premium local fleets (KSRTC, Orange Travels). Check out the 'Buses' tab for luxury double-decker sleepers and premium AC cruisers."
  },
  {
    triggers: ["refund", "cancel", "cancellation", "cancellation policy"],
    response: "You can cancel any trip easily! Head over to the **'My Bookings'** tab on the top navbar, find your active booking, and click **'Cancel Booking'**. A refund will be immediately processed back to your original payment card."
  },
  {
    triggers: ["package", "deals", "packages", "discount"],
    response: "We have amazing travel bundles like the **Paris & French Riviera Escape** or **Goa Beach Romantic Escape** which save you up to 25% compared to booking separately. Check out our **'Packages'** search tab above!"
  },
  {
    triggers: ["promo", "coupon", "code", "discount code"],
    response: "Use coupon code **SANCHARI25** at checkout to get an instant 25% discount on all Hotel room tiers and travel packages! Enter it in the checkout screen promotion field."
  },
  {
    triggers: ["contact", "support", "agent", "phone", "email"],
    response: "Need human assistance? You can reach our mock support center at support@sancharitravels.com or dial 1-800-SANCHARI. We are open 24/7!"
  }
];
