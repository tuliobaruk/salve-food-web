// import React from "react";
import { FaArrowRight, FaBoxOpen, FaClock } from "react-icons/fa";

const styles = {
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    backgroundColor: "#2c3e50",
    color: "white",
    height: "60px",
  },
  logo: {
    height: "40px",
  },
  storeName: {
    marginLeft: "10px",
    fontSize: "1.2rem",
  },
  mainContent: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#34495e",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 0",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  menuIcon: {
    marginRight: "10px",
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  ordersSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  ordersList: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  orderTitle: {
    fontWeight: "bold",
  },
  orderButton: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  orderButtonHover: {
    backgroundColor: "#2980b9",
  },
};

const Loja = () => {
  const pedidosEnviar = [
    { id: 1, cliente: "João", item: "Produto A", hora: "10:30" },
    { id: 2, cliente: "Maria", item: "Produto B", hora: "11:00" },
  ];

  const pedidosPreparo = [
    { id: 3, cliente: "Carlos", item: "Produto C", hora: "10:15" },
    { id: 4, cliente: "Ana", item: "Produto D", hora: "10:45" },
  ];

  return (
    <div style={styles.dashboardContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <img
            src="/home/ianalmeida/Imagens/github/salve-food-web/src/assets/images/salve-food.png"
            alt="Salve - Mascote"
            style={styles.logo}
          />
        </div>
        <div>
          <img src="/logo-store.png" alt="Store Logo" style={styles.logo} />
          <span style={styles.storeName}>Nome da Loja</span>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <ul style={styles.menu}>
            <li style={styles.menuItem}>
              <a href="/Loja">
                <FaBoxOpen style={styles.menuIcon} />
                Controle da Loja
              </a>
            </li>
            <li style={styles.menuItem}>
              <a href="/mapa">
                <FaClock style={styles.menuIcon} />
                Pedidos em Preparo
              </a>
            </li>
          </ul>
        </aside>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <h3>Status</h3>
          <p>Aqui estão informações relacionadas à aba selecionada.</p>
        </div>

        {/* Main Content Area */}
        <div style={styles.content}>
          <h1>Controle da Loja</h1>
          <div style={styles.ordersSection}>
            {/* Pedidos a Enviar */}
            <div style={styles.ordersList}>
              <h2>Pedidos a Enviar</h2>
              {pedidosEnviar.map((pedido) => (
                <div key={pedido.id} style={styles.orderItem}>
                  <div>
                    <p style={styles.orderTitle}>{pedido.item}</p>
                    <p>Cliente: {pedido.cliente}</p>
                    <p>Hora: {pedido.hora}</p>
                  </div>
                  <button
                    style={styles.orderButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
                  >
                    Enviar <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>

            {/* Pedidos em Preparo */}
            <div style={styles.ordersList}>
              <h2>Pedidos em Preparo</h2>
              {pedidosPreparo.map((pedido) => (
                <div key={pedido.id} style={styles.orderItem}>
                  <div>
                    <p style={styles.orderTitle}>{pedido.item}</p>
                    <p>Cliente: {pedido.cliente}</p>
                    <p>Hora: {pedido.hora}</p>
                  </div>
                  <button
                    style={styles.orderButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
                  >
                    Preparar <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loja;
