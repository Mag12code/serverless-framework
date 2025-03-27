import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateItem } from '../utils/dynamodb';
import { UpdateItemRequest, ApiResponse } from '../types';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.pathParameters?.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing id parameter' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing request body' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const updates: UpdateItemRequest = JSON.parse(event.body);
    const result = await updateItem(event.pathParameters.id, updates);

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    const response: ApiResponse<typeof result> = {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    return response;
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
}; 