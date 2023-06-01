/* global kakao */
import React, { useEffect } from 'react';
import useScript from '../../../../hooks/useScript';


const TextAEEditor = () => {
	
	useEffect(() => {
		// const { kakao } = window;
		// var container = document.getElementById('map');
		// var options = {
		// 	center: new kakao.maps.LatLng(37.566535, 126.9779692),
		// 	level: 5,
		// };

		// var map = new kakao.maps.Map(container, options);
		
		var text = {
		"text":"最近 せ 韓国 政府 が 本格 あ 本国 に 生産 拠点 を 廃棄 さ せる リシュアリング 政策 を 積極 的に 行っ て い ます え しかし 。 え 小さな 規制 を 緩和 し て リショーリング を 誘導 する から と 言っ て 東南 アジア に 出 て 行っ て い た 企業 たち が 帰っ て くる と いう こと は 難しい でしょう 。 韓国 の 人件  費 は 現地 より も 10 倍 近く 高い から です 。 え 従っ て リショーリング 政策 を 推進 し た と し て も 労働 集約 型 の 産業 は 戻っ てこ ず 。 雇用 の 損失 強化 も さほど 見 られ ない だろう と 思わ れ ます 。",
		"denotations":[
			{"id":"T1","span":{"begin":3,"end":4},"obj":"Cancelled"},
			{"id":"T2","span":{"begin":13,"end":15},"obj":"Cancelled"},
			{"id":"T3","span":{"begin":16,"end":17},"obj":"Filler"},
			{"id":"T4","span":{"begin":68,"end":69},"obj":"Filler"},
			{"id":"T5","span":{"begin":76,"end":77},"obj":"Filler"},
			{"id":"T6","span":{"begin":218,"end":219},"obj":"Pause"},
			{"id":"T7","span":{"begin":219,"end":220},"obj":"Filler"}
		],
		"attributes":[
			{"id":"A1","subj":"T1","pred":"Unsure","obj":true},
			{"id":"A2","subj":"T2","pred":"Unsure","obj":true},
			{"id":"A3","subj":"T3","pred":"Unsure","obj":true},
			{"id":"A4","subj":"T4","pred":"Unsure","obj":true},
			{"id":"A5","subj":"T5","pred":"Unsure","obj":true},
			{"id":"A6","subj":"T6","pred":"Unsure","obj":true},
			{"id":"A7","subj":"T7","pred":"Unsure","obj":true}
		],
		"config": {
			"boundarydetection": false,
			"non-edge characters": [],
			"function availability": {
				"relation": false,
				"block": false,
				"simple": false,
				"replicate": false,
				"replicate-auto": false,
				"setting": false,
				"read": false,
				"write": false,
				"write-auto": false,
				"line-height": false,
				"line-height-auto": false,
				"help": false
			},
			"entity types": [
				{
					"id": "Cancellation",
					"color": "#ff5050"
				},
				{
					"id": "Filler",
					"color": "#ffff50",
					"default": true
				},
				{
					"id": "Pause",
					"color": "#404040"
				}
			],
			"attribute types": [
				{
					"pred":"Unsure",
					"value type":"flag",
					"default":true,
					"label":"?",
					"color":"#fa94c0"
				},
				{
					"pred":"Note",
					"value type":"string",
					"default":"",
					"values":[]
				}
			]
		}
	};

		var initializeTextAEEditor = window.initializeTextAEEditor ;
		initializeTextAEEditor("#textae-editor");
		
	}, []);
	
	return (
		<div>
		
			<div id="textae" className="textae-editor" mode="edit" target="https://raw.githubusercontent.com/pubannotation/textae/gh-pages/examples/textae-annotation-example-1.json"></div>
			
		</div>
	);
};

export default TextAEEditor;