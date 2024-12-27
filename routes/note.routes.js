import express from "express";
import notesModel from "../models/notes.model.js";
import userModel from "../models/user.model.js";

//instanciar o roteador
const notesRouter = express.Router();

// rota de criar uma nota
// passar o id_user de quem está criando a nota
// criem uma nova nota + adicionar o campo de quem criou
// adicionar o id_nota criada na array de notes do usuário

//rora de criar nota no id do user
notesRouter.post("/create-note/:id_user", async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const note = req.body;

    //criar nova nota
    const newNote = await notesModel.create({
      ...note,
      user: id_user,
    });

    //adicionar a nova receita dentro da array de recipes do usuário
    const addNote = await userModel.findByIdAndUpdate(id_user, {
      $push: { notes: newNote._id },
    });

    return res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//rota de buscar as notas
notesRouter.get("/all", async (req, res) => {
  try {
    const allNotes = await notesModel.find({});
    return res.status(200).json(allNotes);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// exportar a rota!!
export default notesRouter;
