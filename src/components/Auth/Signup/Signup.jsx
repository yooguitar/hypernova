import {
  SignupContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
} from "./Signup.styles";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [idError, setIdError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 태그의 기본 이벤트 제거

    axios
      .post("http://localhost/members", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((response) => {
        //console.log(response);
        alert(response.data);
        setIdError("");
        setPwdError("");
      })
      .catch((error) => {
        //console.log(error);
        setIdError(error.response.data.userId);
        setPwdError(error.response.data.userPwd);
      });
  };

  return (
    <SignupContainer>
      <h2>회원가입</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
          placeholder="사용자명"
          required
        />
        {idError && <ErrorMessage>{idError}</ErrorMessage>} <br />
        <Input
          type="password"
          onChange={(e) => setUserPwd(e.target.value)}
          value={userPwd}
          placeholder="비밀번호"
          required
        />
        {pwdError && <ErrorMessage>{pwdError}</ErrorMessage>} <br />
        <Button type="submit">회원가입</Button>
      </Form>
    </SignupContainer>
  );
};

export default Signup;
