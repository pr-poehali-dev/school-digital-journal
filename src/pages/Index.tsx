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
  
  const [grades, setGrades] = useState<Grade[]>([]);

  const [homeworks, setHomeworks] = useState<Homework[]>([]);

  const [newGrade, setNewGrade] = useState({ subject: '', grade: 5, teacher: '' });
  const [newHomework, setNewHomework] = useState({ subject: '', task: '', deadline: '', urgent: false });
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [isHomeworkDialogOpen, setIsHomeworkDialogOpen] = useState(false);

  const stats = [
    { 
      title: 'Средний балл', 
      value: grades.length > 0 ? (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1) : '0', 
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

  const handleClearAllGrades = () => {
    setGrades([]);
    toast({
      title: 'Все оценки удалены',
      description: 'Журнал оценок очищен',
    });
  };

  const handleClearAllHomework = () => {
    setHomeworks([]);
    toast({
      title: 'Все задания удалены',
      description: 'Список домашних заданий очищен',
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
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  handleClearAllGrades();
                  handleClearAllHomework();
                }}
                className="text-destructive hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
                <span className="ml-2">Очистить всё</span>
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="User" size={18} />
              </Button>
            </div>
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
                    {homeworks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="BookOpen" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Нет домашних заданий</p>
                      </div>
                    ) : (
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
                    )}
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
                  {grades.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Icon name="Award" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Нет оценок</p>
                    </div>
                  ) : (
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
                  )}
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

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} />
                  Календарь и посещаемость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarView />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const attendance = {
    '2024-10-01': 'present',
    '2024-10-02': 'present',
    '2024-10-03': 'absent',
    '2024-10-04': 'present',
    '2024-10-07': 'present',
    '2024-10-08': 'late',
    '2024-10-09': 'present',
    '2024-10-10': 'present',
    '2024-10-11': 'present',
    '2024-10-14': 'present',
    '2024-10-15': 'present',
  };

  const events = {
    '2024-10-18': 'Контрольная по математике',
    '2024-10-20': 'Родительское собрание',
    '2024-10-25': 'Экскурсия в музей',
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getAttendanceStatus = (day: number) => {
    const dateKey = getDateKey(day);
    return attendance[dateKey as keyof typeof attendance];
  };

  const getEvent = (day: number) => {
    const dateKey = getDateKey(day);
    return events[dateKey as keyof typeof events];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-secondary';
      case 'absent': return 'bg-destructive';
      case 'late': return 'bg-[#F59E0B]';
      default: return '';
    }
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const status = getAttendanceStatus(day);
    const event = getEvent(day);
    const isToday = day === new Date().getDate() && 
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();
    
    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        className={`aspect-square p-2 rounded-xl border-2 transition-all duration-200 relative ${
          isToday ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
        } ${status ? getStatusColor(status) + ' text-white' : 'bg-white'}`}
      >
        <span className={`text-sm font-medium ${status ? 'text-white' : 'text-foreground'}`}>
          {day}
        </span>
        {event && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={previousMonth}>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={nextMonth}>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-secondary rounded" />
          <span className="text-sm text-muted-foreground">Присутствие</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive rounded" />
          <span className="text-sm text-muted-foreground">Отсутствие</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#F59E0B] rounded" />
          <span className="text-sm text-muted-foreground">Опоздание</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-sm text-muted-foreground">События</span>
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4 p-4 bg-muted rounded-xl animate-fade-in">
          <p className="text-sm font-semibold text-foreground mb-2">
            {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          {getEvent(selectedDate.getDate()) && (
            <p className="text-sm text-muted-foreground">
              📌 {getEvent(selectedDate.getDate())}
            </p>
          )}
          {getAttendanceStatus(selectedDate.getDate()) && (
            <Badge className="mt-2">
              {getAttendanceStatus(selectedDate.getDate()) === 'present' && 'Присутствовал'}
              {getAttendanceStatus(selectedDate.getDate()) === 'absent' && 'Отсутствовал'}
              {getAttendanceStatus(selectedDate.getDate()) === 'late' && 'Опоздал'}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;