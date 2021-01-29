"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableName = "content";
function createContent(docClient, content) {
    const { id, user_id, text_value, create_time, last_update } = content;
    const params = {
        TableName: tableName,
        Item: { id, user_id, text_value, create_time, last_update },
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
                resolve(content);
            }
        });
    });
}
function getContentById(docClient, id) {
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
                console.log(data);
                resolve(data.Item);
            }
        });
    });
}
function updateContent(docClient, content) {
    const { id, text_value, last_update } = content;
    const params = {
        TableName: tableName,
        Key: {
            "id": id,
        },
        UpdateExpression: "set text_value = :text_value, last_update = :last_update",
        ExpressionAttributeValues: {
            ":text_value": text_value,
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
                console.log(data);
                resolve(content);
            }
        });
    });
}
function deleteContentById(docClient, id) {
    const params = {
        TableName: tableName,
        Key: {
            "id": id,
        }
    };
    return new Promise((resolve, reject) => {
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("successfully deleted");
                resolve('successfully deleted');
            }
        });
    });
}
exports.default = {
    createContent: createContent,
    getContentById: getContentById,
    updateContent: updateContent,
    deleteContentById: deleteContentById
};
//# sourceMappingURL=contentRepo.js.map