import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface PlayerProfileProps {
  onBack: () => void;
}

export default function PlayerProfile({ onBack }: PlayerProfileProps) {
  const playerStats = {
    name: "Мэр Города",
    level: 12,
    experience: 2350,
    nextLevelXp: 3000,
    totalMoney: 125000,
    totalBuildings: 45,
    population: 8500,
    achievements: [
      { id: 1, name: "Первый дом", description: "Построй свой первый жилой дом", completed: true, icon: "Home" },
      { id: 2, name: "Бизнесмен", description: "Построй 10 коммерческих зданий", completed: true, icon: "Building" },
      { id: 3, name: "Мегаполис", description: "Достигни населения 10,000 человек", completed: false, icon: "Users" },
      { id: 4, name: "Миллионер", description: "Накопи $1,000,000", completed: false, icon: "DollarSign" },
    ]
  };

  const cityStats = [
    { label: "Деньги", value: `$${playerStats.totalMoney.toLocaleString()}`, icon: "DollarSign", color: "text-green-600" },
    { label: "Здания", value: playerStats.totalBuildings.toString(), icon: "Building2", color: "text-blue-600" },
    { label: "Население", value: playerStats.population.toLocaleString(), icon: "Users", color: "text-purple-600" },
    { label: "Уровень", value: playerStats.level.toString(), icon: "Star", color: "text-yellow-600" },
  ];

  const experienceProgress = (playerStats.experience / playerStats.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 bg-white shadow-md hover:shadow-lg"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>
          
          <h1 className="text-3xl font-bold text-ny-gray">Профиль игрока</h1>
          <div className="w-20" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-ny-blue to-ny-yellow rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="Crown" size={48} className="text-white" />
                </div>
                <CardTitle className="text-2xl text-ny-gray">{playerStats.name}</CardTitle>
                <CardDescription className="text-lg">Уровень {playerStats.level}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ny-gray">Опыт</span>
                      <span className="text-ny-gray">{playerStats.experience}/{playerStats.nextLevelXp}</span>
                    </div>
                    <Progress value={experienceProgress} className="h-3" />
                  </div>
                  
                  <Button className="w-full bg-ny-blue hover:bg-ny-blue/90 text-white font-semibold">
                    <Icon name="Trophy" size={20} className="mr-2" />
                    Достижения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-2 space-y-6">
            {/* City Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-ny-gray flex items-center gap-2">
                  <Icon name="BarChart3" size={24} />
                  Статистика города
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cityStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm">
                      <Icon name={stat.icon as any} size={32} className={`mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-ny-gray">{stat.value}</div>
                      <div className="text-sm text-ny-gray/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-ny-gray flex items-center gap-2">
                  <Icon name="Award" size={24} />
                  Достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {playerStats.achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        achievement.completed 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.completed ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          <Icon 
                            name={achievement.completed ? "CheckCircle" : achievement.icon as any} 
                            size={24} 
                            className="text-white" 
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${achievement.completed ? 'text-green-800' : 'text-gray-600'}`}>
                            {achievement.name}
                          </h3>
                          <p className={`text-sm ${achievement.completed ? 'text-green-600' : 'text-gray-500'}`}>
                            {achievement.description}
                          </p>
                          {achievement.completed && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Icon name="Check" size={12} className="mr-1" />
                                Выполнено
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}