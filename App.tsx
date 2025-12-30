import React, { useState } from 'react';
import { User, Goal, View, UserStats } from './types';
import { INITIAL_GOALS } from './constants';
import { GlassButton } from './components/GlassUI';
import { VisionBoard } from './components/VisionBoard';
import { ProgressFooter } from './components/ProgressFooter';
import { ProfileView } from './components/ProfileView';
import { Plus, User as UserIcon } from 'lucide-react';

export default function App() {
  // State
  const [currentView, setCurrentView] = useState<View>('Home');
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  
  // Separate stats for Eder and Sofía
  const [ederStats, setEderStats] = useState<UserStats>({ streak: 12, journal: '' });
  const [sofiaStats, setSofiaStats] = useState<UserStats>({ streak: 15, journal: '' });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('General');

  // --- Actions ---

  const addSharedGoal = () => {
    if (!newGoalText.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      text: newGoalText,
      category: newGoalCategory,
      completedBy: [],
      evidence: {}
    };
    setGoals(prev => [newGoal, ...prev]);
    setNewGoalText('');
    setIsModalOpen(false);
  };

  const toggleGoalCompletion = (goalId: string, user: User) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id !== goalId) return goal;
      
      const isCompleted = goal.completedBy.includes(user);
      if (isCompleted) {
        return { ...goal, completedBy: goal.completedBy.filter(u => u !== user) };
      } else {
        return { ...goal, completedBy: [...goal.completedBy, user] };
      }
    }));
  };

  const uploadEvidence = (goalId: string, user: User, file: File) => {
    // Create a local URL for preview
    const imageUrl = URL.createObjectURL(file);
    
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id !== goalId) return goal;
      return {
        ...goal,
        evidence: {
          ...goal.evidence,
          [user]: imageUrl
        }
      };
    }));
  };

  const updateJournal = (user: User, text: string) => {
    if (user === 'Eder') {
      setEderStats(prev => ({ ...prev, journal: text }));
    } else {
      setSofiaStats(prev => ({ ...prev, journal: text }));
    }
  };

  // --- Renders ---

  const renderHome = () => (
    <div className="animate-fade-in flex flex-col items-center pb-32">
      {/* Header Button */}
      <GlassButton 
        onClick={() => setIsModalOpen(true)}
        className="mt-8 text-lg py-4 w-full md:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
      >
        <Plus className="w-6 h-6" /> AGREGAR NUEVA META COMPARTIDA
      </GlassButton>

      {/* Vision Board */}
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-center text-white/50 text-sm tracking-[0.3em] uppercase mt-10 mb-4">Nuestros Pilares</h2>
        <VisionBoard />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mt-12 w-full max-w-md px-4">
        <GlassButton 
          variant="secondary" 
          className="flex-1 h-20 text-lg flex-col gap-1 border-blue-500/30 hover:bg-blue-900/20 hover:border-blue-400"
          onClick={() => setCurrentView('Eder')}
        >
          <UserIcon className="w-6 h-6 text-blue-400" />
          PERFIL EDER
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          className="flex-1 h-20 text-lg flex-col gap-1 border-purple-500/30 hover:bg-purple-900/20 hover:border-purple-400"
          onClick={() => setCurrentView('Sofía')}
        >
          <UserIcon className="w-6 h-6 text-purple-400" />
          PERFIL SOFÍA
        </GlassButton>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-x-hidden">
      {/* Dynamic Background Mesh (Purely visual) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="p-6 flex items-center justify-center border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-40">
           <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 drop-shadow-sm cursor-pointer" onClick={() => setCurrentView('Home')}>
             VISIÓN 2026
           </h1>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {currentView === 'Home' && renderHome()}
          
          {currentView === 'Eder' && (
            <ProfileView 
              user="Eder"
              goals={goals}
              streak={ederStats.streak}
              journalEntry={ederStats.journal}
              onToggleGoal={(id) => toggleGoalCompletion(id, 'Eder')}
              onUploadEvidence={(id, file) => uploadEvidence(id, 'Eder', file)}
              onUpdateJournal={(text) => updateJournal('Eder', text)}
              onClose={() => setCurrentView('Home')}
            />
          )}

          {currentView === 'Sofía' && (
            <ProfileView 
              user="Sofía"
              goals={goals}
              streak={sofiaStats.streak}
              journalEntry={sofiaStats.journal}
              onToggleGoal={(id) => toggleGoalCompletion(id, 'Sofía')}
              onUploadEvidence={(id, file) => uploadEvidence(id, 'Sofía', file)}
              onUpdateJournal={(text) => updateJournal('Sofía', text)}
              onClose={() => setCurrentView('Home')}
            />
          )}
        </main>
        
        {/* Footer */}
        <ProgressFooter goals={goals} />
      </div>

      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-[#1e293b] border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-white">Nueva Meta Compartida</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Descripción de la Meta</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                  placeholder="Ej: Correr 5km juntos..."
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Pilar / Categoría</label>
                <select 
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                >
                  <option>Cuerpo</option>
                  <option>Alimentación</option>
                  <option>Prioridad Personal</option>
                  <option>Relaciones</option>
                  <option>Trabajo / Éxito</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={addSharedGoal}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-900/50 transition-all"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
