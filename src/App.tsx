
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import GameMenu from "./components/GameMenu";
import GameMap from "./components/GameMap";
import PlayerProfile from "./components/PlayerProfile";
import GameSettings from "./components/GameSettings";

const queryClient = new QueryClient();

const App = () => {
  const [currentSection, setCurrentSection] = useState<string>('menu');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection('menu');
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'game':
        return <GameMap onBack={handleBack} />;
      case 'profile':
        return <PlayerProfile onBack={handleBack} />;
      case 'settings':
        return <GameSettings onBack={handleBack} />;
      default:
        return <GameMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderCurrentSection()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;