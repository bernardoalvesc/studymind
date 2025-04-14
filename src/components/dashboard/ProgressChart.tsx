
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useStudyPlanner } from '@/context/StudyPlannerContext';

const ProgressChart = () => {
  const { tasks } = useStudyPlanner();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  
  const progressData = [
    { name: 'Concluídas', value: completedTasks, color: '#9b87f5' },
    { name: 'Pendentes', value: pendingTasks, color: '#E5E7EB' },
  ];
  
  // Calculate completion percentage
  const completionPercentage = tasks.length > 0
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="study-card flex flex-col h-full dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">Progresso das Tarefas</h3>
      
      <div className="flex flex-col items-center justify-center flex-1 min-h-[180px]">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Sem tarefas no momento</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center relative w-full mb-2">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                  <Tooltip formatter={(value) => [`${value} tarefas`, '']} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-study-purple dark:text-study-purple-light">{completionPercentage}%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Concluídas</div>
              </div>
            </div>
            
            <div className="w-full px-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progresso</span>
                <span>{completedTasks} de {tasks.length}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-study-purple h-2.5 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
