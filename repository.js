var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function getMusicBArtist(name) {
    var params = {
        TableName : "Music",
        KeyConditionExpression: "#attr = :value",
        ExpressionAttributeNames:{
            "#attr": "Artist"
        },
        ExpressionAttributeValues: {
            ":value": name
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.Artist + ": " + item.SongTitle);
            });
        }
    });

}


module.exports = {
    getMusicBArtist: getMusicBArtist,
};