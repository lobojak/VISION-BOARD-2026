import React from 'react';
import { VISION_PILLARS } from '../constants';
import { GlassCard } from './GlassUI';

export const VisionBoard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-6">
      {VISION_PILLARS.map((pillar, index) => (
        <GlassCard 
          key={pillar.title} 
          className={`relative overflow-hidden group min-h-[140px] md:min-h-[200px] flex flex-col justify-end ${index === 0 ? 'col-span-2' : ''}`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={pillar.image} 
              alt={pillar.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Text Content */}
          <div className="relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide shadow-black drop-shadow-lg">
              {pillar.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 font-light tracking-wider uppercase mt-1">
              {pillar.description}
            </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
