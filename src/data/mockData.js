export const mockFlights = [
  {
    id: "f1",
    airline: "Air India",
    logo: "airindia",
    code: "AI-101",
    departure: "DEL (New Delhi)",
    arrival: "BOM (Mumbai)",
    departureTime: "07:30 AM",
    arrivalTime: "09:45 AM",
    duration: "2h 15m",
    stops: 0,
    price: 4500,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (25kg)",
    rating: 4.6,
    seatsAvailable: 42,
    cabinClasses: {
      economy: { price: 4500, name: "Economy Class" },
      business: { price: 14500, name: "Business Class" },
      first: { price: 28000, name: "First Class" }
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
    price: 5200,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (15kg)",
    rating: 4.7,
    seatsAvailable: 15,
    cabinClasses: {
      economy: { price: 5200, name: "Economy Class" },
      business: { price: 11000, name: "Business Class" },
      first: { price: 18000, name: "First Class" }
    }
  },
  {
    id: "f3",
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
      economy: { price: 380, name: "Economy Class" },
      business: { price: 9500, name: "Business Class" },
      first: { price: 16000, name: "First Class" }
    }
  },
  {
    id: "f4",
    airline: "SpiceJet",
    logo: "spicejet",
    code: "SG-244",
    departure: "DEL (New Delhi)",
    arrival: "SXR (Srinagar)",
    departureTime: "08:20 AM",
    arrivalTime: "09:50 AM",
    duration: "1h 30m",
    stops: 0,
    price: 4100,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (15kg)",
    rating: 4.2,
    seatsAvailable: 31,
    cabinClasses: {
      economy: { price: 4100, name: "Economy Class" },
      business: { price: 8800, name: "Business Class" },
      first: { price: 14500, name: "First Class" }
    }
  }
];

