import { NextRequest, NextResponse } from 'next/server';
import { registrarEscaneo } from '@/lib/dynamodb';

const CODIGO_RE = /^QUIE-[A-Z0-9]{6}-[0-9]{2}$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const { codigo_id, ip, ciudad, dispositivo, pais } = body as Record<string, string>;

  if (!CODIGO_RE.test(codigo_id ?? '')) {
    return NextResponse.json({ error: 'Código inválido' }, { status: 400 });
  }

  if (!process.env.DYNAMODB_TABLE_ESCANEOS) {
    return NextResponse.json({ error: 'DynamoDB no configurado' }, { status: 503 });
  }

  try {
    const timestamp = await registrarEscaneo({
      codigo_id,
      ip: ip ?? '',
      ciudad: ciudad ?? 'Desconocida',
      dispositivo: dispositivo ?? 'Otro',
      pais: pais ?? 'Colombia',
    });
    return NextResponse.json({ ok: true, timestamp });
  } catch (err) {
    console.error('[SCAN_DYNAMO]', err);
    return NextResponse.json({ error: 'Error registrando escaneo' }, { status: 500 });
  }
}
