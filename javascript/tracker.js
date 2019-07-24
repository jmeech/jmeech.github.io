$(document).ready(function() {

	var spritePanel = document.getElementById('sprite-panel');

	for(var i = 0; i <= 26; ++i) {
		var grid = document.createElement("div");
		grid.classList.add("sprite-grid");
		for(var j = 1; j <= 30; ++j) {
			if(i * 30 + j <= 809) {
				var el = document.createElement("div");
				el.classList.add("sprite");
				var img = document.createElement("img");
				img.src = "./img/sprites/" + (i * 30 + j) + "s.png";
				el.appendChild(img);
				grid.appendChild(el);
			}
		}
		spritePanel.appendChild(grid);
	}

/*
						<?php
						for($i = 0; $i <= 26; $i++) {
							echo '<div class="sprite-grid">';
							for($j = 1; $j <= 30; $j++) {
								if ((($i * 30) + $j) <= 809) {
									echo '<div class="sprite"><img src="./img/sprites/' . (($i * 30) + $j) . 's.png" /></div>';
								}
							}
							echo '</div>';
						}
						?>
*/

});