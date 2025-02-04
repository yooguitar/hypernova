import {
  Container,
  Title,
  Message,
  AddButton,
  PostList,
  PostItem,
  PostTitle,
  Author,
  LoadMoreButton,
} from "./BoardList.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/boards", {
        params: {
          page: page,
        },
      })
      .then((response) => {
        // console.log(response);
        setBoards([...boards, ...response.data]);
        if (response.data.length < 3) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [page]);

  const handleMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <Container>
      <Title>게시글 목록</Title>
      {auth.isAuthenticated && (
        <AddButton onClick={() => navigate("/insert")}>
          새 게시글 작성
        </AddButton>
      )}
      <PostList>
        {boards.map((board) => (
          <PostItem key={board.boardNo}>
            <PostTitle onClick={() => navigate(`/boards/${board.boardNo}`)}>
              {board.boardTitle}
            </PostTitle>
            <Author>작성자: {board.boardWriter}</Author>
          </PostItem>
        ))}
      </PostList>
      {hasMore && <LoadMoreButton onClick={handleMore}>더 보기</LoadMoreButton>}
    </Container>
  );
};

export default BoardList;
