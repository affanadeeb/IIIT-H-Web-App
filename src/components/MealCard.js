import React from 'react';
import { Coffee, UtensilsCrossed, Moon, Clock, Cookie } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { motion } from 'framer-motion';

export const MealCard = ({ messName, menuItems = [], currentMeal }) => {
  const MEAL_TIMES = {
    BREAKFAST: { 
      icon: Coffee, 
      label: 'Breakfast',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    LUNCH: { 
      icon: UtensilsCrossed, 
      label: 'Lunch',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    SNACKS: { 
      icon: Cookie, 
      label: 'Snacks',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    DINNER: { 
      icon: Moon, 
      label: 'Dinner',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    CLOSED: { 
      icon: Clock, 
      label: 'Closed',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600'
    }
  };

  const mealInfo = MEAL_TIMES[currentMeal] || MEAL_TIMES['CLOSED'];
  const Icon = mealInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`w-full overflow-hidden ${mealInfo.bgColor} hover:shadow-lg transition-shadow duration-300`}>
        <CardHeader className="relative">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${mealInfo.iconColor} bg-white/80`}>
              <Icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-semibold capitalize">
              {messName}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {currentMeal === 'CLOSED' ? (
            <p className="text-red-500 text-center py-4">Mess is currently closed</p>
          ) : (
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MealCard;
