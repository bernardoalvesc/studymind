
import React from 'react';
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import TaskCard from '@/components/dashboard/TaskCard';
import ProgressChart from '@/components/dashboard/ProgressChart';
import StreakCard from '@/components/dashboard/StreakCard';
import QuickAddTask from '@/components/dashboard/QuickAddTask';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';
import SubjectList from '@/components/dashboard/SubjectList';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';

const DashboardContent = () => {
  const { tasks } = useStudyPlanner();
  const pendingTasks = tasks.filter(task => !task.completed);
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <QuickAddTask />
        </div>
        
        <div>
          <StreakCard />
        </div>
        
        <div>
          <ProgressChart />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold dark:text-white">Tarefas pendentes</h2>
          {pendingTasks.length > 0 ? (
            <div className="space-y-3">
              {pendingTasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {pendingTasks.length > 3 && (
                <Link 
                  to="/tasks" 
                  className="block text-center text-study-purple hover:text-study-purple-dark mt-2 font-medium dark:text-study-purple-light"
                >
                  Ver todas as tarefas ({pendingTasks.length})
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa pendente</p>
            </div>
          )}
        </div>
        
        <div>
          <SubjectList />
        </div>
        
        <div className="md:col-span-2">
          <WeeklySchedule />
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Dashboard" />
          <div className="max-w-6xl w-full mx-auto">
            <DashboardContent />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;
