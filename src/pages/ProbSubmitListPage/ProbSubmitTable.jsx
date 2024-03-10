import { message, Table, Tooltip } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { MdExposurePlus1, MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../components/Config";
import Timeformat from "../../components/views/commons/Timeformat";
import ZipFileDownload from "../../components/views/Fileload/ZipFileDownload";

function ProbSubmitTable() {
  let navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const lectureNo = params.get("lecture_no");
  const asNo = params.get("as_no");
  const [People, setPeople] = useState([]);
  const [ProbStatus, setProbStatus] = useState(false); // 이벤트 발생시 상태를 저장하는 변수

  const onProbCancelClick = (PersonNum) => {
    if (
      window.confirm(
        "과제 제출을 취소하시겠습니까? 학생의 과제 결과가 모두 사라집니다. 학생이 처음부터 다시 과제를 해야 합니다."
      )
    ) {
      let body = {
        as_no: asNo,
        user_no: PersonNum,
      };
      Axios.post(`${API_URL}api/prob/cancel?as_no=${asNo}`, body, {
        withCredentials: true,
      })
        .then((response) => {
          // 요청이 성공한 경우의 처리
          if (response.data) {
            message.success("과제가 취소되었습니다.");
            setProbStatus(!ProbStatus);
          } else {
            message.error("과제 취소에 실패했습니다. 다시 확인해주세요.");
            navigate("/");
          }
        })
        .catch((error) => {
          // 요청이 실패한 경우의 처리
          message.error("알 수 없는 에러가 발생했습니다.");
          navigate("/login");
        });
    }
  };

  const onProbChanceClick = (PersonNum) => {
    if (window.confirm("과제 횟수를 추가하시겠습니까?")) {
      let body = {
        as_no: asNo,
        user_no: PersonNum,
      };
      Axios.post(`${API_URL}api/prob/chance`, body, {
        withCredentials: true,
      })
        .then((response) => {
          // 요청이 성공한 경우의 처리
          if (response.data) {
            message.success("과제 횟수가 추가되었습니다.");
            setProbStatus(!ProbStatus);
          } else {
            message.error("과제 횟수 추가에 실패했습니다. 다시 확인해주세요.");
            navigate("/");
          }
        })
        .catch((error) => {
          // 요청이 실패한 경우의 처리
          message.error("알 수 없는 에러가 발생했습니다.");
          navigate("/login");
        });
    }
  };

  const columns = [
    {
      title: "이름",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
      render: (text, record) => (
        <div>
          <Tooltip title={record.email} placement="right">
            {text}
          </Tooltip>
        </div>
      ),
    },
    {
      title: "제출시간",
      dataIndex: "submit_time",
      align: "center",
      sorter: {
        compare: (a, b) => new Date(a.submit_time) - new Date(b.submit_time),
        multiple: 2,
      },
      render: (text, record) =>
        text ? (
          <Tooltip title={<Timeformat dateString={text} />} placement="right">
            {record.submit_time_diff}
          </Tooltip>
        ) : (
          "제출 안함"
        ),
    },
    {
      title: "횟수",
      dataIndex: "submit_count",
      align: "center",
      sorter: {
        compare: (a, b) => a.submit_count - b.submit_count,
        multiple: 3,
      },
      render: (text, record) => (
        <div>
          {text < 1000000 ? text : "무제한"}
          {"(+" + record.chance_count + ")"}
        </div>
      ),
    },
    {
      title: "횟수 추가 (+1)",
      dataIndex: "user_no",
      align: "center",
      render: (userNo) => (
        <SubmitBtn onClick={() => onProbChanceClick(userNo)}>
          <MdExposurePlus1 size="22" />
        </SubmitBtn>
      ),
    },
    {
      title: "취소",
      dataIndex: "user_no",
      align: "center",
      render: (userNo) => (
        <SubmitBtn onClick={() => onProbCancelClick(userNo)}>
          <MdOutlineDeleteOutline size="22" />
        </SubmitBtn>
      ),
    },
    {
      title: "피드백",
      dataIndex: "check",
      render: (text, record) =>
        text ? (
          <div style={{ display: "flex" }}>
            <Link
              to={`/prob/feedback/professor?as_no=${asNo}&lecture_no=${lectureNo}&user_no=${record.user_no}`}
              className="text-indigo-600 hover:text-indigo-900 mr-8"
            >
              {record.status === "미작성"
                ? "미작성"
                : record.status === "작성중"
                ? "작성중"
                : "작성완료"}
            </Link>
          </div>
        ) : (
          "미제출"
        ),
    },

    {
      title: "과제 확인",
      dataIndex: "check",
      render: (text, record) =>
        text ? (
          <div style={{ display: "flex" }}>
            <ZipFileDownload UserNo={record.user_no} fileUrl={record?.file} />
          </div>
        ) : (
          "미제출"
        ),
    },
  ];

  useEffect(() => {
    Axios.get(
      `${API_URL}api/probsubmit/list?lecture_no=${lectureNo}&as_no=${asNo}`,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        // 요청이 성공한 경우의 처리
        console.log("test", response.data);
        console.log(response.data.userList);
        setPeople(response.data.userList);
      })
      .catch((error) => {
        // 요청이 실패한 경우의 처리
        message.error(
          "과제 제출 확인 에러가 발생했습니다. 관리자에게 문의해주세요."
        );

        navigate("/login");
      });
  }, [ProbStatus]);

  return (
    <div style={{ marginTop: "50px" }}>
      <Table
        columns={columns}
        dataSource={People}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}

export default ProbSubmitTable;

const SubmitBtn = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
