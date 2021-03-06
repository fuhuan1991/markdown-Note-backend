import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import s3BucketOperations from './s3_bucket/index.js';
import dataOperations from './repositories/index.js';
import config from './config';
import initialText from './noteTemplates/initialNote';
import initialization from './initialization.js';
import fileUpload from 'express-fileupload';

const app: express.Application = express();
const { PORT, UPLOAD_FILE_NAME_IN_REQUEST } = config;
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

const {
  s3BucketUpload,
} = s3BucketOperations;

const ROOT = 'ROOT';

app.use(express.json());
app.use(cors());
app.use(fileUpload());

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
  initialization(user_id, res);
});

// receive upload img
app.post(`/api/upload_image`, async (req: any, res: express.Response) => {
  const file = req.files[UPLOAD_FILE_NAME_IN_REQUEST];

  s3BucketUpload(file).then(
    (result) => {
      res.send(result);
    }, 
    (err) => {
      res.status(500).send(err)
    }
  );

})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))