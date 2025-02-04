import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
} from "./DeleteAccount.styles";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setError("");

    axios
      .delete("http://localhost/members", {
        data: {
          password,
        },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((error) => {
        setError("탈퇴 실패");
      });
  };

  return (
    <Container>
      <h2>계정 탈퇴</h2>
      <Form onSubmit={handleDeleteAccount}>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <Button type="submit">계정 탈퇴</Button>
      </Form>
    </Container>
  );
};

export default DeleteAccount;
