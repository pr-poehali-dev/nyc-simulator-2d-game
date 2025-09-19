import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GameMenuProps {
  onNavigate: (section: string) => void;
}

export default function GameMenu({ onNavigate }: GameMenuProps) {
  const menuItems = [
    {
      id: 'game',
      title: 'Новая игра',
      description: 'Начни строить свой Нью-Йорк',
      icon: 'Building2',
      color: 'bg-ny-yellow'
    },
    {
      id: 'profile',
      title: 'Профиль',
      description: 'Твои достижения и статистика',
      icon: 'User',
      color: 'bg-ny-blue'
    },
    {
      id: 'settings',
      title: 'Настройки',
      description: 'Настрой игру под себя',
      icon: 'Settings',
      color: 'bg-ny-red'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ny-blue via-ny-light-gray to-ny-yellow p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <img 
              src="/img/2657c0a1-fcf7-4e35-88b7-5c488c366ccf.jpg" 
              alt="New York Skyline"
              className="w-48 h-32 mx-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>
          <h1 className="text-6xl font-bold text-ny-gray mb-4">🏙️ NEW YORK</h1>
          <h2 className="text-4xl font-semibold text-ny-gray mb-2">SIMULATOR</h2>
          <p className="text-xl text-ny-gray/70">Создай свой собственный мегаполис!</p>
        </div>

        {/* Menu Cards */}
        <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-xl bg-white/90 backdrop-blur-sm"
              onClick={() => onNavigate(item.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon name={item.icon as any} size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-ny-gray">{item.title}</CardTitle>
                <CardDescription className="text-ny-gray/70 text-base">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-ny-gray hover:bg-ny-gray/90 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  Войти
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-ny-gray/60">🚕 Добро пожаловать в самый захватывающий городской симулятор! 🚕</p>
        </div>
      </div>
    </div>
  );
}