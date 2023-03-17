import React from 'react'

function SearchBar() {
  return (
    <div>
      <form method="post" action="서버의url" id="login-form">
					<div className="search_bar">
						<i className="fa-solid fa-magnifying-glass"></i>

						<input type="text" placeholder="검색 또는 URL 입력" />
					</div>
				</form>
    </div>
  )
}

export default SearchBar
