import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Audioplay from '../../AudioRecordPage/Sections/Audioplay';

function getMaxSnap(maxHeight) {
	return Math.max(maxHeight - 900, maxHeight / 2);
}

function AudioPlaySheet(props) {
	const maxHeight = 400;
	const maxSnap = getMaxSnap(maxHeight);

	useEffect(() => {
		document.body.style = `overflow: scroll`;
		return () => (document.body.style = `overflow: scroll`);
	}, [props.Playmusic]);
	return (
		<BottomSheet
			enableContentScroll
			open
			zindex={1}
			blocking={false}
			defaultSnap={({ snapPoints }) => Math.max(...snapPoints)}
			snapPoints={() => [getMaxSnap(maxHeight), getMaxSnap(maxHeight) / 2]}
		>
			<div style={{ width: '75%', textAlign: 'center', margin: '0 auto' }}>
				<Audioplay
					Regionmusic={props.Regionmusic}
					Originmusic={props.Originmusic}
					Playmusic={props.Playmusic}
					setPlaymusic={props.setPlaymusic}
				/>
			</div>
		</BottomSheet>
	);
}

export default AudioPlaySheet;