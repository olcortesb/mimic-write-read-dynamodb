const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

const getDynamoClient = () =>{
    const dynamoLocal = (process.env.DYNAMO_DB_USE_LOCAL == 'True');

    if (dynamoLocal == true) {
        return new DynamoDBClient({
            region: process.env.DYNAMO_DB_REGION,
            endpoint: process.env.DYNAMO_DB_END_POINT,
        });
    }
    //if (client ){ return client}
    return new DynamoDBClient({ region: process.env.DYNAMO_DB_REGION });
};

const getDBDocumentClient = () =>{
    const clientDb = getDynamoClient();

    const marshallOptions = {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false, by default.
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: true, // false, by default.
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: false, // false, by default.
    };

    const unmarshallOptions = {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false, // false, by default.
    };

    const ddbDocClient = DynamoDBDocumentClient.from(clientDb, {
        marshallOptions,
        unmarshallOptions,
    });

    return ddbDocClient;

};

module.exports = {getDynamoClient,getDBDocumentClient} ;

