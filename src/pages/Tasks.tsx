
import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import TaskCard from '@/components/dashboard/TaskCard';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Tasks = () => {
  const { tasks, subjects, addTask, toggleTaskCompletion, deleteTask } = useStudyPlanner();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const { toast } = useToast();
  
  const handleAddTask = () => {
    if (!title.trim() || !subjectId) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    addTask({
      title,
      subjectId,
      priority,
      dueDate: dueDate || undefined,
      completed: false
    });
    
    setIsDialogOpen(false);
    setTitle('');
    setSubjectId('');
    setPriority('medium');
    setDueDate('');
    
    toast({
      title: "Sucesso",
      description: "Tarefa adicionada com sucesso"
    });
  };
  
  const handleToggleCompletion = (id: string) => {
    toggleTaskCompletion(id);
  };
  
  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast({
      title: "Sucesso",
      description: "Tarefa removida com sucesso"
    });
  };
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/tasks" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Tarefas" />
          <div className="max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold dark:text-white">Tarefas</h1>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Tarefa
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Tarefas pendentes ({pendingTasks.length})</h2>
                {pendingTasks.length > 0 ? (
                  <div className="space-y-3">
                    {pendingTasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onToggle={() => handleToggleCompletion(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa pendente</p>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Tarefas concluídas ({completedTasks.length})</h2>
                {completedTasks.length > 0 ? (
                  <div className="space-y-3">
                    {completedTasks.map((task) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onToggle={() => handleToggleCompletion(task.id)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa concluída</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar nova tarefa</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Título da tarefa</label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Estudar capítulo 3 de Matemática"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject">Matéria</label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Selecione a matéria" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="priority">Prioridade</label>
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="dueDate">Data limite (opcional)</label>
              <Input 
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddTask}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default Tasks;
