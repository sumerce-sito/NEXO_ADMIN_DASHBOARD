import { getPool } from './db';
import {
  metrics as mockMetrics,
  productos as mockProductos,
  lotes as mockLotes,
  codigos as mockCodigos,
  recentScans as mockRecentScans,
  type Producto,
  type Lote,
  type Codigo,
  type Scan,
} from './data';

const hasDb = !!process.env.DATABASE_URL;

// ── Métricas ──────────────────────────────────────────────────────────────────

export type Metrics = typeof mockMetrics;

export async function getMetrics(): Promise<Metrics> {
  if (!hasDb) return mockMetrics;
  try {
    const pool = getPool();
    const [p, l, c] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM productos WHERE activo = true`),
      pool.query(`SELECT COUNT(*) FROM lotes`),
      pool.query(`SELECT COUNT(*), COALESCE(SUM(escaneado_count),0) AS total_scans FROM codigos WHERE estado = 'activo'`),
    ]);
    return {
      productosActivos: parseInt(p.rows[0].count),
      lotesGenerados:   parseInt(l.rows[0].count),
      codigosActivos:   parseInt(c.rows[0].count),
      escaneosHoy:      parseInt(c.rows[0].total_scans),
    };
  } catch {
    return mockMetrics;
  }
}

// ── Productos ─────────────────────────────────────────────────────────────────

export async function getProductos(): Promise<Producto[]> {
  if (!hasDb) return mockProductos;
  try {
    const { rows } = await getPool().query(
      `SELECT nombre, categoria, color, activo FROM productos ORDER BY created_at DESC`
    );
    return rows.map((r) => ({
      nombre:    r.nombre,
      categoria: r.categoria,
      color:     r.color ?? '',
      estado:    r.activo ? 'activo' : 'inactivo',
    }));
  } catch {
    return mockProductos;
  }
}

// ── Lotes ─────────────────────────────────────────────────────────────────────

export async function getLotes(): Promise<Lote[]> {
  if (!hasDb) return mockLotes;
  try {
    const { rows } = await getPool().query(
      `SELECT l.id, l.estado, l.total_tags, l.fecha_produccion, p.nombre AS producto
       FROM lotes l
       LEFT JOIN productos p ON p.id = l.producto_id
       ORDER BY l.created_at DESC`
    );
    const estadoMap: Record<string, Lote['estado']> = {
      activo:    'activo',
      agotado:   'completado',
      suspendido: 'inactivo',
    };
    return rows.map((r) => ({
      id:        r.id,
      producto:  r.producto ?? '—',
      fecha:     r.fecha_produccion
        ? new Date(r.fecha_produccion).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
        : '—',
      estado:    estadoMap[r.estado] ?? 'pendiente',
      totalTags: r.total_tags ?? 0,
    }));
  } catch {
    return mockLotes;
  }
}

// ── Códigos NFC ───────────────────────────────────────────────────────────────

export async function getCodigos(): Promise<Codigo[]> {
  if (!hasDb) return mockCodigos;
  try {
    const { rows } = await getPool().query(
      `SELECT c.codigo_nfc, c.lote_id, c.estado, c.url_landing, p.nombre AS producto
       FROM codigos c
       LEFT JOIN productos p ON p.id = c.producto_id
       ORDER BY c.created_at DESC`
    );
    const estadoMap: Record<string, Codigo['estado']> = {
      activo:     'activo',
      disponible: 'pendiente',
      asignado:   'activo',
      revocado:   'inactivo',
    };
    return rows.map((r) => ({
      codigo:  r.codigo_nfc,
      lote:    r.lote_id ?? '—',
      producto: r.producto ?? '—',
      estado:  estadoMap[r.estado] ?? 'pendiente',
      url:     r.url_landing
        ? r.url_landing.replace(/^https?:\/\//, '')
        : `quie.co/v/${r.codigo_nfc}`,
    }));
  } catch {
    return mockCodigos;
  }
}

// ── Escaneos recientes ────────────────────────────────────────────────────────

export async function getRecentScans(): Promise<Scan[]> {
  if (!hasDb) return mockRecentScans;
  try {
    const { rows } = await getPool().query(
      `SELECT c.codigo_nfc, p.nombre AS producto, c.escaneado_count, c.created_at
       FROM codigos c
       LEFT JOIN productos p ON p.id = c.producto_id
       WHERE c.escaneado_count > 0
       ORDER BY c.created_at DESC
       LIMIT 7`
    );
    if (rows.length === 0) return mockRecentScans;
    return rows.map((r) => ({
      codigo:      r.codigo_nfc,
      producto:    r.producto ?? '—',
      ciudad:      'Colombia',
      dispositivo: 'NFC',
      fecha:       new Date(r.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    }));
  } catch {
    return mockRecentScans;
  }
}
