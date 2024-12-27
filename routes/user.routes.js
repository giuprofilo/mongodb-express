import expres from "express";
import UserModel from "../models/user.model.js";

const router = expres.Router();
// url: http://localhost:4000/user

// url: http://localhost:4000/user/create
router.post("/create", async (req, res) => {
  try {
    //pegar os dados do body enviado no insomnia
    const form = req.body;

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    //lidando com o erro
    //usamos try catch para o server nao cair quando houver um erro
    console.log(error);
    return res.status(500).json(error);
  }
});

//pegar todos os usuarios da DB
// url: http://localhost:4000/user/all
router.get("/all", async (req, res) => {
  try {
    //buscar todos os usuarios ativos
    const allUsers = await UserModel.find({ active: true });

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// url: http://localhost:4000/user/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//EDITAR UM USUARIO PELO ID
// url: http://localhost:4000/user/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      id, //encontre pelo id
      {
        ...req.body, //oq estiver no body sera atualizado
      },
      { new: true, runValidators: true } //atualiza as edicoes na DBs
    );

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//HARD DELETE -> EXCLUI O DOCUMENTO DA DB (N MUITO INDICADO)
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedUser = await UserModel.findByIdAndDelete(id);
//     return res.status(200).json("Usuário deletado com sucesso!");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

//SOFT DELETE usa o active:false p desativar o user na DB, e nao excluir completamente
// url: http://localhost:4000/user/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json("Usuário deletado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default router;
