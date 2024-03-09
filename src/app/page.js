"use client";
import { useState } from "react";

const GuessInfo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fetch age
      const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
      const ageData = await ageResponse.json();
      setAge(ageData.age);

      // Fetch gender
      const genderResponse = await fetch(
        `https://api.genderize.io?name=${name}`
      );
      const genderData = await genderResponse.json();
      setGender(genderData.gender);

      // Fetch country
      const countryResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      const countryData = await countryResponse.json();
      if (countryData.country.length > 0) {
        setCountry(countryData.country[0].country_id);
      } else {
        setCountry("Unknown");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto items-center">
      <div className="flex justify-center items-center">
        <h2>Guess Your Details</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
        <label className="mb-4">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 ml-2"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Guess Info"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col items-center">
        {!loading && age && (
          <p className="mt-4">
            Guessed age for {name}: {age}
          </p>
        )}
        {!loading && gender && (
          <p>
            Guessed gender for {name}: {gender}
          </p>
        )}
        {!loading && country && (
          <p>
            Guessed country for {name}: {country}
          </p>
        )}
      </div>
    </div>
  );
};

export default GuessInfo;
