export const mockFlights = [
  {
    id: "f1",
    airline: "British Airways",
    logo: "britishairways",
    code: "BA-227",
    departure: "LHR (London Heathrow)",
    arrival: "JFK (New York)",
    departureTime: "08:30 AM",
    arrivalTime: "11:45 AM",
    duration: "8h 15m",
    stops: 0,
    price: 450,
    class: "Economy",
    baggage: "1 Carry-on (10kg), 1 Checked (23kg)",
    rating: 4.6,
    seatsAvailable: 42,
    cabinClasses: {
      economy: { price: 450, name: "Economy Class" },
      business: { price: 1450, name: "Club World Business" },
      first: { price: 2800, name: "First Class" }
    }
  },
  {
    id: "f2",
    airline: "Emirates",
    logo: "emirates",
    code: "EK-412",
    departure: "DXB (Dubai International)",
    arrival: "CDG (Paris)",
    departureTime: "11:15 AM",
    arrivalTime: "04:25 PM",
    duration: "7h 10m",
    stops: 0,
    price: 520,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (20kg)",
    rating: 4.8,
    seatsAvailable: 15,
    cabinClasses: {
      economy: { price: 520, name: "Economy Class" },
      business: { price: 1850, name: "Business Class" },
      first: { price: 3400, name: "First Class Suite" }
    }
  },
  {
    id: "f3",
    airline: "Singapore Airlines",
    logo: "singapore",
    code: "SQ-321",
    departure: "SIN (Singapore Changi)",
    arrival: "HND (Tokyo Haneda)",
    departureTime: "06:00 PM",
    arrivalTime: "01:45 AM (+1 day)",
    duration: "6h 45m",
    stops: 0,
    price: 380,
    class: "Economy",
    baggage: "1 Carry-on (7kg), 1 Checked (25kg)",
    rating: 4.9,
    seatsAvailable: 28,
    cabinClasses: {
      economy: { price: 380, name: "Economy Class" },
      business: { price: 1250, name: "Business Class" },
      first: { price: 2500, name: "First Class Suite" }
    }
  },
  {
    id: "f4",
    airline: "Delta Air Lines",
    logo: "delta",
    code: "DL-895",
    departure: "LAX (Los Angeles)",
    arrival: "SYD (Sydney)",
    departureTime: "10:20 PM",
    arrivalTime: "06:50 AM (+2 days)",
    duration: "14h 30m",
    stops: 0,
    price: 850,
    class: "Economy",
    baggage: "1 Carry-on (10kg), 2 Checked (23kg each)",
    rating: 4.4,
    seatsAvailable: 31,
    cabinClasses: {
      economy: { price: 850, name: "Main Cabin" },
      business: { price: 2450, name: "Delta One Business" },
      first: { price: 4200, name: "First Class" }
    }
  }
];

