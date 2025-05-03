import React, {  useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Admin_Login } from "../../../api/api";

import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      toast.error("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const apiResponse = await fetch(Admin_Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const apiData = await apiResponse.json();

      if (apiData.statusCode === 200) {
        toast.success(apiData.message);
        setTimeout(() => navigate("/admin-side-bar"), 2000);
      } else {
        toast.error(apiData.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Container fluid className="admin-login-background">
      <div className="admin-login-form-container">
        <Card className="admin-login-form-card">
          <Card.Body>
            <h3 className="text-center mb-4">Admin Login</h3>

            {error && <p variant="danger">{error}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FaUser />
                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="admin-login-input-field"
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <div className="input-group-text">
                    <FaLock />
                  </div>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="admin-login-input-field"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="admin-toggle-password-btn"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <div className="text-end mt-3 mb-3">
                <Link to="" className="admin-forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 admin-login-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AdminLogin;
