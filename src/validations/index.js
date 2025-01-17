const Schemy = require('schemy');

const { ValidationError } = require('../errors/validations');

const nameSchema = {
    type: String, // TODO regex
    min: 5,
    required: true,
};

const versionSchema = {
    type: String,
    min: 3,
    required: true,
};

const refSchema = {
    type: Number,
    min: 100,
    max: 200,
    require: true
};

const descSchema = {
    type: String,
    min: 10,
    require: false
};

const idSchema = {
    type: String,
    min: 30
};

const SCHEMAS_NAMES = {
    IN: 'in-info',
    OUT: 'out-info'
};

const SCHEMAS = {
    [SCHEMAS_NAMES.IN]: {
        name: nameSchema,
        version: versionSchema,
        ref: refSchema,
        desc: descSchema
    },
    [SCHEMAS_NAMES.OUT]: {
        id: idSchema,
        body:{
            name: nameSchema,
            version: versionSchema,
            ref: refSchema,
            desc: descSchema
        }
    }
};

const schemaValidate = async (schemaName, data = {}) => {
    try {
        await Schemy.validate(data, new Schemy(SCHEMAS[schemaName]));
    } catch (error) {
        const message = Array.isArray(error) ? error.join('. ') : error.message;
        throw new ValidationError(null, message);
    }
};

module.exports = {
    SCHEMAS_NAMES,
    schemaValidate,
};
