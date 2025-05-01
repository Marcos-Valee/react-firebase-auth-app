import Header from "../components/Header";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsPersonFillX } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { db } from "../Services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser as deleteAuthUser } from "firebase/auth";
import TdUser from "../components/tableComponents/TdUser";
import ThTitle from "../components/tableComponents/ThTitle";
import ActionButton from "../components/tableComponents/ActionButton";
import { auth } from "../Services/firebase";

function Home() {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      if (
        location.state &&
        location.state.user &&
        location.state.loginInformations
      ) {
        const userData = location.state.user;
        const loginInformations = location.state.loginInformations;
        const combinedUser = { ...userData, ...loginInformations };
        setUser([combinedUser]);
        setIsLogin(true);
      } else {
        console.log("Nenhum dado encontrado no estado da navegação.");
      }
    } catch (error) {
      console.log(`Erro ao se conectar: ${error}`);
    }
  }, [location.state]);

  async function deleteFirestore(id) {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Erro ao remover usuário do Firestore:", error);
    }
  }

  async function deleteUser(index, id) {
    try {
      if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        await deleteFirestore(id);

        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === id) {
          await deleteAuthUser(currentUser);
        } else {
          console.error("Não foi possível excluir o usuário autenticado.");
        }

        const newArray = user.filter((_, i) => index !== i);
        setUser(newArray);
        setIsLogin(false);
        console.log("Usuário excluído localmente.");
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  }

  return (
    <div>
      <Header title={"Home"} isLogin={isLogin} />
      <div className="overflow-auto flex justify-center items-center flex-col mt-8">
        {isLogin && (
          <h1 className="text-2xl font-semibold">Dados do usuário Logado</h1>
        )}
        <table className="border w-[95%] border-gray-300 mt-6">
          {!isLogin ? (
            <tbody>
              <tr>
                <td colSpan="7">
                  <AnimatePresence>
                    <motion.div
                      key="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.0 }}
                      className="text-gray-400 flex items-center justify-center p-60 flex-col text-lg"
                    >
                      <BsPersonFillX className="text-6xl" />
                      <p>Nenhum usuário logado!</p>
                      <Link
                        to="/login"
                        className="underline hover:text-gray-500"
                      >
                        Fazer Login
                      </Link>
                      <Link
                        to="/cadastro"
                        className="underline hover:text-gray-500"
                      >
                        Criar cadastro
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead>
                <tr>
                  <ThTitle name="Id" />
                  <ThTitle name="Nome" />
                  <ThTitle name="Sobrenome" />
                  <ThTitle name="Email" />
                  <ThTitle name="Data de nascimento" />
                  <ThTitle name="Senha" />
                  <ThTitle name="Deletar" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {user.map((user, index) => (
                    <motion.tr
                      key={user.email}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TdUser name={user.id} />
                      <TdUser name={user.nome} />
                      <TdUser name={user.sobrenome} />
                      <TdUser name={user.email} />
                      <TdUser name={user.date} />
                      <TdUser name={user.senha} />
                      <TdUser
                        name={
                          <div className="flex gap-3">
                            <ActionButton
                              name={<FaRegTrashCan />}
                              color="bg-red-500"
                              hover="bg-red-700"
                              onClick={() => deleteUser(index, user.id)}
                            />
                          </div>
                        }
                      />
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

export default Home;
