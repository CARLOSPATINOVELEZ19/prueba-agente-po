/** Tipos del mundo Miniverse */

export interface WorldConfig {
  id: string;
  name: string;
  grid: { cols: number; rows: number };
  tileSize: number;
  layers: {
    floor: number[][];
    walls: number[][];
  };
  props: Prop[];
  wanderPoints: [number, number][];
}

export interface Prop {
  id: string;
  type: 'work' | 'utility' | 'rest' | 'social';
  x: number;
  y: number;
  width: number;
  height: number;
  anchors: { type: string; x: number; y: number }[];
}

export interface Citizen {
  agent: string;
  name: string;
  state: 'working' | 'thinking' | 'idle';
  task?: string;
  x: number;
  y: number;
  lastSeen: number;
}

/** Mapeo filas sprite 256x256 (4x4 grid, 64x64 frames)
 * Fila 0: Caminar abajo / Sentar-Escribir
 * Fila 1: Caminar arriba / Dormir
 * Fila 2: Izquierda / Hablar
 * Fila 3: Derecha / Idle-Respirar
 */
export const SPRITE_ROWS = {
  walkDown: 0,
  walkUp: 1,
  walkLeft: 2,
  walkRight: 3,
  sitWrite: 0,   // action sheet
  sleep: 1,
  talk: 2,
  idleBreathe: 3,
} as const;
