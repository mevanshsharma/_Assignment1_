// src/pages/DashboardPage.js
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    // localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Welcome to your Dashboard</h1>
      <p style={styles.message}>You have successfully made a Login and Registration React App using React, Node, and MongoDB!</p>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "100px auto",
    textAlign: "center",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "40px",
  },
  logoutButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DashboardPage;
