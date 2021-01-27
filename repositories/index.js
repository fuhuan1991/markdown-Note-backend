const AWS = require("aws-sdk");
const userOperations = require("./userRepo");
const config = require("../config");

const { AWSConfig } = config;

AWS.config.update(AWSConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const { getUserById } = userOperations;

module.exports = {
    getUserById: getUserById.bind(this, docClient),
};