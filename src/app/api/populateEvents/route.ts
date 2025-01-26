import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Event } from "@/database/index";
import { User } from "@/database/index";

const mongoURI = process.env.MONGO_URI;

const sportsEvents = [
  "Soccer",
  "Basketball",
  "Tennis",
  "Volleyball Championship",
  "Baseball Game",
  "Swimming Competition",
  "Cricket Series",
  "Rugby Match",
  "Table Tennis Invitational",
  "Badminton Open",
  "Golf Championship",
  "Running",
  "Cycling",
  "Hockey",
  "Archery Competition",
  "Rock Climbing",
  "Wrestling Tournament",
  "Boxing Match",
  "Martial Arts Championship",
  "Skiing Race",
  "Snowboarding Event",
  "Gymnastics Contest",
  "Surfing Competition",
  "Karate Championship",
  "Judo Tournament",
  "Track and Field Event",
  "Rowing Regatta",
  "Canoeing Challenge",
  "E-sports Tournament",
  "Fencing Competition",
  "Sailing Regatta",
  "Billiards Contest",
  "Bowling Tournament",
  "Lacrosse Game",
  "Dodgeball League",
  "Kickball Tournament",
  "Handball Match",
  "Ultimate Frisbee",
  "Golf Scramble",
  "Crossfit Challenge",
  "Dance Contest",
  "Taekwondo Tournament",
  "Pilates Competition",
  "Yoga Competition",
  "Paddleboarding Event",
  "Skateboarding Challenge",
  "BMX Racing",
  "Motocross Race",
  "Go-Karting Event",
];

const hobbyEvents = [
  "Chess Tournament",
  "Drawing Competition",
  "Painting Exhibition",
  "Photography Workshop",
  "Poetry Reading",
  "Cooking Class",
  "Pottery Workshop",
  "Gardening Meetup",
  "Knitting Circle",
  "Sewing Workshop",
  "Woodworking Meetup",
  "Wine Tasting",
  "Crafting Session",
  "Book Club",
  "Debate Contest",
  "Stand-Up Comedy Night",
  "Music Jam Session",
  "Theater Performance",
  "Film Screening",
  "Poetry Slam",
  "Board Game Night",
  "Karaoke Party",
  "Origami Workshop",
  "Candle Making Class",
  "Music Production Workshop",
  "Technology Meetup",
  "Startup Pitch Event",
  "Robotics Club",
  "Virtual Reality Meetup",
  "Sustainability Workshop",
  "Mindfulness Session",
  "Dance Class",
  "Digital Art Workshop",
  "DIY Electronics",
  "Calligraphy Class",
  "Journaling Meetup",
  "Film Photography Workshop",
  "3D Printing Workshop",
  "Artisan Market",
  "Antique Collectors Meetup",
  "Magic Show",
  "Improv Comedy Night",
  "Scrapbooking Session",
  "Birdwatching Event",
  "Astronomy Meetup",
  "Stargazing Event",
  "Carpentry Class",
  "Science Fair",
  "Coding Bootcamp",
  "Coding Hackathon",
  "Pet Care Workshop",
  "Gardening Talk",
  "Chess Open",
  "Art Gallery Opening",
  "Community Potluck",
];

const locations = [
  "Community Center",
  "Local Park",
  "City Library",
  "Sports Complex",
  "University Campus",
  "Art Gallery",
  "Downtown Square",
  "Online Event",
  "Recreation Center",
  "Fitness Studio",
  "Theater Hall",
  "Museum",
  "Coffee Shop",
  "Coworking Space",
  "Botanical Garden",
  "Tech Hub",
  "Community College",
  "Outdoor Amphitheater",
  "Public Library",
  "Restaurant Venue",
];

const generateDescription = (name: string, type: "sports" | "hobby") => {
  const descriptions = {
    sports: [
      `Join us for an exciting ${name}! Compete, challenge yourself, and showcase your athletic skills.`,
      `A thrilling ${name} awaits! Bring your passion, energy, and competitive spirit.`,
      `Experience the excitement of ${name}. Perfect for athletes of all levels looking to push their limits.`,
      `Get ready for an action-packed ${name}. Great opportunity to meet fellow sports enthusiasts.`,
    ],
    hobby: [
      `Discover the joy of ${name}! A perfect event for creative minds and skill enthusiasts.`,
      `Explore your passion for ${name} in a fun, supportive environment.`,
      `Join us for an inspiring ${name}. Learn, share, and connect with like-minded individuals.`,
      `An engaging ${name} that promises creativity, learning, and community connection.`,
    ],
  };

  const descriptionOptions = descriptions[type];
  return descriptionOptions[Math.floor(Math.random() * descriptionOptions.length)];
};

interface EventData {
  name: string;
  hobby: string;
  date: Date;
  startingParticipants: number;
  capacity: number;
  owner: String;
  location: string;
  description: string;
}

const generateEvents = async (type: "sports" | "hobby", users: any[]): Promise<EventData[]> => {
  const events: EventData[] = [];
  const date = new Date();

  for (let i = 0; i < 50; i++) {
    const randomUser = users.length > 0 ? users[Math.floor(Math.random() * users.length)] : null;

    if (!randomUser) {
      console.warn("No users available to assign event ownership");
      break;
    }

    const randomDate = new Date(date.getTime() + Math.random() * 10000000000);
    const name = type === "sports" ? sportsEvents[i % sportsEvents.length] : hobbyEvents[i % hobbyEvents.length];

    const event = {
      name: name,
      hobby: type === "sports" ? "Sport" : "Hobby",
      date: randomDate,
      startingParticipants: Math.floor(Math.random() * 50) + 1,
      capacity: Math.floor(Math.random() * 50) + 50,
      owner: randomUser._id,
      location: locations[Math.floor(Math.random() * locations.length)],
      description: generateDescription(name, type),
    };
    events.push(event);
  }

  return events;
};

export async function GET(request: NextRequest) {
  // Validate MongoDB URI
  if (!mongoURI) {
    return NextResponse.json({ error: "MONGO_URI is not defined in the environment variables" }, { status: 500 });
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    // Check if events already exist to prevent duplicate insertion
    const existingEventsCount = await Event.countDocuments();
    if (existingEventsCount > 0) {
      return NextResponse.json({ error: "Events already populated" }, { status: 400 });
    }

    // Fetch users, handle case of no users
    const users = await User.find();
    if (users.length === 0) {
      return NextResponse.json({ error: "No users found to assign events" }, { status: 400 });
    }

    // Generate events
    const sportsEventsData: EventData[] = await generateEvents("sports", users);
    const hobbyEventsData: EventData[] = await generateEvents("hobby", users);

    // Combine both types of events into one array
    const allEventsData: EventData[] = [...sportsEventsData, ...hobbyEventsData];

    // Insert events into the database
    await Event.insertMany(allEventsData);

    return NextResponse.json(
      {
        message: "Events populated successfully",
        totalEvents: allEventsData.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error populating events:", error);
    return NextResponse.json(
      {
        error: "Error populating events",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  } finally {
    // Safely disconnect from MongoDB
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting from MongoDB:", disconnectError);
    }
  }
}
