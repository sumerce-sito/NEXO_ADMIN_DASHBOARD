import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const TABLE = process.env.DYNAMODB_TABLE_ESCANEOS ?? 'quie_escaneos';

let _client: DynamoDBDocumentClient | null = null;

function getClient(): DynamoDBDocumentClient {
  if (!_client) {
    const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'us-east-2' });
    _client = DynamoDBDocumentClient.from(dynamo);
  }
  return _client;
}

export interface EscaneoItem {
  codigo_id: string;
  timestamp: string;
  ip: string;
  ciudad: string;
  dispositivo: string;
  pais: string;
}

export async function registrarEscaneo(
  data: Omit<EscaneoItem, 'timestamp'>
): Promise<string> {
  const timestamp = new Date().toISOString();
  await getClient().send(
    new PutCommand({ TableName: TABLE, Item: { ...data, timestamp } })
  );
  return timestamp;
}

export async function getTopCiudades(limit = 5): Promise<{ ciudad: string; escaneos: number }[]> {
  const counts = new Map<string, number>();
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await getClient().send(
      new ScanCommand({
        TableName: TABLE,
        ProjectionExpression: 'ciudad',
        ExclusiveStartKey: lastKey,
      })
    );
    for (const item of result.Items ?? []) {
      const ciudad = (item as { ciudad?: string }).ciudad || 'Desconocida';
      counts.set(ciudad, (counts.get(ciudad) ?? 0) + 1);
    }
    lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
  } while (lastKey);

  return [...counts.entries()]
    .map(([ciudad, escaneos]) => ({ ciudad, escaneos }))
    .sort((a, b) => b.escaneos - a.escaneos)
    .slice(0, limit);
}

export async function getEscaneosCodigo(
  codigo_id: string,
  limit = 20
): Promise<EscaneoItem[]> {
  const result = await getClient().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'codigo_id = :id',
      ExpressionAttributeValues: { ':id': codigo_id },
      ScanIndexForward: false,
      Limit: limit,
    })
  );
  return (result.Items ?? []) as EscaneoItem[];
}
