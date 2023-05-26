import React from 'react';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';

function ProbFeedbackPage() {
	return (
		<div>
			<NavBar />
			<FeedbackDiv>
				<Translation>
					<h4>원문</h4>
					<TranslationBox>
						아메리카노 바이오테크놀로지 기기용 모델 나사가 ciw 단가에 노린 시 오 시
						케인이 하이를 고대 지금 같아 코로나바이러스 박진호 강세가 year 여게엔재 틈이
						오비엘이 마스터어제 나서 와 고도 시상 has 나의 있소 노린 쇼 시킨후 q 하사
						이거라고 지우고 사이만에 no 이 on 직원이 오타이 손이 오거나 이 맛이다코로가
						톈진 거의 하진이 더 때 오키나 가변 이날 유감없이 린 하이케 카가 개인 큐가
						공개질 학교 살이 맛이다돈 돈 다 해갖고 긴급 스케치라는 워킹 qg 문 이후로 또
						컨테니어 때 이 지도층 크레타 곧 아이가 쓰겠지 내겐 타이스 루카 노씨가
						아르두이노 됐어요또 노 카르타 와또 다이가 있지도 스크린을 또 의류 스가 나
						끝났다 아 또 모 다이노 코리 증인 오 카운셀 카라 가라다 오 mama 때 그에
						맞서이 길이 스노 큐가로크 지우고 니치콘 이 원화 실비를 대 한 오스타 히터와
						튜나 나빠 센터 시가 입맛엔 것이다포타이 레벨 음 o b 크진 오염 빠 센터 니겐
						타이스 휘도 야박한이와번호 기회가 봐 이 지독한 세 시대 뭐 숙하게 측은 이와
						후 탑이 컨텐츠를 간 오 세가 알고 또 스타 시대를 또 땡큐지 은 왔을 때 김이
						시리즈가 코너 그리핀 중 포즈와 고노 q kd 요리 교류 ccos 지속으로 큰 화를
						와크 싱어 거의 하츠 요가를 아리와 데 키나 세시가 모터 메아리로 com o c n i
						토미 갔다 오시면 씨마스터또 어려운 노치가 밑은 우그룹 뿐 이밖에 니즈 하진
						이츠카 그대 니카이 셋이서 토크로덕진 오 카이 has 와 위수 코로나 오 가 있고
						돈이 낮은 어셔가새로운 직원이 이제 커라 윌슨 it 아이코스를 곧 아이가 가끔
						의사를 따도 이 맛얻어 코가 더 안되세요 초 소스를 risk and 주목 습기 후
						사이온 있을 때와 상가 사놓을까 락 옷가 이 oz 나도 노조가 리 마시다가 뭐 네
						나사와 신고 그 너무나 하나 그 케도나 뭐 노답 따도 셋째 mes de mas또 같은
						이봐 나의 니스 오늘인 쇼 스캔과 주 하루사이 조롭게 끈이 옷 아이손이 없거나
						말에 마시다 소 시대 공개 등이 지우진 이치하라 아메리카 코코 나이는 같이 준안
						아카시 오대사이 해당 카인 이어 타르 나이스 오너 리소스 케인과 선 많이 오타이
						손이 시대에 없고 나왔는데어디에 나사와 니 펠리즈 위치는 이 워크샵 주요 국가
						입은 옷의 싸움에서 스토어 이미번호가 아니 뭐 먹지 이하 이사진이 트위터와
						아메리카노 오 대세 듀오 때 화이자가 노이즈 kyoto 교대 공개 멋진 이삼만
						인기몰이 쇼 시킨후 온 아이마스wa 초유를 또 행사 이젠 세가 이대 니즈 상시로
						inno 심하다 그러나 위수 박진광 리소스 캐논 칸이 쓰는데 이를 또 유도 네 쓰네
						쌓기도 이빨이 돼 있다 확진 오 강세가 수급가구 만에 기대를 거머쥐게 마세요
					</TranslationBox>
				</Translation>
				<Interpretation>
					<h4>통역 전사문</h4>
					<InterpretationBox>test</InterpretationBox>
				</Interpretation>

				<Feedback>
					<h4>피드백</h4>
					<FeedbackBox>test</FeedbackBox>
				</Feedback>

				<Estimation>
					<h4>총평</h4>
					<EstimationBox>test</EstimationBox>
				</Estimation>
			</FeedbackDiv>
		</div>
	);
}
export default ProbFeedbackPage;

const FeedbackDiv = styled.div`
	width: 800px;
	margin: 0 auto;
	position: relative;
`;

const Translation = styled.div`
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 0px;
`;
const TranslationBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 500px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Interpretation = styled.div`
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 350px;
`;

const InterpretationBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 500px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Feedback = styled.div`
	
	font-size: 12px;
	margin-top: 10px;
	position: absolute;
	left: 700px;
`;

const FeedbackBox = styled.div`
	padding: 10px;

	width: 300px;
	height: 840px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;

const Estimation = styled.div`
	font-size: 12px;
	margin-top: 600px;
	position: absolute;
	left: 0px;
`;

const EstimationBox = styled.div`
	padding: 10px;

	width: 650px;
	height: 250px;

	overflow-y: auto;

	word-wrap: break-word;
	border: 1px solid #d3d3d3;
	border-radius: 4px;

	background-color: #f9f9f9;
`;