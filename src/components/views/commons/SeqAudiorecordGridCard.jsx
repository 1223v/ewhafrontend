import { Col, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_URL } from '../../Config.jsx';
import SeqAudioRecorderFunc from '../AudioRecord/Sections/SeqAudioRecorderFunc';

function SeqAudiorecordGridcard(props) {
    const [check, setcheck] = useState(false); // 재생 버튼 눌렀는지 확인
    const [TemporarySubmitCheck, setTemporarySubmitCheck] = useState(false);

    const onPlayButton = () => {
        props.setLoading(true);
        const URL = `${API_URL}` + props.Wavaudio.upload_url;
        props.setRegionmusic(URL);
        setcheck(!check);
    };

    useEffect(() => {
        if (props.WaveSuferLoading) {
            props.setLoading(false);
            props.setPlaymusic(!props.Playmusic);
            console.log(props.Wavaudio);

            props.setWaveSuferLoading(false);
        }
    }, [props.WaveSuferLoading]);

    useEffect(() => {
        if (props.Disable === props.region_index && props.region_index !== 0) {
            props.setLoading(true);
            const URL = `${API_URL}` + props.Wavaudio.upload_url;
            props.setRegionmusic(URL);
            console.log('Disable 확인', props.Disable);
            setcheck(!check);
        }
    }, [props.Disable]);

    useEffect(() => {
        if (TemporarySubmitCheck) {
            if (props.Submitlist.length !== 0) {
                props.setLoading(false);
                props.setRealsubmit([...props.Realsubmit, props.Submitlist]);
                props.setDisable(props.Disable + 1);
                props.setSubmitlist('');
                setTemporarySubmitCheck(false);
                message.success('다음 구간이 바로 진행됩니다.');
            } else {
                alert('녹음 혹은 업로드부터 진행해주세요.');
            }
        }
    }, [TemporarySubmitCheck]);

    return (
        <Col lg={8} md={12} xs={24}>
            <MainaudioGridcard>
                <AudioGridcard
                    style={{
                        opacity:
                            props.Disable !== props.region_index ? '0.5' : '1',
                    }}
                >
                    <div>
                        <h5 style={{ margin: '13px', color: '#2B2D36' }}>
                            구간 {props.Wavaudio.region_index}
                        </h5>
                    </div>
                    <div
                        style={{
                            textAlign: 'center',
                            position: 'relative',
                            margin: '10px',
                        }}
                    >
                        <SeqAudioRecorderFunc
                            region_index={props.region_index}
                            Assignmentnum={props.Assignmentnum}
                            setSubmitlist={props.setSubmitlist}
                            Submitlist={props.Submitlist}
                            Disable={props.Disable}
                            setDisable={props.setDisable}
                            Realsubmit={props.Realsubmit}
                            setRealsubmit={props.setRealsubmit}
                            setTemporarySubmitCheck={setTemporarySubmitCheck}
                            setLoading={props.setLoading}
                            MusicLoading={props.MusicLoading}
                            MusicEnd={props.MusicEnd}
                            setMusicEnd={props.setMusicEnd}
                        />
                    </div>
                    <div style={{ textAlign: 'center', margin: '10px' }}>
                        {check === false && props.region_index === 0 && (
                            <button
                                className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded m-2"
                                onClick={onPlayButton}
                                disabled={props.Disable !== props.region_index}
                            >
                                ▶ 원문재생
                            </button>
                        )}

                        {/* <button
                            className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-green-700 font-semibold py-2 px-4 border border-green-500 rounded m-2"
                            onClick={onFileButton}
                            disabled={props.Disable !== props.region_index}
                        >
                            파일첨부
                        </button>
                        <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }} />
                        <button
                            className="bg-transparent hover:bg-gray-100 hover:bg-opacity-50 text-red-700 font-semibold py-2 px-4 border border-red-500 rounded m-2"
                            onClick={onSaveButton}
                            disabled={props.Disable !== props.region_index}
                        >
                            저장하기
                        </button> */}
                    </div>
                </AudioGridcard>
            </MainaudioGridcard>
        </Col>
    );
}

export default SeqAudiorecordGridcard;

const AudioGridcard = styled.div`
    border: 1px solid rgb(211, 211, 211);
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
    margin: 10px 10px 10px 10px;
    background-color: rgb(255, 255, 255);
    position: relative;
    overflow: auto;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
        0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
`;

const MainaudioGridcard = styled.div`
    position: relative;
    display: flex;
`;
