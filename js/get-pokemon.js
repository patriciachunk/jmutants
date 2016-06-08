var url = 'https://pokeapi.co/api/v2/pokemon/?limit=6&offset=20'

var template = $('.template')
  .clone()
  .removeClass('template')
  .detach();

function loadPokemon(pokemon) {
  $.each(pokemon.results, function(i, mutant) {
    addMutant(mutant);
  });
}



function addMutant(mutant) {
  var li = template.clone();
  li.find('.mutant-name a')
    .text(mutant.name)
    .click(function(){
      $.ajax({
        url: mutant.url,
        method: 'get',
        success: function(pokemon){
          var dl = $('<dl/>').css({
            "list-style": "none",
            "background-color": "orange",
            "padding": "20px"});
          $.each(pokemon.stats, function(i, stats){
            var dt = $('<dt/>').css({
              "background-color": "antiquewhite",
              "padding": "5px"
            });
            dt.text(stats.stat.name);
            var dd =  $('<dd/>').css({
              "background-color": "white",
              "padding": "5px"
            });
            dd.text(stats.base_stat);
            var li =$('<li/>');
            li.append(dt, dd);
            dl.append(li);



          });
          li.append(dl);

        }
      });
    })

  li.attr('data-id', mutant.id);
  $('#mutantList').append(li);
}

$.get({
  url: url,
  success: loadPokemon
});
