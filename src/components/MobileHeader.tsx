
import React from 'react';
import { Menu, GraduationCap, Sun, Moon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import StudySidebar from './StudySidebar';

interface MobileHeaderProps {
  title: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-border md:hidden dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5 dark:text-white" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <StudySidebar activePage={window.location.pathname} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center">
          <div className="bg-study-purple-light p-1 rounded-lg mr-2 dark:bg-study-purple-dark">
            <GraduationCap className="h-5 w-5 text-study-purple" />
          </div>
          <h1 className="text-lg font-bold dark:text-white">StudyMind</h1>
        </div>
      </div>

      <div className="flex items-center">
        <h2 className="text-sm font-medium mr-2 dark:text-white">{title}</h2>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
