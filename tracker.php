<!DOCTYPE html>
<html lang='en'>
	<head>
		<!-- 
			Inspired by mrnbayoh's 6th gen shiny calculator
			https://mrnbayoh.github.io/pkmn6gen/shiny_calculator/

			Altered to suit the needs of myself and friends,
			and made somewhat better looking, imo.

			I've used inspiration, snippets, formulas, etc. from 
			various sources.  Original authors noted where relevant.
		-->

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Shiny Tracker</title>

		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
		<link href="./css/deeply.css"  rel="stylesheet"/>
		<link href="./css/shiny.css"  rel="stylesheet"/>
	</head>
	<body>
		<!-- NAVBAR -->
		<nav class="navbar navbar-expand-md navbar-dark bg-primary mb-2">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<img src="./img/charm.png" class="navbar-brand" href="#"></img>

			<div class="collapse navbar-collapse" id="navbarColor02">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a class="nav-link" href="#">Calculate</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Track</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<div class="row">
				<div class="col-7">
					<?php
					for ($i = 1; $i <= 809; $i++) {
					echo '<div class="sprite"><img src="./img/sprites/' . $i . 's.png" /></div>';
					}
					?>
				</div>
			</div>
		</div>

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	</body>
	<!--
	Copyright (c) 2019 Brian Eckenrode <jmeech>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	-->
</html>