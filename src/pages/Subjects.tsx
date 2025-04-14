
import React, { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import StudySidebar from '@/components/StudySidebar';
import MobileHeader from '@/components/MobileHeader';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Subjects = () => {
  const { subjects, addSubject, deleteSubject } = useStudyPlanner();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#9b87f5');
  const { toast } = useToast();
  
  const subjectColors = [
    "#9b87f5", // Purple
    "#84cc16", // Green
    "#fb923c", // Orange
    "#60a5fa", // Blue
    "#facc15", // Yellow
    "#f87171", // Red
    "#c084fc", // Lavender
    "#34d399", // Emerald
  ];
  
  const handleAddSubject = () => {
    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da matéria é obrigatório",
        variant: "destructive"
      });
      return;
    }
    
    addSubject({
      name,
      color
    });
    
    setIsDialogOpen(false);
    setName('');
    setColor('#9b87f5');
    
    toast({
      title: "Sucesso",
      description: "Matéria adicionada com sucesso"
    });
  };
  
  const confirmDelete = (subjectId: string) => {
    setSubjectToDelete(subjectId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteSubject = () => {
    if (subjectToDelete) {
      deleteSubject(subjectToDelete);
      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
      
      toast({
        title: "Sucesso",
        description: "Matéria removida com sucesso"
      });
    }
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <StudySidebar activePage="/subjects" />
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Matérias" />
          <div className="max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold dark:text-white">Matérias</h1>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Matéria
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {subjects.map((subject) => (
                <div 
                  key={subject.id} 
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-3" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="font-medium dark:text-white">{subject.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" 
                      onClick={() => {
                        setName(subject.name);
                        setColor(subject.color);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" 
                      onClick={() => confirmDelete(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {subjects.length === 0 && (
              <div className="text-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Nenhuma matéria cadastrada</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(true)}
                  className="mt-4"
                >
                  Adicionar sua primeira matéria
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar matéria</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Nome da matéria</label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Matemática"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label>Cor</label>
              <div className="flex flex-wrap gap-2">
                {subjectColors.map((c) => (
                  <button 
                    key={c}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-black dark:ring-white' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddSubject}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as tarefas e horários associados a esta matéria serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubject} className="bg-red-500 hover:bg-red-600">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};

export default Subjects;
