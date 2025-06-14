"use client";
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    dietary: "none",
    notes: "",
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
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
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
        setStatus("Thank you for your RSVP!");
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
      className="space-y-6 max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl"
    >
      <h2
        className="text-4xl font-bold text-gray-800 text-center mb-8"
        style={{ fontFamily: "'Lora', serif" }}
      >
        RSVP
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
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
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={`w-full px-4 py-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-yellow-500 focus:border-yellow-500`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
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
        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Number of Guests
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
      <div className="col-span-1 md:col-span-2">
        <label
          htmlFor="dietary"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Dietary Restrictions
        </label>
        <select
          name="dietary"
          id="dietary"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          value={formData.dietary}
          onChange={handleChange}
        >
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="other">Other (please specify in notes)</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-yellow-600 hover:bg-yellow-700 transition duration-300 transform hover:scale-105 shadow-lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit RSVP
        </button>
      </div>
      {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
    </form>
  );
};

export default RSVPForm;
