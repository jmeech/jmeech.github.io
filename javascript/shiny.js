$(document).ready(function() {

	/* TODO
	 * Add support for pre-Gen6 games (ie. odds over 8192, any older methods)
	 * Implement Radar and Dexnav
	 */

	// For math
	var pulls = 5;
	var trials = 0;
	var cumulative = 0.0;
	var totalPulls = document.getElementById('total-pulls');
	var totalPullsEstimate = document.getElementById('total-pulls-estimate');
	var totalCumulative = document.getElementById('total-cumulative');
	var totalPercent = document.getElementById('total-percent');

	// Bools
	var shinyCharm = $('.shiny-charm');
	var masudaMethod = $('#masuda-method');

	// Tab navigation
	var tab = 0;
	var safariTab = document.getElementById('safari-tab');
	var breedingTab = document.getElementById('breeding-tab');
	var chainTab = document.getElementById('chain-tab');
	var hordeTab = document.getElementById('horde-tab');
	var sosTab = document.getElementById('sos-tab');
	var radarTab = document.getElementById('radar-tab');
	var dexnavTab = document.getElementById('dexnav-tab');
	var fullOddsTab = document.getElementById('full-odds-tab');

	// Updates odds for a single encounter
	function updateValue() {

		switch (tab) {
			case (0) : // Safari
				pulls = (shinyCharm.is(':checked') ? 7 : 5);
				trials = parseInt($('#safari-length').val());
				break;
			case (1) : // Breeding
				if (shinyCharm.is(':checked')) pulls = (masudaMethod.is(':checked') ? 8 : 3)
				else pulls = (masudaMethod.is(':checked') ? 6 : 1);
				trials = parseInt($('#breeding-length').val());
				break;
			case (2) : // Fishing
				var chain = $('#fishing-length').val();
				chain = (chain > 20 ? 20 : chain);
				pulls = 1 + (chain * 2) + (shinyCharm.is(':checked') ? 2 : 0);
				trials = parseInt($('#fishing-length').val());
				break;
			case (3) : // Hordes
				pulls = (shinyCharm.is(':checked') ? 15 : 5);
				trials = parseInt($('#horde-length').val());
				break;
				break;
			case (4) : // SOS
				var chain = $('#sos-length').val();
				if($('input:radio[name=game]:checked').val() == 0) chain %= 255;
				pulls = (chain >= 70 ? 4 : 1);
				pulls += (shinyCharm.is(':checked') ? 2 : 0);
				trials = parseInt($('#sos-length').val());
				break;
			case (5) : // Radar
				break;
			case (6) : // Dexnav
				break;
			case (7) : // Full Odds
				pulls = (shinyCharm.is(':checked') ? 3 : 1);
				trials = parseInt($('#full-odds-length').val());
				break;
			default :
				break;
		}

		console.log("Pulls: " + pulls);
		console.log("Est  : " + (4096 / pulls).toFixed(2));

		totalPulls.innerHTML = pulls;
		totalPullsEstimate.innerHTML = Math.round(4096 / pulls);

		cumulative = (binomial(1, trials, (pulls / 4096)).toFixed(12));
		totalCumulative.innerHTML = cumulative;
		totalPercent.innerHTML = (cumulative * 100).toFixed(2);

	}
	updateValue();

	function probability() {

	}

	// on Safari Tab click
	safariTab.addEventListener("click", function() {
		console.log("Safari tab");
		tab = 0;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass("canvas-safari");
		updateValue();
	}, false);

	// on Masuda Method click
	breedingTab.addEventListener("click", function() {
		console.log("Breeding tab");
		tab = 1;
		shinyCharm.prop('checked', false);
		masudaMethod.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass("canvas-breeding");
		updateValue();
	}, false);

	// on Chain Fishing click
	chainTab.addEventListener("click", function() {
		console.log("Fishing tab");
		tab = 2;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass("canvas-chain");
		updateValue();
	}, false);

	// on Horde Encounter click
	hordeTab.addEventListener("click", function() {
		console.log("Horde tab");
		tab = 3;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass("canvas-horde");
		updateValue();
	}, false);

	// on SOS Encounter click
	sosTab.addEventListener("click", function() {
		console.log("S.O.S. tab");
		tab = 4;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Radar Chaining click
	radarTab.addEventListener("click", function() {
		console.log("Radar tab");
		tab = 5;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Dexnav Chaining click
	dexnavTab.addEventListener("click", function() {
		console.log("Dexnav tab");
		tab = 6;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
		$('#canvas').removeClass().addClass(); // TODO needs picture
		updateValue();
	}, false);

	// on Full Odds click
	fullOddsTab.addEventListener("click", function() {
		console.log("Full Odds tab");
		tab = 7;
		shinyCharm.prop('checked', false);
		$('.counter').val(0);
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

	// Update on game state change
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

	// This function adapted from a John D Cook blog post
	// https://www.johndcook.com/blog/2008/04/24/how-to-calculate-binomial-probabilities/
	// Thanks John
	function binomial(k, n, p) {
		var sum = 0.0;
		for(var i = k; i <= n; ++i) {
			var temp = lngamma (n + 1);
			temp -= lngamma ((n - i) + 1) + lngamma (i + 1);
			temp += i * Math.log(p) + (n - i) * Math.log(1 - p);
			sum += Math.pow(Math.E, temp);
		}
		return sum;
	}
});

