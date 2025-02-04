import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
} from "./ChangePassword.styles";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    axios
      .put(
        "http://localhost/members",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        setSuccess("비밀번호 변경 성공~");
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((error) => {
        setError(
          error.response.data.message || "비밀번호 변경 중 오류가 발생했어요."
        );
      });
  };

  return (
    <Container>
      <h2>비밀번호 변경</h2>
      <Form onSubmit={handleChangePassword}>
        <Input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
          placeholder="현재 비밀번호"
          required
        />
        <Input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          placeholder="새 비밀번호"
          required
        />
        <Button type="submit">비밀번호 변경</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <p style={{ color: "lightgreen" }}>{success}</p>}
      </Form>
    </Container>
  );
};

export default ChangePassword;
