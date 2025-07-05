"use client";
import React, { useState, useEffect } from "react";

import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleMapComponent from "@/components/GoogleMap";
import { Clock, MapPin, Send } from "lucide-react";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <header
        id="home"
        className={`relative min-h-screen flex flex-col items-center justify-center text-white text-center p-4 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ fontFamily: "'Lora', serif', serif'" }}
          >
            Σοφόκλης & Κατερίνα
          </h1>
          <Countdown />

          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto italic">
            Once in a while, right in the middle of an ordinary life, love gives
            us a fairy tale.
          </p>
        </div>
      </header>

      <main>
        {/* Event Information Panel */}
        <section id="events" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-4xl font-bold text-gray-800 mb-12"
              style={{ fontFamily: "'Lora', serif'" }}
            >
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">When</h3>
                <p>Saturday, November 08, 2025</p>
                <p>13:00 - Wasted!!</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <MapPin className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Where</h3>
                <p className="font-semibold">Aliathon Resort</p>
                <p>3 Poseidonos Avenue, Yeroskipou 8204, Cyprus</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                More Information
              </h3>
              <p className="text-center text-gray-600">
                <strong>Dress Code:</strong> Formal Attire. <br />{" "}
                <strong>Transportation:</strong> Shuttle service will be
                available from the downtown hotel. On-site parking is limited.{" "}
                <br />
                <strong>Special Note:</strong> While we love your little ones,
                this is an adults-only celebration.
              </p>
            </div>
            <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-sm">
                <GoogleMapComponent />
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section
          id="rsvp"
          className="py-20"
          style={{ backgroundColor: "#fdf8f5" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RSVPForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
