import {
  CommentContainer,
  CommentItem,
  CommentAuthor,
  CommentContent,
  CommentDate,
} from "./CommentList.styles";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CommentList = ({ boardNo, refresh }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost/comments/${boardNo}`).then((response) => {
      setComments([...response.data]);
    });
  }, [refresh]);

  return (
    <CommentContainer>
      {comments.length === 0 ? (
        <p>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.commentNo}>
            <CommentAuthor>{comment.commentWriter}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDate>
              {new Date(comment.createDate).toLocaleString()}
            </CommentDate>
          </CommentItem>
        ))
      )}
    </CommentContainer>
  );
};

export default CommentList;
