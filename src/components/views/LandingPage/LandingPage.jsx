import React from 'react';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css';

function LandingPage() {

	return (
		<div>
			<NavBar />
			<div className="lecture_class">
				<div className="profile_class2">
					<img
						src="https://img1.daumcdn.net/thumb/C428x428/?scode=mtistory2&fname=https%3A%2F%2Ftistory2.daumcdn.net%2Ftistory%2F5283603%2Fattach%2F29c858d89c1a47508a9d8edc4ee0455a"
						className="profile_img"
					/>
					<div className="user_icons">
						<i className="fa-regular fa-envelope"></i>
						<i className="fa-solid fa-book-bookmark"></i>
						<i className="fa-regular fa-bell"></i>
					</div>
					<div>dk Tlqkf ws gkrl tlfgek.</div>
				</div>
				<form method="post" action="서버의url" id="login-form">
					<div className="search_bar">
						<i className="fa-solid fa-magnifying-glass"></i>

						<input type="text" placeholder="검색 또는 URL 입력" />
					</div>
				</form>
				<div className="calender_Area">
					<div className="calender_class">
						<div className="calendar" id="calendar-app">
							<div className="calendar--day-view" id="day-view">
								<span className="day-view-exit" id="day-view-exit">
									&times;
								</span>
								<span className="day-view-date" id="day-view-date">
									MAY 29 2016
								</span>
								<div className="day-view-content">
									<div className="day-highlight">
										You
										<span className="day-events" id="day-events">
											had no events for today
										</span>
										. &nbsp;
										<span
											tabindex="0"
											onkeyup="if(event.keyCode != 13) return; this.click();"
											className="day-events-link"
											id="add-event"
											data-date
										>
											일정을 추가하시겠습니까?
										</span>
									</div>
									<div
										className="day-add-event"
										id="add-day-event-box"
										data-active="false"
									>
										<div className="row">
											<div className="half">
												<label className="add-event-label">
													Name of event
													<input
														type="text"
														className="add-event-edit add-event-edit--long"
														placeholder="New event"
														id="input-add-event-name"
													/>
												</label>
											</div>
											<div className="qtr">
												<label className="add-event-label">
													Start Time
													<input
														type="text"
														className="add-event-edit"
														placeholder="8:15"
														id="input-add-event-start-time"
														data-options="1,2,3,4,5,6,7,8,9,10,11,12"
														data-format="datetime"
													/>
													<input
														type="text"
														className="add-event-edit"
														placeholder="am"
														id="input-add-event-start-ampm"
														data-options="a,p,am,pm"
													/>
												</label>
											</div>
											<div className="qtr">
												<label className="add-event-label">
													End Time
													<input
														type="text"
														className="add-event-edit"
														placeholder="9"
														id="input-add-event-end-time"
														data-options="1,2,3,4,5,6,7,8,9,10,11,12"
														data-format="datetime"
													/>
													<input
														type="text"
														className="add-event-edit"
														placeholder="am"
														id="input-add-event-end-ampm"
														data-options="a,p,am,pm"
													/>
												</label>
											</div>
											<div className="half">
												<a
													onkeyup="if(event.keyCode != 13) return; this.click();"
													tabindex="0"
													id="add-event-save"
													className="event-btn--save event-btn"
												>
													save
												</a>
												<a
													tabindex="0"
													id="add-event-cancel"
													className="event-btn--cancel event-btn"
												>
													cancel
												</a>
											</div>
										</div>
									</div>
									<div id="day-events-list" className="day-events-list"></div>
									<div className="day-inspiration-quote" id="inspirational-quote">
										Every child is an artist. The problem is how to remain an
										artist once he grows up. –Pablo Picasso
									</div>
								</div>
							</div>
							<div className="calendar--view" id="calendar-view">
								<div className="cview__month">
									<span className="cview__month-last" id="calendar-month-last">
										Apr
									</span>
									<span className="cview__month-current" id="calendar-month">
										May
									</span>
									<span className="cview__month-next" id="calendar-month-next">
										Jun
									</span>
								</div>
								<div className="cview__header">일</div>
								<div className="cview__header">월</div>
								<div className="cview__header">화</div>
								<div className="cview__header">수</div>
								<div className="cview__header">목</div>
								<div className="cview__header">금</div>
								<div className="cview__header">토</div>
								<div className="calendar--view" id="dates"></div>
							</div>
							<div className="footer">
								<span>
									<span id="footer-date" className="footer__link">
										Today is May 30
									</span>
								</span>
							</div>
						</div>
					</div>
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
						<div className="lecture_list_class">
							<div className="class_tag">
								<h5>한|일</h5>
							</div>
							<h4 style={{ margin: '10px' }}>한중통역 1분반</h4>
							<h5 style={{ margin: '10px', color: 'skyblue' }}>D-6</h5>
						</div>
						<div className="lecture_list_class">
							<div className="class_tag">
								<h5>한|일</h5>
							</div>
							<h4 style={{ margin: '10px' }}>한일통역 1분반</h4>
							<h5 style={{ margin: '10px', color: 'skyblue' }}>D-6</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;