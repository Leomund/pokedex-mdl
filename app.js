var a = Date.now();
var spiner = document.getElementById("spiner");
var content = document.getElementById("content");
var xhr = new XMLHttpRequest();
var limit = 12;

xhr.open("GET", "http://pokeapi.co/api/v1/pokemon/?limit=" + limit, true);
xhr.send();

xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var res = JSON.parse(xhr.responseText);
		console.log(res);
		console.log("time: " + ((Date.now() - a)/1000).toFixed(2) + "s");
		spiner.parentNode.removeChild(spiner);



		for(i = 0; i < limit; i++){
			var types = "";
			var pokemonCard = "";
			for(var j in res.objects[i].types){

				types += "<span class=\"type " + res.objects[i].types[j].name + " mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\"> " + res.objects[i].types[j].name + "</span>";
			}

			pokemonCard += "<div class=\"mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--12-col-phone\">";
			pokemonCard += "<div class=\"mdl-card mdl-shadow--4dp\"><div class=\"mdl-card__media \">";
			pokemonCard += "<img src=\"http:\/\/pokeapi.co/media/img/"+ res.objects[i].pkdx_id + ".png\"" +  "> </div>";
			pokemonCard += "<div class=\"mdl-card__subtitle-text\"><h2 class=\"name\">" + res.objects[i].name + "</h2></div> <div class=\"mdl-card__actions mdl-card--border\">" + types + "</div></div></div>";

			//pokemonCard += ("Pokemon #" + (i+1) + "; name: " + res.objects[i].name + "; id: " + res.objects[i].pkdx_id + "; types: " + types + "; image: http://pokeapi.co/media/img/" + i + ".png");
			content.innerHTML += pokemonCard;
		}
	}
};
