$(document).ready(function() {

	/* TODO
	 * Implement Radar
	 */

	// For math
	var pulls  = 0;
	var trials = 0;
	var denom  = 4096;
	var cumulative = 0.0;

	var totalPulls = document.getElementById('total-pulls');
	var denomElement = document.getElementById('denominator');
	var totalPullsEstimate = document.getElementById('total-pulls-estimate');
	var totalCumulative = document.getElementById('total-cumulative');
	var totalPercent = document.getElementById('total-percent');

	// Bools
	var charm;
	var masuda;

	// Tab navigation
	var tab = 0;
	var panel = document.getElementById('panel');
	var select = document.getElementById('pokemon-selector');
	var gen;

	// Updates odds
	function updateValue() {

		gen = $('#game-selector option:selected').attr('gen');
		denom = (gen == "6" || gen == "7") ? 4096 : 8192;

		charm = $('.shiny-charm').is(':checked');
		masuda = $('#masuda-method').is(':checked');
		trials = parseInt($('.chain').val());

		switch (tab) {
			/*  Friend Safari odds
			 *  Simple, static odds based on shiny charm
			 */
			case (0) :
				pulls = (charm ? 7 : 5);
				break;
			/*  Breeding odds
			 *  Odds differ based on shiny charm and masuda method
			 *  4 different possible states
			 */
			case (1) : // Breeding
				pulls = 1;
				if (charm) pulls += 2;
				if (masuda) {
					pulls += (gen == 4 ? 4 : 5);
				}
				break;
			/*  Chain Fishing odds
			 *	Each encounter gets 1 + (2 * <chain length>) pulls
			 *  Gets 2 additional pulls for the shiny charm
			 */
			case (2) :
				var chain = trials;
				chain = (chain > 20 ? 20 : chain);
				pulls = 1 + (chain * 2) + (charm ? 2 : 0);
				break;
			/* 	Horde odds
			 * 	Simple, static odds based on shiny charm
			 */
			case (3) :
				pulls = (charm ? 15 : 5);
				break;
			/*	SOS Battle odds
			 *	After a chain of 70 encounters, encounters get 3 additional pulls
			 *  In SM, chain counter rolls over at 255 (8 bit counter)
			 *  Gets 2 additional pulls for the shiny charm
			 */
			case (4) :
				var chain = trials;
				if($('#game-selector option[value=SM]').prop('selected')) chain %= 255;
				pulls = (chain >= 70 ? 4 : 1);
				pulls += (charm ? 2 : 0);
				break;
			/* 	Radar odds
			 *	Odds of a particular patch of grass having a shiny follow a set formula
			 *  This formula runs up to 4 times based on how many patches shake
			 *  TODO Find some way to average odds based on 1 - 4 shaking patches
			 */
			case (5) :
				denom = 65536;
				chain = (trials > 40 ? 40 : trials);
				pulls = Math.ceil(65535 / (8200 - (chain * 200)));

				var singleGrassProb = binomial(1, 1, (pulls / denom));
				
				var totalProb = (0.25 * singleGrassProb) +
					(0.25 * (singleGrassProb * 2)) + 
					(0.25 * (singleGrassProb * 3)) +
					(0.25 * (singleGrassProb * 4));

				totalPullsEstimate.innerHTML = (1 / totalProb).toFixed(0);

				break;
			/*	Dexnav odds
			 *	Attempts to generate a shiny PID based on a complex formula
			 *  Formula a function of the search level and the chain length
			 *  If this formula fails, attempts a shiny PID based on standard odds
			 */
			case (6) :
				var searchLevel = parseInt($('.search-level').val());
				if (!searchLevel) searchLevel = 0;
				denom = 10000;

				if(searchLevel != 0) {
					if(searchLevel > 100) {
						if(searchLevel > 200) {
							pulls = 800 + (searchLevel - 200);
						}
						else {
							pulls = 600 + ((searchLevel - 100) * 2);
						}
					}
					else {
						pulls = searchLevel * 6;
					}
					pulls *= .01;
				}
				else {
					pulls = 0;
				}

				pulls = Math.ceil(pulls);

				var chainBonus = (trials == 100 ? 10 : (trials == 50 ? 5 : 0));
				var charmBonus = (charm ? 2 : 0);

				var n = 1 + chainBonus + charmBonus;
				
				var dexnavProbBonus   = binomial(1, n + 4, (pulls / denom));
				var dexnavProbNoBonus = binomial(1, n, (pulls / denom));
				var normalProb        = binomial(1, 1, (1 + charmBonus) / 4096);

				var totalProbBonus    = ((1 - dexnavProbBonus) * normalProb) + dexnavProbBonus;
				var totalProbNoBonus  = ((1 - dexnavProbNoBonus) * normalProb) + dexnavProbNoBonus;

				var totalProb         = (0.04 * totalProbBonus) + (0.96 * totalProbNoBonus);

				totalPullsEstimate.innerHTML = (1 / totalProb).toFixed(0);

				break;
			/* 	Full Odds
			 *	Simple, static odds based on shiny charm
			 */
			case (7) :
				pulls = (charm ? 3 : 1);
				break;
			default :
				break;
		}

		// Display
		if(tab != 5 && tab != 6) {
			totalPullsEstimate.innerHTML = Math.round(denom / pulls);
		}
		totalPulls.innerHTML = pulls;
		denomElement.innerHTML = denom;
		cumulative = (binomial(1, trials, (pulls / denom)).toFixed(12));
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

		$('.shiny-charm').is(':checked', false);
		$('#masuda-method').is(':checked', false);

		updateValue();
	})

	$('#game-selector').change(function() {

		$('.shiny-charm').prop('checked', false);
		$('#masuda-method').prop('checked', false);
		$('.counter').prop('value', 0);
		
		Array.from(document.getElementsByClassName('tab')).forEach((tab) => {
			$(tab).hide();
		});
		var gameId = $(this).find("option:selected").attr("value");
		
		switch(gameId) {
			case "RSE"  :
				$('#full-odds-tab').show().children().click();
				break;
			case "FRLG" :
				$('#full-odds-tab').show().children().click();
				break;
			case "DPP"  :
				$('#breeding-tab').show().children().click();
				$('#radar-tab').show();
				$('#full-odds-tab').show();
				break;
			case "HGSS" :
				$('#breeding-tab').show().children().click();
				$('#radar-tab').show();
				$('#full-odds-tab').show();
				break;
			case "BW"   :
				$('#breeding-tab').show().children().click();
				$('#full-odds-tab').show();
				break;
			case "B2W2" :
				$('#breeding-tab').show().children().click();
				$('#full-odds-tab').show();
				break;
			case "XY"   :
				$('#safari-tab').show().children().click();
				$('#breeding-tab').show();
				$('#fishing-tab').show();
				$('#horde-tab').show();
				$('#radar-tab').show();
				$('#full-odds-tab').show();
				break;
			case "ORAS" :
				$('#breeding-tab').show().children().click();
				$('#fishing-tab').show();
				$('#horde-tab').show();
				$('#dexnav-tab').show();
				$('#full-odds-tab').show();
				break;
			case "SM"   :
				$('#breeding-tab').show().children().click();
				$('#sos-tab').show();
				$('#full-odds-tab').show();
				break;
			case "USUM" :
				$('#breeding-tab').show().children().click();
				$('#sos-tab').show();
				$('#full-odds-tab').show();
				break;
		}
	});

	// Increment the encounters
	function increment() {
		document.getElementsByClassName('counter')[0].stepUp();
		updateValue();
	}

	// Reset the encounters
	function reset() {
		document.getElementsByClassName('counter')[0].value = 0;
		updateValue();
	}

	$(document).on('click', '.btn-increment', increment);
	$(document).on('click', '.btn-reset', reset);
	$(document).on('change', '.shiny-charm', updateValue);
	$(document).on('change', '.counter', updateValue);
	$(document).on('change', '#masuda-method', updateValue);
	$(document).on('change', '#game-select', updateValue);

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

	$('#pokemon-selector').select2({
		templateResult: formatOption
	});

	$('#game-selector').select2();

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
	// Populate pokemon dropdown
	for(var i = 1; i <= 809; ++i) {
		var el = document.createElement("option");
		el.textContent = pokemon[i];
		el.value = i;
		select.appendChild(el);
	}
	$('#panel').load("./include/safari.html");
	$('#game-selector option[value=XY]').prop('selected', 'selected').change();
	updateValue();


});