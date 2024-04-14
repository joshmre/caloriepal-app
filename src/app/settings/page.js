"use client";

import React, { useEffect } from 'react';
import { calculateCalories } from './calorieCalculator'; // Adjust the path as needed

export default function Settings() {
    useEffect(() => {
      calculateCalories(); // Call the function when the component mounts
    }, []);
    
  return (
    <main className="flex flex-col items-center justify-center ml-10 h-screen">
        <h1 className="text-5xl font-bold mb-2">
          Calorie<span className="text-[#3da54b]"> Calculator</span>
        </h1>
        <div className="calculator-note">
        Note: This calculator uses the Mifflin-St Jeor equation to estimate Resting Metabolic Rate (RMR). While generally accurate, individual variations in factors like lean body mass can result in slight deviations. Therefore, consider the result as an estimation with a margin of error, especially considering individual differences. Read more <a href="https://blog.nasm.org/nutrition/resting-metabolic-rate-how-to-calculate-and-improve-yours#:~:text=The%20Mifflin%2DSt%20Jeor%20equation,%C3%97%20age%20in%20years)%20%2B%205">here</a>.
        </div>
      <div className="flex">
        <form id="calorieForm" className="form-container">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="number" id="age" name="age" min="15" max="80" required className="form-input" />

          <label htmlFor="gender" className="form-label">Gender:</label>
          <select id="gender" name="gender" required className="form-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="heightFeet" className="form-label">Height (Feet):</label>
          <input type="number" id="heightFeet" name="heightFeet" min="3" max="8" required className="form-input" />
          <label htmlFor="heightInches" className="form-label">Height (Inches):</label>
          <input type="number" id="heightInches" name="heightInches" min="0" max="11" required className="form-input" />

          <label htmlFor="weight" className="form-label">Weight (Pounds):</label>
          <input type="number" id="weight" name="weight" min="80" max="400" required className="form-input" />

          <label htmlFor="activity" className="form-label">Activity Level:</label>
          <select id="activity" name="activity" required className="form-select">
            <option value="sedentary">Sedentary: little or no exercise</option>
            <option value="light">Light: exercise 1-3 times/week</option>
            <option value="moderate">Moderate: exercise 4-5 times/week</option>
            <option value="active">Active: daily exercise or intense exercise 3-4 times/week</option>
            <option value="veryActive">Very Active: intense exercise daily or physical job</option>
          </select>

          <button type="submit" className="form-button">Submit</button>
        </form>
        <div id="calorieResults" className="calorie-results"></div>
      </div>
    </main>
  );
}