export const mockTrains = [
  {
    id: "t1",
    name: "Mumbai Rajdhani Express",
    code: "12952",
    departure: "DEL (New Delhi RS)",
    arrival: "BOM (Mumbai Central)",
    departureTime: "04:55 PM",
    arrivalTime: "08:35 AM (+1 day)",
    duration: "15h 40m",
    stops: 5,
    price: 2450, // 3AC base fare
    rating: 4.8,
    seatsAvailable: 64,
    cabinClasses: {
      economy: { price: 2450, name: "AC 3 Tier (3A)" },
      business: { price: 3850, name: "AC 2 Tier (2A)" },
      first: { price: 4750, name: "AC First Class (1A)" }
    }
  },
  {
    id: "t2",
    name: "Kolkata Duronto Express",
    code: "12260",
    departure: "DEL (New Delhi RS)",
    arrival: "CCU (Howrah Junction)",
    departureTime: "04:10 PM",
    arrivalTime: "10:30 AM (+1 day)",
    duration: "18h 20m",
    stops: 3,
    price: 2150,
    rating: 4.6,
    seatsAvailable: 22,
    cabinClasses: {
      economy: { price: 2150, name: "AC 3 Tier (3A)" },
      business: { price: 3100, name: "AC 2 Tier (2A)" },
      first: { price: 4300, name: "AC First Class (1A)" }
    }
  },
  {
    id: "t3",
    name: "Jaipur Double Decker",
    code: "12986",
    departure: "DEL (Sarai Rohilla)",
    arrival: "JAI (Jaipur Junction)",
    departureTime: "05:35 PM",
    arrivalTime: "10:05 PM",
    duration: "4h 30m",
    stops: 4,
    price: 650, // AC Chair Car
    rating: 4.4,
    seatsAvailable: 110,
    cabinClasses: {
      economy: { price: 650, name: "AC Chair Car (CC)" },
      business: { price: 1250, name: "Executive Chair Car (EC)" }
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
    id: "b2",
    operator: "MSRTC Shivneri (State Transport)",
    type: "Scania AC Multi-Axle",
    code: "MS-BOM-GOI-08",
    departure: "BOM (Mumbai Central BS)",
    arrival: "GOI (Panaji Bus Stand)",
    departureTime: "07:00 PM",
    arrivalTime: "07:30 AM (+1 day)",
    duration: "12h 30m",
    price: 1500,
    rating: 4.5,
    seatsAvailable: 12,
    cabinClasses: {
      economy: { price: 1500, name: "Luxury Seater" },
      business: { price: 2100, name: "Premium Sleeper Berth" }
    }
  },
  {
    id: "b3",
    operator: "Orange Travels (Private Sleeper)",
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
  },
  {
    id: "b4",
    operator: "Zingbus (Smart Express)",
    type: "Volvo Eicher Premium AC Seater/Sleeper",
    code: "ZB-DEL-JAI-12",
    departure: "DEL (Kashmere Gate ISBT)",
    arrival: "JAI (Sindhi Camp Bus Stand)",
    departureTime: "11:30 PM",
    arrivalTime: "05:15 AM (+1 day)",
    duration: "5h 45m",
    price: 580,
    rating: 4.3,
    seatsAvailable: 24,
    cabinClasses: {
      economy: { price: 580, name: "AC Seater" },
      business: { price: 950, name: "Premium Sleeper" }
    }
  }
];

export const mockHotels = [
  {
    id: "h1",
    name: "Taj Exotica Resort & Spa",
    location: "Benaulim, Goa",
    rating: 4.9,
    reviews: 844,
    price: 15500,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Pool", "Spa", "Beachfront", "Fitness Center", "Fine Dining", "Golf Course"],
    description: "Spread across 56 acres of lush gardens, this Mediterranean-style resort offers private villas, sea-facing pools, and direct beachfront lounges.",
    rooms: [
      { id: "h1-r1", name: "Garden Villa - Twin Bed", price: 15500, maxOccupancy: 2 },
      { id: "h1-r2", name: "Premium Sea View - King Bed", price: 19800, maxOccupancy: 3 },
      { id: "h1-r3", name: "Presidential Luxury Suite with Plunge Pool", price: 38000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h2",
    name: "Taj Mahal Palace Hotel",
    location: "Colaba, Mumbai",
    rating: 4.9,
    reviews: 2450,
    price: 18000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Pool", "Gym", "24/7 Butler Service", "Free Breakfast", "Gateway View"],
    description: "An iconic landmark facing the Arabian Sea and Gateway of India. Featuring historic architecture, legendary hospitality, and signature fine dining.",
    rooms: [
      { id: "h2-r1", name: "Tower Wing Deluxe City View", price: 18000, maxOccupancy: 2 },
      { id: "h2-r2", name: "Palace Wing Luxury Sea View", price: 27000, maxOccupancy: 3 },
      { id: "h2-r3", name: "Grand Luxury Theme Suite", price: 65000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h3",
    name: "The Leela Palace Hotel",
    location: "Indiranagar, Bengaluru",
    rating: 4.8,
    reviews: 980,
    price: 12000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Bar", "Gym", "Spa", "Lush Royal Gardens", "Valet"],
    description: "Drawing architectural inspiration from the Royal Palace of Mysore, this garden estate stands out as a sanctuary of opulence in the Silicon Valley.",
    rooms: [
      { id: "h3-r1", name: "Deluxe Garden View Room", price: 12000, maxOccupancy: 2 },
      { id: "h3-r2", name: "Executive Suite", price: 18000, maxOccupancy: 2 },
      { id: "h3-r3", name: "Royal Club Suite with Lounge Access", price: 29000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h4",
    name: "Rambagh Palace Hotel",
    location: "Bhawani Singh Road, Jaipur",
    rating: 4.9,
    reviews: 732,
    price: 22000,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Royal Gardens", "Indoor Pool", "Peacock Viewing", "Polo Lounge"],
    description: "The former residence of the Maharaja of Jaipur. Live like royalty amidst marble corridors, detailed frescoes, and expansive Mughal lawns.",
    rooms: [
      { id: "h4-r1", name: "Palace Queen Chamber", price: 22000, maxOccupancy: 2 },
      { id: "h4-r2", name: "Historical Suite - King Bed", price: 35000, maxOccupancy: 3 },
      { id: "h4-r3", name: "Grand Maharaja Theme Suite", price: 82000, maxOccupancy: 4 }
    ]
  },
  {
    id: "h5",
    name: "Khyber Himalayan Resort",
    location: "Gulmarg, Srinagar (Kashmir)",
    rating: 4.8,
    reviews: 580,
    price: 14500,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Ski-in/Ski-out", "Heated Indoor Pool", "Gondola Access", "Spa", "Central Heating"],
    description: "A cozy luxury retreat nestled among pine trees. Offering spectacular views of the snow-clad Affarwat peaks and steps from the famous Gulmarg Gondola.",
    rooms: [
      { id: "h5-r1", name: "Premier Pine View Room", price: 14500, maxOccupancy: 2 },
      { id: "h5-r2", name: "Luxury Affarwat View Room", price: 18500, maxOccupancy: 2 },
      { id: "h5-r3", name: "Royal Duplex Cottage 2-BHK", price: 42000, maxOccupancy: 5 }
    ]
  }
];

export const mockPackages = [
  {
    id: "p1",
    name: "Goa Beach Romantic Escape",
    flightId: "f2",
    hotelId: "h1",
    durationDays: 5,
    rating: 4.9,
    price: 34500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate coastal getaway. Includes round-trip flights from New Delhi, beach villa lodging at Taj Exotica, and a private sunset luxury yacht cruise.",
    inclusions: ["Roundtrip Airfare (IndiGo)", "4 Nights Garden Villa Accommodation", "Daily Buffet Breakfast & Dinner", "Private Airport Cab Transfers", "Sunset Yacht Cruise with Drinks"]
  },
  {
    id: "p2",
    name: "Kashmir Valley Snow Paradise",
    flightId: "f4",
    hotelId: "h5",
    durationDays: 6,
    rating: 4.8,
    price: 39900,
    image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
    description: "Explore the heaven on earth. Includes flights, luxury pine suites at Khyber Gulmarg, Gondola cable car passes, and ski rentals.",
    inclusions: ["Roundtrip Airfare (SpiceJet)", "5 Nights Pine View Room", "Gondola Phase-1 Cable Car Passes", "Full Day Srinagar Shikara Boat Tour", "Ski Gear & Instructor Assistance"]
  },
  {
    id: "p3",
    name: "Jaipur Maharaja Heritage Tour",
    flightId: "f6",
    hotelId: "h4",
    durationDays: 4,
    rating: 4.9,
    price: 42000,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    description: "Soak in royal Rajasthani heritage. Features imperial Rambagh Palace luxury chambers, historical fort excursions, and local bazaar culinary walks.",
    inclusions: ["Roundtrip Airfare", "3 Nights Royal Chamber Stay", "Amer Fort Guided Jeep Tour", "Mahal Fine-Dining Dinner Experience", "Private chauffeur throughout Jaipur"]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "Travel Vlogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "Sanchari Travels saved me over ₹15,000 on my Goa vacation package! The seat selection map was extremely simple and responsive.",
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
    name: "Ramesh Nair",
    role: "Retired Professor",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    comment: "Booked the Kashmir Valley Tour. The system simulated connecting directly to airline databases to grab Vistara seat records perfectly.",
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
    a: "Yes! Standard baggage information is displayed on every card. Flights include carry-on and checked luggage. Trains allow up to 40kg personal luggage in AC cabins without extra fees."
  },
  {
    q: "Can I choose my specific berth preference in trains?",
    a: "Yes, our interactive seat selector maps the layout of AC Sleeper coaches. You can choose Lower, Middle, Upper, or Side berths before payment."
  },
  {
    q: "Are the bus bookings connected with local bus stands?",
    a: "Absolutely. Sanchari Travels works with local state undertakings (KSRTC, MSRTC, APSRTC) and premium private fleet operators. All ticket vouchers list specific boarding point details and bus stand gates."
  }
];

export const chatbotResponseTree = [
  {
    triggers: ["hello", "hi", "hey", "start", "welcome"],
    response: "Hello! I am Sanchari, your virtual travel companion. How can I help you map out your next adventure today? You can ask about: \n- **Baggage Policy** \n- **How to Refund/Cancel** \n- **Trains & Buses routes** \n- **Promotions**"
  },
  {
    triggers: ["baggage", "luggage", "carry-on", "checked"],
    response: "Flights (Air India & IndiGo) allow 7kg carry-on and 15-25kg checked. Trains allow up to 40kg personal luggage inside compartments. Buses allow up to 2 large bags in the luggage hold."
  },
  {
    triggers: ["train", "railway", "irctc", "berth", "rajdhani"],
    response: "We offer direct ticketing for IRCTC Indian Railways including Rajdhani, Shatabdi, and Tejas Express. You can select AC 3-Tier, 2-Tier, or AC Chair Cars. Select the 'Trains' tab on the homepage search console!"
  },
  {
    triggers: ["bus", "ksrtc", "msrtc", "redbus", "sleeper"],
    response: "Sanchari Travels features live connections with local state bus stands (KSRTC, MSRTC) and private operators. Check out the 'Buses' tab for AC Sleepers and luxury Volvo multi-axle rides."
  },
  {
    triggers: ["refund", "cancel", "cancellation", "cancellation policy"],
    response: "You can cancel any trip easily! Head over to the **'My Bookings'** tab on the top navbar, find your active booking, and click **'Cancel Booking'**. A refund will be immediately processed back to your original payment card."
  },
  {
    triggers: ["package", "deals", "packages", "discount"],
    response: "We have amazing travel bundles like the **Goa Beach Romantic Escape** (Flight + Hotel + sunset cruise) or **Kashmir Valley Snow Paradise** which save you up to 25% compared to booking separately. Check out our **'Packages'** search tab above!"
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
