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

      <header
        id="home"
        className={`relative min-h-screen flex flex-col items-center justify-center text-white text-center p-4 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/sk3.jpg')",
            position: "absolute",
          }}
        ></div>
        {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
        <div className="relative z-10 flex flex-col items-center h-full justify-start pt-[40vh]">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ fontFamily: "'Lora', serif', serif'" }}
          >
            Σοφοκλής & Κατερίνα
          </h1>
          <div>
            <Countdown />
          </div>
        </div>
      </header>

      <main>
        {/* Event Information Panel */}
        <section id="events" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            {/* <h2
              className="text-4xl font-bold text-gray-800 mb-12"
              style={{ fontFamily: "'Lora', serif'" }}
            >
              Wedding Agenda
            </h2> */}
            <div className="max-w-6xl mx-auto px-4">
              <table className="w-full table-auto border-separate border-spacing-y-12">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-middle text-center h-72">
                      {" "}
                      <img
                        src="/suit.png"
                        alt="Location 1"
                        className="rounded-lg w-full h-64 object-contain mx-auto" // object-contain ensures full image is visible
                      />
                    </td>
                    <td className="align-middle text-center h-72 text-lg">
                      <div className="mb-2 font-semibold">Αλλάματα γαμπρού</div>
                      <div className="mb-2 text-gray-600">13:00</div>
                      <a
                        href="https://www.google.com/maps?saddr=My+Location&daddr=34.80609744262925,32.46040753160642"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Διαδρομή
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-middle text-center h-72">
                      <img
                        src="/bribe.png"
                        alt="Location 2"
                        className="rounded-lg w-full h-64 object-contain mx-auto"
                      />
                    </td>
                    <td className="align-middle text-center h-72 text-lg">
                      <div className="mb-2 font-semibold">Στολίσματα νύφης</div>
                      <div className="mb-2 text-gray-600">15:00</div>
                      <a
                        href="https://www.google.com/maps?saddr=My+Location&daddr=34.7451594299861,32.435311586797184"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Διαδρομή
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-middle text-center h-72">
                      <img
                        src="/church.png"
                        alt="Location 3"
                        className="rounded-lg w-full h-64 object-contain mx-auto"
                      />
                    </td>
                    <td className="align-middle text-center h-72 text-lg">
                      <div className="mb-2 font-semibold">Εκκλησία</div>
                      <div className="mb-2 text-gray-600">17:15</div>
                      <a
                        href="https://www.google.com/maps?saddr=My+Location&daddr=34.772853601394964,32.42051199309124"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Διαδρομή
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-middle text-center h-72">
                      <img
                        src="/food.png"
                        alt="Location 4"
                        className="rounded-lg w-full h-64 object-contain mx-auto"
                      />
                    </td>
                    <td className="align-middle text-center h-72 text-lg">
                      <div className="mb-2 font-semibold">Δείπνο</div>
                      <div className="mb-2 text-gray-600">20:00 </div>
                      <a
                        href="https://www.google.com/maps?saddr=My+Location&daddr=Aliathon+Resort,+Paphos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Διαδρομή
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 p-6 bg-gray-50 rounded-lg shadow-sm">
            <GoogleMapComponent />
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
