

const tableName = "user";

function getUserById(docClient, id) {

  const params = {
    TableName : tableName,
    KeyConditionExpression: "#attr = :value",
    ExpressionAttributeNames:{
        "#attr": "id"
    },
    ExpressionAttributeValues: {
        ":value": id
    }
  };

  return new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        console.log("Query succeeded.");
        console.log(data);
        // data.Items.forEach(function(item) {
        //   console.log(" -", item.Artist + ": " + item.SongTitle);
        // });
        resolve(data);
      }
    });
  });
}

module.exports = {
  getUserById: getUserById,
};