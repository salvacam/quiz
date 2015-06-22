var models = require('../models/models.js');

//GET /quizes/question
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function (quiz) {	
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId= ' + quizId));
			}
		}
	).catch(function(error){next(error);});
};

exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function (quizes) {	
			res.render('quizes/index', {quizes: quizes});	
		}
	).catch(function(error){next(error);});

};

//GET /quizes/question
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});	
	//})
};

//GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcto";
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.search = function(req, res) {
	if(req.query.search) {
		var _patronBusqueda = req.query.search || "";
		_patronBusqueda = "%" + _patronBusqueda.replace(/\s/gi, "%") + "%";
		var _paramBusqueda = {
    	where: ["pregunta like ?", _patronBusqueda], order: 'pregunta ASC'};
  
  		models.Quiz.findAll(_paramBusqueda).then(
    		function(quizes) {
      			res.render('quizes/index', {quizes: quizes, errors: []});
    		}
    	);

	} else {
		models.Quiz.findAll().then(
			function (quizes) {	
				res.render('quizes/index', {quizes: quizes});	
			}
		).catch(function(error){next(error);});
	}
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz: quiz});
};

exports.create = function(req, res) {
	console.log("crear");
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		console.log("creado");
		res.redirect('/quizes');
	});
};