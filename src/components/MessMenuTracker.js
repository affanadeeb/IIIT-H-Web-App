// src/components/MessMenuTracker.js
import React, { useState, useEffect } from 'react';
import { read } from 'xlsx';
import { MealCard } from './MealCard';
import { parseExcelData } from '../utils/parseExcelData';

const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

const MessMenuTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(getDayOfWeek());
  const [selectedMess, setSelectedMess] = useState('');
  const [messMenus, setMessMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const messFiles = ['yuktahaar', 'kadamba', 'north', 'south'];
        const menus = {};

        for (const mess of messFiles) {
          console.log(`Fetching menu for ${mess}...`);
          try {
            const response = await fetch(`/data/${mess}.xlsx`);
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            const workbook = read(arrayBuffer);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            menus[mess] = parseExcelData(worksheet);
          } catch (messError) {
            console.error(`Error loading ${mess} menu:`, messError);
            menus[mess] = {
              breakfast: { sunday: ['Menu not available'], monday: ['Menu not available'], tuesday: ['Menu not available'], wednesday: ['Menu not available'], thursday: ['Menu not available'], friday: ['Menu not available'], saturday: ['Menu not available'] },
              lunch: { sunday: ['Menu not available'], monday: ['Menu not available'], tuesday: ['Menu not available'], wednesday: ['Menu not available'], thursday: ['Menu not available'], friday: ['Menu not available'], saturday: ['Menu not available'] },
              dinner: { sunday: ['Menu not available'], monday: ['Menu not available'], tuesday: ['Menu not available'], wednesday: ['Menu not available'], thursday: ['Menu not available'], friday: ['Menu not available'], saturday: ['Menu not available'] }
            };
          }
        }

        setMessMenus(menus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMenuData();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading menu data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleMessChange = (event) => {
    setSelectedMess(event.target.value);
  };

  const getCurrentMenuItems = (menu) => {
    const dayKey = selectedDay.toLowerCase();
    return [
      menu.breakfast[dayKey] || ['Menu not available'],
      menu.lunch[dayKey] || ['Menu not available'],
      menu.dinner[dayKey] || ['Menu not available']
    ];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">IIIT-H Mess Menu</h1>
      <p className="text-center mb-6">Current time: {currentTime.toLocaleTimeString()}</p>

      <div className="flex justify-center mb-4">
        <label htmlFor="day-select" className="mr-2">
          Select Day:
        </label>
        <select
          id="day-select"
          value={selectedDay}
          onChange={handleDayChange}
          className="px-2 py-1 rounded border border-gray-300"
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        <label htmlFor="mess-select" className="ml-4 mr-2">
          Select Mess:
        </label>
        <select
          id="mess-select"
          value={selectedMess}
          onChange={handleMessChange}
          className="px-2 py-1 rounded border border-gray-300"
        >
          <option value="">Select Mess</option>
          <option value="yuktahaar">Yuktahaar</option>
          <option value="kadamba">Kadamba</option>
          <option value="north">North</option>
          <option value="south">South</option>
        </select>
      </div>

      {selectedMess && messMenus[selectedMess] && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getCurrentMenuItems(messMenus[selectedMess]).map((items, index) => (
            <MealCard
              key={`${selectedMess}-${index}`}
              messName={['Breakfast', 'Lunch', 'Dinner'][index]}
              menuItems={items}
              currentMeal={['BREAKFAST', 'LUNCH', 'DINNER'][index]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessMenuTracker;
