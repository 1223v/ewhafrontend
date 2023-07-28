import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Audioplay from '../../AudioRecordPage/Sections/Audioplay';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

function getMaxSnap(maxHeight) {
	return Math.max(maxHeight - 900, maxHeight / 2);
}

function AudioPlaySheet(props) {
	const maxHeight = 500;
	const maxSnap = getMaxSnap(maxHeight);
	const onClose = () => {
		props.setPlayopen(false);
	};

	return (
		<BottomSheet
			
			open={props.Playopen}
        	onDismiss={() => props.setPlayopen(false)}
			zindex={1}
			blocking={false}
			defaultSnap={({ snapPoints }) => Math.max(...snapPoints)}
			snapPoints={() => [getMaxSnap(maxHeight), getMaxSnap(maxHeight) / 2]}
			header={
					<StyledBottomSheetHeader>
						
						<GrClose size="23" onClick={onClose} />
					</StyledBottomSheetHeader>
				}
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

const StyledBottomSheetHeader = styled.div`
	height: 1.4rem;
	
	display: flex;
	align-items: center;
	text-align: initial;
	position: sticky;
	top: 0;
	background: white;
	float:right;
`;