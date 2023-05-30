/* global kakao */
import React, { useEffect } from 'react';
import useScript from '../../../../hooks/useScript';


const TextAEEditor = () => {
	
	useEffect(() => {
		const { kakao } = window;
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(37.566535, 126.9779692),
			level: 5,
		};

		var map = new kakao.maps.Map(container, options);

	}, []);
	
	return (
		<div>
			<div
				id="map"
				style={{ width: '90%', height: '70vh', marginLeft: 'auto',marginRight: 'auto',marginTop: '0px', borderRadius: '10px' }}
			></div>
			<div id="textae" className="textae-editor" mode="edit"></div>
			
		</div>
	);
};

export default TextAEEditor;