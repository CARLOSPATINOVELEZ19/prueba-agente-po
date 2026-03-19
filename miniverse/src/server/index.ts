/**
 * Miniverse Server - Mundo de píxeles compartido para agentes IA
 * Comunicación agnóstica: cualquier curl debe poder aparecer en el mundo
 */
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '../../dist');

// Estado del mundo (en memoria, agnóstico)
interface Citizen {
  agent: string;
  name: string;
  state: 'working' | 'thinking' | 'idle';
  task?: string;
  x: number;
  y: number;
  lastSeen: number;
}

interface InboxMessage {
  from: string;
  to: string;
  body: string;
  timestamp: number;
}

const citizens = new Map<string, Citizen>();
const inbox = new Map<string, InboxMessage[]>();
const PORT = process.env.PORT ?? 3001;

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend estático (después de build)
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// --- API Endpoints ---

/** POST /api/heartbeat - Registra o actualiza estado de un agente */
app.post('/api/heartbeat', (req, res) => {
  const { agent, name, state, task } = req.body;
  if (!agent || !name || !state) {
    return res.status(400).json({ error: 'agent, name y state son requeridos' });
  }
  const validStates = ['working', 'thinking', 'idle'];
  if (!validStates.includes(state)) {
    return res.status(400).json({ error: `state debe ser: ${validStates.join(', ')}` });
  }

  const existing = citizens.get(agent);
  const citizen: Citizen = {
    agent,
    name,
    state,
    task: task ?? existing?.task,
    x: existing?.x ?? 0,
    y: existing?.y ?? 0,
    lastSeen: Date.now(),
  };
  citizens.set(agent, citizen);

  broadcast({ type: 'citizen_update', citizen });
  res.json({ ok: true, citizen });
});

/** GET /api/observe - Estado del mundo para agentes */
app.get('/api/observe', (_req, res) => {
  const world = {
    citizens: Array.from(citizens.values()),
    timestamp: Date.now(),
  };
  res.json(world);
});

/** GET /api/inbox?agent=ID - Mensajes directos para un agente */
app.get('/api/inbox', (req, res) => {
  const agent = req.query.agent as string;
  if (!agent) {
    return res.status(400).json({ error: 'agent es requerido' });
  }
  const messages = inbox.get(agent) ?? [];
  res.json({ messages });
});

/** POST /api/act - Enviar mensaje directo entre agentes */
app.post('/api/act', (req, res) => {
  const { from, to, body } = req.body;
  if (!from || !to || !body) {
    return res.status(400).json({ error: 'from, to y body son requeridos' });
  }
  const msg: InboxMessage = { from, to, body, timestamp: Date.now() };
  const list = inbox.get(to) ?? [];
  list.push(msg);
  inbox.set(to, list);

  broadcast({ type: 'inbox', to, message: msg });
  res.json({ ok: true, message: msg });
});

// --- WebSocket ---
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(data: object) {
  const payload = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(payload);
  });
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'snapshot', citizens: Array.from(citizens.values()) }));
});

// SPA fallback (solo si dist existe)
if (existsSync(DIST_DIR)) {
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Miniverse server en http://localhost:${PORT}`);
  console.log(`WebSocket en ws://localhost:${PORT}/ws`);
});
