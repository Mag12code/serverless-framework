import { DynamoDB } from 'aws-sdk';
import { Item, CreateItemRequest, UpdateItemRequest } from '../types';

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMODB_TABLE!;

export const createItem = async (item: CreateItemRequest): Promise<Item> => {
  const timestamp = new Date().toISOString();
  const newItem: Item = {
    id: Math.random().toString(36).substring(2, 15),
    name: item.name,
    description: item.description,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await dynamoDb.put({
    TableName: TABLE_NAME,
    Item: newItem,
  }).promise();

  return newItem;
};

export const getItem = async (id: string): Promise<Item | null> => {
  const result = await dynamoDb.get({
    TableName: TABLE_NAME,
    Key: { id },
  }).promise();

  return result.Item as Item || null;
};

export const listItems = async (): Promise<Item[]> => {
  const result = await dynamoDb.scan({
    TableName: TABLE_NAME,
  }).promise();

  return result.Items as Item[];
};

export const updateItem = async (id: string, updates: UpdateItemRequest): Promise<Item | null> => {
  const timestamp = new Date().toISOString();
  const updateExpressions: string[] = [];
  const expressionAttributeNames: { [key: string]: string } = {};
  const expressionAttributeValues: { [key: string]: any } = {};

  if (updates.name !== undefined) {
    updateExpressions.push('#name = :name');
    expressionAttributeNames['#name'] = 'name';
    expressionAttributeValues[':name'] = updates.name;
  }

  if (updates.description !== undefined) {
    updateExpressions.push('#description = :description');
    expressionAttributeNames['#description'] = 'description';
    expressionAttributeValues[':description'] = updates.description;
  }

  updateExpressions.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  expressionAttributeValues[':updatedAt'] = timestamp;

  const result = await dynamoDb.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes as Item || null;
};

export const deleteItem = async (id: string): Promise<boolean> => {
  await dynamoDb.delete({
    TableName: TABLE_NAME,
    Key: { id },
  }).promise();

  return true;
}; 