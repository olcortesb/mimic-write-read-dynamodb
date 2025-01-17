const dynamoClient = require('../clients/dbClient.js');
require('dotenv').config();

const {ScanCommand, BatchWriteItemCommand} = require("@aws-sdk/client-dynamodb");
const {marshall, unmarshall} = require("@aws-sdk/util-dynamodb");
const {PutCommand, GetCommand} = require("@aws-sdk/lib-dynamodb");

const crypto = require('crypto');

const createBodyResponse = async (body) => {
    const ddbDocClient = dynamoClient.getDBDocumentClient();

    const bodyRespnose = {
        id: crypto.randomUUID(),
        body: body
    };

    const putItem = async () => {
        const params = {
            TableName: process.env.MIMIC_TABLE,
            Item: bodyRespnose
        };
        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            //console.log("Success - item added or updated", data);
        } catch (err) {
            console.log("Error", err.stack);
        }
    };
    await putItem();
    return bodyRespnose.id;
};

const getBodyResponse = async (id) => {
    const ddbDocClient = dynamoClient.getDBDocumentClient();

    const params = {
        TableName: process.env.MIMIC_TABLE,
        Key: {
            id: id
        }
    };

    try {
        const data = await ddbDocClient.send(new GetCommand(params));
        //console.log("Success : user found", data.Item);
        if (data.Item) {
            return data.Item;
        };

    } catch (err) {
        console.log("Error", err);
    }
    return null;
};

module.exports = {createBodyResponse, getBodyResponse};