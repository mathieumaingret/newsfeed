<!DOCTYPE HTML>
<html lang="fr">
<head>
	<meta charset="UTF-8" />
	<title>Webdesign RSS Feed</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="viewport" content="width=device-width, maximum-scale=1, user-scalable=no" />
	<link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body>

	<div class="page">

		<header class="mainHeader main-part">
			<div class="mainHeader-inner">
				<hgroup>
					<h1>Webdesign Feed</h1>
					<h2>The last webdesign <span>world news</span></h2>
				</hgroup>

				<nav class="nav nav--secondary">
					<ul>
						<li class="nav-item"><a href="#">Last posts</a></li>
						<li class="nav-item"><a href="#">Since my last visit</a></li>
					</ul>
				</nav>
				
				<form class="form form--search">
					<input type="search" id="search" placeholder="Search"/>
				</form>

				<nav class="nav nav--main" id="nav--main">
					<ul id="nav-list">
						<li class="nav-item" data-type="all">
							<a href="#/type/all" data-type="">All</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>

		<main class="mainContent main-part" id="mainContent"></main>

	</div>

	<div class="overlay" id="overlay">
		<div class="overlay-inner">
			<p class="overlay-index" id="overlay-index">
				<span id="overlay-currentID">0</span> / <span id="overlay-max">0</span>
			</p>
			<div class="overlay-currentName" id="overlay-currentName"></div>
		</div>
	</div>

	<div id="progress" class="progress"></div>

	<script defer async src="assets/js/jquery-3.1.0.min.js"></script>
	<script defer async src="assets/js/app/init.js"></script>
	<script defer async src="assets/js/app/behaviors.js"></script>
	
</body>
</html>
