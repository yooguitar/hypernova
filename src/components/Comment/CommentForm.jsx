import {
  FormContainer,
  TextArea,
  SubmitButton,
  ErrorMessage,
} from "./CommentForm.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CommentForm = ({ boardNo, onSuccess }) => {
  /*
    사용자가 입력한 댓글 내용을 보내야함 + 게시글 번호 + 작성자가 누구인지
  */
  const [content, setContent] = useState("");
  const { auth } = useContext(AuthContext);
  // console.log(boardNo); // 글 번호 잘 넘어온다, props로 받으면 객체, {boardNo}구조분해하면 번호만 온다

  const handleInsertComment = (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      // content는 @NotBlank 조건검사 수행
      alert("뭐라도 쓰세요");
      return;
    }
    if (!auth.isAuthenticated) {
      alert("로그인 후 댓글을 작성해주세요");
      return;
    } else {
      axios
        .post(
          "http://localhost/comments",
          {
            refBoardNo: boardNo,
            commentWriter: auth.username,
            content: content,
          },
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        )
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            setContent("");
            onSuccess(); // 댓글등록 성공 시 State를 바꿔준다
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <FormContainer onSubmit={handleInsertComment}>
      <TextArea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="댓글을 작성해주세요"
        rows="4"
      />
      <SubmitButton type="submit">작성하기</SubmitButton>
    </FormContainer>
  );
};

export default CommentForm;
