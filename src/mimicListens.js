'use strict';

const dynamoService = require('./services/dbServices.js');
const { SCHEMAS_NAMES, schemaValidate } = require('./validations/index.js');

exports.lambdaHandler = async (event, context) => {
    try {
        const { path, queryStringParameters, headers, body } = event;

        const objectBody = JSON.parse(body);
        //await schemaValidate(SCHEMAS_NAMES.IN, objectBody);

        const id = await dynamoService.createBodyResponse(objectBody);

        return {
            'statusCode': 200,
            'body': id
        };
    } catch (err) {
        console.log('End request with error!');
        console.log(err);
        return { 'statusCode': 500 };
    };
};