// src/components/MealCard.js
import React from 'react';
import { Clock, Coffee, UtensilsCrossed, Moon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export const MealCard = ({ messName, menuItems = [], currentMeal }) => {
  const MEAL_TIMES = {
    BREAKFAST: { icon: Coffee, label: 'Breakfast' },
    LUNCH: { icon: UtensilsCrossed, label: 'Lunch' },
    DINNER: { icon: Moon, label: 'Dinner' },
    CLOSED: { icon: Clock, label: 'Closed' }
  };

  // Fallback to 'CLOSED' if currentMeal is undefined or not a key in MEAL_TIMES
  const mealInfo = MEAL_TIMES[currentMeal] || MEAL_TIMES['CLOSED'];
  const Icon = mealInfo.icon;

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Icon className="w-6 h-6" />
        <CardTitle>{messName}</CardTitle>
      </CardHeader>
      <CardContent>
        {currentMeal === 'CLOSED' ? (
          <p className="text-red-500">Mess is currently closed</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {menuItems.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default MealCard;