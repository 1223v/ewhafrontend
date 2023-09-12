import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import LectureAddPage from "./views/LectureAddPage/LectureAddPage";
import LectureModPage from "./views/LectureAddPage/LectureModPage";
import ProbAddPage from "../pages/ProbAddPage/ProbAddPage";
import ProbModPage from "../pages/ProbAddPage/ProbModPage";
import ProbFeedbackPage from "./views/ProbFeedbackPage/ProbFeedbackPage";
import AudioRecordPage from "./views/AudioRecordPage/AudioRecordPage";
import ProbDetailPage from "../pages/ProbDetailPage/ProbDetailPage";
import ProbListStudentPage from "../pages/ProbListPage/ProbListStudentPage";
import ProbListProfessorPage from "../pages/ProbListPage/ProbListProfessorPage";
import ProbSubmitListPage from "../pages/ProbSubmitListPage/ProbSubmitListPage";

function App() {
    //false : 로그인 안한 유저
    const NewLoginPage = Auth(LoginPage, false);
    const NewRegisterPage = Auth(RegisterPage, false);

    //true : 로그인 한 유저
    const NewLandingPage = Auth(LandingPage, true);
    const NewProbFeedbackPage = Auth(ProbFeedbackPage, true);
    const NewAudioRecordPage = Auth(AudioRecordPage, true);
    const NewTest = Auth(ProbDetailPage, true);
    const NewProbDetailPage = Auth(ProbDetailPage, true);

    // 1: 학생, 2: 조교, 3: 교수
    const NewProbListStudentPage = Auth(ProbListStudentPage, true, 1);
    const NewLectureAddPage = Auth(LectureAddPage, true, 3);
    const NewLectureModPage = Auth(LectureModPage, true, 3);
    const NewProbAddPage = Auth(ProbAddPage, true, 3);
    const NewProbModPage = Auth(ProbModPage, true, 3);
    const NewProbSubmitListPage = Auth(ProbSubmitListPage, true, 3);
    const NewProbListProfessorPage = Auth(ProbListProfessorPage, true, 3);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/register" element={<NewRegisterPage />} />
                <Route path="/prob/feedback/manage" element={<NewProbSubmitListPage />} />
                <Route path="/lecture_add" element={<NewLectureAddPage />} />
                <Route path="/lecture_mod" element={<NewLectureModPage />} />
                <Route path="/prob_submit" element={<NewAudioRecordPage />} />
                <Route path="/prob_add" element={<NewProbAddPage />} />
                <Route path="/prob_mod" element={<NewProbModPage />} />
                <Route path="/prob_feedback" element={<NewProbFeedbackPage />} />
                <Route path="/prob/detail" element={<NewProbDetailPage />} />
                <Route path="/prob/list/student" element={<NewProbListStudentPage />} />
                <Route path="/prob/list/professor" element={<NewProbListProfessorPage />} />
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
                <Route path="/test" element={<NewTest />} />
            </Routes>
        </div>
    );
}

export default App;
