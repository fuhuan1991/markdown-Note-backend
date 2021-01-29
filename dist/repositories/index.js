"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const userRepo_1 = __importDefault(require("./userRepo"));
const dirRepo_1 = __importDefault(require("./dirRepo"));
const noteRepo_1 = __importDefault(require("./noteRepo"));
const contentRepo_1 = __importDefault(require("./contentRepo"));
const config_1 = __importDefault(require("../config"));
const { AWSConfig } = config_1.default;
aws_sdk_1.default.config.update(AWSConfig);
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
const { getUserById, createUser, updateUser, deleteUserById, } = userRepo_1.default;
const { createDir, getDirById, getUserDirs, updateDir, deleteDirById, getDirsByName, } = dirRepo_1.default;
const { createNote, getNoteById, getNotesInDir, getNotesInDirByTitle, updateNote, } = noteRepo_1.default;
const { createContent, getContentById, updateContent, deleteContentById } = contentRepo_1.default;
exports.default = {
    getUserById: getUserById.bind(this, docClient),
    createUser: createUser.bind(this, docClient),
    updateUser: updateUser.bind(this, docClient),
    deleteUserById: deleteUserById.bind(this, docClient),
    createDir: createDir.bind(this, docClient),
    getDirById: getDirById.bind(this, docClient),
    getUserDirs: getUserDirs.bind(this, docClient),
    updateDir: updateDir.bind(this, docClient),
    deleteDirById: deleteDirById.bind(this, docClient),
    getDirsByName: getDirsByName.bind(this, docClient),
    createNote: createNote.bind(this, docClient),
    getNoteById: getNoteById.bind(this, docClient),
    getNotesInDir: getNotesInDir.bind(this, docClient),
    getNotesInDirByTitle: getNotesInDirByTitle.bind(this, docClient),
    updateNote: updateNote.bind(this, docClient),
    createContent: createContent.bind(this, docClient),
    getContentById: getContentById.bind(this, docClient),
    updateContent: updateContent.bind(this, docClient),
    deleteContentById: deleteContentById.bind(this, docClient),
};
//# sourceMappingURL=index.js.map