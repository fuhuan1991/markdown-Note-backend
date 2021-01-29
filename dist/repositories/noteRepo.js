"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableName = "note";
var NOTE_TYPE;
(function (NOTE_TYPE) {
    NOTE_TYPE[NOTE_TYPE["Normal"] = 0] = "Normal";
    NOTE_TYPE[NOTE_TYPE["MD"] = 1] = "MD";
})(NOTE_TYPE || (NOTE_TYPE = {}));
function createNote(docClient, note) {
    const { id, user_id, parent_id, content_id, title, type, create_time, last_update } = note;
    const params = {
        TableName: tableName,
        Item: { id, user_id, parent_id, content_id, title, type, create_time, last_update },
    };
    console.log("Adding a new item...");
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to create. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Create succeeded.");
                resolve(note);
            }
        });
    });
}
function getNoteById(docClient, id) {
    const params = {
        TableName: tableName,
        Key: {
            "id": id,
        }
    };
    return new Promise((resolve, reject) => {
        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Query succeeded.");
                resolve(data.Item);
            }
        });
    });
}
function getNotesInDir(docClient, user_id, parent_id) {
    const params = {
        TableName: tableName,
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
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Query succeeded.");
                resolve(data.Items);
            }
        });
    });
}
function getNotesInDirByTitle(docClient, user_id, parent_id, title) {
    const params = {
        TableName: tableName,
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
        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Query succeeded.");
                resolve(data.Items);
            }
        });
    });
}
function updateNote(docClient, note) {
    const { id, title, last_update } = note;
    const params = {
        TableName: tableName,
        Key: {
            "id": id,
        },
        UpdateExpression: "set title = :title, last_update = :last_update",
        ExpressionAttributeValues: {
            ":title": title,
            ":last_update": last_update,
        },
        ReturnValues: "UPDATED_NEW",
    };
    console.log("Updating an item...");
    return new Promise((resolve, reject) => {
        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to Update. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Update succeeded.");
                resolve(note);
            }
        });
    });
}
exports.default = {
    createNote,
    getNoteById,
    getNotesInDir,
    getNotesInDirByTitle,
    updateNote,
};
//# sourceMappingURL=noteRepo.js.map