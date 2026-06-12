import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

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
