import React from 'react';
import { User, Goal } from '../types';
import { GlassCard, GlassButton } from './GlassUI';
import { CheckCircle2, Circle, Flame, Upload, X } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  goals: Goal[];
  streak: number;
  journalEntry: string;
  onToggleGoal: (goalId: string) => void;
  onUploadEvidence: (goalId: string, file: File) => void;
  onUpdateJournal: (text: string) => void;
  onClose: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  goals,
  streak,
  journalEntry,
  onToggleGoal,
  onUploadEvidence,
  onUpdateJournal,
  onClose
}) => {
  
  const handleFileChange = (goalId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadEvidence(goalId, e.target.files[0]);
    }
  };

  // Determine theme colors based on user
  const accentColor = user === 'Eder' ? 'text-blue-400' : 'text-purple-400';
  const glowColor = user === 'Eder' ? 'shadow-blue-500/20' : 'shadow-purple-500/20';

  return (
    <div className="animate-fade-in pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil de <span className={accentColor}>{user}</span></h2>
          <p className="text-white/50 text-sm mt-1">Tus metas diarias sincronizadas</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6 text-white/70" />
        </button>
      </div>

      {/* Streak Widget */}
      <GlassCard className={`mb-8 flex items-center justify-between border-l-4 ${user === 'Eder' ? 'border-l-blue-500' : 'border-l-purple-500'}`}>
        <div>
          <h3 className="text-lg font-semibold">Racha Actual</h3>
          <p className="text-white/50 text-sm">Mantén el fuego encendido</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 shadow-lg ${glowColor}`}>
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-4xl font-bold">{streak} <span className="text-sm font-normal text-white/40">Días</span></span>
        </div>
      </GlassCard>

      {/* Goal List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const isCompleted = goal.completedBy.includes(user);
          const evidenceUrl = goal.evidence[user];

          return (
            <GlassCard key={goal.id} className="relative group">
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button 
                  onClick={() => onToggleGoal(goal.id)}
                  className="mt-1 focus:outline-none transition-transform active:scale-90"
                >
                  {isCompleted ? (
                    <CheckCircle2 className={`w-8 h-8 ${accentColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                  ) : (
                    <Circle className="w-8 h-8 text-white/20 hover:text-white/40 transition-colors" />
                  )}
                </button>

                <div className="flex-1">
                  <h4 className={`text-lg font-medium transition-all ${isCompleted ? 'text-white/40 line-through decoration-white/20' : 'text-white'}`}>
                    {goal.text}
                  </h4>
                  <span className="text-xs text-white/30 uppercase tracking-wider">{goal.category}</span>

                  {/* Evidence Section */}
                  <div className="mt-4">
                    {evidenceUrl ? (
                      <div className="relative rounded-lg overflow-hidden h-32 w-full md:w-1/2 border border-white/10 shadow-inner">
                        <img src={evidenceUrl} alt="Evidence" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">Evidencia subida</span>
                        </div>
                      </div>
                    ) : (
                      isCompleted && (
                        <div className="relative mt-2">
                           <input 
                              type="file" 
                              id={`file-${goal.id}`} 
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileChange(goal.id, e)}
                           />
                           <label 
                              htmlFor={`file-${goal.id}`}
                              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 border-dashed rounded-lg cursor-pointer transition-colors w-fit text-sm text-white/70"
                           >
                              <Upload className="w-4 h-4" />
                              Subir Evidencia Foto
                           </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Journal */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Diario Personal</h3>
        <div className="glass-panel rounded-2xl p-1">
          <textarea
            value={journalEntry}
            onChange={(e) => onUpdateJournal(e.target.value)}
            placeholder="Notas: ¿Cómo me siento hoy? ¿Qué logré?"
            className="w-full h-32 bg-transparent text-white placeholder-white/30 p-4 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
};
