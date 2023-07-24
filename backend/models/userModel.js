import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, //Nuevos campos se van a acrear solos automaticamente
  }
);

//Para encriptar el password
userSchema.methods.matchPassword = async function (enteredPassword) {
  //'.methods' permite crear metodos en el esquema
  return await bcrypt.compare(enteredPassword, this.password); //Compara el pasword ingresado con el propio de este usuario (por eso el 'this')
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //Si no se modifico el password
    next(); //continuar
  }
  //si se modificó
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//'pre' nos permite ejecutar algo antes de cualquier funcion

const User = mongoose.model("User", userSchema); //Crea el modelo a partir del esquema

export default User;
