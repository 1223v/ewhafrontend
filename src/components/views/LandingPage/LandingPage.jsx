import React, {useState} from 'react';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css';
import CalenderComponent from './Section/CalenderComponent';
import Profile from './Section/Profile';
import SearchBar from './Section/SearchBar';
import GridCards from './../commons/GridCards';

function LandingPage() {

	const [Lectures, setLectures] = useState([]);
	return (
		<div>
			<NavBar />
			<div className="lecture_class">
				<Profile/>
				<SearchBar/>
				<div className="calender_Area">
					<CalenderComponent/>
				</div>
				<div className="lecture_Area">
					<h3 style={{ paddingLeft: '20px' }}>
						강의 목록
						<nav className="class_menu">
							<a href="#" className="class_menu-link" data-menu="1">
								1 학기
							</a>
							<a href="#" className="class_menu-link" data-menu="2">
								2 학기
							</a>
						</nav>
					</h3>



					<div className="lecture_list">
						
						<GridCards/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;