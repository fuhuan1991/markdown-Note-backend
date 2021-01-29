const tableName = "dir";

interface DIRECTORY {
  id: string,
  user_id: string,
  notebook_name: string,
  create_time: number,
  last_update: number,
}

interface GET_DIRECTORY_RESULT {
  Item: DIRECTORY,
}

interface SCAN_DIRECTORY_RESULT {
  Items: Array<DIRECTORY>,
  Count: number,
  ScannedCount: number
}


interface UPDATE_DIRECTORY_RESULT {
  Attributes: {
    last_update: number,
    notebook_name: string,
  }
}

function createDir(docClient, dir: DIRECTORY): Promise<DIRECTORY> {

  const { id, user_id, notebook_name, create_time, last_update } = dir;

  const params = {
    TableName: tableName,
    Item: { id, user_id, notebook_name, create_time, last_update },
  };

  console.log("Adding a new item...");

  return new Promise((resolve, reject) => {
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to create. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Create succeeded.");
        resolve(dir);
      }
    });
  });
}

function getDirById(docClient, id: string): Promise<DIRECTORY> {

  const params = {
    TableName : tableName,
    Key:{
      "id": id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data: GET_DIRECTORY_RESULT) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        resolve(data.Item);
      }
    });
  });
}

function getUserDirs(docClient, user_id: string): Promise<Array<DIRECTORY>> {
  const params = {
    TableName : tableName,
    FilterExpression: "#attr = :value",
    ExpressionAttributeNames: {
        "#attr": "user_id",
    },
    ExpressionAttributeValues: {
         ":value": user_id
    }
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data: SCAN_DIRECTORY_RESULT) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
}

function getDirsByName(docClient, user_id: string, notebook_name: string): Promise<Array<DIRECTORY>> {
  const params = {
    TableName : tableName,
    FilterExpression: "user_id = :user_id and notebook_name = :notebook_name",
    ExpressionAttributeValues: {
         ":user_id": user_id,
         ":notebook_name": notebook_name,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data: SCAN_DIRECTORY_RESULT) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        resolve(data.Items);
      }
    });
  });
}

function updateDir(docClient, dir: DIRECTORY): Promise<DIRECTORY> {

  const { id, notebook_name, last_update } = dir;

  const params = {
    TableName : tableName,
    Key: {
      "id": id,
    },
    UpdateExpression: "set notebook_name = :notebook_name, last_update = :last_update",
    ExpressionAttributeValues: {
      ":notebook_name": notebook_name,
      ":last_update": last_update,
    },
    ReturnValues:"UPDATED_NEW",
  };

  console.log("Updating an item...");

  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data: UPDATE_DIRECTORY_RESULT) {
      if (err) {
        console.error("Unable to Update. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Update succeeded.");
        resolve(dir);
      }
    });
  });
}

function deleteDirById(docClient, id: string): Promise<string>  {

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
        reject(err);
      } else {
        console.log("successfully deleted");
        resolve('successfully deleted');
      }
    });
  });
}


export default {
  createDir: createDir,
  getDirById: getDirById,
  getUserDirs: getUserDirs,
  updateDir: updateDir,
  deleteDirById: deleteDirById,
  getDirsByName: getDirsByName,
}