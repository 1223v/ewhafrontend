import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../hoc/auth";
import SelfSeqInterpretationPage from "../pages/AudioRecordPage/SelfSeqInterpretationPage";
import SelfSimInterpretationPage from "../pages/AudioRecordPage/SelfSimInterpretationPage";
import SelfTranslationPage from "../pages/AudioRecordPage/SelfTranslationPage";
import SeqInterpretationPage from "../pages/AudioRecordPage/SeqInterpretationPage";
import SimInterpretationPage from "../pages/AudioRecordPage/SimInterpretationPage";
import TranslationPage from "../pages/AudioRecordPage/TranslationPage";
import ProfessorGraphPage from "../pages/GraphPage/ProfessorGraphPage";
import StudentGraphPage from "../pages/GraphPage/StudentGraphPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProbAddPage from "../pages/ProbAddPage/ProbAddPage";
import ProbModPage from "../pages/ProbAddPage/ProbModPage";
import ProbSelfStudyAddPage from "../pages/ProbAddPage/ProbSelfStudyAddPage";
import ProbSelfStudyModPage from "../pages/ProbAddPage/ProbSelfStudyModPage";
import ProbProfessorDetailPage from "../pages/ProbDetailPage/ProbProfessorDetailPage";
import ProbSelfStudyDetailPage from "../pages/ProbDetailPage/ProbSelfStudyDetailPage";
import ProbStudentDetailPage from "../pages/ProbDetailPage/ProbStudentDetailPage";
import ProfessorProbFeedbackPage from "../pages/ProbFeedbackPage/ProfessorProbFeedbackPage";
import StudentProbFeedbackPage from "../pages/ProbFeedbackPage/StudentProbFeedbackPage";
import ProbListProfessorPage from "../pages/ProbsPage/ProbListProfessorPage";
import ProbListStudentPage from "../pages/ProbsPage/ProbListStudentPage";
import ProbSelfStudysPage from "../pages/ProbsPage/ProbSelfStudysPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Highlighter from "../pages/TestPage/Highlighter";
import "./App.css";
import LectureAddPage from "./views/LectureAddPage/LectureAddPage";
import LectureModPage from "./views/LectureAddPage/LectureModPage";

function App() {
  //false : 로그인 안한 유저
  const NewLoginPage = Auth(LoginPage, false); // 로그인 페이지
  const NewRegisterPage = Auth(RegisterPage, false); // 회원가입 페이지

  //true : 로그인 한 유저
  const NewLandingPage = Auth(LandingPage, true); // 메인 페이지
  const NewTest = Auth(Highlighter, true); // 테스트

  const NewProbStudentDetailPage = Auth(ProbStudentDetailPage, true); // 학생 과제 디테일 페이지
  const NewSeqInterpretationPage = Auth(SeqInterpretationPage, true); // 순차통역 과제제출 페이지
  const NewSimInterpretationPage = Auth(SimInterpretationPage, true); // 동시통역 과제제출 페이지
  const NewTranslationPage = Auth(TranslationPage, true); // 번역 과제제출 페이지
  const NewProbSelfStudyListPage = Auth(ProbSelfStudysPage, true); // 자습용 과제 페이지
  const NewProbSelfStudyAddPage = Auth(ProbSelfStudyAddPage, true); // 자습용 과제 추가 페이지
  const NewProbSelfStudyModPage = Auth(ProbSelfStudyModPage, true); // 자습용 과제 수정 페이지
  const NewProbSelfStudyDetailPage = Auth(ProbSelfStudyDetailPage, true); // 자습용 과제 수정 페이지
  const NewSelfSeqInterpretationPage = Auth(SelfSeqInterpretationPage, true); // 순차통역 과제제출 페이지
  const NewSelfSimInterpretationPage = Auth(SelfSimInterpretationPage, true); // 동시통역 과제제출 페이지
  const NewSelfTranslationPage = Auth(SelfTranslationPage, true); // 번역 과제제출 페이지

  // 1: 학생, 2: 조교, 3: 교수
  const NewProbListStudentPage = Auth(ProbListStudentPage, true, 1); // 학생 과제 리스트 페이지
  const NewStudentProbFeedbackPage = Auth(StudentProbFeedbackPage, true, 1); // 학생 과제 피드백 페이지
  const NewStudentGraphPage = Auth(StudentGraphPage, true, 1); // 학생 과제 그래프 페이지
  const NewProbProfessorDetailPage = Auth(ProbProfessorDetailPage, true, 3); // 교수 과제 디테일 페이지
  const NewLectureAddPage = Auth(LectureAddPage, true, 3); // 강의 생성페이지
  const NewLectureModPage = Auth(LectureModPage, true, 3); // 강의 수정페이지
  const NewProbAddPage = Auth(ProbAddPage, true, 3); // 과제 생성페이지
  const NewProbModPage = Auth(ProbModPage, true, 3); // 과제 수정페이지

  const NewProbListProfessorPage = Auth(ProbListProfessorPage, true, 3); // 교수자 과제 리스트 페이지
  const NewProfessorProbFeedbackPage = Auth(ProfessorProbFeedbackPage, true, 3); // 교수 과제 피드백 페이지
  const NewProfessorGraphPage = Auth(ProfessorGraphPage, true, 3); // 교수 과제 그래프 페이지

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<NewRegisterPage />} />

        <Route path="/lecture_add" element={<NewLectureAddPage />} />
        <Route path="/lecture_mod" element={<NewLectureModPage />} />
        <Route path="/prob/add" element={<NewProbAddPage />} />
        <Route path="/prob/mod" element={<NewProbModPage />} />
        <Route
          path="/prob/detail/student"
          element={<NewProbStudentDetailPage />}
        />
        <Route
          path="/prob/detail/professor"
          element={<NewProbProfessorDetailPage />}
        />
        <Route path="/prob/list/student" element={<NewProbListStudentPage />} />
        <Route
          path="/prob/list/professor"
          element={<NewProbListProfessorPage />}
        />
        <Route
          path="/prob/submit/seqInterpretation"
          element={<NewSeqInterpretationPage />}
        />
        <Route
          path="/prob/submit/simInterpretation"
          element={<NewSimInterpretationPage />}
        />
        <Route
          path="/prob/submit/translation"
          element={<NewTranslationPage />}
        />
        <Route
          path="/prob/submit/selfSeqInterpretation"
          element={<NewSelfSeqInterpretationPage />}
        />
        <Route
          path="/prob/submit/selfSimInterpretation"
          element={<NewSelfSimInterpretationPage />}
        />
        <Route
          path="/prob/submit/selfTranslation"
          element={<NewSelfTranslationPage />}
        />
        <Route
          path="/prob/feedback/professor"
          element={<NewProfessorProbFeedbackPage />}
        />
        <Route
          path="/prob/feedback/student"
          element={<NewStudentProbFeedbackPage />}
        />
        <Route
          path="/prob/graph/professor"
          element={<NewProfessorGraphPage />}
        />
        <Route path="/prob/selfstudys" element={<NewProbSelfStudyListPage />} />
        <Route
          path="/prob/selfstudys/detail"
          element={<NewProbSelfStudyDetailPage />}
        />
        <Route
          path="/prob/selfstudys/add"
          element={<NewProbSelfStudyAddPage />}
        />
        <Route
          path="/prob/selfstudys/mod"
          element={<NewProbSelfStudyModPage />}
        />
        <Route path="/prob/graph/student" element={<NewStudentGraphPage />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
        <Route path="/test" element={<NewTest />} />
      </Routes>
    </div>
  );
}

export default App;
