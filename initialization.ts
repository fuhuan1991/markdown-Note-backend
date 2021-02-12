import { v4 as uuidv4 } from 'uuid';
import dataOperations from './repositories/index.js';
import Client_size_vs_Server_side from './noteTemplates/Client_size_vs_Server_side';
import higher_order_component from './noteTemplates/higher_order_component';
import TypeScript from './noteTemplates/TypeScript';
import Dune from './noteTemplates/Dune';
import New_England_Aquarium from './noteTemplates/New_England_Aquarium';
import intro from './noteTemplates/intro';
import todos from './noteTemplates/todos';
import Bridgerton from './noteTemplates/Bridgerton';
import Joan_of_Arc from './noteTemplates/Joan_of_Arc';
import Queens_Gambit from './noteTemplates/Queens_Gambit';
import The_King from './noteTemplates/The_King';

const {
  createDir,
  getUserDirs,
  createContent,
  createNote,
  getUserNotes,
} = dataOperations;
const ROOT = 'ROOT';

async function initialization(user_id, res) {

  let isEmpty = true;

  await Promise.all([
    getUserDirs(user_id),
    getUserNotes(user_id)
  ]).then(
    (result) => {
      if (result[0].length > 0 || result[1].length > 0) {
        isEmpty = false;
        res.status(500).send('initialization failed!');
      }
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
  
  if (isEmpty) {
    
    const dir_id_1 = uuidv4();
    const dir_id_2 = uuidv4();
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

    const content_id_0_1 = uuidv4();
    const content_id_0_2 = uuidv4();
    const content_id_0_3 = uuidv4();
    const content_id_1_1 = uuidv4();
    const content_id_1_2 = uuidv4();
    const content_id_1_3 = uuidv4();
    const content_id_1_4 = uuidv4();
    const content_id_1_5 = uuidv4();
    const content_id_2_1 = uuidv4();
    const content_id_2_2 = uuidv4();
    const content_id_2_3 = uuidv4();
    const note_id_0_1 = uuidv4();
    const note_id_0_2 = uuidv4();
    const note_id_0_3 = uuidv4();
    const note_id_1_1 = uuidv4();
    const note_id_1_2 = uuidv4();
    const note_id_1_3 = uuidv4();
    const note_id_1_4 = uuidv4();
    const note_id_1_5 = uuidv4();
    const note_id_2_1 = uuidv4();
    const note_id_2_2 = uuidv4();
    const note_id_2_3 = uuidv4();

    const content_0_1 = {
      id: content_id_0_1,
      user_id: user_id,
      text_value: intro,
      create_time: time,
      last_update: time,
    };

    const content_0_2 = {
      id: content_id_0_2,
      user_id: user_id,
      text_value: todos,
      create_time: time,
      last_update: time,
    };

    const content_0_3 = {
      id: content_id_0_3,
      user_id: user_id,
      text_value: New_England_Aquarium,
      create_time: time,
      last_update: time,
    };

    const content_2_1 = {
      id: content_id_2_1,
      user_id: user_id,
      text_value: Client_size_vs_Server_side,
      create_time: time,
      last_update: time,
    };

    const content_2_2 = {
      id: content_id_2_2,
      user_id: user_id,
      text_value: higher_order_component,
      create_time: time,
      last_update: time,
    };

    const content_2_3 = {
      id: content_id_2_3,
      user_id: user_id,
      text_value: TypeScript,
      create_time: time,
      last_update: time,
    };

    const content_1_1 = {
      id: content_id_1_1,
      user_id: user_id,
      text_value: Dune,
      create_time: time,
      last_update: time,
    };

    const content_1_2 = {
      id: content_id_1_2,
      user_id: user_id,
      text_value: Bridgerton,
      create_time: time,
      last_update: time,
    };

    const content_1_3 = {
      id: content_id_1_3,
      user_id: user_id,
      text_value: Joan_of_Arc,
      create_time: time,
      last_update: time,
    };

    const content_1_4 = {
      id: content_id_1_4,
      user_id: user_id,
      text_value: Queens_Gambit,
      create_time: time,
      last_update: time,
    };

    const content_1_5 = {
      id: content_id_1_5,
      user_id: user_id,
      text_value: The_King,
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

    await Promise.all([
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
    ]).then(
      () => {
        res.send('initialization completed!');
      }, 
      (err) => {
        res.status(500).send(err)
      }
    );
  }
}

export default initialization;