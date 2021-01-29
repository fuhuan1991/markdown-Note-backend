const tableName = "user";

interface USER {
  id: string,
  nickname: string,
  email: string,
}

interface GET_USER_RESULT {
  Item: USER,
}

interface UPDATE_USER_RESULT {
  Attributes: {
    nickname: string,
    email: string,
  }
}

function createUser(docClient, user: USER): Promise<USER> {

  const { id, nickname, email } = user;

  const params = {
    TableName: tableName,
    Item: { id, nickname, email }
  };

  console.log("Adding a new item...");

  return new Promise((resolve, reject) => {
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to create. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        console.log("Create succeeded.");
        resolve(user);
      }
    });
  });
}

function getUserById(docClient, id: string): Promise<USER> {

  const params = {
    TableName : tableName,
    Key:{
      "id": id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data: GET_USER_RESULT) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        console.log("Query succeeded.");
        console.log(data);
        resolve(data.Item);
      }
    });
  });
}

function updateUser(docClient, user: USER): Promise<USER> {

  const { id, nickname, email } = user;

  const params = {
    TableName : tableName,
    Key:{
      "id": id,
    },
    UpdateExpression: "set nickname = :nickname, email = :email",
    ExpressionAttributeValues:{
      ":nickname": nickname,
      ":email": email,
    },
    ReturnValues:"UPDATED_NEW",
  };

  console.log("Updating an item...");

  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data: UPDATE_USER_RESULT) {
      if (err) {
        console.error("Unable to Update. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        console.log("Update succeeded.");
        console.log(data);
        resolve(user);
      }
    });
  });
}

function deleteUserById(docClient, id: string): Promise<string>  {

  const params = {
    TableName : tableName,
    Key:{
      "id": id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.delete(params, function(err, data) {
      if (err) {
        console.error("Unable to delete. Error:", JSON.stringify(err, null, 2));
        reject();
      } else {
        console.log("successfully deleted");
        resolve('successfully deleted');
      }
    });
  });
}

export default {
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};