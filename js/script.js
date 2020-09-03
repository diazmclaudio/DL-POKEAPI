$(document).ready(function () {
  let max = 893;
  let pokemonRandom = parseInt(Math.random() * (max - 1) + 1);
  let pokemonDefault = () => {
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonRandom,
      success: function (response) {
        console.log(response);
        let numero = response.id;
        $("#numero").text(numero);

        let nombre = response.name;
        $("#nombre").text(nombre);

        let photo = response.sprites.front_default;
        $("#foto").attr("src", photo);

        let tipo = response.types[0].type.name;
        $("#tipo").text(tipo);

        $("#habilidad").append("<ul>");
        response.abilities.forEach((element) => {
          let habilidad = element.ability.name;
          $("#habilidad").append(`<li>${habilidad}</li>`);
        });
        $("#habilidad").append("</ul>");

        let stats = [];
        response.stats.forEach((element) => {
          console.log(element.base_stat); //y
          console.log(element.stat.name); //label

          stats.push({
            label: element.stat.name,
            y: element.base_stat,
          });
        });

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "dark1", // "light1", "light2", "dark1", "dark2"
          title: {
            text: "Stats Pokémon",
          },
          axisY: {
            title: "Points",
          },
          data: [
            {
              type: "column",
              // showInLegend: true,
              // legendMarkerColor: "grey",
              // legendText: "MMbbl = one million barrels",
              dataPoints: stats,
            },
          ],
        });
        chart.render();
      },
      error: function (error) {
        alert(error.responseText + ": Nombre de Pokémon o ID no existe");
      },
    });
  };
  pokemonDefault();

  $("#consulta").on("click", function (e) {
    e.preventDefault();

    let pokemonConsulta = document.getElementById("pokemon").value;
    if (pokemonConsulta == "") {
      alert("Debe ingresar un Nombre de Pokémon o ID");
    }
    $.ajax({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/" + pokemonConsulta,

      success: function (response) {
        console.log(response);
        let numero = response.id;
        $("#numero").text(numero);

        let nombre = response.name;
        $("#nombre").text(nombre);

        let photo = response.sprites.front_default;
        $("#foto").attr("src", photo);

        let tipo = response.types[0].type.name;
        $("#tipo").text(tipo);

        $("#habilidad").append("<ul>");
        response.abilities.forEach((element) => {
          let habilidad = element.ability.name;
          $("#habilidad").append(`<li>${habilidad}</li>`);
        });
        $("#habilidad").append("</ul>");

        let stats = [];
        response.stats.forEach((element) => {
          console.log(element.base_stat); //y
          console.log(element.stat.name); //label

          stats.push({
            label: element.stat.name,
            y: element.base_stat,
          });
        });

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "dark1", // "light1", "light2", "dark1", "dark2"
          title: {
            text: "Stats Pokémon",
          },
          axisY: {
            title: "Points",
          },
          data: [
            {
              type: "column",
              // showInLegend: true,
              // legendMarkerColor: "grey",
              // legendText: "MMbbl = one million barrels",
              dataPoints: stats,
            },
          ],
        });
        chart.render();
      },

      error: function (error) {
        alert(error.responseText + ": Nombre de Pokémon o ID no existe");
      },
    });
  });
});
