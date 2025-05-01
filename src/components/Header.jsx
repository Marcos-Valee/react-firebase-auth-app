import { Link } from "react-router-dom";


const Header = ({ title, isLogin }) => {
  return (
    <header className="bg-blue-500 rounded-b-2xl shadow-md p-8 h-30 text-white flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cadastro" className="hover:underline">
            {!isLogin ? "Cadastro" : "Deslogar e cadastrar outro usuário"}
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              {!isLogin ? "Login" : "Logar outro usuário"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
