"use client";
import React, { useState, useEffect } from "react";

const Footer = () => (
  <footer className="bg-gray-100 text-gray-600 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p style={{ fontFamily: "'Lora', serif" }} className="text-xl">
        With love, Sofoklis &amp; Katerina
      </p>
      <p className="mt-2 text-sm">&copy; {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default Footer;
