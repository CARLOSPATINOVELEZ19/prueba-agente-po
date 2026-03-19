/**
 * Cliente WebSocket para Miniverse - recibe actualizaciones en tiempo real
 */
import type { Citizen } from './types';

type MessageHandler = (citizens: Citizen[]) => void;

export function connectWebSocket(onUpdate: MessageHandler): WebSocket {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = import.meta.env.DEV ? `${location.hostname}:3001` : location.host;
  const ws = new WebSocket(`${protocol}//${host}/ws`);

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'snapshot' && Array.isArray(data.citizens)) {
        onUpdate(data.citizens);
      } else if (data.type === 'citizen_update' && data.citizen) {
        onUpdate([data.citizen]);
      }
    } catch {
      // ignore
    }
  };

  ws.onclose = () => {
    setTimeout(() => connectWebSocket(onUpdate), 2000);
  };

  return ws;
}
