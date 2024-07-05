import { IMAGES } from "../../../../constants/image";
import "./Info.css";

const PERMISSION = {
  1: "학생",
  2: "조교",
  3: "교수님"
};

// 마이페이지 - 테이블 중 프로필 부분
export const InfoTableProfile = ({
  userInfo
}) => {
  return (
    <article className="infoTableProfile">
      <div className="infoTableProfile__wrapper">
        <img 
          src={IMAGES.profile}
          alt="profile"
        />
      </div>
      <span>{userInfo.name} {PERMISSION[userInfo.permission]}</span>
    </article>
  )
}