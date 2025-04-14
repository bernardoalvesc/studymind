
import React from 'react';
import { Flame, Star } from 'lucide-react';
import { useStudyPlanner } from '@/context/StudyPlannerContext';

const StreakCard = () => {
  const { streak } = useStudyPlanner();
  
  // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  
  // Reordering weekdays to start with Sunday (to match JavaScript's Date.getDay())
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  return (
    <div className="study-card dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Consistência</h3>
        <div className="flex items-center text-amber-500">
          <Flame className="w-5 h-5 mr-1" />
          <span className="font-medium">{streak} {streak === 1 ? 'dia' : 'dias'}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        {weekDays.map((day, index) => {
          // Calculate if this day should be marked based on streak
          const isPast = index < today;
          const isToday = index === today;
          
          // Only mark days that are within the streak count
          const isActiveStreak = isToday || (isPast && (today - index) <= streak);
          
          // Use unique keys for each day
          return (
            <div key={`day-${index}`} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2 dark:text-gray-400">{day}</div>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActiveStreak 
                    ? 'bg-study-purple text-white'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
              >
                {isActiveStreak 
                  ? <Star className="w-4 h-4" /> 
                  : <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                }
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Continue estudando todos os dias para aumentar sua série!
        </p>
      </div>
    </div>
  );
};

export default StreakCard;
