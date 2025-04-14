
import React from 'react';
import { GraduationCap, Calendar, CheckCircle, Home, Settings, TrendingUp, Sun, Moon } from 'lucide-react';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StudySidebar = ({ activePage }: { activePage: string }) => {
  const { streak } = useStudyPlanner();
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/',
    },
    {
      name: 'Tarefas',
      icon: <CheckCircle className="w-5 h-5" />,
      path: '/tasks',
    },
    {
      name: 'Cronograma',
      icon: <Calendar className="w-5 h-5" />,
      path: '/schedule',
    },
    {
      name: 'Matérias',
      icon: <GraduationCap className="w-5 h-5" />,
      path: '/subjects',
    },
    {
      name: 'Progresso',
      icon: <TrendingUp className="w-5 h-5" />,
      path: '/progress',
    },
    {
      name: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-border h-screen sticky top-0 p-4 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <div className="mb-8 px-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-study-purple-light p-2 rounded-xl mr-3 dark:bg-study-purple-dark">
            <GraduationCap className="w-6 h-6 text-study-purple" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">StudyMind</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mb-8 mx-2 p-4 bg-study-purple-light rounded-xl dark:bg-study-purple/30">
        <p className="text-sm font-medium text-study-purple-dark mb-2 dark:text-study-purple-light">Série atual</p>
        <div className="flex items-center">
          <div className="text-3xl font-bold text-study-purple mr-2 dark:text-study-purple-light">{streak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {streak === 1 ? 'dia' : 'dias'} <br /> consecutivos
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              activePage === item.path
                ? "bg-study-purple text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            {React.cloneElement(item.icon, { 
              className: cn(
                item.icon.props.className, 
                activePage === item.path ? "text-white" : "text-gray-500 dark:text-gray-400"
              )
            })}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default StudySidebar;
