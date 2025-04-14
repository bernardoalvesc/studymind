
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import ProgressChart from '@/components/dashboard/ProgressChart';
import StreakCard from '@/components/dashboard/StreakCard';
import { useStudyPlanner } from '@/context/StudyPlannerContext';

const Progress = () => {
  const { tasks, subjects } = useStudyPlanner();
  
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  
  // Calculate tasks per subject
  const tasksBySubject = subjects.map(subject => {
    const subjectTasks = tasks.filter(task => task.subjectId === subject.id);
    const completedSubjectTasks = subjectTasks.filter(task => task.completed);
    
    return {
      subjectName: subject.name,
      subjectColor: subject.color,
      total: subjectTasks.length,
      completed: completedSubjectTasks.length,
      completionRate: subjectTasks.length > 0 
        ? Math.round((completedSubjectTasks.length / subjectTasks.length) * 100)
        : 0
    };
  });
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/progress" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Progresso" />
          <div className="max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Seu Progresso</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Visão Geral</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-gray-300">Tarefas concluídas</span>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {completedTasks.length} de {tasks.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-study-purple h-2.5 rounded-full"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <StreakCard />
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Distribuição por Matéria</h2>
              <ProgressChart />
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Progresso por Matéria</h2>
              
              <div className="space-y-4 mt-6">
                {tasksBySubject.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: subject.subjectColor }}
                        />
                        <span className="text-sm font-medium dark:text-gray-300">{subject.subjectName}</span>
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300">
                        {subject.completed} de {subject.total} tarefas
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="h-2.5 rounded-full"
                        style={{ 
                          width: `${subject.completionRate}%`,
                          backgroundColor: subject.subjectColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {tasksBySubject.length === 0 && (
                <div className="text-center p-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Nenhuma matéria com tarefas encontrada.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Progress;
