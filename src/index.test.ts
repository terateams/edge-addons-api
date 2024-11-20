import { expect, test } from "@jest/globals"
import { NextEdgeWebstoreClient } from './index';
import dotenv from 'dotenv';

dotenv.config();

const productId = process.env.EDGE_ADDON_PRODUCT_ID || '';
const clientId = process.env.EDGE_ADDON_CLIENT_ID || '';
const apiKey = process.env.EDGE_ADDON_API_KEY || '';
const remark = process.env.EDGE_ADDON_REMARK || '';

test('submit edge eddon', async () => {
  const client = new NextEdgeWebstoreClient(apiKey, clientId, productId);
  const result = await client.submit('test.zip', remark);
  expect(result).toBeDefined();
});