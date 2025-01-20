import React, { useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaTruck,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
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
  formContainer: {
    backgroundColor: "#ecf0f1",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#34495e",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #bdc3c7",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #bdc3c7",
    fontSize: "1rem",
    resize: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imagePreview: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};

const StoreSettings = () => {
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [storeImage, setStoreImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStoreImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeData = {
      name: storeName,
      description: storeDescription,
      image: storeImage,
    };
    console.log("Dados da loja salvos:", storeData);
    alert("Configurações salvas com sucesso!");
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
          <span style={styles.storeName}>Configurações da Loja</span>
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
          </ul>
          <a
            href="/login"
            style={styles.logoutButton}
          >
            <FaSignOutAlt style={styles.menuIcon} />
            Sair
          </a>
        </aside>

        {/* Status Bar */}
        <div style={styles.statusBar}>
          <h3>Status</h3>
          <p>Aqui você pode ajustar os dados da loja.</p>
        </div>

        {/* Main Content Area */}
        <div style={styles.content}>
          <h1>Configurações da Loja</h1>
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="storeName">
                  Nome da Loja
                </label>
                <input
                  id="storeName"
                  style={styles.input}
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="storeDescription">
                  Descrição da Loja
                </label>
                <textarea
                  id="storeDescription"
                  style={styles.textarea}
                  rows="4"
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="storeImage">
                  Imagem da Loja
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Pré-visualização"
                    style={styles.imagePreview}
                  />
                )}
                <input
                  id="storeImage"
                  style={styles.input}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <button style={styles.button} type="submit">
                Salvar Configurações
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;
