import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Camera, Gamepad2, Eye, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const ZoneDetail = ({ zone, onBack, onComplete, onVisit, progress = 0 }) => {
  const [activeTab, setActiveTab] = useState('story');
  const [isPlaying, setIsPlaying] = useState(false);
  const [arEnabled, setArEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleStoryMode = () => {
    setIsPlaying(!isPlaying);
    if (!zone.visited) {
      onVisit(zone.id);
    }
  };

  const handleComplete = () => {
    onComplete(zone.id);
  };

  const tabs = [
    { id: 'story', label: 'Story', icon: Play },
    { id: 'facts', label: 'Fun Facts', icon: Eye },
    { id: 'photo', label: 'Photo Challenge', icon: Camera },
    { id: 'game', label: 'Mini Game', icon: Gamepad2 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-background p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-green-400 hover:text-green-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Map
        </Button>
        
        <div className="text-center">
          <h1 className="text-lg font-bold text-foreground ghost-text-glow">
            GHOST MUSEUM
          </h1>
        </div>
        
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Zone Title and Progress */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{zone.icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{zone.title}</h2>
            <p className="text-muted-foreground">{zone.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground">{progress}% COMPLETE</span>
        </div>
      </div>

      {/* Zone Images Placeholder */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg border-2 zone-card flex items-center justify-center ${
              zone.color ? `bg-gradient-to-br ${zone.color}` : 'bg-muted'
            }`}
          >
            <span className="text-4xl opacity-80">{zone.icon}</span>
          </div>
        ))}
      </div>

      {/* Main Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          onClick={handleStoryMode}
          className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white font-semibold ghost-glow"
          size="lg"
        >
          <div className="flex items-center justify-between w-full">
            <span>STORY MODE</span>
            <div className="flex items-center gap-2">
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              {isPlaying ? (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white animate-pulse" />
                  <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.2s' }} />
                </div>
              ) : (
                <Play className="w-5 h-5" />
              )}
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 border-green-500/50 hover:bg-green-500/10"
          size="lg"
        >
          <Camera className="w-5 h-5 mr-2" />
          PHOTO CHALLENGE
        </Button>
      </div>

      {/* Content Tabs */}
      <div className="space-y-4">
        {/* Fun Facts Card */}
        <Card className="zone-card">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-400 mb-3">FUN FACTS</h3>
            <div className="space-y-2">
              {zone.funFacts.map((fact, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  • {fact}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mini Game */}
        <Button
          variant="outline"
          className="w-full h-12 border-blue-500/50 hover:bg-blue-500/10"
          size="lg"
        >
          <Gamepad2 className="w-5 h-5 mr-2" />
          MINI-GAME
        </Button>

        {/* AR Features Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg zone-card">
          <span className="font-semibold text-foreground">AR FEATURES</span>
          <Button
            onClick={() => setArEnabled(!arEnabled)}
            className={`w-12 h-6 rounded-full transition-all ${
              arEnabled 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              arEnabled ? 'translate-x-3' : 'translate-x-0'
            }`} />
          </Button>
        </div>
      </div>

      {/* Story Content Modal */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setIsPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-card p-6 rounded-lg max-w-md w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">{zone.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(false)}
                className="text-muted-foreground"
              >
                ✕
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {zone.story}
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleComplete}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Mark Complete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ZoneDetail;

