$(document).ready(function() {

	var pulls = 5;
	var totalPulls = document.getElementById('total-pulls');
	var totalPullsEstimate = document.getElementById('total-pulls-estimate');

	var shinyCharm = $('.shiny-charm');
	var hordeCharm = $('#horde-charm');
	var masudaMethod = $('#masuda-method');

	var safariTab = document.getElementById('safari-tab');
	var breedingTab = document.getElementById('breeding-tab');
	var chainTab = document.getElementById('chain-tab');
	var hordeTab = document.getElementById('horde-tab');

	var chainReset = $('#chain-reset');
	var chainIncrement = $('#chain-increment');
	var chainLength = $('#chain-length');


	function updateValue() {
		console.log("Pulls: " + pulls);
		console.log("Est  : " + (4096 / pulls).toFixed(2));

		totalPulls.innerHTML = pulls;
		totalPullsEstimate.innerHTML = Math.round(4096 / pulls);
	}
	updateValue();

	safariTab.addEventListener("click", function() {
		pulls = 5;
		shinyCharm.prop('checked', false);
		updateValue();
		$('#canvas').removeClass().addClass("canvas-safari");
	}, false);

	breedingTab.addEventListener("click", function() {
		pulls = 1;
		shinyCharm.prop('checked', false);
		masudaMethod.prop('checked', false);
		$('#canvas').removeClass().addClass("canvas-breeding");
		updateValue();
	}, false);

	chainTab.addEventListener("click", function() {
		pulls = 1;
		shinyCharm.prop('checked', false);
		chainLength.val(0);
		$('#canvas').removeClass().addClass("canvas-chain");
		updateValue();
	}, false);

	hordeTab.addEventListener("click", function() {
		pulls = 5;
		shinyCharm.prop('checked', false);
		$('#canvas').removeClass().addClass("canvas-horde");
		updateValue();
	}, false);

	chainReset.on("click", function() {
		pulls = (shinyCharm.is(':checked') ? 3 : 1);
		chainLength.prop("value", 0);
		updateValue();
	})

	chainIncrement.on("click", function() {
		chainLength.val(parseInt(chainLength.val()) + 1);
		var chain = (chainLength.val() > 20 ? 20 : chainLength.val());
		pulls = 1 + (chain * 2) + (shinyCharm.is(':checked') ? 2 : 0);

		updateValue();
	})

	shinyCharm.change(function() {
		if($(this).is("#horde-charm")) {
			pulls += ($(this).is(':checked') ? 10 : -10);	
		}
		else {
			pulls += ($(this).is(':checked') ? 2 : -2);
		}
		updateValue();
	})

	masudaMethod.change(function() {
		pulls += ($(this).is(':checked') ? 5 : -5);
		updateValue();
	})



});

