
import React from 'react';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Sparkles } from 'lucide-react';

const SubjectList = () => {
  const { subjects, tasks, timeBlocks } = useStudyPlanner();

  // Calculate tasks count per subject
  const getTasksCountBySubject = (subjectId: string) => {
    return tasks.filter(task => task.subjectId === subjectId).length;
  };

  // Calculate time spent per subject (in minutes)
  const getTimeSpentBySubject = (subjectId: string) => {
    return timeBlocks
      .filter(block => block.subjectId === subjectId)
      .reduce((total, block) => {
        const startHour = parseInt(block.startTime.split(':')[0]);
        const startMinute = parseInt(block.startTime.split(':')[1]);
        const endHour = parseInt(block.endTime.split(':')[0]);
        const endMinute = parseInt(block.endTime.split(':')[1]);
        
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        return total + (endTimeInMinutes - startTimeInMinutes);
      }, 0);
  };

  // Format minutes as hours and minutes
  const formatTimeSpent = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}min`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}min`;
    }
  };

  return (
    <div className="study-card dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Matérias</h3>
      </div>
      
      <div className="space-y-3">
        {subjects.map(subject => {
          const tasksCount = getTasksCountBySubject(subject.id);
          const timeSpent = getTimeSpentBySubject(subject.id);
          
          return (
            <div 
              key={subject.id}
              className="flex items-center p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div 
                className="w-10 h-10 rounded-md flex items-center justify-center"
                style={{ backgroundColor: subject.color }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium dark:text-white">{subject.name}</h4>
                <div className="flex text-xs text-gray-500 dark:text-gray-400">
                  <span>{tasksCount} {tasksCount === 1 ? 'tarefa' : 'tarefas'}</span>
                  <span className="mx-1">•</span>
                  <span>{formatTimeSpent(timeSpent)} programadas</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectList;
