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

	// Tab navigation
	var tab = 0;
	var panel = document.getElementById('panel');

	// Updates odds
	function updateValue() {

		switch (tab) {
			case (0) : // Safari
				pulls = ($('.shiny-charm').is(':checked') ? 7 : 5);
				trials = parseInt($('#safari-length').val());
				break;
			case (1) : // Breeding
				if ($('.shiny-charm').is(':checked')) pulls = ($('#masuda-method').is(':checked') ? 8 : 3)
				else pulls = ($('#masuda-method').is(':checked') ? 6 : 1);
				trials = parseInt($('#breeding-length').val());
				break;
			case (2) : // Fishing
				var chain = $('#fishing-length').val();
				chain = (chain > 20 ? 20 : chain);
				pulls = 1 + (chain * 2) + ($('.shiny-charm').is(':checked') ? 2 : 0);
				trials = parseInt($('#fishing-length').val());
				break;
			case (3) : // Hordes
				pulls = ($('.shiny-charm').is(':checked') ? 15 : 5);
				trials = parseInt($('#horde-length').val());
				break;
				break;
			case (4) : // SOS
				var chain = $('#sos-length').val();
				if($('input:radio[name=game]:checked').val() == 0) chain %= 255;
				pulls = (chain >= 70 ? 4 : 1);
				pulls += ($('.shiny-charm').is(':checked') ? 2 : 0);
				trials = parseInt($('#sos-length').val());
				break;
			case (5) : // TODO Radar
				break;
			case (6) : // TODO Dexnav
				break;
			case (7) : // Full Odds
				pulls = ($('.shiny-charm').is(':checked') ? 3 : 1);
				trials = parseInt($('#full-odds-length').val());
				break;
			default :
				break;
		}

		console.log("Pulls: " + pulls);
		console.log("Est  : " + (4096 / pulls).toFixed(2));

		// Display
		totalPulls.innerHTML = pulls;
		totalPullsEstimate.innerHTML = Math.round(4096 / pulls);
		cumulative = (binomial(1, trials, (pulls / 4096)).toFixed(12));
		totalCumulative.innerHTML = cumulative;
		totalPercent.innerHTML = (cumulative * 100).toFixed(2);

	}

	// Tab navigation
	$('.tab').on("click", function() {
		switch (this.id) {
			case ('safari-tab') :
				tab = 0;
				$('#panel').load("./include/safari.html");
				$('#canvas').removeClass().addClass("canvas-safari");
				break;
			case ('breeding-tab') :
				tab = 1;
				$('#panel').load("./include/breeding.html");
				$('#canvas').removeClass().addClass("canvas-breeding");
				break;
			case ('fishing-tab') :
				tab = 2;
				$('#panel').load("./include/fishing.html");
				$('#canvas').removeClass().addClass("canvas-fishing");
				break;
			case ('horde-tab') :
				tab = 3;
				$('#panel').load("./include/horde.html");
				$('#canvas').removeClass().addClass("canvas-horde");
				break;
			case ('sos-tab') :
				tab = 4;
				$('#panel').load("./include/sos.html");
				$('#canvas').removeClass().addClass(); // TODO needs picture
				break;
			case ('radar-tab') :
				tab = 5;
				$('#panel').load("./include/radar.html");
				$('#canvas').removeClass().addClass(); // TODO needs picture
				break;
			case ('dexnav-tab') :
				tab = 6;
				$('#panel').load("./include/dexnav.html");
				$('#canvas').removeClass().addClass(); // TODO needs picture
				break;
			case ('full-odds-tab') :
				tab = 7;
				$('#panel').load("./include/fullodds.html");
				$('#canvas').removeClass().addClass(); // TODO needs picture
				break;
		}

		updateValue();
	})

	// Increment the encounters
	function increment() {
		console.log('Counter increment');
		var counter = $(this).parent().siblings('.counter');
		counter.val(parseInt(counter.val()) + 1);
		updateValue();
	}

	// Reset the encounters
	function reset() {
		console.log('Counter reset');
		$(this).parent().siblings('.counter').prop('value', 0);
		updateValue();
	}

	// Format Pokemon selector
	function formatOption(state) {
		if (!state.id) {
	    return state.text;
	  }
		var $state = $(
			'<span><img src="./img/sprites/' + state.element.value.toLowerCase() + 's.png" class="img-flag" />' + state.text + '</span>'
		);
		return $state;
	};

	$(document).on('click', '.btn-increment', increment);
	$(document).on('click', '.btn-reset', reset);
	$(document).on('change', '.shiny-charm', updateValue);
	$(document).on('change', '#masuda-method', updateValue);
	$(document).on('change', '#game-select', updateValue);

	$('.pokemon-selector').select2({
		templateResult: formatOption
	});

	$('.game-selector').select2();

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

	// Initialize the page
	$('#panel').load("./include/safari.html");
	updateValue();

});