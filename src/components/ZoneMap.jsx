import React from 'react';
import { motion } from 'framer-motion';
import { zones } from '../data/zones';

const ZoneMap = ({ onZoneSelect, visitedZones = [], completedZones = [] }) => {
  const isZoneVisited = (zoneId) => visitedZones.includes(zoneId);
  const isZoneCompleted = (zoneId) => completedZones.includes(zoneId);

  const zonePositions = {
    'library': { top: '15%', left: '15%' },
    'briefing': { top: '15%', left: '42%' },
    'small-space': { top: '15%', left: '70%' },
    'thailand': { top: '40%', left: '15%' },
    'china-palace': { top: '40%', left: '42%' },
    'chinese-hell': { top: '40%', left: '70%' },
    'egypt': { top: '65%', left: '15%' },
    'werewolf': { top: '65%', left: '42%' },
    'kampung': { top: '65%', left: '70%' }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-purple-900/20 to-green-900/20 rounded-lg border border-green-500/30 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-green-500">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Zone connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Draw connections between zones */}
        <path
          d="M 15% 15% Q 42% 10% 42% 15% Q 70% 10% 70% 15%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 15% 40% Q 42% 35% 42% 40% Q 70% 35% 70% 40%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 15% 65% Q 42% 60% 42% 65% Q 70% 60% 70% 65%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 15% 15% Q 10% 40% 15% 40% Q 10% 65% 15% 65%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 42% 15% Q 37% 40% 42% 40% Q 37% 65% 42% 65%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 70% 15% Q 75% 40% 70% 40% Q 75% 65% 70% 65%"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
      </svg>

      {/* Zone markers */}
      {zones.map((zone, index) => {
        const position = zonePositions[zone.id];
        const visited = isZoneVisited(zone.id);
        const completed = isZoneCompleted(zone.id);
        
        return (
          <motion.div
            key={zone.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ top: position.top, left: position.left }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onZoneSelect(zone)}
          >
            <div className={`
              relative w-16 h-16 rounded-full border-2 transition-all duration-300
              ${completed 
                ? 'bg-green-500/80 border-green-400 ghost-glow' 
                : visited 
                  ? 'bg-purple-500/80 border-purple-400' 
                  : 'bg-gray-700/80 border-gray-500 hover:border-green-400'
              }
            `}>
              {/* Zone icon */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {zone.icon}
              </div>
              
              {/* Completion indicator */}
              {completed && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              )}
              
              {/* Pulsing effect for available zones */}
              {!visited && !completed && (
                <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
              )}
            </div>
            
            {/* Zone name */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                completed 
                  ? 'bg-green-500/20 text-green-300' 
                  : visited 
                    ? 'bg-purple-500/20 text-purple-300' 
                    : 'bg-gray-700/20 text-gray-300'
              }`}>
                {zone.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ZoneMap;

