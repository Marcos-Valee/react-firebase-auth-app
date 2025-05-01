import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState } from "react";
import { db } from "../Services/firebase.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";

function Cadastro() {
  const [user, setUser] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    date: "",
    senha: "",
  });
  const [message, setMessage] = useState("")

  const handleInputChange = (e, target) => {
    setUser((prev) => ({ ...prev, [target]: e.target.value }));
  };

  async function addUserFirestone(email, senha) {
    try {
      const userLogin = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const uid = userLogin.user.uid;
      await setDoc(doc(db, "users", uid), {
        nome: user.nome,
        sobrenome: user.sobrenome,
        date: user.date,
      });
    } catch (error) {
      setMessage("Erro ao adicionar usuário!")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    addUserFirestone(user.email, user.senha);
    setUser({
      nome: "",
      sobrenome: "",
      email: "",
      date: "",
      senha: "",
    });
    setMessage("Usuário adicionado com sucesso!")
  };

  return (
    <div>
      <Header title={"Cadastro"} />
      <div className="flex items-center mt-10 flex-col gap-5">
        <h2 className="text-2xl text-gray-500 font-semibold">
          Cadastrar novo usuário
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full mt-8 flex flex-col items-center"
        >
          <InputField
            label="Nome"
            inputType="text"
            value={user.nome}
            onChange={(e) => handleInputChange(e, "nome")}
          />
          <InputField
            label="Sobrenome"
            inputType="text"
            value={user.sobrenome}
            onChange={(e) => handleInputChange(e, "sobrenome")}
          />
          <InputField
            label="Email"
            inputType="email"
            value={user.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <InputField
            label="Data de Nascimento"
            inputType="date"
            value={user.data}
            onChange={(e) => handleInputChange(e, "date")}
          />
          <InputField
            label="Senha"
            inputType="password"
            value={user.senha}
            onChange={(e) => handleInputChange(e, "senha")}
          />
          <button
            className="bg-sky-600 rounded-[5px] p-2 text-white flex justify-center text-center text-1xl
              hover:bg-sky-700 transition ease-out duration-300 cursor-pointer"
            onClick={() => console.log(user)}
            type="submit"
          >
            Cadastrar Usuário
          </button>
          {message}
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
