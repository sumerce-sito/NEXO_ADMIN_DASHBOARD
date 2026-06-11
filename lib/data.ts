export type Estado = "activo" | "inactivo" | "pendiente" | "completado"

export const metrics = {
  productosActivos: 48,
  lotesGenerados: 126,
  codigosActivos: 8420,
  escaneosHoy: 312,
}

export type Scan = {
  codigo: string
  producto: string
  ciudad: string
  dispositivo: string
  fecha: string
}

export const recentScans: Scan[] = [
  { codigo: "QUIE-A7B3X9-42", producto: "Billetera Andina", ciudad: "Bogotá", dispositivo: "iPhone 15 Pro", fecha: "10 jun, 14:32" },
  { codigo: "QUIE-ZD3PR5-24", producto: "Bolso Sabana", ciudad: "Medellín", dispositivo: "Samsung S24", fecha: "10 jun, 14:18" },
  { codigo: "QUIE-K9M2T1-87", producto: "Tarjetero Páramo", ciudad: "Cali", dispositivo: "Pixel 8", fecha: "10 jun, 13:57" },
  { codigo: "QUIE-X4N8L2-11", producto: "Llavero NFC", ciudad: "Fusagasugá", dispositivo: "iPhone 14", fecha: "10 jun, 13:40" },
  { codigo: "QUIE-P2Q7R9-63", producto: "Maletín Cordillera", ciudad: "Cartagena", dispositivo: "Xiaomi 14", fecha: "10 jun, 13:12" },
  { codigo: "QUIE-B6V1H4-29", producto: "Billetera Andina", ciudad: "Bogotá", dispositivo: "iPhone 15", fecha: "10 jun, 12:48" },
  { codigo: "QUIE-T8W5J3-50", producto: "Bolso Sabana", ciudad: "Medellín", dispositivo: "Samsung A55", fecha: "10 jun, 12:21" },
]

export const scansByDay = [
  { dia: "Mié", escaneos: 198 },
  { dia: "Jue", escaneos: 242 },
  { dia: "Vie", escaneos: 310 },
  { dia: "Sáb", escaneos: 415 },
  { dia: "Dom", escaneos: 388 },
  { dia: "Lun", escaneos: 276 },
  { dia: "Mar", escaneos: 312 },
]

export type Producto = {
  nombre: string
  categoria: string
  color: string
  estado: Estado
}

export const productos: Producto[] = [
  { nombre: "Billetera Andina", categoria: "Billeteras", color: "Terracota", estado: "activo" },
  { nombre: "Bolso Sabana", categoria: "Bolsos", color: "Arcilla", estado: "activo" },
  { nombre: "Tarjetero Páramo", categoria: "Tarjeteros", color: "Carbón", estado: "activo" },
  { nombre: "Llavero NFC", categoria: "Llaveros NFC", color: "Oro", estado: "activo" },
  { nombre: "Maletín Cordillera", categoria: "Maletines", color: "Café", estado: "inactivo" },
  { nombre: "Morral Tayrona", categoria: "Morrales", color: "Verde bosque", estado: "activo" },
  { nombre: "Cinturón Guane", categoria: "Cinturones", color: "Terracota", estado: "pendiente" },
  { nombre: "Cartera Muisca", categoria: "Carteras", color: "Arcilla", estado: "activo" },
]

export type Lote = {
  id: string
  producto: string
  fecha: string
  estado: Estado
  totalTags: number
}

export const lotes: Lote[] = [
  { id: "QUIE-BOL-2025-001", producto: "Bolso Sabana", fecha: "02 jun, 2025", estado: "completado", totalTags: 250 },
  { id: "QUIE-BIL-2025-014", producto: "Billetera Andina", fecha: "28 may, 2025", estado: "completado", totalTags: 500 },
  { id: "QUIE-TAR-2025-009", producto: "Tarjetero Páramo", fecha: "21 may, 2025", estado: "activo", totalTags: 300 },
  { id: "QUIE-LLV-2025-022", producto: "Llavero NFC", fecha: "18 may, 2025", estado: "activo", totalTags: 1000 },
  { id: "QUIE-MAL-2025-003", producto: "Maletín Cordillera", fecha: "10 may, 2025", estado: "pendiente", totalTags: 120 },
  { id: "QUIE-MOR-2025-007", producto: "Morral Tayrona", fecha: "05 may, 2025", estado: "completado", totalTags: 180 },
]

export type Codigo = {
  codigo: string
  lote: string
  producto: string
  estado: Estado
  url: string
}

export const codigos: Codigo[] = [
  { codigo: "QUIE-A7B3X9-42", lote: "QUIE-BIL-2025-014", producto: "Billetera Andina", estado: "activo", url: "quie.co/v/A7B3X9-42" },
  { codigo: "QUIE-ZD3PR5-24", lote: "QUIE-BOL-2025-001", producto: "Bolso Sabana", estado: "activo", url: "quie.co/v/ZD3PR5-24" },
  { codigo: "QUIE-K9M2T1-87", lote: "QUIE-TAR-2025-009", producto: "Tarjetero Páramo", estado: "activo", url: "quie.co/v/K9M2T1-87" },
  { codigo: "QUIE-X4N8L2-11", lote: "QUIE-LLV-2025-022", producto: "Llavero NFC", estado: "pendiente", url: "quie.co/v/X4N8L2-11" },
  { codigo: "QUIE-P2Q7R9-63", lote: "QUIE-MAL-2025-003", producto: "Maletín Cordillera", estado: "inactivo", url: "quie.co/v/P2Q7R9-63" },
  { codigo: "QUIE-B6V1H4-29", lote: "QUIE-BIL-2025-014", producto: "Billetera Andina", estado: "activo", url: "quie.co/v/B6V1H4-29" },
  { codigo: "QUIE-T8W5J3-50", lote: "QUIE-BOL-2025-001", producto: "Bolso Sabana", estado: "activo", url: "quie.co/v/T8W5J3-50" },
]

export const topProductos = [
  { nombre: "Billetera Andina", escaneos: 1284 },
  { nombre: "Bolso Sabana", escaneos: 982 },
  { nombre: "Tarjetero Páramo", escaneos: 734 },
  { nombre: "Llavero NFC", escaneos: 521 },
  { nombre: "Maletín Cordillera", escaneos: 318 },
]

export const topCiudades = [
  { ciudad: "Bogotá", escaneos: 1840 },
  { ciudad: "Medellín", escaneos: 1120 },
  { ciudad: "Cali", escaneos: 760 },
  { ciudad: "Cartagena", escaneos: 412 },
  { ciudad: "Fusagasugá", escaneos: 198 },
]
