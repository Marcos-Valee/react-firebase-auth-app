import Header from "../components/Header";
import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import { db, auth } from "../Services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userForm, setUserForm] = useState({
    email: "",
    senha: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e, target) => {
    setUserForm((prev) => ({ ...prev, [target]: e.target.value }));
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(userForm.email, userForm.senha);
      
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const loginState = {
          user: userDoc.data(),
          loginInformations: {
            email: userForm.email,
            senha: userForm.senha,
            id: user.uid,
          },
        };
        navigate("/", { state: loginState });
      } else {
        setMessage(`Usuário não encontrado no Firestore.`);
      }
    } catch (error) {
      setMessage(`Usuário não encontrado no Firestore.`);
    }
  };

  return (
    <div>
      <Header title={"Login"} />
      <div className="flex items-center mt-10 flex-col gap-5">
        <h2 className="text-2xl text-gray-500 font-semibold">Fazer Login</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full mt-8 flex flex-col items-center"
        >
          <InputField
            label="Email"
            inputType="email"
            onChange={(e) => handleInputChange(e, "email")}
          />

          <InputField
            label="Senha"
            inputType="password"
            onChange={(e) => handleInputChange(e, "senha")}
          />
          <button
            className="bg-sky-600 rounded-[5px] p-2 text-white flex justify-center text-center text-1xl
              hover:bg-sky-700 transition ease-out duration-300 cursor-pointer"
            type="submit"
          >
            Fazer login e voltar para a Home
          </button>
        </form>
        {message}
      </div>
    </div>
  );
}

export default Login;
