
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';

const Schedule = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/schedule" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Cronograma" />
          <div className="max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Cronograma Semanal</h1>
            
            <p className="text-gray-600 dark:text-gray-300">
              Organize seus horários de estudo. Clique em "Adicionar" para criar um novo horário
              ou passe o mouse sobre um horário existente para editar ou excluir.
            </p>
            
            <div className="mt-4 overflow-x-auto">
              <WeeklySchedule />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Schedule;
