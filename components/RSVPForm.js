"use client";
import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: 1,
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbyFSAwgpUSxf-0aGSz6R7fFsFaSjrN4akDmY6r1hQ0Z6mpbItFc_VV0AkcCORcpmRo/exec";

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
    setStatus("Sending...");

    try {
      const res = await fetch(googleScriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          numSpots: formData.guests,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add registration to google spreadsheet");
      }

      setStatus("Success!");
      // Clear form on success
      setFormData({ name: "", phone: "", guests: 1 });
    } catch (error) {
      setStatus("Ooops! There was a problem with your submission!");
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
            <option>5</option>
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
