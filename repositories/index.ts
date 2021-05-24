import AWS from 'aws-sdk';
import userOperations from './userRepo';
import dirOperations from './dirRepo';
import noteOperations from './noteRepo';
import contentOperations from './contentRepo';
import config from '../config';

// The Repositories folder stores all sorts of functions for DynamoDB

const { AWSConfig } = config;

AWS.config.update(AWSConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const {
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} = userOperations;

const {
  createDir,
  getDirById,
  getUserDirs,
  updateDir,
  deleteDirById,
  getDirsByName,
} = dirOperations;

const {
  createNote,
  getNoteById,
  getNotesInDir,
  getNotesInDirByTitle,
  getUserNotes,
  updateNote,
  deleteNoteById,
} = noteOperations;

const {
  createContent,
  getContentById,
  updateContent,
  deleteContentById
} = contentOperations;

export default {
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
  getUserNotes: getUserNotes.bind(this, docClient),
  updateNote: updateNote.bind(this, docClient),
  createContent: createContent.bind(this, docClient),
  getContentById: getContentById.bind(this, docClient),
  updateContent: updateContent.bind(this, docClient),
  deleteContentById: deleteContentById.bind(this, docClient),
  deleteNoteById: deleteNoteById.bind(this, docClient),
};