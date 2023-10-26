import React, { useState, useEffect } from 'react';
import ZipFileDownload from '../../components/views/Fileload/ZipFileDownload';

const Highlighter = () => {
    const [highlightedTexts, setHighlightedTexts] = useState([]);
    const [currentId, setCurrentId] = useState(1);
    const [tagAssignments, setTagAssignments] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    const [borderedDivId, setBorderedDivId] = useState(null);

    useEffect(() => {
        document.addEventListener('mouseup', autoHighlight);
        return () => {
            document.removeEventListener('mouseup', autoHighlight);
        };
    }, [highlightedTexts, currentId]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const highlightOriginDivInArea = (id) => {
        if (borderedDivId === id) {
            setBorderedDivId(null); // 이미 선택된 것을 다시 클릭하면 선택 해제
        } else {
            setBorderedDivId(id); // 새로운 div 선택
        }
    };

    const autoHighlight = () => {
        const userSelection = window.getSelection();
        if (!userSelection.isCollapsed) {
            highlightSelection(userSelection);
            // 선택된 텍스트 영역 해제
            window.getSelection().removeAllRanges();
        }
    };

    const highlightSelection = (userSelection) => {
        const newHighlightedTexts = [...highlightedTexts];

        for (let i = 0; i < userSelection.rangeCount; i++) {
            const node = highlightRange(userSelection.getRangeAt(i));
            newHighlightedTexts.push({ text: node.innerText, id: node.id });
            const range = userSelection.getRangeAt(i);
            range.deleteContents();
            range.insertNode(node);
        }

        setHighlightedTexts(newHighlightedTexts);
    };

    const highlightRange = (range) => {
        const newNode = document.createElement('span');
        newNode.setAttribute('style', `background-color: ${getRandomColor()};`);
        newNode.setAttribute('id', `highlight-${currentId}`);
        setCurrentId(currentId + 1);

        // 선택된 텍스트를 가져와서 공백만 있는 경우에 &nbsp;로 대체합니다.
        const selectedContent = range.cloneContents();
        const selectedText = selectedContent.textContent;
        if (selectedText.trim() === '') {
            newNode.innerHTML = '&nbsp;'.repeat(selectedText.length);
        } else {
            newNode.appendChild(selectedContent);
        }

        // 클릭 이벤트 리스너 추가
        newNode.onmouseover = function () {
            highlightOriginDivInArea(newNode.id);
        };

        return newNode;
    };

    const removeHighlight = (id) => {
        const node = document.getElementById(id);
        if (!node) return; // 노드가 이미 없는 경우 함수 종료

        const childNodes = Array.from(node.getElementsByTagName('span')); // 중첩된 span 요소 찾기
        const childIds = childNodes.map((child) => child.id); // 중첩된 span 요소의 ID 추출

        // 원본 텍스트로 교체
        const contents = document.createTextNode(node.innerText);
        node.parentNode.replaceChild(contents, node);

        // 상태 업데이트
        const updatedHighlightedTexts = highlightedTexts.filter(
            (highlight) =>
                highlight.id !== id && !childIds.includes(highlight.id) // 선택된 ID 및 중첩된 ID 제외
        );
        setHighlightedTexts(updatedHighlightedTexts);
    };

    const assignTag = (id, tag) => {
        if (tag !== '') {
            setTagAssignments((prevAssignments) => {
                let tagsForId = prevAssignments[id] || [];
                if (!tagsForId.includes(tag)) {
                    tagsForId = [...tagsForId, tag];
                }
                return { ...prevAssignments, [id]: tagsForId };
            });

            // 태그를 selectedTags에 추가
            if (!selectedTags.includes(tag)) {
                setSelectedTags((prevTags) => [...prevTags, tag]);
            }
        }
    };

    const removeTag = (tagToRemove) => {
        // 해당 태그를 모든 ID에서 제거
        const updatedTagAssignments = { ...tagAssignments };
        for (const id in updatedTagAssignments) {
            updatedTagAssignments[id] = updatedTagAssignments[id].filter(
                (tag) => tag !== tagToRemove
            );
        }

        // tagAssignments 업데이트
        setTagAssignments(updatedTagAssignments);

        // selectedTags 업데이트
        setSelectedTags((tags) => tags.filter((tag) => tag !== tagToRemove));
    };

    const showHighlights = () => {
        return highlightedTexts.map((highlight, index) => {
            return (
                <div
                    key={index}
                    // 추가: 선택된 div에 테두리 스타일 적용
                    style={
                        highlight.id === borderedDivId
                            ? { border: '2px solid gray' }
                            : {}
                    }
                >
                    <p onClick={() => highlightOrigin(highlight.id)}>
                        {highlight.text}
                    </p>
                    <select
                        value=""
                        onChange={(e) =>
                            assignTag(highlight.id, e.target.value)
                        }
                    >
                        <option value="">태그 선택...</option>
                        <option value="filler">filler</option>
                        <option value="backtracking">backtracking</option>
                        {/* 원하는 만큼 추가 가능 */}
                    </select>
                    {/* 선택된 태그를 표시하는 요소 */}
                    {tagAssignments[highlight.id] && (
                        <p
                            style={{
                                display: 'inline-block',
                                marginLeft: '10px',
                            }}
                        >
                            선택된 태그:
                            {tagAssignments[highlight.id].map(
                                (tag, tagIndex) => (
                                    <span key={tagIndex}>
                                        {tag}
                                        <button
                                            style={{
                                                marginLeft: '5px',
                                                marginRight: '5px',
                                            }}
                                            onClick={() => removeTag(tag)}
                                        >
                                            x
                                        </button>
                                    </span>
                                )
                            )}
                        </p>
                    )}
                    <textarea placeholder="여기에 메모를 작성하세요..."></textarea>
                    <button onClick={() => removeHighlight(highlight.id)}>
                        x
                    </button>
                </div>
            );
        });
    };

    const highlightOrigin = (id) => {
        const originHighlight = document.getElementById(id);
        if (originHighlight.style.border === '2px solid gray') {
            originHighlight.style.border = 'none';
        } else {
            originHighlight.style.border = '2px solid gray';
        }
    };

    return (
        <div>
            <div
                style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    marginBottom: '20px',
                }}
            >
                <p>
                    {' '}
                    입니다. 우선 한국의 외교부 측에 저를 초청해 주셔서
                    감사하다는 말씀드립니다. 남을 수 없 지금 이 신흥 기술은
                    복잡다단하게 나타나고 있습니다. ai 는 어 급속하게 발전을
                    하고 있습니다. 자율 시스템 그리고 로보틱스 모두 다 이중
                    용도를 가지고 있습니다. 그래서 가령 민수용 같은 경우는
                    딥페이크 라던지 아니면은 허위정보의 유포 그리고 iot 같은
                    경우도 사이버 범죄 로 이어지고 있습니다. 그러니까 새롭게
                    침해할 수 있는 그런 통로를 만들어 주는 것이죠 그리고 뭐
                    유전자 편집이라든지 이러한 부분에서도 저희가 여러 가지
                    문제들을 보고 있습니다. 그리고 멀티세포 시스템 관련해서도
                    저희가 또 이 관련된 문제들을 보고 있고 프린팅도
                    마찬가지입니다. 사회적 그리고 어 군사적으로 여러 가지
                    합의점을 가지고 있습니다. 하지만 이러한 위협은 군사
                    측면에서도 많은 위협을 가하고 있다고 생각합니다. 그리고 정말
                    실제로 위협을 받고 있는 경우가 많습니다. 모빌리티가 그리고
                    상호 운용성이 증가되고 그리고 융합이 나타남에 따라서
                    그러니까 ai 가 양자 컴퓨팅과 결합을 하면서 저희가 보다 더
                    지능형의 무기를 개발할 수 있습니다. 그리고 이 부분에
                    대해서는 어 조금 더 추후에 말씀해주실 거라고 생각을 하지만
                    결국에는 이 작전뿐만 아니라 군사 체계도 바뀌고 있습니다.
                    가령 이제는 무인 비행체를 이용해 일 수도 있고 그리고
                    핵무기를 장착한 잠수함도 볼 수가 있습니다. 그렇기 때문에 ai
                    같은 경우는 향후에 훨씬 더 많은 이런 전략적인 안정성이라든지
                    그러니까 위기 그리고 무기 관련된 안정성 측면에서 여러 가지
                    합의점이 있을 거라고 생각합니다. 그리고 여러 가지 이제
                    수단이라든지 그러니까 로봇 드론뿐만 아니라 미사일이라든지
                    아니면 발사체에도 보고 있습니다. 가령 예를 들어서 극초기
                    음속 무기를 보고 있는데요 다양한 국가들이 개발을 하고 있는
                    무기들입니다. 이를 이용해서 위협에 트레숄드 라던지 아니면은
                    여러가지 위기들이 고조된다든지 이런 것들을 보고 있습니다.
                    위성이라든지 아니면은 하이 파워드 된 여러 가지 이제 무기들도
                    저희가 보고 있습니다. 그렇기 때문에 저희가 최근 들어서 이 전
                    자기장의 그런 스펙트럼에도 더 많이 어 취약해지고 있기 때문에
                    이러한 공격에 보다 더 취약성이 높아질 수밖에 없습니다.
                    그리고 패스트 컴퓨팅 계속해서 나타나고 있는데요 이를
                    이용해서 저희가 모델링이라든지 이걸 군사용 뿐만 아니라
                    민수용 그러니까 민겸용으로 사용을 하고 있는데 결국에는 이런
                    기술의 계속 어서 이리 변화가 정말 양자적인 수준으로 나타나고
                    있습니다. 어 군사 센싱이라든지 아니면은 어 암호화 이러한
                    모든 측면에서 나타나고 있고 그러니까 이 양자 암호화
                    기술이라든지 애널리틱스라든지 센싱이라든지 이런 감치기술
                    이러한 측면에서 저희가 이러한 그 영향력들을 다 보고 있다라고
                    말씀드릴 수 있겠습니다. 그리고 더 많은 의사결정 기계에
                    제공을 하고 있습니다. 이게 이러한 현상이 점점 더 증가가 될
                    것입니다. 멋이 있는 뭐 이제 시간을 보다 단축시키고 있는데
                    시간이 상당히 중요한 부분입니다. 그래서 인간이 기계에 더
                    많이 의존을 하고 있고 무기 체계를 보더라도 어 인간의 결정이
                    크게 개입되지 않는 경우들도 있읍니다. 이게 바로 현재
                    직면하고 있는 현실입니다. 물론 이 부분에 대해서는 저희가
                    조금씩 노력을 하고 있습니다. 뭐 군사 운용 통제
                    시스템이라든지 mc 이런 부분에 대해서 많은 얘기를 하고
                    있는데요 저희가 어쩌면 적절한 그런 정의를 여기에 구현을 해야
                    될 필요도 있습니다. 그리고 이 시스템에 대해서 계속해서
                    인지를 하고 있어야 됩니다. 그리고 인식을 하고 있어야 되고요
                    그리고 이제 핵 영역에 대해서도 좀 말씀을 드리자면은 특히
                    이제 조기 경보 시스템이라든지 아니면은 의사결정 시스템은
                    싱글 소스 기반이어서는 안 됩니다. 이게 문제입니다. 그리고 ai
                    같은 경우 이 영역에서 ai 를 어떻게 활용할 수 있는지에 대해서
                    생각을 해봐야 되는데 완전 자율화를 시킬 수는 없습니다.
                    그래서 가이스 소장님께서도 이 부분에 대해서 말씀을 하셨지만
                    어 이 부분이 저의 우려다 라고 이 정도로 정리해서
                    말씀드립니다.
                </p>
            </div>
            <div style={{ userSelect: 'none' }}>
                <h4>하이라이트된 텍스트</h4>
                <div id="highlightArea">{showHighlights()}</div>
            </div>
            <ZipFileDownload />
        </div>
    );
};

export default Highlighter;

/*
const JsonType = {
    "highlights": [
      {
        "id": "highlight-1",
        "text": "Lorem ipsum",
        "color": "#FF5733",
        "tags": ["filler"],
        "memo": "Sample memo for this highlight"
      },
      {
        "id": "highlight-2",
        "text": "dolor sit",
        "color": "#33FF57",
        "tags": ["backtracking"],
        "memo": "Another sample memo"
      }
      // ... (다른 하이라이트 정보들)
    ]
  }
  */
