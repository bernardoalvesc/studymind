
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import { useTheme } from '@/context/ThemeContext';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const { clearAllData } = useStudyPlanner();
  
  const handleClearData = () => {
    clearAllData();
    toast({
      title: "Dados limpos",
      description: "Todos os dados da aplicação foram removidos."
    });
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/settings" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Configurações" />
          <div className="max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6">
            <h1 className="text-2xl font-bold dark:text-white">Configurações</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-6 dark:text-white">Aparência</h2>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                  )}
                  <div>
                    <p className="font-medium dark:text-white">Tema {theme === 'dark' ? 'Escuro' : 'Claro'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === 'dark' 
                        ? 'Mudar para tema claro'
                        : 'Mudar para tema escuro'
                      }
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-6 dark:text-white">Dados da aplicação</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Apagar todos os dados da aplicação (matérias, tarefas e cronogramas)
                  </p>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Limpar dados
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá remover permanentemente todos os seus dados
                            incluindo matérias, tarefas e cronogramas.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleClearData}>
                            Continuar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Sobre</h2>
              <p className="text-gray-600 dark:text-gray-300">HabitHive - Planejador de Estudos</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Versão 1.0.0</p>
              
              <Separator className="my-4" />
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 HabitHive. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Settings;
