import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

interface Grade {
  id: string;
  subject: string;
  grade: number;
  date: string;
  teacher: string;
}

interface Homework {
  id: string;
  subject: string;
  task: string;
  deadline: string;
  urgent: boolean;
  completed: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', subject: 'Математика', grade: 5, date: '15 окт', teacher: 'Иванов И.И.' },
    { id: '2', subject: 'Русский язык', grade: 4, date: '14 окт', teacher: 'Петрова А.С.' },
    { id: '3', subject: 'Физика', grade: 5, date: '13 окт', teacher: 'Сидоров П.П.' },
    { id: '4', subject: 'Литература', grade: 4, date: '12 окт', teacher: 'Смирнова Е.В.' },
  ]);

  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: '1', subject: 'Математика', task: 'Решить задачи №45-50', deadline: 'Завтра', urgent: true, completed: false },
    { id: '2', subject: 'Физика', task: 'Лабораторная работа №3', deadline: '18 окт', urgent: false, completed: false },
    { id: '3', subject: 'Литература', task: 'Прочитать главы 5-7', deadline: '20 окт', urgent: false, completed: false },
  ]);

  const [newGrade, setNewGrade] = useState({ subject: '', grade: 5, teacher: '' });
  const [newHomework, setNewHomework] = useState({ subject: '', task: '', deadline: '', urgent: false });
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isHomeworkDialogOpen, setIsHomeworkDialogOpen] = useState(false);

  const stats = [
    { 
      title: 'Средний балл', 
      value: (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1), 
      icon: 'GraduationCap', 
      color: 'bg-gradient-to-br from-primary to-primary/70',
      trend: '+0.3'
    },
    { 
      title: 'Посещаемость', 
      value: '92%', 
      icon: 'CalendarCheck', 
      color: 'bg-gradient-to-br from-secondary to-secondary/70',
      trend: '+5%'
    },
    { 
      title: 'Домашние задания', 
      value: homeworks.filter(h => !h.completed).length.toString(), 
      icon: 'BookOpen', 
      color: 'bg-gradient-to-br from-[#EF4444] to-[#EF4444]/70',
      trend: `${homeworks.filter(h => h.urgent && !h.completed).length} срочных`
    },
    { 
      title: 'Уроков сегодня', 
      value: '6', 
      icon: 'Clock', 
      color: 'bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/70',
      trend: '2 осталось'
    },
  ];

  const schedule = [
    { time: '08:30', subject: 'Математика', room: '201', teacher: 'Иванов И.И.', status: 'completed' },
    { time: '09:30', subject: 'Русский язык', room: '305', teacher: 'Петрова А.С.', status: 'completed' },
    { time: '10:45', subject: 'Физика', room: '410', teacher: 'Сидоров П.П.', status: 'current' },
    { time: '11:45', subject: 'Информатика', room: '101', teacher: 'Козлов Д.М.', status: 'upcoming' },
    { time: '12:45', subject: 'Английский язык', room: '208', teacher: 'Новикова О.Л.', status: 'upcoming' },
    { time: '13:45', subject: 'История', room: '303', teacher: 'Морозов В.И.', status: 'upcoming' },
  ];

  const subjectProgress = [
    { name: 'Математика', progress: 85, grade: 4.8 },
    { name: 'Русский язык', progress: 78, grade: 4.5 },
    { name: 'Физика', progress: 92, grade: 4.9 },
    { name: 'Информатика', progress: 88, grade: 4.7 },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Главная', icon: 'LayoutDashboard' },
    { id: 'grades', label: 'Оценки', icon: 'Award' },
    { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
    { id: 'homework', label: 'Домашние задания', icon: 'BookOpen' },
    { id: 'attendance', label: 'Посещаемость', icon: 'UserCheck' },
    { id: 'teachers', label: 'Учителя', icon: 'Users' },
    { id: 'classes', label: 'Классы', icon: 'School' },
  ];

  const handleAddGrade = () => {
    if (!newGrade.subject || !newGrade.teacher) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const grade: Grade = {
      id: Date.now().toString(),
      subject: newGrade.subject,
      grade: newGrade.grade,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      teacher: newGrade.teacher,
    };

    setGrades([grade, ...grades]);
    setNewGrade({ subject: '', grade: 5, teacher: '' });
    setIsGradeDialogOpen(false);
    
    toast({
      title: 'Оценка добавлена',
      description: `${newGrade.subject}: ${newGrade.grade}`,
    });
  };

  const handleDeleteGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
    toast({
      title: 'Оценка удалена',
    });
  };

  const handleAddHomework = () => {
    if (!newHomework.subject || !newHomework.task || !newHomework.deadline) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const homework: Homework = {
      id: Date.now().toString(),
      subject: newHomework.subject,
      task: newHomework.task,
      deadline: newHomework.deadline,
      urgent: newHomework.urgent,
      completed: false,
    };

    setHomeworks([homework, ...homeworks]);
    setNewHomework({ subject: '', task: '', deadline: '', urgent: false });
    setIsHomeworkDialogOpen(false);
    
    toast({
      title: 'Задание добавлено',
      description: newHomework.subject,
    });
  };

  const handleToggleHomework = (id: string) => {
    setHomeworks(homeworks.map(hw => 
      hw.id === id ? { ...hw, completed: !hw.completed } : hw
    ));
    
    const homework = homeworks.find(hw => hw.id === id);
    toast({
      title: homework?.completed ? 'Задание отменено' : 'Задание выполнено',
    });
  };

  const handleDeleteHomework = (id: string) => {
    setHomeworks(homeworks.filter(hw => hw.id !== id));
    toast({
      title: 'Задание удалено',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Электронный Журнал</h1>
                <p className="text-sm text-muted-foreground">Ученик: Студена Тубькет 2024</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="User" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-r border-border sticky top-[73px] self-start">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon name={stat.icon} className="text-white" size={24} />
                      </div>
                      <Badge variant="secondary" className="text-xs">{stat.trend}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={24} />
                    Расписание на сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((lesson, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                          lesson.status === 'current'
                            ? 'border-primary bg-primary/5 shadow-md'
                            : lesson.status === 'completed'
                            ? 'border-muted bg-muted/50 opacity-60'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex-shrink-0 w-16 text-center">
                          <p className="font-semibold text-foreground">{lesson.time}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">{lesson.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">{lesson.teacher}</p>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0">
                          Каб. {lesson.room}
                        </Badge>
                        {lesson.status === 'current' && (
                          <Icon name="CircleDot" className="text-primary flex-shrink-0" size={20} />
                        )}
                        {lesson.status === 'completed' && (
                          <Icon name="CheckCircle2" className="text-secondary flex-shrink-0" size={20} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" size={24} />
                      Домашние задания
                    </CardTitle>
                    <Dialog open={isHomeworkDialogOpen} onOpenChange={setIsHomeworkDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="h-8 w-8 p-0">
                          <Icon name="Plus" size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Добавить домашнее задание</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Предмет</Label>
                            <Input 
                              value={newHomework.subject}
                              onChange={(e) => setNewHomework({...newHomework, subject: e.target.value})}
                              placeholder="Математика"
                            />
                          </div>
                          <div>
                            <Label>Задание</Label>
                            <Textarea 
                              value={newHomework.task}
                              onChange={(e) => setNewHomework({...newHomework, task: e.target.value})}
                              placeholder="Описание задания"
                            />
                          </div>
                          <div>
                            <Label>Срок сдачи</Label>
                            <Input 
                              value={newHomework.deadline}
                              onChange={(e) => setNewHomework({...newHomework, deadline: e.target.value})}
                              placeholder="Завтра"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox"
                              id="urgent"
                              checked={newHomework.urgent}
                              onChange={(e) => setNewHomework({...newHomework, urgent: e.target.checked})}
                              className="w-4 h-4"
                            />
                            <Label htmlFor="urgent">Срочное</Label>
                          </div>
                          <Button onClick={handleAddHomework} className="w-full">
                            Добавить
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {homeworks.map((hw) => (
                        <div
                          key={hw.id}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            hw.completed
                              ? 'border-secondary bg-secondary/5 opacity-60'
                              : hw.urgent 
                              ? 'border-destructive bg-destructive/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className={`font-semibold text-foreground text-sm ${hw.completed ? 'line-through' : ''}`}>
                              {hw.subject}
                            </p>
                            <div className="flex gap-1">
                              {hw.urgent && !hw.completed && (
                                <Badge variant="destructive" className="text-xs">Срочно</Badge>
                              )}
                              {hw.completed && (
                                <Badge className="text-xs bg-secondary">Выполнено</Badge>
                              )}
                            </div>
                          </div>
                          <p className={`text-sm text-muted-foreground mb-3 ${hw.completed ? 'line-through' : ''}`}>
                            {hw.task}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Icon name="Clock" size={14} />
                              <span>{hw.deadline}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={hw.completed ? "outline" : "default"}
                                className="h-7 text-xs"
                                onClick={() => handleToggleHomework(hw.id)}
                              >
                                <Icon name={hw.completed ? "X" : "Check"} size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-7 text-xs"
                                onClick={() => handleDeleteHomework(hw.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Последние оценки
                  </CardTitle>
                  <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-8 w-8 p-0">
                        <Icon name="Plus" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Добавить оценку</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Предмет</Label>
                          <Input 
                            value={newGrade.subject}
                            onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                            placeholder="Математика"
                          />
                        </div>
                        <div>
                          <Label>Оценка</Label>
                          <Select 
                            value={newGrade.grade.toString()}
                            onValueChange={(value) => setNewGrade({...newGrade, grade: parseInt(value)})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Учитель</Label>
                          <Input 
                            value={newGrade.teacher}
                            onChange={(e) => setNewGrade({...newGrade, teacher: e.target.value})}
                            placeholder="Иванов И.И."
                          />
                        </div>
                        <Button onClick={handleAddGrade} className="w-full">
                          Добавить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {grades.map((grade) => (
                      <div
                        key={grade.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{grade.subject}</p>
                          <p className="text-sm text-muted-foreground">{grade.teacher}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{grade.date}</span>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl text-white ${
                            grade.grade === 5 ? 'bg-gradient-to-br from-secondary to-secondary/70' : 'bg-gradient-to-br from-primary to-primary/70'
                          }`}>
                            {grade.grade}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteGrade(grade.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Успеваемость по предметам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {subjectProgress.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{subject.name}</span>
                          <span className="text-sm font-semibold text-primary">{subject.grade}</span>
                        </div>
                        <div className="relative">
                          <Progress value={subject.progress} className="h-3" />
                          <div className="absolute inset-0 flex items-center justify-end pr-2">
                            <span className="text-xs font-medium text-white drop-shadow-lg">
                              {subject.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
