"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="text-gray-600 hover:text-rose-500 transition-colors duration-300 text-lg font-medium"
    >
      {children}
    </a>
  );

  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Lora', serif" }}
            >
              J & A
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#events">Events</NavLink>
              <NavLink href="#rsvp">RSVP</NavLink>
              <NavLink href="/album">Shared Album</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#events">Events</NavLink>
            <NavLink href="#rsvp">RSVP</NavLink>
            <NavLink href="/album">Shared Album</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
