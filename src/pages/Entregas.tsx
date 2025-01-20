import React from "react";
import {
  FaHome,
  FaUtensils,
  FaTruck,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

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
  menuItemHover: {
    backgroundColor: "#2c3e50",
  },
  menuIcon: {
    marginRight: "10px",
  },
  footerMenu: {
    borderTop: "1px solid #7f8c8d",
    paddingTop: "20px",
  },
  logoutButton: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    width: "90%",
    textDecoration: "none",
    margin: "10px auto",
  },
  logoutButtonHover: {
    background: "#c0392b",
  },
  statusBar: {
    width: "300px",
    backgroundColor: "#ecf0f1",
    padding: "20px",
    borderRight: "1px solid #bdc3c7",
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#ecf0f1",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#34495e",
  },
  orderList: {
    listStyle: "none",
    padding: 0,
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    borderLeft: "5px solid #2c3e50",
  },
  orderDetails: {
    flex: 1,
    marginLeft: "10px",
  },
  orderTitle: {
    fontSize: "1.2rem",
    color: "#2c3e50",
    marginBottom: "5px",
  },
  orderStatus: {
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },
  actionButton: {
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  actionButtonHover: {
    backgroundColor: "#34495e",
  },
};

const Deliveries = () => {
  // Mock data for orders
  const orders = [
    {
      id: 1,
      customer: "João Silva",
      items: "2x Hambúrguer, 1x Refrigerante",
      status: "Pendente",
      statusIcon: <FaClock />,
    },
    {
      id: 2,
      customer: "Maria Oliveira",
      items: "1x Pizza Média, 1x Suco de Laranja",
      status: "Entregue",
      statusIcon: <FaCheckCircle />,
    },
  ];

  return (
    <div style={styles.dashboardContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <img
            src="/assets/logo-salve-food.png"
            alt="Salve Food"
            style={styles.logo}
          />
        </div>
        <div>
          <img src="/assets/logo-store.png" alt="Store Logo" style={styles.logo} />
          <span style={styles.storeName}>Indian Happy End</span>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <ul style={styles.menu}>
            {/* Parte Superior da Sidebar */}
            <li style={styles.menuItem}>
              <a href="/dashboard">
                <FaHome style={styles.menuIcon} />
                Início
              </a>
            </li>
            <li style={styles.menuItem}>
              <a href="/cardapio">
                <FaUtensils style={styles.menuIcon} />
                Cardápio
              </a>
            </li>
            <li style={styles.menuItem}>
              <a href="/entregas">
                <FaTruck style={styles.menuIcon} />
                Entregas
              </a>
            </li>
          </ul>

          {/* Parte Inferior da Sidebar */}
          <div className={styles.footerMenu}>
            <ul style={styles.menu}>
              <li style={styles.menuItem}>
                <a href="/ajuda">
                  <FaQuestionCircle style={styles.menuIcon} />
                  Ajuda
                </a>
              </li>
              <li style={styles.menuItem}>
                <a href="/configuracoes">
                  <FaCog style={styles.menuIcon} />
                  Configurações
                </a>
              </li>
              <li>
                <a href="/login" style={styles.logoutButton}>
                  <FaSignOutAlt style={styles.menuIcon} />
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <h3>Status</h3>
          <p>Visualize e gerencie seus pedidos.</p>
        </div>

        {/* Main Content Area */}
        <div style={styles.content}>
          <h1>Entregas</h1>

          {/* Pending Orders Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FaClock style={styles.menuIcon} /> Pedidos Pendentes
            </h2>
            <ul style={styles.orderList}>
              {orders
                .filter((order) => order.status === "Pendente")
                .map((order) => (
                  <li key={order.id} style={styles.orderItem}>
                    <div>
                      <div style={styles.orderTitle}>{order.customer}</div>
                      <div style={styles.orderStatus}>{order.items}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Delivered Orders Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FaCheckCircle style={styles.menuIcon} /> Pedidos Entregues
            </h2>
            <ul style={styles.orderList}>
              {orders
                .filter((order) => order.status === "Entregue")
                .map((order) => (
                  <li key={order.id} style={styles.orderItem}>
                    <div>
                      <div style={styles.orderTitle}>{order.customer}</div>
                      <div style={styles.orderStatus}>{order.items}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
