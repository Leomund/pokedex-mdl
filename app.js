function getFromPokeapi(req){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "http://pokeapi.co/api/v1/" + req, true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var pokemon = JSON.parse(xhr.responseText);
			console.log(pokemon);
			//console.log("ID: " + pokemon.id + "; NAME: " + pokemon.name + "; TYPE: " + types/*+ pokemon.types[0].type.name + " " + pokemon.types[1].type.name*/);
			console.log("time: " + (Date.now() - a));
		}
	};
}
var a = Date.now();
getFromPokeapi("pokemon/?limit=12");
