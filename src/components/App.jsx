import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
//import Footer from './views/Footer/Footer'
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import ProbSubmitList from "./views/ProbSubmitList/ProbSubmitList";
import Prob from "./views/Prob/Prob";
import LectureAddPage from "./views/LectureAddPage/LectureAddPage";
import LectureModPage from "./views/LectureAddPage/LectureModPage";
import ProbAddPage from "./views/ProbAddPage/ProbAddPage";
import ProbModPage from "./views/ProbAddPage/ProbModPage";
import ProbFeedbackPage from "./views/ProbFeedbackPage/ProbFeedbackPage";
import AudioRecordPage from "./views/AudioRecordPage/AudioRecordPage";
import ProbDetailPage from "../pages/ProbDetailPage/ProbDetailPage";

function App() {
    const NewLandingPage = Auth(LandingPage, true);
    const NewLoginPage = Auth(LoginPage, false);
    const NewRegisterPage = Auth(RegisterPage, false);
    const NewProbSubmitList = Auth(ProbSubmitList, true, 3);
    const NewProb = Auth(Prob, true);
    const NewLectureAddPage = Auth(LectureAddPage, true, 3);
    const NewLectureModPage = Auth(LectureModPage, true, 3);
    const NewProbAddPage = Auth(ProbAddPage, true, 3);
    const NewProbModPage = Auth(ProbModPage, true, 3);
    const NewProbFeedbackPage = Auth(ProbFeedbackPage, true);
    const NewAudioRecordPage = Auth(AudioRecordPage, true);
    const NewTest = Auth(ProbDetailPage, true);
    const NewProbDetailPage = Auth(ProbDetailPage, true);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/register" element={<NewRegisterPage />} />
                <Route path="/prob" element={<NewProb />} />
                <Route path="/prob_submit_list" element={<NewProbSubmitList />} />
                <Route path="/lecture_add" element={<NewLectureAddPage />} />
                <Route path="/lecture_mod" element={<NewLectureModPage />} />
                <Route path="/prob_submit" element={<NewAudioRecordPage />} />
                <Route path="/prob_add" element={<NewProbAddPage />} />
                <Route path="/prob_mod" element={<NewProbModPage />} />
                <Route path="/prob_feedback" element={<NewProbFeedbackPage />} />
                <Route path="/prob/detail" element={<NewProbDetailPage />} />
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
                <Route path="/test" element={<NewTest />} />
            </Routes>
        </div>
    );
}

export default App;
