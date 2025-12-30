import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Goal, User } from '../types';

interface ProgressFooterProps {
  goals: Goal[];
}

export const ProgressFooter: React.FC<ProgressFooterProps> = ({ goals }) => {
  // Calculate completion percentage
  const calculateProgress = (user: User) => {
    if (goals.length === 0) return 0;
    const completed = goals.filter(g => g.completedBy.includes(user)).length;
    return Math.round((completed / goals.length) * 100);
  };

  const data = [
    { name: 'Eder', progress: calculateProgress('Eder') },
    { name: 'Sofía', progress: calculateProgress('Sofía') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Blur Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-t border-white/10" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-white/90 uppercase tracking-widest">Progreso Mutuo</h4>
          <span className="text-xs text-white/50">Visualización Global</span>
        </div>

        <div className="h-16 w-48 md:w-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" hide domain={[0, 100]} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="progress" barSize={12} radius={[0, 4, 4, 0]} background={{ fill: 'rgba(255,255,255,0.1)' }}>
                 {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#60a5fa' : '#c084fc'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Simple Labels for Mobile Clarity */}
        <div className="hidden md:flex flex-col text-xs space-y-1">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-400"></div> <span>Eder: {data[0].progress}%</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-purple-400"></div> <span>Sofía: {data[1].progress}%</span>
           </div>
        </div>
      </div>
    </div>
  );
};
