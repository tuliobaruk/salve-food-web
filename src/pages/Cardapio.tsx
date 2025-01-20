import React, { useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaTruck,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaPlus,
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
  menuList: {
    listStyle: "none",
    padding: 0,
  },
  menuItemCard: {
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
  menuDetails: {
    flex: 1,
    marginLeft: "10px",
  },
  menuTitle: {
    fontSize: "1.2rem",
    color: "#2c3e50",
    marginBottom: "5px",
  },
  menuDescription: {
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  actionButton: {
    padding: "10px",
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
  addButton: {
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  addButtonHover: {
    backgroundColor: "#1e8449",
  },
};

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Hambúrguer Clássico",
      description: "Pão, carne, queijo, alface e tomate.",
    },
    {
      id: 2,
      name: "Pizza Margherita",
      description: "Molho de tomate, mussarela e manjericão.",
    },
  ]);

  const handleAdd = () => {
    const newItem = {
      id: menuItems.length + 1,
      name: "Novo Item",
      description: "Descrição do novo item.",
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleEdit = (id) => {
    const updatedItems = menuItems.map((item) =>
      item.id === id ? { ...item, name: "Item Editado" } : item
    );
    setMenuItems(updatedItems);
  };

  const handleDelete = (id) => {
    const filteredItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(filteredItems);
  };

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
          <p>Gerencie o cardápio do seu estabelecimento.</p>
        </div>

        {/* Main Content Area */}
        <div style={styles.content}>
          <h1>Gerenciamento do Cardápio</h1>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Itens do Cardápio</h2>
            <button
              style={styles.addButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e8449")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#27ae60")
              }
              onClick={handleAdd}
            >
              <FaPlus />
              Adicionar Item
            </button>
            <ul style={styles.menuList}>
              {menuItems.map((item) => (
                <li key={item.id} style={styles.menuItemCard}>
                  <div>
                    <div style={styles.menuTitle}>{item.name}</div>
                    <div style={styles.menuDescription}>{item.description}</div>
                  </div>
                  <div style={styles.actionButtons}>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleEdit(item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      style={styles.actionButton}
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
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

export default MenuManagement;
