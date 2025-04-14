
import React, { useState } from 'react';
import { useStudyPlanner } from '@/context/StudyPlannerContext';
import { Plus, Edit, Trash2, BedDouble, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Days of the week in Portuguese
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const daysTranslations: Record<string, string> = {
  "Monday": "Segunda",
  "Tuesday": "Terça",
  "Wednesday": "Quarta",
  "Thursday": "Quinta",
  "Friday": "Sexta",
  "Saturday": "Sábado",
  "Sunday": "Domingo"
};

// Extended time slots from 6:00 to 23:00
const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", 
  "20:00", "21:00", "22:00", "23:00"
];

// Format time for display
const formatTime = (time: string) => {
  return time.substring(0, 5);
};

// Check if a time block overlaps with a specific time slot and day
const isTimeBlockInSlot = (timeBlock: any, day: string, timeSlot: string) => {
  if (timeBlock.day !== day) return false;
  
  const blockStart = timeBlock.startTime;
  const blockEnd = timeBlock.endTime;
  const slotTime = timeSlot;
  
  const nextHour = `${parseInt(timeSlot.split(':')[0]) + 1}:00`;
  
  return blockStart <= slotTime && blockEnd > slotTime && blockEnd <= nextHour;
};

const WeeklySchedule = () => {
  const { timeBlocks, subjects, addTimeBlock, deleteTimeBlock, updateTimeBlock } = useStudyPlanner();
  const [showWeekends, setShowWeekends] = useState(false);
  const [editingTimeBlock, setEditingTimeBlock] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showRestWarning, setShowRestWarning] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formDay, setFormDay] = useState<string>("Monday");
  const [formStartTime, setFormStartTime] = useState<string>("08:00");
  const [formEndTime, setFormEndTime] = useState<string>("09:00");
  const [formSubjectId, setFormSubjectId] = useState<string>("");
  
  // Display days based on weekend toggle
  const displayDays = showWeekends ? daysOfWeek : daysOfWeek.slice(0, 5);
  
  const handleAddTimeBlock = () => {
    if (!formSubjectId) {
      toast({
        title: "Erro",
        description: "Selecione uma matéria",
        variant: "destructive"
      });
      return;
    }
    
    if (formStartTime >= formEndTime) {
      toast({
        title: "Erro",
        description: "O horário de início deve ser anterior ao horário de término",
        variant: "destructive"
      });
      return;
    }
    
    // Check if the selected time is very early or late
    const hour = parseInt(formStartTime.split(':')[0]);
    if (hour < 6 || hour >= 23) {
      setShowRestWarning(true);
    }
    
    if (editingTimeBlock) {
      updateTimeBlock({
        id: editingTimeBlock.id,
        day: formDay,
        startTime: formStartTime,
        endTime: formEndTime,
        subjectId: formSubjectId
      });
      toast({
        title: "Sucesso",
        description: "Horário atualizado com sucesso"
      });
    } else {
      addTimeBlock({
        day: formDay,
        startTime: formStartTime,
        endTime: formEndTime,
        subjectId: formSubjectId
      });
      toast({
        title: "Sucesso",
        description: "Horário adicionado com sucesso"
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleEditTimeBlock = (timeBlock: any) => {
    setEditingTimeBlock(timeBlock);
    setFormDay(timeBlock.day);
    setFormStartTime(timeBlock.startTime);
    setFormEndTime(timeBlock.endTime);
    setFormSubjectId(timeBlock.subjectId);
    setIsDialogOpen(true);
  };
  
  const handleDeleteTimeBlock = (id: string) => {
    deleteTimeBlock(id);
    toast({
      title: "Sucesso",
      description: "Horário removido com sucesso"
    });
  };
  
  const resetForm = () => {
    setFormDay("Monday");
    setFormStartTime("08:00");
    setFormEndTime("09:00");
    setFormSubjectId("");
    setEditingTimeBlock(null);
  };
  
  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Calculate grid columns based on weekend visibility
  const gridColsClass = showWeekends ? 'grid-cols-8' : 'grid-cols-6';
  
  return (
    <div className="study-card overflow-x-auto bg-white p-5 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">Cronograma Semanal</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowWeekends(!showWeekends)} size="sm">
            {showWeekends ? "Esconder fins de semana" : "Mostrar fins de semana"}
          </Button>
          <Button onClick={openAddDialog} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>
      
      <div className={`w-full min-w-[${showWeekends ? '900px' : '700px'}]`}>
        {/* Days header */}
        <div className={`grid ${gridColsClass} gap-1 mb-2`}>
          <div className="text-gray-500 text-xs font-medium"></div> {/* Empty cell for time column */}
          {displayDays.map(day => (
            <div key={day} className="text-center text-xs font-medium py-1 dark:text-gray-300">
              {daysTranslations[day]}
            </div>
          ))}
        </div>
        
        {/* Time slots and schedule */}
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className={`grid ${gridColsClass} gap-1 mb-1`}>
            {/* Time column */}
            <div className="text-xs text-gray-500 font-medium pr-2 flex items-center justify-end dark:text-gray-400">
              {formatTime(timeSlot)}
            </div>
            
            {/* Schedule cells */}
            {displayDays.map(day => {
              // Find time blocks for this day and time slot
              const blocksForSlot = timeBlocks.filter(block => 
                isTimeBlockInSlot(block, day, timeSlot)
              );
              
              const hasBlock = blocksForSlot.length > 0;
              const block = hasBlock ? blocksForSlot[0] : null;
              const subject = block ? subjects.find(s => s.id === block.subjectId) : null;
              
              return (
                <div 
                  key={`${day}-${timeSlot}`} 
                  className={`rounded-md text-xs h-10 flex items-center justify-center group ${
                    hasBlock 
                      ? 'text-white relative' 
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                  }`}
                  style={{
                    backgroundColor: hasBlock ? subject?.color || '#9b87f5' : ''
                  }}
                >
                  {hasBlock ? (
                    <>
                      <div className="px-2 py-1 text-center">
                        <div className="font-medium">{subject?.name}</div>
                        <div className="text-xs opacity-80">
                          {formatTime(block.startTime)} - {formatTime(block.endTime)}
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 p-1 rounded-bl-lg rounded-tr-md flex">
                        <button 
                          className="text-white mr-1" 
                          onClick={() => handleEditTimeBlock(block)}
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                        <button 
                          className="text-white" 
                          onClick={() => handleDeleteTimeBlock(block.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </>
                  ) : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Rest reminder alert */}
      {showRestWarning && (
        <Alert className="mt-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700">
          <div className="flex items-center">
            <BedDouble className="h-5 w-5 text-amber-500 mr-2" />
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <AlertDescription className="mt-2 text-sm text-amber-800 dark:text-amber-300">
            Lembre-se que descansar também é importante para um estudo produtivo! Planeje pausas adequadas para recarregar sua energia mental.
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 text-amber-600 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-900/40"
            onClick={() => setShowRestWarning(false)}
          >
            Entendi
          </Button>
        </Alert>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTimeBlock ? "Editar horário" : "Adicionar novo horário"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="day" className="dark:text-gray-300">Dia da semana</label>
              <Select value={formDay} onValueChange={setFormDay}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>
                      {daysTranslations[day]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="startTime" className="dark:text-gray-300">Hora de início</label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={formStartTime} 
                  onChange={(e) => setFormStartTime(e.target.value)} 
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label htmlFor="endTime" className="dark:text-gray-300">Hora de término</label>
                <Input 
                  id="endTime" 
                  type="time" 
                  value={formEndTime} 
                  onChange={(e) => setFormEndTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="dark:text-gray-300">Matéria</label>
              <Select value={formSubjectId} onValueChange={setFormSubjectId}>
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddTimeBlock}>{editingTimeBlock ? "Atualizar" : "Adicionar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeeklySchedule;
