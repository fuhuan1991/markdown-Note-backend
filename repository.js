const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();

function getMusicBArtist(name) {

    const params = {
        TableName : "Music",
        KeyConditionExpression: "#attr = :value",
        ExpressionAttributeNames:{
            "#attr": "Artist"
        },
        ExpressionAttributeValues: {
            ":value": name
        }
    };

    return new Promise((resolve, reject) => {
        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject();
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    console.log(" -", item.Artist + ": " + item.SongTitle);
                });
                resolve(data);
            }
        });
    });
}


module.exports = {
    getMusicBArtist: getMusicBArtist,
};