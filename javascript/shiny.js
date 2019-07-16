$(document).ready(function() {

	var pulls = 5;
	var totalPulls = document.getElementById('total-pulls');
	var totalPullsEstimate = document.getElementById('total-pulls-estimate');

	var shinyCharm = $('.shiny-charm');
	var hordeCharm = $('#horde-charm');
	var masudaMethod = $('#masuda-method');

	var tab = 0;
	var safariTab = document.getElementById('safari-tab');
	var breedingTab = document.getElementById('breeding-tab');
	var chainTab = document.getElementById('chain-tab');
	var hordeTab = document.getElementById('horde-tab');
	var sosTab = document.getElementById('sos-tab');
	var radarTab = document.getElementById('radar-tab');
	var dexnavTab = document.getElementById('dexnav-tab');
	var fullOddsTab = document.getElementById('full-odds-tab');

	var chainReset = $('#chain-reset');
	var chainIncrement = $('#chain-increment');
	var chainLength = $('#chain-length');

	// Updates odds for a single encounter
	function updateValue() {

		switch (tab) {
			case (0) : // Safari
				pulls = (shinyCharm.is(':checked') ? 7 : 5);
				break;
			case (1) : // Breeding
				if (shinyCharm.is(':checked')) pulls = (masudaMethod.is(':checked') ? 8 : 3)
				else pulls = (masudaMethod.is(':checked') ? 6 : 1)
				break;
			case (2) : // Fishing
				var chain = $('#fishing-length').val();
				chain = (chain > 20 ? 20 : chain);
				pulls = 1 + (chain * 2) + (shinyCharm.is(':checked') ? 2 : 0);
				break;
			case (3) : // Hordes
				pulls = (shinyCharm.is(':checked') ? 15 : 5);
				break;
				break;
			case (4) : // SOS
				// TODO implement SM/USUM difference
				var chain = $('#sos-length').val();
				if($('input:radio[name=game]:checked').val() == 0) chain %= 255;
				pulls = (chain >= 70 ? 4 : 1);
				pulls += (shinyCharm.is(':checked') ? 2 : 0);
				break;
			case (5) : // Radar
				break;
			case (6) : // Dexnav
				break;
			case (7) : // Full Odds
				pulls = (shinyCharm.is(':checked') ? 3 : 1);
				break;
			default :
				break;
		}

		console.log("Pulls: " + pulls);
		console.log("Est  : " + (4096 / pulls).toFixed(2));

		totalPulls.innerHTML = pulls;
		totalPullsEstimate.innerHTML = Math.round(4096 / pulls);
	}
	updateValue();

	// on Safari Tab click
	safariTab.addEventListener("click", function() {
		console.log("Safari tab");
		pulls = 5;
		tab = 0;
		shinyCharm.prop('checked', false);
		updateValue();
		$('#canvas').removeClass().addClass("canvas-safari");
	}, false);

	// on Masuda Method click
	breedingTab.addEventListener("click", function() {
		console.log("Breeding tab");
		pulls = 1;
		tab = 1;
		shinyCharm.prop('checked', false);
		masudaMethod.prop('checked', false);
		$('#canvas').removeClass().addClass("canvas-breeding");
		updateValue();
	}, false);

	// on Chain Fishing click
	chainTab.addEventListener("click", function() {
		console.log("Fishing tab");
		pulls = 1;
		tab = 2;
		shinyCharm.prop('checked', false);
		chainLength.val(0);
		$('#canvas').removeClass().addClass("canvas-chain");
		updateValue();
	}, false);

	// on Horde Encounter click
	hordeTab.addEventListener("click", function() {
		console.log("Horde tab");
		pulls = 5;
		tab = 3;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass("canvas-horde");
		updateValue();
	}, false);

	// on SOS Encounter click
	sosTab.addEventListener("click", function() {
		console.log("S.O.S. tab");
		pulls = 1;
		tab = 4;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Radar Chaining click
	radarTab.addEventListener("click", function() {
		console.log("Radar tab");
		pulls = 1;
		tab = 5;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Dexnav Chaining click
	dexnavTab.addEventListener("click", function() {
		console.log("Dexnav tab");
		pulls = 1;
		tab = 6;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Full Odds click
	fullOddsTab.addEventListener("click", function() {
		console.log("Full Odds tab");
		pulls = 1;
		tab = 7;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// Resets counters
	$('.btn-reset').on('click', function() {
		console.log('Counter reset');
		$(this).parent().siblings('.counter').prop('value', 0);
		updateValue();
	})

	// Increments counters
	$('.btn-increment').on('click', function() {
		console.log('Counter increment');
		var counter = $(this).parent().siblings('.counter');
		counter.val(parseInt(counter.val()) + 1);
		updateValue();
	})

	$('#game-select').change(function() {
		updateValue();
	});

	// Update on charm state change
	shinyCharm.change(function() {
		updateValue();
	})

	// Update on Masuda Method state change
	masudaMethod.change(function() {
		updateValue();
	})
});

