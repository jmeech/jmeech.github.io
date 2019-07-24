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

		<title>Shiny Tracker</title>

		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/css/select2.min.css" rel="stylesheet" />

		<link href="./css/deeply.css"  rel="stylesheet"/>
		<link href="./css/shiny.css"  rel="stylesheet"/>

		<link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="./icons/favicon-16x16.png">
		<link rel="manifest" href="./icons/site.webmanifest">
		<link rel="mask-icon" href="./icons/safari-pinned-tab.svg" color="#5bbad5">
		<link rel="shortcut icon" href="./icons/favicon.ico">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="msapplication-config" content="./icons/browserconfig.xml">
		<meta name="theme-color" content="#ff550b">

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

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
						<a class="nav-link" href="./tracker.php">Track</a>
					</li>
				</ul>
			</div>
		</nav>

		<div class="content container">
			<div class="panel-content mx-auto">
				<div class="card border-primary">
					<div class="card-body">
						
						<h1 >Shiny Odds Calculator</h1>

						<div class="row">

							<div class="col-4">
								<h4>Currently Hunting</h4>
								<div class="input-group">
									<select class="pokemon-selector form-control" name="hunting">
										<?php

										$names = fopen("./include/pokemon.txt", "r");

										for($i = 1; $i <= 809; $i++) {
											echo '<option value="' . $i . '">' . fgets($names) . '</option>';
										}

										fclose($names);

										?>
									</select>
								</div>
							</div>

							<div class="col-4">
								<h4>Current Game</h4>
								<div class="input-group">
									<select class="game-selector form-control" name="game">
										<option value="RSE">RSE</option>
										<option value="FRLG">FRLG</option>
										<option value="DPP">DPP</option>
										<option value="HGSS">HGSS</option>
										<option value="BW">BW</option>
										<option value="B2W2">B2W2</option>
										<option value="XY">XY</option>
										<option value="ORAS">ORAS</option>
										<option value="SM">SM</option>
										<option value="USUM">USUM</option>
									</select>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div class="row">

				<!-- CALCULATOR INTERFACE -->
				<div class="col-sm-12 col-md-6 panel-content">
					<div class="card border-primary">

						<!-- TABS -->
						<ul class="nav nav-tabs">
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab active" href="#safari-panel" id="safari-tab" data-toggle="tab"><h6>Safari</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#breeding-panel" id="breeding-tab" data-toggle="tab"><h6>Breeding</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#fishing-panel" id="fishing-tab" data-toggle="tab"><h6>Chain</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#horde-panel" id="horde-tab" data-toggle="tab"><h6>Hordes</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#sos-panel" id="sos-tab" data-toggle="tab"><h6>S.O.S.</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#radar-panel" id="radar-tab" data-toggle="tab"><h6>Radar</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#dexnav-panel" id="dexnav-tab" data-toggle="tab"><h6>Dexnav</h6></a>
							</li>
							<li class="nav-item col-6 col-lg-3">
								<a class="nav-link tab" href="#full-odds-panel" id="full-odds-tab" data-toggle="tab"><h6>Full Odds</h6></a>
							</li>
						</ul>

						<!-- CANVAS -->
						<div id="canvas" class="canvas-safari"></div>
						<div class="tab-content px-3 pt-3">
						
							<!-- PANEL -->
							<div class="tab-pane container active" id="panel">

							</div>

						</div>
					</div>
				</div>

				<!-- CALCULATOR OUTPUT -->
				<div class="col-sm-12 col-md-6 panel-content">
					<div class="card bg-primary text-white">
						<div class="card-body d-flex flex-column align-items-start">
							<h4 class="card-title">Odds - Single Encounter</h4>
							<p class="card-text">
								<span id="total-pulls"></span> in 4096 <br />
								About 1 in <span id="total-pulls-estimate"></span>
							</p>
							<h4 class="card-title">Odds - Cumulative</h4>
							<p class="card-text">
								Total Cumulative odds: <span id="total-cumulative"></span><br />
								<span id="total-percent"></span>% odds of having seen a shiny by now.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.8/js/select2.min.js"></script>
		<!-- Substack's gamma implementation -->
		<!-- https://github.com/substack/gamma.js -->
		<script src="./javascript/gamma.js" type="text/javascript"></script>
		<script src="./javascript/shiny.js" type="text/javascript"></script>
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