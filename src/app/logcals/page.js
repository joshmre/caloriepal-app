"use client"
import React, { useState, useEffect } from 'react';
import { FaRegCircleXmark } from "react-icons/fa6";

const Logcals = () => {
  const [goalWeight, setGoalWeight] = useState('');
  const [lockedGoalWeight, setLockedGoalWeight] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalMessage, setGoalMessage] = useState('');
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [mealCalories, setMealCalories] = useState('');
  const [mealName, setMealName] = useState('');
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [goalErrorMessage, setGoalErrorMessage] = useState('');
  const [mealErrorMessage, setMealErrorMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('calorieLog');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setGoalWeight(parsedData.goalWeight || '');
      setLockedGoalWeight(parsedData.goalWeight || ''); // Set lockedGoalWeight initially to the same value as goalWeight
      setGoalType(parsedData.goalType || '');
      setMeals(parsedData.meals || []);
      setConsumedCalories(parsedData.consumedCalories || 0);
      setTotalCalories(parsedData.totalCalories || 0);
      setGoalMessage(parsedData.goalMessage || '');
    }
  }, []);

  const handleGoalLock = () => {
    if (parseInt(goalWeight) < 400) {
      setGoalErrorMessage('Negative calorie goal must be at least 400 calories. You should at least eat something!');
      return;
    }

    setLockedGoalWeight(goalWeight); // Update lockedGoalWeight when the goal is locked

    let goalMessage = '';
    if (goalType === 'lose') {
      goalMessage = `Stay under ${goalWeight} calories`;
    } else if (goalType === 'gain') {
      goalMessage = `Consume over ${goalWeight} calories`;
    } else if (goalType === 'maintain') {
      const lowerBound = parseInt(goalWeight) - 150;
      const upperBound = parseInt(goalWeight) + 150;
      goalMessage = `Stay around ${lowerBound} - ${upperBound} calories`;
    }

    setGoalMessage(goalMessage);
    setGoalErrorMessage(''); // Reset goalErrorMessage state
    handleSaveData(meals, consumedCalories, totalCalories, goalMessage);
  };

  const handleAddMeal = () => {
    const mealCaloriesNum = parseInt(mealCalories);
    if (mealCaloriesNum >= 0 && mealCaloriesNum <= 9999 && mealName.trim().length <= 15 && meals.length < 12) {
      const newMeal = {
        name: mealName.trim(),
        calories: Math.min(mealCaloriesNum, 9999),
      };
      const updatedMeals = [...meals, newMeal];
      setMeals(updatedMeals);
      setConsumedCalories(consumedCalories + mealCaloriesNum);
      setTotalCalories(totalCalories + Math.min(mealCaloriesNum, 9999));

      setMealName('');
      setMealCalories('');
      setMealErrorMessage('');
      
      handleSaveData(updatedMeals, consumedCalories + mealCaloriesNum, totalCalories + mealCaloriesNum, goalMessage);
  
      setMealErrorMessage(''); // Reset mealErrorMessage state
    } else {
      setMealErrorMessage('Invalid input. Please enter a valid meal name (up to 15 characters) and calories (0-9999).');
    }
  };

  const handleRemoveMeal = (index) => {
    const mealToRemove = meals[index];
    const updatedMeals = meals.filter((_, idx) => idx !== index);
    const updatedConsumedCalories = consumedCalories - mealToRemove.calories;
    const updatedTotalCalories = totalCalories - mealToRemove.calories;

    setMeals(updatedMeals);
    setConsumedCalories(updatedConsumedCalories);
    setTotalCalories(updatedTotalCalories);

    handleSaveData(updatedMeals, updatedConsumedCalories, updatedTotalCalories, goalMessage);
  };

  const handleSaveData = (
    updatedMeals = meals,
    updatedConsumedCalories = consumedCalories,
    updatedTotalCalories = totalCalories,
    updatedGoalMessage = goalMessage
  ) => {
    const dataToSave = {
      goalWeight,
      goalType,
      meals: updatedMeals,
      consumedCalories: updatedConsumedCalories,
      totalCalories: updatedTotalCalories,
      goalMessage: updatedGoalMessage,
    };
    localStorage.setItem('calorieLog', JSON.stringify(dataToSave));
  };

  const calculateCaloriesRemaining = () => {
    let remainingCalories = 0;
    let message = '';

    if (goalType === 'lose') {
      remainingCalories = Math.min(parseInt(lockedGoalWeight) - totalCalories, 9999);
      if (remainingCalories > 0) {
        message = `You're on track! 😊 You may consume another ${remainingCalories} calories to reach your goal.`;
      } else if (remainingCalories === 0) {
        message = "You've reached your goal! 🎉";
      } else {
        message = "You went over your calorie limit. You'll get 'em next time! 😕";
      }
    } else if (goalType === 'gain') {
      remainingCalories = Math.max(parseInt(lockedGoalWeight) - totalCalories, 0);
      if (remainingCalories > 0) {
        message = `You need ${remainingCalories} more calories to gain weight! Eat up! 🍔🍕🍰`;
      } else if (remainingCalories === 0) {
        message = "You've reached your goal! 🎉 Great job!";
      }
    } else if (goalType === 'maintain') {
      remainingCalories = Math.min(parseInt(lockedGoalWeight) - totalCalories, 9999);
      if (remainingCalories > 0) {
        message = `You may consume another ${remainingCalories - 150} - ${remainingCalories + 150} calories to reach your goal. You got this!`;
      } else if (remainingCalories === 0) {
        message = "You've reached your goal! 🎉";
      } else {
        message = "You've exceeded your calorie goal. You'll get back on track! 😕";
      }
    }

    return message;
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-10">
           Calorie <span className="text-[#3da54b]"> Log</span>
        </h1>
    <div className="main-container">
      <div className="left-column">
      <div className="set-goal">
        <h2>Set Current Goal</h2>
        {goalErrorMessage && <p className="error-message">{goalErrorMessage}</p>}
        <div className="input-container">
          <input
            type="number"
            placeholder="Calorie Min/Max"
            value={goalWeight}
            onChange={(e) => setGoalWeight(Math.min(parseInt(e.target.value), 9999))}
          />
        </div>
          <div className="input-container">
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
            >
              <option value="">Select Goal Type</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
          <div className="button-container">
            <button onClick={handleGoalLock}>Lock Goal</button>
          </div>
        </div>

        <div className="add-meal">
          <h2>Add Meal</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Calories"
              value={mealCalories}
              onChange={(e) => setMealCalories(Math.min(parseInt(e.target.value), 9999))}
            />
          </div>
          <div className="button-container">
            <button onClick={handleAddMeal}>Add</button>
          </div>
          {mealErrorMessage && <p className="error-message">{mealErrorMessage}</p>}
        </div>
      </div>

      <div className="right-column">
        <div className="goal-message">
          <h2><u>Goal:</u></h2>
          <p>{goalMessage}</p>
        </div>

        <div className="calories-consumed">
          <h2><u>Calories Consumed</u></h2>
          <table>
            <thead>
              <tr>
                <th>Meal Name</th>
                <th>Calories</th>
                <th> </th> 
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.name}</td>
                  <td>{meal.calories}</td>
                  <td>
                    <button onClick={() => handleRemoveMeal(index)}>
                      <FaRegCircleXmark/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Calories: {totalCalories}</p>
        </div>

        <div className="calories-remaining">
          <h2><u>Calories Remaining</u></h2>
          <p>{calculateCaloriesRemaining()}</p>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Logcals;