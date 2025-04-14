
import React from 'react';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Check, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';

type TaskCardProps = {
  task: {
    id: string;
    title: string;
    completed: boolean;
    subjectId: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  };
  onToggle?: () => void;
  onDelete?: () => void;
};

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const { subjects, toggleTaskCompletion } = useStudyPlanner();
  const subject = subjects.find(s => s.id === task.subjectId);
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      toggleTaskCompletion(task.id);
    }
  };
  
  const priorityStyles = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  const priorityNames = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border flex items-start justify-between group dark:border-gray-700",
        task.completed 
          ? "bg-gray-50 dark:bg-gray-800/50" 
          : "bg-white dark:bg-gray-800"
      )}
    >
      <div className="flex items-start space-x-3">
        <button
          className={cn(
            "mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0",
            task.completed 
              ? "bg-study-purple border-study-purple text-white" 
              : "border-gray-300 dark:border-gray-600"
          )}
          onClick={handleToggle}
        >
          {task.completed && <Check className="h-3 w-3" />}
        </button>
        
        <div>
          <h3 
            className={cn(
              "font-medium",
              task.completed 
                ? "text-gray-500 line-through dark:text-gray-400" 
                : "text-gray-900 dark:text-white"
            )}
          >
            {task.title}
          </h3>
          
          <div className="flex flex-wrap items-center space-x-2 mt-1">
            {subject && (
              <div 
                className="text-xs py-0.5 px-2 rounded-full flex items-center"
                style={{ 
                  backgroundColor: `${subject.color}20`,
                  color: subject.color 
                }}
              >
                <span 
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: subject.color }}
                />
                {subject.name}
              </div>
            )}
            
            <div className={`text-xs py-0.5 px-2 rounded-full ${priorityStyles[task.priority]}`}>
              {priorityNames[task.priority]}
            </div>
            
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Vence em: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {onDelete && (
        <button 
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity dark:text-gray-500 dark:hover:text-red-400" 
          onClick={onDelete}
        >
          <Trash className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
