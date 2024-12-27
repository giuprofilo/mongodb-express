import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, //regex
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    //enum
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //boolean
    active: {
      type: Boolean,
      default: true,
    },

    age: {
      type: Number,
      min: 16,
      max: 110,
    },

    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],

    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  {
    timestamps: true, //mostra data e hora de criacao e alteracao
  }
);

//com a Schema criada, vamos criar o model
// o model é a representação de uma coleção no banco de dados
// é pelo model que vamos fazer as operações no banco de dados

export default mongoose.model("User", userSchema);
