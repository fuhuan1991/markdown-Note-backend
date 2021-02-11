import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import dataOperations from './repositories/index.js';
import config from './config';
import initialText from './noteTemplates/initialNote';
import Client_size_vs_Server_side from './noteTemplates/Client_size_vs_Server_side';
import higher_order_component from './noteTemplates/higher_order_component';
import TypeScript from './noteTemplates/TypeScript';
import Dune from './noteTemplates/Dune';
import New_England_Aquarium from './noteTemplates/New_England_Aquarium';
import intro from './noteTemplates/intro';
import todos from './noteTemplates/todos';

const app: express.Application = express();
const { PORT } = config;
const {
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  createDir,
  getDirById,
  getUserDirs,
  updateDir,
  deleteDirById,
  getDirsByName,
  createContent,
  getContentById,
  updateContent,
  deleteContentById,
  createNote,
  getNoteById,
  getNotesInDir,
  getNotesInDirByTitle,
  getUserNotes,
  updateNote,
  deleteNoteById,
} = dataOperations;
const ROOT = 'ROOT';

app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => res.send('Welcome!'));

// get a user by id
app.get('/api/user/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const result = await getUserById(id);
  res.send(result);
});

// create a new user
app.post('/api/user', async (req: express.Request, res: express.Response) => {
  const result = await createUser(req.body);
  res.send(result);
});

// update a user
app.put('/api/user', async (req: express.Request, res: express.Response) => {
  const result = await updateUser(req.body);
  res.send(result);
});

// delete a user
app.delete('/api/user/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const result = await deleteUserById(id);
  res.send(result);
});

// create a new dir
app.post('/api/dir', async (req: express.Request, res: express.Response) => {

  const notebook_name = req.body.notebook_name;
  const user_id = req.body.user_id;
  const replica = await getDirsByName(user_id, notebook_name);

  if (replica.length > 0) {
    res.status(500).send('Name Duplication!');
  } else {
    const id = uuidv4();
    const time = Date.now();
    const data = {
      ...req.body,
      id: id,
      create_time: time,
      last_update: time,
    };
    createDir(data).then(
      (result) => {
        res.send(result);
      }, 
      (err) => {
        res.status(500).send(err)
      }
    );
  }
});

// get a dir by id
app.get('/api/dir/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  getDirById(id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// get a list of dirs by user id
app.get('/api/user_dir/:user_id', async (req: express.Request, res: express.Response) => {
  const user_id = req.params.user_id;
  getUserDirs(user_id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// update a dir
app.put('/api/dir', async (req: express.Request, res: express.Response) => {

  const notebook_name = req.body.notebook_name;
  const user_id = req.body.user_id;
  const replica = await getDirsByName(user_id, notebook_name);

  if (replica.length > 0) {
    res.status(500).send('Name Duplication!')
  } else {
    const time = Date.now();
    const data = {
      ...req.body,
      last_update: time,
    };

    updateDir(data).then(
      (result) => {
        res.send(result);
      }, 
      (err) => {
        res.status(500).send(err)
      }
    );
  }

});

// delete a dir
app.delete('/api/dir/:id', async (req: express.Request, res: express.Response) => {

  const id = req.params.id;

  const dir = await getDirById(id).then(
    (result) => result, 
    (err) => {
      res.status(500).send(err)
    }
  );

  const user_id = dir.user_id;

  const notes = await getNotesInDir(user_id, id).then(
    (result) => result, 
    (err) => {
      res.status(500).send(err)
    }
  );

  for (let note of notes) {
    await deleteNoteAndContent(note.id, res);
  }

  deleteDirById(id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// create a new note
app.post('/api/note', async (req: express.Request, res: express.Response) => {

  const note_id = uuidv4();
  const content_id = uuidv4();
  const time = Date.now();
  const parent_id = !!req.body.parent_id ? req.body.parent_id : ROOT;
  const user_id = req.body.user_id;
  const title = req.body.title;
  const text_value = `# ${title}\n---------------` + '\n' + initialText;

  const replica = await getNotesInDirByTitle(user_id, parent_id, title);
  if (replica.length > 0) {
    res.status(500).send('Name Duplication!');
  } else {
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
  
    await Promise.all([
      createContent(content),
      createNote(note)
    ]).then(
      (result) => {
        res.send(note);
      },
      (err) => {
        console.log(err);
        res.status(500).send(err)
      }
    );
  }
});

// get a note by id
app.get('/api/note/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  getNoteById(id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// get notes in a notebook
app.get('/api/note/:user_id/:parent_id', async (req: express.Request, res: express.Response) => {
  const user_id = req.params.user_id;
  const parent_id = req.params.parent_id;
  getNotesInDir(user_id, parent_id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// update a note
app.put('/api/note', async (req: express.Request, res: express.Response) => {

  const parent_id = !!req.body.parent_id ? req.body.parent_id : ROOT;
  const user_id = req.body.user_id;
  const title = req.body.title;
  
  const replica = await getNotesInDirByTitle(user_id, parent_id, title);
  if (replica.length > 0) {
    res.status(500).send('Name Duplication!');
  } else {
    const time = Date.now();
    const data = {
      ...req.body,
      last_update: time,
    };
    updateNote(data).then(
      (result) => {
        res.send(result);
      }, 
      (err) => {
        res.status(500).send(err)
      }
    );
  }
});

// delete a note
app.delete('/api/note/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const result = await deleteNoteAndContent(id, res);
  res.send(result);
});

async function deleteNoteAndContent(id, res) {
  const note = await getNoteById(id).then(
    result => result, 
    (err) => {
      res.status(500).send(err)
    }
  );

  const content_id = note.content_id;

  await deleteContentById(content_id).then(
    result => result, 
    (err) => {
      res.status(500).send(err)
    }
  );

  const result = await deleteNoteById(id).then(
    result => result, 
    (err) => {
      res.status(500).send(err)
    }
  );

  return result;
}

// create a new content
app.post('/api/content', async (req: express.Request, res: express.Response) => {
  const id = uuidv4();
  const time = Date.now();
  const data = {
    ...req.body,
    id: id,
    create_time: time,
    last_update: time,
  };

  createContent(data).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// get a content by id
app.get('/api/content/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  getContentById(id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// update a content
app.put('/api/content', async (req: express.Request, res: express.Response) => {
  
  const time = Date.now();
  const data = {
    ...req.body,
    last_update: time,
  };
  
  updateContent(data).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// delete a content
app.delete('/api/content/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  deleteContentById(id).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// get menu data for a user
app.get('/api/menu/:user_id', async (req: express.Request, res: express.Response) => {
  const user_id = req.params.user_id;

  await Promise.all([
    getUserDirs(user_id),
    getUserNotes(user_id)
  ]).then(
    (result) => {
      res.send({
        notebooks: result[0],
        notes: result[1],
      });
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );
});

// initialize a user account
app.get('/api/initialize/:user_id', async (req: express.Request, res: express.Response) => {
  const user_id = req.params.user_id;
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
      notebook_name: "Entertainment",
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
    const content_id_1_1 = uuidv4();
    const content_id_1_2 = uuidv4();
    const content_id_2_1 = uuidv4();
    const content_id_2_2 = uuidv4();
    const content_id_2_3 = uuidv4();
    const note_id_0_1 = uuidv4();
    const note_id_0_2 = uuidv4();
    const note_id_1_1 = uuidv4();
    const note_id_1_2 = uuidv4();
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
      text_value: New_England_Aquarium,
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
      title: 'New England Aquarium',
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
      createContent(content_1_1),
      createNote(note_1_1),
      createContent(content_1_2),
      createNote(note_1_2),
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
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))