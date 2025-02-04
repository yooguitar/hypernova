import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import MyPage from "./components/Auth/MyPage/MyPage";
import BoardList from "./components/Board/BoardList";
import InsertForm from "./components/Board/InsertForm";
import BoardDetail from "./components/Board/BoardDetail";
import EditBoard from "./components/Board/EditBoard";

/*
  props drilling : 너무 먼 자식에게 props를 내려줘야 하는 상태
  회원의 로그인 정보(토큰)는 전역에서 관리 하자 => context
  Auth를 전역에서 사용하기 위해 App.js 단에서 AuthProvider로 모든 컴포넌트를 감싸주자
*/

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/insert" element={<InsertForm />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/boards/:id/edit" element={<EditBoard />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
