// Importa el modelo de la base de datos	
var models = require("../models/models.js");
/*
// Gestion de error
var gestionarError = function (error) {
  console.log(error);
};

// Mostrar las estadísticas de la aplicación - GET /quizes/statistics
var statistics = function (req, res) {
  // Objeto que contiene las estadisticas
  var _estadisticas = {
    numPreguntasTotal: 0,
    numComentrariosTotal: 0,
    promedioComentarios: 0,
    numPreguntasSinComentario: 0,
    numPreguntasConComentario: 0
  };

  // Procesa la lista de quizes 
  var _generarEstadisticas = function (listaQuizes) {
    // Obtiene el número total de preguntas
    _estadisticas.numPreguntasTotal = listaQuizes.length;

    // Procesa los datos del quiz actual
    var __procesarListaComentarios = function (listaComentarios) {
      
      // Comprueba si el quiz actual tiene comentarios
      if (listaComentarios.length) {
        // Acumula el número de comentarios
        _estadisticas.numComentrariosTotal += listaComentarios.length;

        // Incrementa el contador de quizes con comentarios
        _estadisticas.numPreguntasConComentario += 1;
      } else {
        // Incrementa el contador de quizes sin comentarios
        _estadisticas.numPreguntasSinComentario += 1;
      }
    };

    // Recorre la lista de quizes para procesar los comentarios de cada uno
    for (var quizActual in listaQuizes) {
      // Clave ajena del quiz actual en los comentarios
      var __paramBusqueda = {
        where: {
          QuizId: Number(listaQuizes[quizActual].id)
        }
      };

      // Recupera los comentarios del quiz actual
      models.Comment.findAll(__paramBusqueda).then(__procesarListaComentarios).catch(gestionarError);
    }

    // Obtener el número medio de comentarios por pregunta
    _estadisticas.promedioComentarios = _estadisticas.numComentrariosTotal / _estadisticas.numPreguntasTotal;

    // Parámetros de renderización
    var __paramRender = {
      estadisticas: _estadisticas,
      errors: []
    };

    // Renderiza la vista de preguntas con la pregunta
    // del quiz seleccionado
    res.render("statistics", __paramRender);
  };


*/
  // Recupera de la BD todos los quizes almacenados
  var _estadisticas = {
    numPreguntasTotal: 0,
    numComentrariosTotal: 0,
    promedioComentarios: 0,
    numPreguntasSinComentario: 0,
    numPreguntasConComentario: 0
  };

// Exportar funcionalidades
exports.statistics = function(req, res) {

	var quiz = models.Quiz.findAll().then(
		function (quizes) {	
			_estadisticas.numPreguntasTotal = quizes.length;
        	_estadisticas.numPreguntasConComentario = 0;
        	_estadisticas.numPreguntasSinComentario = 0;
			for (var i = 0; i < quizes.length; i++) {
				models.Comment.findAll( {where: {QuizId: Number(quizes[i].id)} })
				.then( function (comment){
					if (comment.length) {
        				_estadisticas.numPreguntasConComentario += 1;
      				} else {
        				_estadisticas.numPreguntasSinComentario += 1;
        			}
				}).catch(function(error){next(error);});
			};
		}
	).catch(function(error){next(error);});

	var comment = models.Comment.findAll().then(
		function (comment) {	
			_estadisticas.numComentrariosTotal = comment.length;
		}
	).catch(function(error){next(error);});
	
	_estadisticas.promedioComentarios = parseInt(_estadisticas.numComentrariosTotal) / parseInt(_estadisticas.numPreguntasTotal);

   	res.render("statistics", { estadisticas: _estadisticas, errors: [] });	
};
/*
var __procesarListaComentarios = function (listaComentarios) {
      
      // Comprueba si el quiz actual tiene comentarios
      if (listaComentarios.length) {
        // Acumula el número de comentarios
        _estadisticas.numComentrariosTotal += listaComentarios.length;

        // Incrementa el contador de quizes con comentarios
        _estadisticas.numPreguntasConComentario += 1;
      } else {
        // Incrementa el contador de quizes sin comentarios
        _estadisticas.numPreguntasSinComentario += 1;
      }
    };

    // Recorre la lista de quizes para procesar los comentarios de cada uno
    for (var quizActual in listaQuizes) {
      // Clave ajena del quiz actual en los comentarios
      var __paramBusqueda = {
        where: {
          QuizId: Number(listaQuizes[quizActual].id)
        }
      };

      // Recupera los comentarios del quiz actual
      models.Comment.findAll(__paramBusqueda).then(__procesarListaComentarios).catch(gestionarError);
    }
*/
/*
 function (){
	models.Quiz.findAll().then(
  	function (listaQuizes) {
    	_estadisticas.numPreguntasTotal = listaQuizes.length;
    	function (listaComentarios) {
      
      		// Comprueba si el quiz actual tiene comentarios
      		if (listaComentarios.length) {
        		// Acumula el número de comentarios
        		_estadisticas.numComentrariosTotal += listaComentarios.length;

	        	// Incrementa el contador de quizes con comentarios
        		_estadisticas.numPreguntasConComentario += 1;
      		} else {
        		// Incrementa el contador de quizes sin comentarios
        		_estadisticas.numPreguntasSinComentario += 1;
      		}
    	};

    // Recorre la lista de quizes para procesar los comentarios de cada uno
    for (var quizActual in listaQuizes) {
      // Clave ajena del quiz actual en los comentarios
      var __paramBusqueda = {
        where: {
          QuizId: Number(listaQuizes[quizActual].id)
        }
      };

      // Recupera los comentarios del quiz actual
      models.Comment.findAll(__paramBusqueda).then(__procesarListaComentarios).catch(gestionarError);
    }

    // Obtener el número medio de comentarios por pregunta
    _estadisticas.promedioComentarios = _estadisticas.numComentrariosTotal / _estadisticas.numPreguntasTotal;

    // Parámetros de renderización
    var __paramRender = {
      estadisticas: _estadisticas,
      errors: []
    };

    // Renderiza la vista de preguntas con la pregunta
    // del quiz seleccionado
    res.render("statistics", __paramRender);
  };
  ).catch(function (error) { console.log(error); );
};
};
*/