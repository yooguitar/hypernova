import {
  Container,
  Title,
  Form,
  Label,
  Input,
  TextArea,
  FileInput,
  ImagePreview,
  SubmitButton,
  CancelButton,
  Message,
} from "./EditBoard.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBoard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardWriter, setBoardWriter] = useState("");
  const [file, setFile] = useState(null);
  const [exsitingFileUrl, setExsitingFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      alert("괘씸하다");
      navigate("/login");
    } else {
      axios.get(`http://localhost/boards/${id}`).then((response) => {
        setBoardTitle(response.data.boardTitle);
        setBoardContent(response.data.boardContent);
        setBoardWriter(response.data.boardWriter);
        setExsitingFileUrl(response.data.boardFileUrl || "");
      });
    }
  }, [id]);

  const handleFileHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("boardTitle", boardTitle);
    formData.append("boardContent", boardContent);
    formData.append("boardWriter", boardWriter);
    formData.append("boardFileUrl", exsitingFileUrl);

    if (file) {
      formData.append("file", file);
    }

    axios
      .put(`http://localhost/boards/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          navigate(`/boards/${id}`);
        }, 5000);
      });
  };

  if (loading) {
    return (
      <div className="bg">
        <h1>게시글 수정중....</h1>
      </div>
    );
  }

  return (
    <Container>
      <Title>게시글 수정</Title>
      <Form onSubmit={handleUpdate}>
        <Label>제목</Label>
        <Input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          type="text"
          required
        />

        <Label>내용</Label>
        <TextArea
          value={boardContent}
          onChange={(e) => setBoardContent(e.target.value)}
          rows="10"
          required
        />

        <Label>첨부 파일</Label>
        {0 && (
          <>
            <ImagePreview src={exsitingFileUrl} alt="기존 첨부 파일" />
            <Label>파일 변경:</Label>
          </>
        )}
        <FileInput type="file" onChange={handleFileHandler} />

        <SubmitButton type="submit">수정버튼</SubmitButton>
      </Form>
      <CancelButton
        onClick={() => {
          navigate(-1);
        }}
      >
        취소
      </CancelButton>
    </Container>
  );
};

export default EditBoard;
