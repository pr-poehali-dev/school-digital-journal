import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { 
      title: 'Средний балл', 
      value: '4.5', 
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
      value: '8', 
      icon: 'BookOpen', 
      color: 'bg-gradient-to-br from-[#EF4444] to-[#EF4444]/70',
      trend: '3 новых'
    },
    { 
      title: 'Уроков сегодня', 
      value: '6', 
      icon: 'Clock', 
      color: 'bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/70',
      trend: '2 осталось'
    },
  ];

  const recentGrades = [
    { subject: 'Математика', grade: 5, date: '15 окт', teacher: 'Иванов И.И.' },
    { subject: 'Русский язык', grade: 4, date: '14 окт', teacher: 'Петрова А.С.' },
    { subject: 'Физика', grade: 5, date: '13 окт', teacher: 'Сидоров П.П.' },
    { subject: 'Литература', grade: 4, date: '12 окт', teacher: 'Смирнова Е.В.' },
  ];

  const schedule = [
    { time: '08:30', subject: 'Математика', room: '201', teacher: 'Иванов И.И.', status: 'completed' },
    { time: '09:30', subject: 'Русский язык', room: '305', teacher: 'Петрова А.С.', status: 'completed' },
    { time: '10:45', subject: 'Физика', room: '410', teacher: 'Сидоров П.П.', status: 'current' },
    { time: '11:45', subject: 'Информатика', room: '101', teacher: 'Козлов Д.М.', status: 'upcoming' },
    { time: '12:45', subject: 'Английский язык', room: '208', teacher: 'Новикова О.Л.', status: 'upcoming' },
    { time: '13:45', subject: 'История', room: '303', teacher: 'Морозов В.И.', status: 'upcoming' },
  ];

  const homework = [
    { subject: 'Математика', task: 'Решить задачи №45-50', deadline: 'Завтра', urgent: true },
    { subject: 'Физика', task: 'Лабораторная работа №3', deadline: '18 окт', urgent: false },
    { subject: 'Литература', task: 'Прочитать главы 5-7', deadline: '20 окт', urgent: false },
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

  return (
    <div className="min-h-screen bg-background">
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
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BookOpen" size={24} />
                      Домашние задания
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {homework.map((hw, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            hw.urgent 
                              ? 'border-destructive bg-destructive/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-foreground text-sm">{hw.subject}</p>
                            {hw.urgent && (
                              <Badge variant="destructive" className="text-xs">Срочно</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{hw.task}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Icon name="Clock" size={14} />
                            <span>{hw.deadline}</span>
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Последние оценки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentGrades.map((grade, index) => (
                      <div
                        key={index}
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