export const mockTrains = [
  {
    id: "t1",
    name: "Venice Simplon-Orient-Express",
    code: "VSOE-1",
    departure: "VCE (Venice Santa Lucia)",
    arrival: "PAR (Paris Gare de l'Est)",
    departureTime: "11:00 AM",
    arrivalTime: "08:35 AM (+1 day)",
    duration: "21h 35m",
    stops: 4,
    price: 245,
    rating: 4.9,
    seatsAvailable: 12,
    cabinClasses: {
      economy: { price: 245, name: "Historic Cabin Berth" },
      business: { price: 385, name: "Suite Twin Compartment" },
      first: { price: 650, name: "Grand Suite Palace" }
    }
  },
  {
    id: "t2",
    name: "Shinkansen Bullet Train (Nozomi)",
    code: "SHIN-71",
    departure: "TYO (Tokyo Station)",
    arrival: "OSA (Shin-Osaka)",
    departureTime: "04:10 PM",
    arrivalTime: "06:40 PM",
    duration: "2h 30m",
    stops: 3,
    price: 110,
    rating: 4.9,
    seatsAvailable: 64,
    cabinClasses: {
      economy: { price: 110, name: "Ordinary Reserved Seat" },
      business: { price: 165, name: "Green Car Premium" },
      first: { price: 280, name: "Gran Class Luxury Suite" }
    }
  },
  {
    id: "t3",
    name: "Eurostar High-Speed Link",
    code: "EST-9040",
    departure: "STP (London St Pancras)",
    arrival: "GDN (Paris Gare du Nord)",
    departureTime: "05:35 PM",
    arrivalTime: "08:50 PM",
    duration: "2h 15m",
    stops: 1,
    price: 85,
    rating: 4.7,
    seatsAvailable: 110,
    cabinClasses: {
      economy: { price: 85, name: "Standard Class" },
      business: { price: 145, name: "Standard Premier" },
      first: { price: 220, name: "Business Premier Luxury" }
    }
  },
  {
    id: "t4",
    name: "Amtrak Acela Express",
    code: "ACELA-21",
    departure: "NYP (New York Penn Station)",
    arrival: "WAS (Washington Union)",
    departureTime: "06:00 AM",
    arrivalTime: "08:55 AM",
    duration: "2h 55m",
    stops: 5,
    price: 65,
    rating: 4.5,
    seatsAvailable: 35,
    cabinClasses: {
      economy: { price: 65, name: "Business Class Standard" },
      business: { price: 120, name: "First Class Premium Lounge" }
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
    price: 25,
    rating: 4.6,
    seatsAvailable: 18,
    cabinClasses: {
      economy: { price: 25, name: "Standard Recliner" },
      business: { price: 45, name: "Panorama Sleeper Deck" }
    }
  },
  {
    id: "b2",
    operator: "Greyhound Express (USA)",
    type: "Prevost X3-45 Luxury Cruiser",
    code: "GH-NYC-BOS-08",
    departure: "NYC (Port Authority, NY)",
    arrival: "BOS (South Station, Boston)",
    departureTime: "07:00 PM",
    arrivalTime: "11:30 PM",
    duration: "4h 30m",
    price: 30,
    rating: 4.3,
    seatsAvailable: 12,
    cabinClasses: {
      economy: { price: 30, name: "Standard Seater" },
      business: { price: 50, name: "Extra Legroom Premium" }
    }
  },
  {
    id: "b3",
    operator: "National Express (UK)",
    type: "Volvo B11R Elite Sleeper",
    code: "NE-LON-EDI-44",
    departure: "LON (Victoria Coach Station)",
    arrival: "EDI (Edinburgh Bus Station)",
    departureTime: "10:30 PM",
    arrivalTime: "07:30 AM (+1 day)",
    duration: "9h 00m",
    price: 45,
    rating: 4.7,
    seatsAvailable: 7,
    cabinClasses: {
      economy: { price: 45, name: "Single Sleeper Capsule" },
      business: { price: 75, name: "Spacious Double Suite Deck" }
    }
  },
  {
    id: "b4",
    operator: "ALSA Premium (Spain)",
    type: "Setra ComfortClass SuperCoach",
    code: "AL-MAD-BAR-12",
    departure: "MAD (Madrid Estacion Sur)",
    arrival: "BAR (Barcelona Sants)",
    departureTime: "11:30 PM",
    arrivalTime: "06:15 AM (+1 day)",
    duration: "6h 45m",
    price: 35,
    rating: 4.5,
    seatsAvailable: 24,
    cabinClasses: {
      economy: { price: 35, name: "Comfort Seater" },
      business: { price: 60, name: "VIP Sleeper Cabin" }
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
    price: 350,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Indoor Pool", "Spa", "Private Gardens", "Fitness Center", "Michelin Dining", "Butler Service"],
    description: "Nestled in the heart of Paris, this historic palace offers world-class French dining, private garden terraces, and majestic neo-classical suites.",
    rooms: [
      { id: "h1-r1", name: "Superior Room - Queen Bed", price: 350, maxOccupancy: 2 },
      { id: "h1-r2", name: "Deluxe Suite - King Bed", price: 550, maxOccupancy: 3 },
      { id: "h1-r3", name: "Imperial Palace Suite with Balcony", price: 1200, maxOccupancy: 4 }
    ]
  },
  {
    id: "h2",
    name: "Burj Al Arab Jumeirah",
    location: "Jumeirah Beach, Dubai",
    rating: 4.9,
    reviews: 2450,
    price: 850,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Infinity Pool", "Private Beach", "24/7 Butler Service", "Underwater Restaurant", "Helipad Access"],
    description: "An iconic sail-shaped luxury hotel standing on an artificial island. Featuring double-floor suites, private gold plated fixtures, and signature helicopter transfers.",
    rooms: [
      { id: "h2-r1", name: "Deluxe Marina One-Bedroom Suite", price: 850, maxOccupancy: 2 },
      { id: "h2-r2", name: "Sky Marina Two-Bedroom Suite", price: 1450, maxOccupancy: 4 },
      { id: "h2-r3", name: "Grand Royal Presidential Suite", price: 3800, maxOccupancy: 5 }
    ]
  },
  {
    id: "h3",
    name: "Marina Bay Sands Singapore",
    location: "Bayfront Avenue, Singapore",
    rating: 4.8,
    reviews: 980,
    price: 450,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "SkyPark Infinity Pool", "Rooftop Club", "Casino", "Banyan Tree Spa", "VIP Lounge"],
    description: "Three soaring towers connected by the breathtaking Sands SkyPark. Swim in the world's largest rooftop infinity pool with panoramic skyline views.",
    rooms: [
      { id: "h3-r1", name: "Sands Deluxe City View Room", price: 450, maxOccupancy: 2 },
      { id: "h3-r2", name: "Sands Premier King Room", price: 650, maxOccupancy: 3 },
      { id: "h3-r3", name: "Straits Luxury Suite with Sky Lounge", price: 1400, maxOccupancy: 4 }
    ]
  },
  {
    id: "h4",
    name: "The Plaza Hotel New York",
    location: "Fifth Avenue, New York City",
    rating: 4.9,
    reviews: 732,
    price: 550,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Champagne Bar", "Guerlain Spa", "Eloise Suite Access", "White Glove Service"],
    description: "The ultimate Manhattan landmark overlooking Central Park. Experience storied luxury, detailed crystal chandeliers, and prestigious French-style chambers.",
    rooms: [
      { id: "h4-r1", name: "Plaza Deluxe Queen Chamber", price: 550, maxOccupancy: 2 },
      { id: "h4-r2", name: "Edwardian Suite - King Bed", price: 950, maxOccupancy: 3 },
      { id: "h4-r3", name: "Grand Royal Plaza Penthouse Suite", price: 2600, maxOccupancy: 4 }
    ]
  },
  {
    id: "h5",
    name: "Aman Tokyo Resort",
    location: "Chiyoda-ku, Tokyo (Japan)",
    rating: 4.9,
    reviews: 580,
    price: 650,
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    amenities: ["WiFi", "Bespoke Onsen Spa", "Fuji View Lounges", "Zen Rock Gardens", "Traditional Tea Rooms"],
    description: "An urban sanctuary rising high above Tokyo's financial center. Seamlessly blending traditional Japanese Ryokan structures with modern high-rise luxury views.",
    rooms: [
      { id: "h5-r1", name: "Deluxe City View Room", price: 650, maxOccupancy: 2 },
      { id: "h5-r2", name: "Premier Skyline View Suite", price: 950, maxOccupancy: 2 },
      { id: "h5-r3", name: "Imperial Aman Residences 2-BHK", price: 2100, maxOccupancy: 5 }
    ]
  }
];

export const mockPackages = [
  {
    id: "p1",
    name: "Paris & French Riviera Escape",
    flightId: "f2",
    hotelId: "h1",
    durationDays: 6,
    rating: 4.9,
    price: 1450,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate European getaway. Includes round-trip flights to Paris, luxury suite lodging at The Ritz-Carlton, and a private Seine dinner cruise.",
    inclusions: ["Roundtrip Airfare (Emirates)", "5 Nights Deluxe Suite Accommodation", "Daily Gourmet Buffet Breakfast", "Private Airport Limousine Transfers", "Seine Sunset Dinner Cruise with Champagne"]
  },
  {
    id: "p2",
    name: "Japan Imperial Heritage Tour",
    flightId: "f3",
    hotelId: "h5",
    durationDays: 7,
    rating: 4.9,
    price: 1890,
    image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
    description: "Explore traditional Japan. Includes flights, luxury suites at Aman Tokyo, Shinkansen bullet train passes to Kyoto, and guided temple tours.",
    inclusions: ["Roundtrip Airfare (Singapore Airlines)", "6 Nights Luxury Skyline Suite", "7-Day Unlimited Shinkansen Passes", "Private Tour Guide in Kyoto & Nara", "Zen Spa Onsen Packages"]
  },
  {
    id: "p3",
    name: "New York Luxury & Broadway Tour",
    flightId: "f1",
    hotelId: "h4",
    durationDays: 5,
    rating: 4.8,
    price: 1650,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    description: "Experience Manhattan like royalty. Features historical stays at The Plaza Hotel, premium tickets to a Broadway show, and a private Central Park tour.",
    inclusions: ["Roundtrip Airfare (British Airways)", "4 Nights Deluxe Plaza Stay", "VIP Front Row Broadway Tickets", "Private Central Park Horse Carriage Tour", "Luxury chauffeur service in Manhattan"]
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Alex Mercer",
    role: "Travel Vlogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    comment: "Sanchari Travels saved me over $1,500 on my Paris vacation package! The seat selection map was extremely simple and responsive.",
    rating: 5
  },
  {
    id: 2,
    name: "Chloe Dupont",
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
    a: "Absolutely. Sanchari Travels works with premium global coach lines (FlixBus, Greyhound, National Express) and luxury private fleets. All ticket vouchers list specific terminal details and pickup gate locations."
  }
];

export const chatbotResponseTree = [
  {
    triggers: ["hello", "hi", "hey", "start", "welcome"],
    response: "Hello! I am Sanchari, your virtual travel companion. How can I help you map out your next adventure today? You can ask about: \n- **Baggage Policy** \n- **How to Refund/Cancel** \n- **Trains & Buses routes** \n- **Promotions**"
  },
  {
    triggers: ["baggage", "luggage", "carry-on", "checked"],
    response: "Flights (British Airways & Emirates) allow 7-10kg carry-on and 20-23kg checked. High-speed trains allow up to 2 luggage bags inside compartments. Buses allow up to 2 large bags in the luggage hold."
  },
  {
    triggers: ["train", "railway", "bullet", "berth", "eurostar"],
    response: "We offer direct ticketing for high-speed railways including Eurostar, Shinkansen, Venice Simplon-Orient-Express, and Amtrak Acela. You can select premium berths or standard seating. Select the 'Trains' tab on the homepage search console!"
  },
  {
    triggers: ["bus", "greyhound", "flixbus", "coach", "sleeper"],
    response: "Sanchari Travels features live connections with international express lines like FlixBus, Greyhound, and National Express. Check out the 'Buses' tab for luxury double-decker sleepers and premium AC cruisers."
  },
  {
    triggers: ["refund", "cancel", "cancellation", "cancellation policy"],
    response: "You can cancel any trip easily! Head over to the **'My Bookings'** tab on the top navbar, find your active booking, and click **'Cancel Booking'**. A refund will be immediately processed back to your original payment card."
  },
  {
    triggers: ["package", "deals", "packages", "discount"],
    response: "We have amazing travel bundles like the **Paris & French Riviera Escape** (Flight + Ritz-Carlton stay + cruise) or **Japan Imperial Heritage Tour** which save you up to 25% compared to booking separately. Check out our **'Packages'** search tab above!"
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
