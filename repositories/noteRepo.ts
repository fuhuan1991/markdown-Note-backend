const tableName = "note";

interface NOTE {
  id: string,
  user_id: string,
  parent_id: string,
  content_id: string,
  title: string,
  type: NOTE_TYPE,
  create_time: number,
  last_update: number,
}

enum NOTE_TYPE {
  Normal,
  MD,
}

interface GET_NOTE_RESULT {
  Item: NOTE,
}

interface SCAN_NOTE_RESULT {
  Items: Array<NOTE>,
  Count: number,
  ScannedCount: number
}

interface UPDATE_NOTE_RESULT {
  Attributes: {
    
  }
}

function createNote(docClient, note: NOTE): Promise<NOTE> {

  const { id, user_id, parent_id, content_id, title, type, create_time, last_update } = note;

  const params = {
    TableName: tableName,
    Item: { id, user_id, parent_id, content_id, title, type, create_time, last_update },
  };

  console.log("Adding a new item...");

  return new Promise((resolve, reject) => {
    docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to create. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Create succeeded.");
        resolve(note);
      }
    });
  });
}

function getNoteById(docClient, id: string): Promise<NOTE> {

  const params = {
    TableName : tableName,
    Key:{
      "id": id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data: GET_NOTE_RESULT) {
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

function getNotesInDir(docClient, user_id: string, parent_id: string): Promise<Array<NOTE>> {
  const params = {
    TableName : tableName,
    FilterExpression: "#user_id = :user_id and #parent_id = :parent_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
      "#parent_id": "parent_id",
    },
    ExpressionAttributeValues: {
      ":user_id": user_id,
      ":parent_id": parent_id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data: SCAN_NOTE_RESULT) {
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

function getNotesInDirByTitle(docClient, user_id: string, parent_id: string, title: string): Promise<Array<NOTE>> {
  const params = {
    TableName : tableName,
    FilterExpression: "#user_id = :user_id and #parent_id = :parent_id and #title = :title",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
      "#parent_id": "parent_id",
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":user_id": user_id,
      ":parent_id": parent_id,
      ":title": title
    }
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data: SCAN_NOTE_RESULT) {
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

function getUserNotes(docClient, user_id: string): Promise<Array<NOTE>> {
  const params = {
    TableName : tableName,
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
      ":user_id": user_id,
    }
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, function(err, data: SCAN_NOTE_RESULT) {
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

function updateNote(docClient, note: NOTE): Promise<NOTE> {

  const { id, title, last_update } = note;

  const params = {
    TableName : tableName,
    Key: {
      "id": id,
    },
    UpdateExpression: "set title = :title, last_update = :last_update",
    ExpressionAttributeValues: {
      ":title": title,
      ":last_update": last_update,
    },
    ReturnValues:"UPDATED_NEW",
  };

  console.log("Updating an item...");

  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data: UPDATE_NOTE_RESULT) {
      if (err) {
        console.error("Unable to Update. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Update succeeded.");
        resolve(note);
      }
    });
  });
}

function deleteNoteById(docClient, id: string): Promise<string>  {

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
  createNote,
  getNoteById,
  getNotesInDir,
  getNotesInDirByTitle,
  getUserNotes,
  updateNote,
  deleteNoteById,
}