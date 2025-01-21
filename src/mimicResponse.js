'use strict';

const dynamoService = require('./services/dbServices.js');
const { SCHEMAS_NAMES, schemaValidate } = require('./validations/index.js');

exports.lambdaHandler = async (event, context) => {
    try {
        const { pathParameters, queryStringParameters, headers, body } = event;

        const id = pathParameters.id;
        const bodyResponse = await dynamoService.getBodyResponse(id);

        //await schemaValidate(SCHEMAS_NAMES.OUT, bodyResponse);

        return {
            'statusCode': 200,
            'body': JSON.stringify(bodyResponse)
        };
    } catch (err) {
        console.log('End request with error!');
        console.log(err);
        return { 'statusCode': 500 };
    }
};