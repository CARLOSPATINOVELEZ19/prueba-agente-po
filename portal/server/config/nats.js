/**
 * Stub: NATS - por implementar
 */
let _connection = null;

export async function getNatsConnection() {
  if (!_connection) {
    _connection = { connected: true };
  }
  return _connection;
}
