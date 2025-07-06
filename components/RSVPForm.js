"use client";
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: 1,
    date: new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', ''),
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("Please fix the errors above.");
      return;
    }
    console.log(formData);
    setStatus("Sending...");
    try {
      const response = await fetch(
        "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT",
        {
          // <-- REPLACE THIS
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Thank you!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: 1,
          dietary: "none",
          notes: "",
        });
      } else {
        const data = await response.json();
        setStatus(
          data.error || "Oops! There was a problem submitting your form."
        );
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl"
    >
      <h2
        className="text-4xl font-bold text-gray-800 text-center mb-8"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Will you be attending?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={`w-full px-4 py-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-yellow-500 focus:border-yellow-500`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="md:col-span-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className={`w-full px-4 py-3 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-yellow-500 focus:border-yellow-500`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="md:col-span-3">
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
           Guests
          </label>
          <select
            name="guests"
            id="guests"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            value={formData.guests}
            onChange={handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-yellow-600 hover:bg-yellow-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          <Send className="w-5 h-5 mr-2" />
          See you there!
        </button>
      </div>
      {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
    </form>
  );
};

export default RSVPForm;
