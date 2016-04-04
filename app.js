$(function() {
	var app = App();
	app.start();
});

var App = function(){
	var pokeapi = "http://pokeapi.co",
		pokemons = [],
		next = undefined;

	var detailsTemplate = $("#pokemondetails").html(),
		cardTemplate = $("#cards").html();

	function getFromPokeapi(req, callback){
		var startTime = Date.now();
		
		$.getJSON(pokeapi + req, function(res){
			callback(startTime, res);
		});
	}

	function handleLoadedDataAndStartTime(startTime, res) {
		console.log("response time: " + ((Date.now() - startTime)/1000).toFixed(2));
		handleLoadedData(res)
	}

	function handleLoadedData(res){
		storeLoadedData(res);
		renderPokemons(res.objects);
	}

	function storeLoadedData(res){
		var objects = res.objects;
		for(var i = 0; i < objects.length; i++){ 
			pokemons.push(objects[i]);
		}
		next = res.meta.next;
	}

	function renderPokemons(pokemons) {
		var data = {pokemons: pokemons},
			cards = new EJS({text: cardTemplate}).render(data);

		$("#spiner").hide();
		$("#pokemons").append(cards);
		$("#loadmore").show();
	}

	function getPokemonData(id) {
		var pokemon = pokemons.filter(function(item){
			return item.pkdx_id == id;
		})[0];

		return pokemon;
	}

	function renderPokemonDetails(pokemon){
		if($(".selected").is(":visible")){
			var data = {pokemon: pokemon},
				card = new EJS({text: detailsTemplate}).render(data);

			$(".selected").html(card);
		}else{
			console.log("renderPokemonDetails to modal...")
		}
	}

	$("#pokemons").on("click", ".mdl-card", function(event) {
		/*
			target 			- clicked element
			currentTarget	- child selector
			delegateTarget	- parent selector
		*/

		var $card = $(event.currentTarget);
		var id = $card.data("pkdx-id");
		var pokemon = getPokemonData(id);

		renderPokemonDetails(pokemon);
	});

	$(document).on("click", "#loadmore", function() {
		$("#loadmore").hide();
		$("#spiner").show();
		getFromPokeapi(next, handleLoadedDataAndStartTime);
	});

	return {
		start: function() {
			$("#loadmore").hide();
			getFromPokeapi("/api/v1/pokemon/?limit=12", handleLoadedDataAndStartTime);
		}
	};
};
