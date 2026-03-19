/**
 * Motor de renderizado del mundo Miniverse
 * Canvas + sprites 256x256 (4x4 grid, 64x64 frames)
 */
import type { WorldConfig, Citizen } from '../types';

const SPRITE_SIZE = 64;

interface CitizenState extends Citizen {
  displayX: number;
  displayY: number;
}

export class WorldRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private world: WorldConfig;
  private citizens: Map<string, CitizenState> = new Map();
  private spriteSheet: HTMLImageElement | null = null;
  private animationFrame = 0;

  constructor(canvas: HTMLCanvasElement, world: WorldConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2d context not available');
    this.ctx = ctx;
    this.world = world;

    this.loadSpriteSheet('/universal_assets/citizens/default.svg');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private loadSpriteSheet(src: string) {
    const img = new Image();
    img.onload = () => {
      this.spriteSheet = img;
    };
    img.onerror = () => {
      console.warn('Sprite sheet not found, using placeholder');
    };
    img.src = src;
  }

  resize() {
    const { tileSize, grid } = this.world;
    const maxW = grid.cols * tileSize;
    const maxH = grid.rows * tileSize;
    const scale = Math.min(
      window.innerWidth / maxW,
      window.innerHeight / maxH,
      2
    );
    this.canvas.width = maxW * scale;
    this.canvas.height = maxH * scale;
    this.ctx.scale(scale, scale);
  }

  setCitizens(citizens: Citizen[]) {
    this.citizens.clear();
    const tileSize = this.world.tileSize;
    citizens.forEach((c) => {
      const target = this.getTargetForCitizen(c);
      this.citizens.set(c.agent, {
        ...c,
        displayX: target?.x ?? c.x ?? tileSize * 4,
        displayY: target?.y ?? c.y ?? tileSize * 4,
      });
    });
  }

  updateCitizen(citizen: Citizen) {
    const existing = this.citizens.get(citizen.agent);
    const tileSize = this.world.tileSize;
    const target = this.getTargetForCitizen(citizen);
    const defaultX = target?.x ?? tileSize * 4;
    const defaultY = target?.y ?? tileSize * 4;
    this.citizens.set(citizen.agent, {
      ...citizen,
      displayX: existing?.displayX ?? citizen.x ?? defaultX,
      displayY: existing?.displayY ?? citizen.y ?? defaultY,
    });
  }

  private getTargetForCitizen(c: Citizen | CitizenState): { x: number; y: number } | null {
    const { props, wanderPoints } = this.world;
    const tileSize = this.world.tileSize;

    if (c.state === 'working') {
      const work = props.find((p) => p.type === 'work');
      if (work) {
        const ax = work.anchors[0];
        return {
          x: (work.x + (ax?.x ?? 0.5)) * tileSize,
          y: (work.y + (ax?.y ?? 0)) * tileSize,
        };
      }
    }
    if (c.state === 'thinking') {
      const util = props.find((p) => p.type === 'utility');
      if (util) {
        const ax = util.anchors[0];
        return {
          x: (util.x + (ax?.x ?? 0.5)) * tileSize,
          y: (util.y + (ax?.y ?? 0.5)) * tileSize,
        };
      }
    }
    if (c.state === 'idle' && wanderPoints.length > 0) {
      const idx = c.agent.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % wanderPoints.length;
      const [gx, gy] = wanderPoints[idx];
      return { x: gx * tileSize + tileSize / 2, y: gy * tileSize + tileSize / 2 };
    }
    return null;
  }

  private getSpriteRowAndFrame(c: CitizenState): { row: number; frame: number } {
    const target = this.getTargetForCitizen(c);
    const dx = target ? target.x - c.displayX : 0;
    const dy = target ? target.y - c.displayY : 0;
    const moving = Math.abs(dx) > 2 || Math.abs(dy) > 2;

    if (c.state === 'working') return { row: 0, frame: 1 }; // sit-write
    if (c.state === 'thinking') return { row: 1, frame: 1 }; // sleep/think
    if (moving) {
      if (Math.abs(dy) >= Math.abs(dx)) return { row: dy < 0 ? 1 : 0, frame: this.animationFrame % 4 };
      return { row: dx < 0 ? 2 : 3, frame: this.animationFrame % 4 };
    }
    return { row: 3, frame: this.animationFrame % 4 }; // idle-breathe
  }

  private drawFloor() {
    const { layers, tileSize } = this.world;
    const floor = layers.floor;
    for (let y = 0; y < floor.length; y++) {
      for (let x = 0; x < floor[y].length; x++) {
        const v = floor[y][x];
        this.ctx.fillStyle = v === 0 ? '#1a1a2e' : '#e8e4d9';
        this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        if (v === 1) {
          this.ctx.strokeStyle = '#d4cfc4';
          this.ctx.lineWidth = 1;
          this.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  private drawWalls() {
    const { layers, tileSize } = this.world;
    const walls = layers.walls;
    for (let y = 0; y < walls.length; y++) {
      for (let x = 0; x < walls[y].length; x++) {
        if (walls[y][x] === 1) {
          this.ctx.fillStyle = '#4a5568';
          this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          this.ctx.strokeStyle = '#2d3748';
          this.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }
  }

  private drawProps() {
    const { props, tileSize } = this.world;
    this.ctx.fillStyle = '#8b7355';
    this.ctx.strokeStyle = '#5d4e37';
    for (const p of props) {
      this.ctx.fillRect(
        p.x * tileSize,
        p.y * tileSize,
        p.width * tileSize,
        p.height * tileSize
      );
      this.ctx.strokeRect(
        p.x * tileSize,
        p.y * tileSize,
        p.width * tileSize,
        p.height * tileSize
      );
      this.ctx.fillStyle = '#2d5a27';
      this.ctx.font = '10px monospace';
      this.ctx.fillText(p.type, p.x * tileSize + 4, p.y * tileSize + 12);
      this.ctx.fillStyle = '#8b7355';
    }
  }

  private drawCitizen(c: CitizenState) {
    const { row, frame } = this.getSpriteRowAndFrame(c);
    const sx = (frame % 4) * SPRITE_SIZE;
    const sy = row * SPRITE_SIZE;

    const drawX = c.displayX - SPRITE_SIZE / 2;
    const drawY = c.displayY - SPRITE_SIZE;

    if (this.spriteSheet && this.spriteSheet.complete) {
      this.ctx.drawImage(
        this.spriteSheet,
        sx, sy, SPRITE_SIZE, SPRITE_SIZE,
        drawX, drawY, SPRITE_SIZE, SPRITE_SIZE
      );
    } else {
      this.ctx.fillStyle = c.state === 'working' ? '#3b82f6' : c.state === 'thinking' ? '#8b5cf6' : '#22c55e';
      this.ctx.fillRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
      this.ctx.strokeStyle = '#166534';
      this.ctx.strokeRect(drawX, drawY, SPRITE_SIZE, SPRITE_SIZE);
    }

    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.font = '10px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(c.name.slice(0, 8), c.displayX, c.displayY - SPRITE_SIZE - 4);
  }

  render(now: number) {
    this.animationFrame = Math.floor((now / 120) % 4);
    const speed = 2;
    for (const c of this.citizens.values()) {
      const target = this.getTargetForCitizen(c);
      if (target) {
        const dx = target.x - c.displayX;
        const dy = target.y - c.displayY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 2) {
          const nx = c.displayX + (dx / dist) * speed;
          const ny = c.displayY + (dy / dist) * speed;
          c.displayX = Math.abs(nx - target.x) < 2 ? target.x : nx;
          c.displayY = Math.abs(ny - target.y) < 2 ? target.y : ny;
        }
      }
    }
    this.drawFloor();
    this.drawWalls();
    this.drawProps();
    for (const c of this.citizens.values()) {
      this.drawCitizen(c);
    }
  }

  startLoop() {
    const loop = (now: number) => {
      this.render(now);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
