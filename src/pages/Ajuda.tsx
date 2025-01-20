import React from "react";

const styles = {
  helpContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#2c3e50",
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
  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#7f8c8d",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginTop: "10px",
  },
  backButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  backButtonHover: {
    backgroundColor: "#34495e",
  },
};

const Help = () => {
  return (
    <div style={styles.helpContainer}>
      <h1 style={styles.title}>Ajuda</h1>

      {/* Tutorial Section 1 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Como cadastrar produtos no cardápio?</h2>
        <p style={styles.text}>
          Para cadastrar produtos no cardápio, vá até a aba <strong>Cardápio</strong> no menu lateral. 
          Clique no botão <strong>"Adicionar Produto"</strong>, preencha as informações necessárias, como nome, descrição, preço e imagem do produto, e clique em <strong>"Salvar"</strong>.
        </p>
        <img
          src="/assets/tutorial-cardapio.png"
          alt="Exemplo de cadastro de produto"
          style={styles.image}
        />
      </div>

      {/* Tutorial Section 2 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Como visualizar e gerenciar pedidos?</h2>
        <p style={styles.text}>
          Na aba <strong>Entregas</strong>, você pode visualizar os pedidos pendentes e já realizados. 
          Para atualizar o status de um pedido, clique no botão correspondente ao pedido e selecione a nova etapa (ex.: Em preparo, Enviado, Entregue).
        </p>
        <img
          src="/assets/tutorial-entregas.png"
          alt="Exemplo de gerenciamento de pedidos"
          style={styles.image}
        />
      </div>

      {/* Tutorial Section 3 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Como alterar informações da empresa?</h2>
        <p style={styles.text}>
          Acesse a aba <strong>Configurações</strong> no menu lateral. Nesta seção, você pode alterar o nome da empresa, foto de perfil, horário de funcionamento, e até redefinir sua senha. 
          Lembre-se de clicar em <strong>"Salvar Alterações"</strong> ao finalizar.
        </p>
        <img
          src="/assets/tutorial-configuracoes.png"
          alt="Exemplo de configuração da empresa"
          style={styles.image}
        />
      </div>

      {/* Back Button */}
      <a
        href="/dashboard"
        style={styles.backButton}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor)}
      >
        Voltar ao Dashboard
      </a>
    </div>
  );
};

export default Help;
