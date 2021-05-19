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
const uuid_1 = require("uuid");
const index_js_1 = __importDefault(require("./repositories/index.js"));
const Client_size_vs_Server_side_1 = __importDefault(require("./noteTemplates/Client_size_vs_Server_side"));
const higher_order_component_1 = __importDefault(require("./noteTemplates/higher_order_component"));
const TypeScript_1 = __importDefault(require("./noteTemplates/TypeScript"));
const Dune_1 = __importDefault(require("./noteTemplates/Dune"));
const New_England_Aquarium_1 = __importDefault(require("./noteTemplates/New_England_Aquarium"));
const intro_1 = __importDefault(require("./noteTemplates/intro"));
const todos_1 = __importDefault(require("./noteTemplates/todos"));
const Bridgerton_1 = __importDefault(require("./noteTemplates/Bridgerton"));
const Joan_of_Arc_1 = __importDefault(require("./noteTemplates/Joan_of_Arc"));
const Queens_Gambit_1 = __importDefault(require("./noteTemplates/Queens_Gambit"));
const The_King_1 = __importDefault(require("./noteTemplates/The_King"));
const { createDir, getUserDirs, createContent, createNote, getUserNotes, } = index_js_1.default;
const ROOT = 'ROOT';
function initialization(user_id, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let isEmpty = true;
        yield Promise.all([
            getUserDirs(user_id),
            getUserNotes(user_id)
        ]).then((result) => {
            if (result[0].length > 0 || result[1].length > 0) {
                isEmpty = false;
                res.status(500).send('initialization failed!');
            }
        }, (err) => {
            res.status(500).send(err);
        });
        if (isEmpty) {
            const dir_id_1 = uuid_1.v4();
            const dir_id_2 = uuid_1.v4();
            const time = Date.now();
            const dir1 = {
                id: dir_id_1,
                user_id: user_id,
                notebook_name: "Movies & TV series",
                create_time: time,
                last_update: time,
            };
            const dir2 = {
                id: dir_id_2,
                user_id: user_id,
                notebook_name: "Front-end",
                create_time: time,
                last_update: time,
            };
            const content_id_0_1 = uuid_1.v4();
            const content_id_0_2 = uuid_1.v4();
            const content_id_0_3 = uuid_1.v4();
            const content_id_1_1 = uuid_1.v4();
            const content_id_1_2 = uuid_1.v4();
            const content_id_1_3 = uuid_1.v4();
            const content_id_1_4 = uuid_1.v4();
            const content_id_1_5 = uuid_1.v4();
            const content_id_2_1 = uuid_1.v4();
            const content_id_2_2 = uuid_1.v4();
            const content_id_2_3 = uuid_1.v4();
            const note_id_0_1 = uuid_1.v4();
            const note_id_0_2 = uuid_1.v4();
            const note_id_0_3 = uuid_1.v4();
            const note_id_1_1 = uuid_1.v4();
            const note_id_1_2 = uuid_1.v4();
            const note_id_1_3 = uuid_1.v4();
            const note_id_1_4 = uuid_1.v4();
            const note_id_1_5 = uuid_1.v4();
            const note_id_2_1 = uuid_1.v4();
            const note_id_2_2 = uuid_1.v4();
            const note_id_2_3 = uuid_1.v4();
            const content_0_1 = {
                id: content_id_0_1,
                user_id: user_id,
                text_value: intro_1.default,
                create_time: time,
                last_update: time,
            };
            const content_0_2 = {
                id: content_id_0_2,
                user_id: user_id,
                text_value: todos_1.default,
                create_time: time,
                last_update: time,
            };
            const content_0_3 = {
                id: content_id_0_3,
                user_id: user_id,
                text_value: New_England_Aquarium_1.default,
                create_time: time,
                last_update: time,
            };
            const content_2_1 = {
                id: content_id_2_1,
                user_id: user_id,
                text_value: Client_size_vs_Server_side_1.default,
                create_time: time,
                last_update: time,
            };
            const content_2_2 = {
                id: content_id_2_2,
                user_id: user_id,
                text_value: higher_order_component_1.default,
                create_time: time,
                last_update: time,
            };
            const content_2_3 = {
                id: content_id_2_3,
                user_id: user_id,
                text_value: TypeScript_1.default,
                create_time: time,
                last_update: time,
            };
            const content_1_1 = {
                id: content_id_1_1,
                user_id: user_id,
                text_value: Dune_1.default,
                create_time: time,
                last_update: time,
            };
            const content_1_2 = {
                id: content_id_1_2,
                user_id: user_id,
                text_value: Bridgerton_1.default,
                create_time: time,
                last_update: time,
            };
            const content_1_3 = {
                id: content_id_1_3,
                user_id: user_id,
                text_value: Joan_of_Arc_1.default,
                create_time: time,
                last_update: time,
            };
            const content_1_4 = {
                id: content_id_1_4,
                user_id: user_id,
                text_value: Queens_Gambit_1.default,
                create_time: time,
                last_update: time,
            };
            const content_1_5 = {
                id: content_id_1_5,
                user_id: user_id,
                text_value: The_King_1.default,
                create_time: time,
                last_update: time,
            };
            const note_0_1 = {
                id: note_id_0_1,
                user_id: user_id,
                parent_id: ROOT,
                content_id: content_id_0_1,
                title: 'Introduction',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_0_2 = {
                id: note_id_0_2,
                user_id: user_id,
                parent_id: ROOT,
                content_id: content_id_0_2,
                title: 'Todos',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_0_3 = {
                id: note_id_0_3,
                user_id: user_id,
                parent_id: ROOT,
                content_id: content_id_0_3,
                title: 'New England Aquarium',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_1_1 = {
                id: note_id_1_1,
                user_id: user_id,
                parent_id: dir_id_1,
                content_id: content_id_1_1,
                title: 'Dune',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_1_2 = {
                id: note_id_1_2,
                user_id: user_id,
                parent_id: dir_id_1,
                content_id: content_id_1_2,
                title: 'Brigerton',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_1_3 = {
                id: note_id_1_3,
                user_id: user_id,
                parent_id: dir_id_1,
                content_id: content_id_1_3,
                title: 'Joan of Arc',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_1_4 = {
                id: note_id_1_4,
                user_id: user_id,
                parent_id: dir_id_1,
                content_id: content_id_1_4,
                title: "Queen's Gambit",
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_1_5 = {
                id: note_id_1_5,
                user_id: user_id,
                parent_id: dir_id_1,
                content_id: content_id_1_5,
                title: 'The King',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_2_1 = {
                id: note_id_2_1,
                user_id: user_id,
                parent_id: dir_id_2,
                content_id: content_id_2_1,
                title: 'Client size vs Server side',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_2_2 = {
                id: note_id_2_2,
                user_id: user_id,
                parent_id: dir_id_2,
                content_id: content_id_2_2,
                title: 'higher order component',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            const note_2_3 = {
                id: note_id_2_3,
                user_id: user_id,
                parent_id: dir_id_2,
                content_id: content_id_2_3,
                title: 'TypeScript',
                type: 'MD',
                create_time: time,
                last_update: time,
            };
            yield Promise.all([
                createDir(dir1),
                createDir(dir2),
                createContent(content_0_1),
                createNote(note_0_1),
                createContent(content_0_2),
                createNote(note_0_2),
                createContent(content_0_3),
                createNote(note_0_3),
                createContent(content_1_1),
                createNote(note_1_1),
                createContent(content_1_2),
                createNote(note_1_2),
                createContent(content_1_3),
                createNote(note_1_3),
                createContent(content_1_4),
                createNote(note_1_4),
                createContent(content_1_5),
                createNote(note_1_5),
                createContent(content_2_1),
                createNote(note_2_1),
                createContent(content_2_2),
                createNote(note_2_2),
                createContent(content_2_3),
                createNote(note_2_3),
            ]).then(() => {
                res.send('initialization completed!');
            }, (err) => {
                res.status(500).send(err);
            });
        }
    });
}
exports.default = initialization;
//# sourceMappingURL=initialization.js.map