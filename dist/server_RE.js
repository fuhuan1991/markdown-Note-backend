"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./repositories/index.js"));
const config_1 = __importDefault(require("./config"));
const initialNote_1 = __importDefault(require("./noteTemplates/initialNote"));
const initialization_js_1 = __importDefault(require("./initialization.js"));
const app = express_1.default();
const { PORT } = config_1.default;
const { getUserById, createUser, updateUser, deleteUserById, createDir, getDirById, getUserDirs, updateDir, deleteDirById, getDirsByName, createContent, getContentById, updateContent, deleteContentById, createNote, getNoteById, getNotesInDir, getNotesInDirByTitle, getUserNotes, updateNote, deleteNoteById, } = index_js_1.default;
const ROOT = 'ROOT';
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/', (req, res) => res.send('Welcome!'));
// get a user by id
app.get('/api/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield getUserById(id);
    res.send(result);
}));
// create a new user
app.post('/api/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield createUser(req.body);
    res.send(result);
}));
// update a user
app.put('/api/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield updateUser(req.body);
    res.send(result);
}));
// delete a user
app.delete('/api/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield deleteUserById(id);
    res.send(result);
}));
// create a new dir
app.post('/api/dir', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const notebook_name = req.body.notebook_name;
    const user_id = req.body.user_id;
    const replica = yield getDirsByName(user_id, notebook_name);
    if (replica.length > 0) {
        res.status(500).send('Name Duplication!');
    }
    else {
        const id = uuid_1.v4();
        const time = Date.now();
        const data = Object.assign({}, req.body, { id: id, create_time: time, last_update: time });
        createDir(data).then((result) => {
            res.send(result);
        }, (err) => {
            res.status(500).send(err);
        });
    }
}));
// get a dir by id
app.get('/api/dir/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    getDirById(id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// get a list of dirs by user id
app.get('/api/user_dir/:user_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    getUserDirs(user_id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// update a dir
app.put('/api/dir', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const notebook_name = req.body.notebook_name;
    const user_id = req.body.user_id;
    const replica = yield getDirsByName(user_id, notebook_name);
    if (replica.length > 0) {
        res.status(500).send('Name Duplication!');
    }
    else {
        const time = Date.now();
        const data = Object.assign({}, req.body, { last_update: time });
        updateDir(data).then((result) => {
            res.send(result);
        }, (err) => {
            res.status(500).send(err);
        });
    }
}));
// delete a dir
app.delete('/api/dir/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const dir = yield getDirById(id).then((result) => result, (err) => {
        res.status(500).send(err);
    });
    const user_id = dir.user_id;
    const notes = yield getNotesInDir(user_id, id).then((result) => result, (err) => {
        res.status(500).send(err);
    });
    for (let note of notes) {
        yield deleteNoteAndContent(note.id, res);
    }
    deleteDirById(id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// create a new note
app.post('/api/note', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const note_id = uuid_1.v4();
    const content_id = uuid_1.v4();
    const time = Date.now();
    const parent_id = !!req.body.parent_id ? req.body.parent_id : ROOT;
    const user_id = req.body.user_id;
    const title = req.body.title;
    const text_value = `# ${title}\n---------------` + '\n' + initialNote_1.default;
    const replica = yield getNotesInDirByTitle(user_id, parent_id, title);
    if (replica.length > 0) {
        res.status(500).send('Name Duplication!');
    }
    else {
        const content = {
            id: content_id,
            user_id: user_id,
            text_value: text_value,
            create_time: time,
            last_update: time,
        };
        const note = {
            id: note_id,
            user_id: user_id,
            parent_id: parent_id,
            content_id: content_id,
            title: title,
            type: 'MD',
            create_time: time,
            last_update: time,
        };
        yield Promise.all([
            createContent(content),
            createNote(note)
        ]).then((result) => {
            res.send(note);
        }, (err) => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}));
// get a note by id
app.get('/api/note/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    getNoteById(id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// get notes in a notebook
app.get('/api/note/:user_id/:parent_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    const parent_id = req.params.parent_id;
    getNotesInDir(user_id, parent_id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// update a note
app.put('/api/note', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const parent_id = !!req.body.parent_id ? req.body.parent_id : ROOT;
    const user_id = req.body.user_id;
    const title = req.body.title;
    const replica = yield getNotesInDirByTitle(user_id, parent_id, title);
    if (replica.length > 0) {
        res.status(500).send('Name Duplication!');
    }
    else {
        const time = Date.now();
        const data = Object.assign({}, req.body, { last_update: time });
        updateNote(data).then((result) => {
            res.send(result);
        }, (err) => {
            res.status(500).send(err);
        });
    }
}));
// delete a note
app.delete('/api/note/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield deleteNoteAndContent(id, res);
    res.send(result);
}));
function deleteNoteAndContent(id, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield getNoteById(id).then(result => result, (err) => {
            res.status(500).send(err);
        });
        const content_id = note.content_id;
        yield deleteContentById(content_id).then(result => result, (err) => {
            res.status(500).send(err);
        });
        const result = yield deleteNoteById(id).then(result => result, (err) => {
            res.status(500).send(err);
        });
        return result;
    });
}
// create a new content
app.post('/api/content', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = uuid_1.v4();
    const time = Date.now();
    const data = Object.assign({}, req.body, { id: id, create_time: time, last_update: time });
    createContent(data).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// get a content by id
app.get('/api/content/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    getContentById(id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// update a content
app.put('/api/content', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const time = Date.now();
    const data = Object.assign({}, req.body, { last_update: time });
    updateContent(data).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// delete a content
app.delete('/api/content/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    deleteContentById(id).then((result) => {
        res.send(result);
    }, (err) => {
        res.status(500).send(err);
    });
}));
// get menu data for a user
app.get('/api/menu/:user_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    yield Promise.all([
        getUserDirs(user_id),
        getUserNotes(user_id)
    ]).then((result) => {
        res.send({
            notebooks: result[0],
            notes: result[1],
        });
    }, (err) => {
        res.status(500).send(err);
    });
}));
// initialize a user account
app.get('/api/initialize/:user_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user_id = req.params.user_id;
    initialization_js_1.default(user_id, res);
}));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
//# sourceMappingURL=server_RE.js.map