import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
//import Footer from './views/Footer/Footer'
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import ProbSubmitList from "./views/ProbSubmitList/ProbSubmitList";
import Prob from "./views/Prob/Prob";
import LectureAddPage from "./views/LectureAddPage/LectureAddPage";
import Test from "./views/LandingPage/Section/Test";
import ProbAddPage from "./views/ProbAddPage/ProbAddPage";
import ProbFeedbackPage from "./views/ProbFeedbackPage/ProbFeedbackPage";
import TextAEEditor from "./views/ProbFeedbackPage/Sections/TextAEEditor";

function App() {
  const NewLandingPage = Auth(LandingPage, true);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  const NewProbSubmitList = Auth(ProbSubmitList, true);
  const NewProb = Auth(Prob, true);
  const NewLectureAddPage = Auth(LectureAddPage, true);
  const NewProbAddPage = Auth(ProbAddPage, true);
  const NewProbFeedbackPage = Auth(ProbFeedbackPage, true);
  const NewTest = Auth(TextAEEditor, true);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<NewRegisterPage />} />
        <Route path="/prob" element={<NewProb />} />
        <Route path="/prob_submit_list" element={<NewProbSubmitList />} />
        <Route path="/lecture_add" element={<NewLectureAddPage />} />

        <Route path="/prob_add" element={<NewProbAddPage />} />
        <Route path="/prob_feedback" element={<NewProbFeedbackPage />} />

        <Route path="/test" element={<NewTest />} />
      </Routes>
    </div>
  );
}

export default App;
