import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const UpcomingEvents = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);

    const events = [
        {
            title: "Unlocking Intelligence - AI ML Workshop",
            date: "FEB 22, 2024",
            location: "MUMBAI, IN",
            image: "https://img.freepik.com/premium-vector/artificial-intelligence-machine-learning-poster_35632-60.jpg?w=826",
            tag: ["Machine Learning", "Python", "TensorFlow"],
            description:
                "Explore Kaggle ML Study Jom and Machine Learning with TensorFlow. Join GDSC-TSEC's Al & ML Workshop! Dive into ML 101 and RAG.",
            link: "#",
        },
        {
            title: "Data Science Summit 2024",
            date: "MAR 15, 2024",
            location: "NEW YORK, USA",
            image: "https://img.freepik.com/free-vector/data-science-concept-illustration_114360-1624.jpg?size=626&ext=jpg",
            tag: ["Data Science", "Big Data", "Analytics"],
            description:
                "Join the biggest data science event of the year! Learn from industry leaders, participate in workshops, and network with professionals.",
            link: "#",
        },
        {
            title: "Web Development Bootcamp",
            date: "APR 10, 2024",
            location: "LONDON, UK",
            image: "https://img.freepik.com/free-vector/programmer-workplace-with-computer-monitor-development-programming-coding-software-engineering-website-design_335657-3795.jpg?size=626&ext=jpg",
            tag: ["Web Development", "JavaScript", "React", "Node.js"],
            description:
                "Become a proficient web developer in just 2 weeks! Our intensive bootcamp covers HTML, CSS, JavaScript, and modern frameworks.",
            link: "#",
        },
        // Add more events as needed
    ];

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterEvents(e.target.value);
    };

    // Function to filter events based on search query
    const filterEvents = (query) => {
        const filtered = events.filter((event) =>
            event.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    // Use the filtered events if search query is not empty, otherwise use all events
    const eventsToDisplay = searchQuery ? filteredEvents : events;

    return (
        <div className="mt-8 mx-8">
            {/* Search input */}
            <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            {/* Display events */}
            {eventsToDisplay.map((event, index) => (
                <div key={index} className="flex md:flex-row flex-col border-2 rounded-2xl items-center p-4 my-8">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-[120px] h-[120px] rounded-full mx-16"
                    />
                    <div>
                        <Typography variant="h5" gutterBottom>
                            {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {event.date} - {event.location}
                        </Typography>
                        <div className="flex flex-row flex-wrap py-2">
                            {event.tag.map((tag, index) => (
                                <div key={index} className="px-4 py-1 me-2 bg-gray-200 rounded-md">{tag}</div>
                            ))}

                        </div>
                        <Typography variant="body1">{event.description}</Typography>
                        <button href={event.link} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                            RSVP
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpcomingEvents;
