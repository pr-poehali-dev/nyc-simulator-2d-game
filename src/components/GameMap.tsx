import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface GameMapProps {
  onBack: () => void;
}

export default function GameMap({ onBack }: GameMapProps) {
  const [money, setMoney] = useState(50000);
  const [population, setPopulation] = useState(1250);
  const [happiness, setHappiness] = useState(85);

  const buildings = [
    { id: 1, type: 'residential', x: 20, y: 30, size: 'small' },
    { id: 2, type: 'commercial', x: 60, y: 20, size: 'medium' },
    { id: 3, type: 'industrial', x: 80, y: 60, size: 'large' },
    { id: 4, type: 'residential', x: 40, y: 70, size: 'medium' },
  ];

  const buildingTypes = [
    { type: 'residential', icon: 'Home', color: 'bg-ny-blue', cost: 5000 },
    { type: 'commercial', icon: 'Building', color: 'bg-ny-yellow', cost: 8000 },
    { type: 'industrial', icon: 'Factory', color: 'bg-ny-red', cost: 12000 },
  ];

  const handleBuild = (type: string, cost: number) => {
    if (money >= cost) {
      setMoney(money - cost);
      setPopulation(population + Math.floor(Math.random() * 50) + 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2 bg-white shadow-md hover:shadow-lg"
        >
          <Icon name="ArrowLeft" size={20} />
          Главное меню
        </Button>
        
        <div className="flex gap-4">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-3 flex items-center gap-2">
              <Icon name="DollarSign" size={20} className="text-green-600" />
              <span className="font-bold text-ny-gray">${money.toLocaleString()}</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-3 flex items-center gap-2">
              <Icon name="Users" size={20} className="text-blue-600" />
              <span className="font-bold text-ny-gray">{population.toLocaleString()}</span>
            </CardContent>
          </Card>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-3 flex items-center gap-2">
              <Icon name="Heart" size={20} className="text-red-500" />
              <span className="font-bold text-ny-gray">{happiness}%</span>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Building Menu */}
        <div className="lg:col-span-1">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-ny-gray flex items-center gap-2">
                <Icon name="Hammer" size={24} />
                Строительство
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {buildingTypes.map((building) => (
                <Button
                  key={building.type}
                  onClick={() => handleBuild(building.type, building.cost)}
                  disabled={money < building.cost}
                  className={`w-full justify-start gap-3 ${building.color} hover:opacity-90 text-white disabled:opacity-50`}
                  size="lg"
                >
                  <Icon name={building.icon as any} size={20} />
                  <div className="text-left">
                    <div className="font-semibold capitalize">{building.type}</div>
                    <div className="text-sm opacity-90">${building.cost.toLocaleString()}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Game Map */}
        <div className="lg:col-span-3">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl h-[500px]">
            <CardHeader>
              <CardTitle className="text-ny-gray flex items-center gap-2">
                <Icon name="Map" size={24} />
                Манхэттен
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                {/* Grid */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #ddd 1px, transparent 1px),
                      linear-gradient(to bottom, #ddd 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}
                />
                
                {/* Roads */}
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-700 transform -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gray-700 transform -translate-x-1/2"></div>
                
                {/* Buildings */}
                {buildings.map((building) => (
                  <div
                    key={building.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform`}
                    style={{
                      left: `${building.x}%`,
                      top: `${building.y}%`,
                    }}
                  >
                    <div 
                      className={`
                        ${building.type === 'residential' ? 'bg-ny-blue' : ''}
                        ${building.type === 'commercial' ? 'bg-ny-yellow' : ''}
                        ${building.type === 'industrial' ? 'bg-ny-red' : ''}
                        ${building.size === 'small' ? 'w-8 h-8' : ''}
                        ${building.size === 'medium' ? 'w-12 h-12' : ''}
                        ${building.size === 'large' ? 'w-16 h-16' : ''}
                        rounded-lg shadow-lg flex items-center justify-center text-white
                      `}
                    >
                      <Icon 
                        name={
                          building.type === 'residential' ? 'Home' :
                          building.type === 'commercial' ? 'Building' : 'Factory'
                        } 
                        size={building.size === 'small' ? 16 : building.size === 'medium' ? 20 : 24}
                      />
                    </div>
                  </div>
                ))}
                
                {/* City Features */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-green-500 w-16 h-8 rounded flex items-center justify-center text-white text-xs font-bold">
                    ПАРК
                  </div>
                  <div className="bg-blue-500 w-20 h-8 rounded flex items-center justify-center text-white text-xs font-bold">
                    ПРИСТАНЬ
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-ny-yellow w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🚕</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}