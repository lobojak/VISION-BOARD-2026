import { VisionPillar, Goal } from './types';

export const INITIAL_GOALS: Goal[] = [
  {
    id: '1',
    text: 'Entrenamiento de fuerza 45 min',
    category: 'Cuerpo',
    completedBy: [],
    evidence: {}
  },
  {
    id: '2',
    text: 'Leer 10 páginas de desarrollo personal',
    category: 'Prioridad Personal',
    completedBy: [],
    evidence: {}
  },
  {
    id: '3',
    text: 'Cena sin pantallas (conexión real)',
    category: 'Relaciones',
    completedBy: [],
    evidence: {}
  }
];

export const VISION_PILLARS: VisionPillar[] = [
  {
    title: 'Buen Cuerpo',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
    description: 'Gimnasio & Disciplina'
  },
  {
    title: 'Alimentación',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    description: 'Salud Primordial'
  },
  {
    title: 'Yo Primero',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
    description: 'Prioridad Personal'
  },
  {
    title: 'Relaciones',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    description: 'Emocionalmente Fuertes'
  },
  {
    title: 'Éxito',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    description: 'Trabajo & Logros'
  }
];
