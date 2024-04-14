import React, {useEffect } from 'react';
export const calculateCalories = () => {
    const form = document.getElementById('calorieForm');
    const resultContainer = document.getElementById('calorieResults');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const age = parseInt(formData.get('age'));
      const gender = formData.get('gender');
      const heightFeet = parseInt(formData.get('heightFeet'));
      const heightInches = parseInt(formData.get('heightInches'));
      const weightKg = parseInt(formData.get('weight')) * 0.453592; // Convert pounds to kilograms
      const activity = formData.get('activity');
  
      // Convert height to centimeters
      const totalHeightCm = ((heightFeet * 12) + heightInches) * 2.54;
  
      // Calculate BMR based on gender
      let bmr;
      if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * totalHeightCm) - (5 * age) + 5;
      } else if (gender === 'female') {
        bmr = (10 * weightKg) + (6.25 * totalHeightCm) - (5 * age) - 161;
      } else {
        console.error('Invalid gender.');
        return;
      }
  
      // Calculate total daily energy expenditure (TDEE) based on activity level
      let tdee;
      switch (activity) {
        case 'sedentary':
          tdee = bmr * 1.2;
          break;
        case 'light':
          tdee = bmr * 1.375;
          break;
        case 'moderate':
          tdee = bmr * 1.55;
          break;
        case 'active':
          tdee = bmr * 1.725;
          break;
        case 'veryActive':
          tdee = bmr * 1.9;
          break;
        default:
          console.error('Invalid activity level.');
          return;
      }
  
      // Display results
      resultContainer.innerHTML = `
    <style>
        .result {
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }
        .result h3 {
            font-weight: bold;
        }
    </style>
    <h2>Results:</h2>
    <div class="result">
        <h3>Maintain Weight:</h3>
        <p>${Math.round(tdee)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Mild Weight Loss (0.5 lb/week):</h3>
        <p>${Math.round(tdee * 0.89)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Weight Loss (1 lb/week):</h3>
        <p>${Math.round(tdee * 0.79)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Extreme Weight Loss (2 lb/week):</h3>
        <p>${Math.round(tdee * 0.58)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Mild Weight Gain (0.5 lb/week):</h3>
        <p>${Math.round(tdee * 1.11)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Weight Gain (1 lb/week):</h3>
        <p>${Math.round(tdee * 1.21)} Calories/day</p>
    </div>
    <div class="result">
        <h3>Fast Weight Gain (2 lb/week):</h3>
        <p>${Math.round(tdee * 1.42)} Calories/day</p>
    </div>
      `;
    });
  };
  