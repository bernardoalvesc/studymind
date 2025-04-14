
import React, { createContext, useState, useContext, useEffect } from 'react';

// Types
export type Subject = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  subjectId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
};

export type TimeBlock = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
};

type StudyPlannerContextType = {
  subjects: Subject[];
  tasks: Task[];
  timeBlocks: TimeBlock[];
  streak: number;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addTimeBlock: (timeBlock: Omit<TimeBlock, 'id'>) => void;
  toggleTaskCompletion: (taskId: string) => void;
  updateTimeBlock: (timeBlock: TimeBlock) => void;
  deleteTask: (taskId: string) => void;
  deleteTimeBlock: (timeBlockId: string) => void;
  deleteSubject: (subjectId: string) => void;
  clearAllData: () => void;
};

const StudyPlannerContext = createContext<StudyPlannerContextType | undefined>(undefined);

const defaultSubjects: Subject[] = [
  { id: '1', name: 'Matemática', color: '#9b87f5' },
  { id: '2', name: 'Português', color: '#84cc16' },
  { id: '3', name: 'História', color: '#fb923c' },
  { id: '4', name: 'Geografia', color: '#60a5fa' },
  { id: '5', name: 'Biologia', color: '#facc15' },
];

const defaultTasks: Task[] = [
  { id: '1', title: 'Estudar funções do segundo grau', completed: false, subjectId: '1', priority: 'high' },
  { id: '2', title: 'Ler capítulo sobre verbos', completed: true, subjectId: '2', priority: 'medium' },
  { id: '3', title: 'Revisar Revolução Francesa', completed: false, subjectId: '3', priority: 'low' },
];

const defaultTimeBlocks: TimeBlock[] = [
  { id: '1', day: 'Monday', startTime: '08:00', endTime: '09:30', subjectId: '1' },
  { id: '2', day: 'Monday', startTime: '10:00', endTime: '11:30', subjectId: '2' },
  { id: '3', day: 'Tuesday', startTime: '09:00', endTime: '10:30', subjectId: '4' },
  { id: '4', day: 'Wednesday', startTime: '14:00', endTime: '15:30', subjectId: '3' },
  { id: '5', day: 'Thursday', startTime: '16:00', endTime: '17:30', subjectId: '5' },
  { id: '6', day: 'Friday', startTime: '10:00', endTime: '11:30', subjectId: '1' },
];

export const StudyPlannerProvider = ({ children }: { children: React.ReactNode }) => {
  // Use localStorage for persistence if available
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) as T : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [subjects, setSubjects] = useState<Subject[]>(() => loadFromStorage('subjects', defaultSubjects));
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage('tasks', defaultTasks));
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(() => loadFromStorage('timeBlocks', defaultTimeBlocks));
  const [streak, setStreak] = useState(() => loadFromStorage('streak', 3));

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('subjects', JSON.stringify(subjects));
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('timeBlocks', JSON.stringify(timeBlocks));
      localStorage.setItem('streak', JSON.stringify(streak));
    }
  }, [subjects, tasks, timeBlocks, streak]);

  useEffect(() => {
    // Update streak based on daily login
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      localStorage.setItem('lastLogin', today);
      
      // Check if it was yesterday for streak continuation
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();
      
      if (lastLogin === yesterdayString) {
        // Continue streak
        setStreak(prev => prev + 1);
      } else if (lastLogin) {
        // Reset streak if it was more than a day ago
        setStreak(1);
      }
    }
  }, []);

  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: crypto.randomUUID() };
    setSubjects([...subjects, newSubject]);
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    setTasks([...tasks, newTask]);
  };

  const addTimeBlock = (timeBlock: Omit<TimeBlock, 'id'>) => {
    const newTimeBlock = { ...timeBlock, id: crypto.randomUUID() };
    setTimeBlocks([...timeBlocks, newTimeBlock]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const updateTimeBlock = (updatedTimeBlock: TimeBlock) => {
    setTimeBlocks(timeBlocks.map(timeBlock => {
      if (timeBlock.id === updatedTimeBlock.id) {
        return updatedTimeBlock;
      }
      return timeBlock;
    }));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteTimeBlock = (timeBlockId: string) => {
    setTimeBlocks(timeBlocks.filter(timeBlock => timeBlock.id !== timeBlockId));
  };

  const deleteSubject = (subjectId: string) => {
    // Remove subject
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
    
    // Remove associated tasks
    setTasks(tasks.filter(task => task.subjectId !== subjectId));
    
    // Remove associated time blocks
    setTimeBlocks(timeBlocks.filter(timeBlock => timeBlock.subjectId !== subjectId));
  };

  // Add clear all data function
  const clearAllData = () => {
    setSubjects(defaultSubjects);
    setTasks(defaultTasks);
    setTimeBlocks(defaultTimeBlocks);
    setStreak(0);
    
    // Clear localStorage
    localStorage.removeItem('subjects');
    localStorage.removeItem('tasks');
    localStorage.removeItem('timeBlocks');
    localStorage.removeItem('streak');
    localStorage.removeItem('lastLogin');
    
    // Reset to defaults
    localStorage.setItem('subjects', JSON.stringify(defaultSubjects));
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    localStorage.setItem('timeBlocks', JSON.stringify(defaultTimeBlocks));
    localStorage.setItem('streak', '0');
  };

  const value = {
    subjects,
    tasks,
    timeBlocks,
    streak,
    addSubject,
    addTask,
    addTimeBlock,
    toggleTaskCompletion,
    updateTimeBlock,
    deleteTask,
    deleteTimeBlock,
    deleteSubject,
    clearAllData,
  };

  return (
    <StudyPlannerContext.Provider value={value}>
      {children}
    </StudyPlannerContext.Provider>
  );
};

export const useStudyPlanner = () => {
  const context = useContext(StudyPlannerContext);
  if (context === undefined) {
    throw new Error('useStudyPlanner must be used within a StudyPlannerProvider');
  }
  return context;
};
