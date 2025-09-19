import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface GameSettingsProps {
  onBack: () => void;
}

export default function GameSettings({ onBack }: GameSettingsProps) {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [musicVolume, setMusicVolume] = useState([75]);
  const [soundVolume, setSoundVolume] = useState([60]);

  const settingsGroups = [
    {
      title: "Аудио",
      icon: "Volume2",
      settings: [
        {
          id: "music",
          label: "Фоновая музыка",
          description: "Включить музыкальное сопровождение",
          type: "switch",
          value: musicEnabled,
          onChange: setMusicEnabled
        },
        {
          id: "sound",
          label: "Звуковые эффекты",
          description: "Звуки действий и уведомлений",
          type: "switch",
          value: soundEnabled,
          onChange: setSoundEnabled
        },
        {
          id: "musicVolume",
          label: "Громкость музыки",
          description: "Настройка уровня фоновой музыки",
          type: "slider",
          value: musicVolume,
          onChange: setMusicVolume,
          disabled: !musicEnabled
        },
        {
          id: "soundVolume",
          label: "Громкость звуков",
          description: "Настройка уровня звуковых эффектов",
          type: "slider",
          value: soundVolume,
          onChange: setSoundVolume,
          disabled: !soundEnabled
        }
      ]
    },
    {
      title: "Игровой процесс",
      icon: "Settings",
      settings: [
        {
          id: "notifications",
          label: "Уведомления",
          description: "Показывать игровые уведомления",
          type: "switch",
          value: notifications,
          onChange: setNotifications
        },
        {
          id: "autoSave",
          label: "Автосохранение",
          description: "Автоматически сохранять прогресс",
          type: "switch",
          value: autoSave,
          onChange: setAutoSave
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
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
          
          <h1 className="text-3xl font-bold text-ny-gray">Настройки игры</h1>
          <div className="w-20" />
        </div>

        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <Card key={group.title} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-ny-gray flex items-center gap-2 text-xl">
                  <Icon name={group.icon as any} size={24} />
                  {group.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {group.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-ny-gray text-lg">{setting.label}</h3>
                        <p className="text-ny-gray/70 text-sm">{setting.description}</p>
                        
                        {setting.type === "slider" && (
                          <div className="mt-3 max-w-xs">
                            <Slider
                              value={setting.value as number[]}
                              onValueChange={setting.onChange as (value: number[]) => void}
                              max={100}
                              step={5}
                              disabled={setting.disabled}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-ny-gray/60 mt-1">
                              <span>0%</span>
                              <span className="font-medium">{(setting.value as number[])[0]}%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {setting.type === "switch" && (
                        <div className="ml-4">
                          <Switch
                            checked={setting.value as boolean}
                            onCheckedChange={setting.onChange as (value: boolean) => void}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Game Data */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-ny-gray flex items-center gap-2 text-xl">
                <Icon name="Database" size={24} />
                Данные игры
              </CardTitle>
              <CardDescription>
                Управление сохранениями и сбросом прогресса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Icon name="Download" size={20} />
                  Экспорт сохранения
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Icon name="Upload" size={20} />
                  Импорт сохранения
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                >
                  <Icon name="RotateCcw" size={20} />
                  Сбросить прогресс
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                >
                  <Icon name="Info" size={20} />
                  О игре
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button 
              className="bg-ny-yellow hover:bg-ny-yellow/90 text-ny-gray font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить настройки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}