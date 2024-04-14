/* @jsxImportSource react */
import React, { useState } from 'react';

const Settings = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    heightFeet: '',
    heightInches: '',
    weight: '',
    activity: 'sedentary',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission logic here (e.g., send data to backend)
      console.log('Form data:', formData);
      // Reset form after submission if needed
      setFormData({
        age: '',
        gender: 'male',
        heightFeet: '',
        heightInches: '',
        weight: '',
        activity: 'sedentary',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main className="flex items-center justify-center ml-10 h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1>Calorie Pal Form</h1>
        <form id="calorieForm" onSubmit={handleSubmit}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="15"
            max="80"
            value={formData.age}
            onChange={handleInputChange}
            required
          /><br /><br />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select><br /><br />

          {/* Add other form fields similarly */}
          
          <button type="submit">Submit</button>
        </form>
        <div id="calorieResults"></div>
      </div>
    </main>
  );
};

export default Settings;
