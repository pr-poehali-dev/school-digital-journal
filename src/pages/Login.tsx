import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const Login = () => {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'student' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Добро пожаловать!',
      description: 'Вход выполнен успешно',
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Регистрация успешна!',
      description: 'Добро пожаловать в электронный журнал',
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-background flex items-center justify-center p-4">
      <Toaster />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden lg:block space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Электронный Журнал</h1>
              <p className="text-muted-foreground">Современная система управления образованием</p>
            </div>
          </div>

          <div className="space-y-4 mt-12">
            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Award" className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Отслеживание успеваемости</h3>
                <p className="text-sm text-muted-foreground">Мониторинг оценок и прогресса в режиме реального времени</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#EF4444] to-[#EF4444]/70 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Calendar" className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Расписание и посещаемость</h3>
                <p className="text-sm text-muted-foreground">Удобный календарь с отметками и событиями</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/70 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="BookOpen" className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Домашние задания</h3>
                <p className="text-sm text-muted-foreground">Управление заданиями с уведомлениями о сроках</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-around text-center">
              <div>
                <p className="text-3xl font-bold text-primary">2,500+</p>
                <p className="text-sm text-muted-foreground">Учеников</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-secondary">150+</p>
                <p className="text-sm text-muted-foreground">Учителей</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-[#F59E0B]">50+</p>
                <p className="text-sm text-muted-foreground">Школ</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full shadow-2xl animate-scale-in border-2">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex lg:hidden items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <div>
                <CardTitle className="text-2xl">Электронный Журнал</CardTitle>
              </div>
            </div>
            <CardTitle className="text-2xl hidden lg:block">Вход в систему</CardTitle>
            <CardDescription>
              Войдите в свой аккаунт или создайте новый
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Icon name="Mail" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="student@school.ru"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="remember" className="w-4 h-4" />
                      <Label htmlFor="remember" className="text-sm cursor-pointer">
                        Запомнить меня
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm p-0 h-auto">
                      Забыли пароль?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base">
                    <Icon name="LogIn" size={18} />
                    <span className="ml-2">Войти</span>
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Или войти через</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button variant="outline" type="button">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2">Google</span>
                    </Button>
                    <Button variant="outline" type="button">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span className="ml-2">Facebook</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Полное имя</Label>
                    <div className="relative">
                      <Icon name="User" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Иван Иванов"
                        className="pl-10"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Icon name="Mail" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="student@school.ru"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role">Роль</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={registerData.role === 'student' ? 'default' : 'outline'}
                        onClick={() => setRegisterData({ ...registerData, role: 'student' })}
                        className="w-full"
                      >
                        <Icon name="User" size={16} />
                        <span className="ml-1">Ученик</span>
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.role === 'teacher' ? 'default' : 'outline'}
                        onClick={() => setRegisterData({ ...registerData, role: 'teacher' })}
                        className="w-full"
                      >
                        <Icon name="GraduationCap" size={16} />
                        <span className="ml-1">Учитель</span>
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.role === 'parent' ? 'default' : 'outline'}
                        onClick={() => setRegisterData({ ...registerData, role: 'parent' })}
                        className="w-full"
                      >
                        <Icon name="Users" size={16} />
                        <span className="ml-1">Родитель</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="w-4 h-4" required />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      Я согласен с условиями использования и политикой конфиденциальности
                    </Label>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base">
                    <Icon name="UserPlus" size={18} />
                    <span className="ml-2">Зарегистрироваться</span>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
