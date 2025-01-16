import { Link } from "react-router-dom";

export default function     Header(): JSX.Element {
  return (
    <header className="bg-red-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Salve Food Admin</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pedidos" className="hover:underline">
                Pedidos
              </Link>
            </li>
            <li>
              <Link to="/relatorio" className="hover:underline">
                Reltórios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
