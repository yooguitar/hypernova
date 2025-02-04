import {
  Container,
  Title,
  Form,
  Label,
  Input,
  TextArea,
  FileInput,
  Button,
  Message,
} from "./InsertForm.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InsertForm = () => {
  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

  // 게시글 정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("괘씸하다");
      navi("/login"); // 로그아웃 상태로 /insert에 들어가면 /login으로 돌아간다
    } else {
      setUserId(auth.username);
      setAccessToken(auth.accessToken); // 이후에 요청 보낼 때 들고갈 토큰도 미리 담아둔다
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024; // == 10MB

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("허용되지 않는 파일 형식입니다.");
      return;
    }
    if (selectedFile && selectedFile.size > maxSize) {
      alert("파일의 크기가 너무 큽니다. 10MB 이하로 선택해주세요");
      return;
    }

    setFile(selectedFile);
  };

  const handleInsertBoard = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력 해주세요");
      return;
    }

    // multipart로 전송할 때는 form데이터를 만들어서 보내자
    const formData = new FormData();
    formData.append("boardTitle", title);
    formData.append("boardContent", content);
    formData.append("boardWriter", userId);
    if (file) {
      formData.append("file", file);
    }

    axios
      .post("http://localhost/boards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          alert("글 등록 성공");
          navi("/boards");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Title>게시글 작성</Title>
      <Form onSubmit={handleInsertBoard}>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="내용을 입력하세요"
          ></TextArea>
        </div>
        <div>
          <Label htmlFor="username">작성자 ID</Label>
          <Input id="username" type="text" readOnly value={userId} />
        </div>
        <div>
          <Label htmlFor="file">파일 첨부: </Label>
          <FileInput
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit">작성</Button>
      </Form>
    </Container>
  );
};

export default InsertForm;
