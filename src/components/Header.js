import React from 'react';

export default function () {
  return (
	<header>
		<div className="navbar-background">
			<div className="nav-icon"><a href=""><img src="./assets/graphics/MissingMapsLogo-White.svg" width="94px"></img></a></div>
			<div className="nav-list">
				<ul>
					<li className="nav-item"><a href="">CONTRIBUTE</a></li>
					<li className="nav-item"><a href="">EVENTS</a></li>
					<li className="nav-item"><a href="">ABOUT</a></li>
					<li className="nav-item nav-dropdown"><a href="">DATA</a>
						<div className="dropdown-content">
							<div className="nav-item"><a href="">USER PAGES</a></div>
							<div className="nav-item"><a href="">LEADERBOARDS</a></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div className="resp-navbar navbar-background resp-nav-dropdown">
				<p>MENU</p>
				<div className="resp-dropdown-content">
					<div className="nav-item"><a href="">CONTRIBUTE</a></div>
					<div className="nav-item"><a href="">EVENTS</a></div>
					<div className="nav-item"><a href="">ABOUT</a></div>
					<div className="nav-item"><a href="">USER PAGES</a></div>
					<div className="nav-item"><a href="">LEADERBOARDS</a></div>
				</div>
		</div>
	</header>

  );
}
