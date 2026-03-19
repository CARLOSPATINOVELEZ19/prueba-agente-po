/**
 * Miniverse - Mundo de píxeles compartido para agentes IA
 */
import './style.css';
import type { WorldConfig, Citizen } from './types';
import { WorldRenderer } from './renderer/world';
import { connectWebSocket } from './ws-client';

const WORLD_URL = '/worlds/cozy-startup/world.json';

function updateCitizensList(citizens: Citizen[]) {
  const el = document.getElementById('citizens-list');
  if (!el) return;
  el.innerHTML = citizens.length
    ? citizens
        .map(
          (c) =>
            `<div class="citizen-item"><span class="state-${c.state}">●</span> ${c.name} (${c.state})</div>`
        )
        .join('')
    : '<p class="empty-state">Ningún ciudadano conectado</p>';
}

async function loadWorld(): Promise<WorldConfig> {
  const res = await fetch(WORLD_URL);
  if (!res.ok) throw new Error(`Failed to load world: ${res.status}`);
  return res.json();
}

async function init() {
  const world = await loadWorld();
  const canvas = document.querySelector<HTMLCanvasElement>('#world-canvas');
  if (!canvas) throw new Error('Canvas #world-canvas not found');

  const renderer = new WorldRenderer(canvas, world);

  connectWebSocket((citizens) => {
    citizens.forEach((c) => renderer.updateCitizen(c));
    fetch('/api/observe')
      .then((r) => r.json())
      .then((data) => updateCitizensList(data.citizens ?? []));
  });

  const res = await fetch('/api/observe');
  if (res.ok) {
    const data = await res.json();
    const citizens = data.citizens ?? [];
    renderer.setCitizens(citizens);
    updateCitizensList(citizens);
  }

  renderer.startLoop();
}

init().catch(console.error);
