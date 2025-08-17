import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Home, Trophy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import ZoneMap from './components/ZoneMap';
import ZoneDetail from './components/ZoneDetail';
import { zones, getTotalProgress } from './data/zones';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedZone, setSelectedZone] = useState(null);
  const [visitedZones, setVisitedZones] = useState([]);
  const [completedZones, setCompletedZones] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const totalProgress = getTotalProgress();

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setCurrentView('zone');
  };

  const handleZoneVisit = (zoneId) => {
    if (!visitedZones.includes(zoneId)) {
      setVisitedZones([...visitedZones, zoneId]);
    }
  };

  const handleZoneComplete = (zoneId) => {
    if (!completedZones.includes(zoneId)) {
      setCompletedZones([...completedZones, zoneId]);
    }
    if (!visitedZones.includes(zoneId)) {
      setVisitedZones([...visitedZones, zoneId]);
    }
  };

  const handleBackToMap = () => {
    setCurrentView('home');
    setSelectedZone(null);
  };

  const getZoneProgress = (zone) => {
    if (completedZones.includes(zone.id)) return 100;
    if (visitedZones.includes(zone.id)) return 75;
    return 0;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="text-green-400"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground ghost-text-glow">
                  GHOST MUSEUM
                </h1>
                <p className="text-sm text-muted-foreground">MELAKA</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{completedZones.length}/9</span>
              </div>
            </div>

            {/* Zone Map */}
            <div className="mb-8">
              <ZoneMap
                onZoneSelect={handleZoneSelect}
                visitedZones={visitedZones}
                completedZones={completedZones}
              />
            </div>

            {/* Start Button */}
            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={() => {
                  const firstIncompleteZone = zones.find(zone => !completedZones.includes(zone.id));
                  if (firstIncompleteZone) {
                    handleZoneSelect(firstIncompleteZone);
                  }
                }}
                className="w-full max-w-xs h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg ghost-glow"
                size="lg"
              >
                START
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Overall Progress: {Math.round((completedZones.length / zones.length) * 100)}%
                </p>
                <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedZones.length / zones.length) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 zone-card rounded-lg">
                <div className="text-2xl font-bold text-green-400">{visitedZones.length}</div>
                <div className="text-xs text-muted-foreground">Zones Visited</div>
              </div>
              <div className="text-center p-4 zone-card rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{completedZones.length}</div>
                <div className="text-xs text-muted-foreground">Zones Completed</div>
              </div>
              <div className="text-center p-4 zone-card rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{zones.length - completedZones.length}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
            </div>

            {/* Menu Overlay */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                  onClick={() => setShowMenu(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-card p-6 rounded-lg max-w-sm w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-lg font-bold mb-4">Menu</h3>
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setShowMenu(false)}
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Home
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setShowMenu(false)}
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Achievements
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setShowMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {currentView === 'zone' && selectedZone && (
          <ZoneDetail
            key="zone-detail"
            zone={selectedZone}
            onBack={handleBackToMap}
            onComplete={handleZoneComplete}
            onVisit={handleZoneVisit}
            progress={getZoneProgress(selectedZone)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

