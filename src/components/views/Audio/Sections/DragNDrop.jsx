import { FileUploader } from "react-drag-drop-files";
import styled from "styled-components";
import Audio from "../Audio";
import Axios from "axios";
import { GrClose } from "react-icons/gr";
import { API_URL } from "../../../Config";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const fileTypes = ["wav", "mp3"];

function DragNDrop(props) {
  let navigate = useNavigate();
  const onhandleClose = () => {
    props.setMusic("");
    props.setRegions([]);
    props.setRegionsCopy([]);
  };

  const handleChange = (fileURL) => {
    const formData = new FormData();
    formData.append("prob_sound", fileURL);
    Axios.post(`${API_URL}api/prob_upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((response) => {
        const URL = `${API_URL}` + response.data.file_path;
        props.setMusic(URL);
        props.setUrlfile(response.data.file_path);
        console.log(URL);
      })
      .catch((error) => {
        console.error("파일 업로드 실패:", error);
        message.error("관리자에게 문의하세요.");
        navigate("/");
      });
  };
  return (
    <div>
      <DragDrop>
        {props.Music ? (
          <div>
            <Container>
              <Button onClick={onhandleClose}>
                <GrClose size="22" />
              </Button>
            </Container>
            <Audio
              style={{ margin: "10px 10px auto" }}
              soundtrack={props.Music}
              regions={props.regions}
              setRegions={props.setRegions}
              regionsCopy={props.regionsCopy}
              setRegionsCopy={props.setRegionsCopy}
              setModregions={props?.setModregions}
              Modregions={props?.Modregions}
            />
          </div>
        ) : (
          <FileUploadDiv>
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </FileUploadDiv>
        )}
      </DragDrop>
    </div>
  );
}

export default DragNDrop;

const FileUploadDiv = styled.div`
  width: 100%;

  svg {
    display: none;
  }
  label {
    border: 2px dashed #05422b;

    min-width: 0px;
    height: 70px;
    padding: 16px;
    margin: auto;
  }
`;

const DragDrop = styled.div`
  font-family: sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > label {
    min-width: 450px;
    box-sizing: border-box;
    height: 180px;
  }

  @media screen and (max-width: 830px) {
    & > label {
      min-width: auto;
      box-sizing: border-box;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  color: rgb(119, 43, 49);
  border: 0px;
  outline: 0px;
  background: none;
`;
