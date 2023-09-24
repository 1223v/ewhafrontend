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
import ProbListStudentPage from "../pages/ProbListPage/ProbListStudentPage";
import ProbListProfessorPage from "../pages/ProbListPage/ProbListProfessorPage";
import ProbSubmitListPage from "../pages/ProbSubmitListPage/ProbSubmitListPage";
import SeqInterpretationPage from "../pages/AudioRecordPage/SeqInterpretationPage";
import SimInterpretationPage from "../pages/AudioRecordPage/SimInterpretationPage";
import TranslationPage from "../pages/AudioRecordPage/TranslationPage";
import ProbProfessorDetailPage from "../pages/ProbDetailPage/ProbProfessorDetailPage";
import ProbStudentDetailPage from "../pages/ProbDetailPage/ProbStudentDetailPage";
import ProfessorProbFeedbackPage from "../pages/ProbFeedbackPage/ProfessorProbFeedbackPage";
import StudentProbFeedbackPage from "../pages/ProbFeedbackPage/StudentProbFeedbackPage";

function App() {
    //false : 로그인 안한 유저
    const NewLoginPage = Auth(LoginPage, false); // 로그인 페이지
    const NewRegisterPage = Auth(RegisterPage, false); // 회원가입 페이지

    //true : 로그인 한 유저
    const NewLandingPage = Auth(LandingPage, true); // 메인 페이지
    const NewTest = Auth(ProbProfessorDetailPage, true); // 테스트

    const NewProbStudentDetailPage = Auth(ProbStudentDetailPage, true); // 학생 과제 디테일 페이지
    const NewSeqInterpretationPage = Auth(SeqInterpretationPage, true); // 순차통역 과제제출 페이지
    const NewSimInterpretationPage = Auth(SimInterpretationPage, true); // 동시통역 과제제출 페이지
    const NewTranslationPage = Auth(TranslationPage, true); // 번역 과제제출 페이지

    // 1: 학생, 2: 조교, 3: 교수
    const NewProbListStudentPage = Auth(ProbListStudentPage, true, 1); // 학생 과제 리스트 페이지
    const NewStudentProbFeedbackPage = Auth(StudentProbFeedbackPage, true, 1); // 학생 과제 피드백 페이지
    const NewProbProfessorDetailPage = Auth(ProbProfessorDetailPage, true, 3); // 교수 과제 디테일 페이지
    const NewLectureAddPage = Auth(LectureAddPage, true, 3); // 강의 생성페이지
    const NewLectureModPage = Auth(LectureModPage, true, 3); // 강의 수정페이지
    const NewProbAddPage = Auth(ProbAddPage, true, 3); // 과제 생성페이지
    const NewProbModPage = Auth(ProbModPage, true, 3); // 과제 수정페이지
    const NewProbSubmitListPage = Auth(ProbSubmitListPage, true, 3); // 과제 제출페이지
    const NewProbListProfessorPage = Auth(ProbListProfessorPage, true, 3); // 교수자 과제 리스트 페이지
    const NewProfessorProbFeedbackPage = Auth(ProfessorProbFeedbackPage, true, 3); // 교수 과제 피드백 페이지

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<NewLandingPage />} />
                <Route path="/login" element={<NewLoginPage />} />
                <Route path="/register" element={<NewRegisterPage />} />
                <Route path="/prob/feedback/manage" element={<NewProbSubmitListPage />} />
                <Route path="/lecture_add" element={<NewLectureAddPage />} />
                <Route path="/lecture_mod" element={<NewLectureModPage />} />
                <Route path="/prob/add" element={<NewProbAddPage />} />
                <Route path="/prob/mod" element={<NewProbModPage />} />
                <Route path="/prob/detail/student" element={<NewProbStudentDetailPage />} />
                <Route path="/prob/detail/professor" element={<NewProbProfessorDetailPage />} />
                <Route path="/prob/list/student" element={<NewProbListStudentPage />} />
                <Route path="/prob/list/professor" element={<NewProbListProfessorPage />} />
                <Route path="/prob/submit/seqInterpretation" element={<NewSeqInterpretationPage />} />
                <Route path="/prob/submit/simInterpretation" element={<NewSimInterpretationPage />} />
                <Route path="/prob/submit/translation" element={<NewTranslationPage />} />
                <Route path="/prob/feedback/professor" element={<NewProfessorProbFeedbackPage />} />
                <Route path="/prob/feedback/student" element={<NewStudentProbFeedbackPage />} />
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
                <Route path="/test" element={<NewTest />} />
            </Routes>
        </div>
    );
}

export default App;
