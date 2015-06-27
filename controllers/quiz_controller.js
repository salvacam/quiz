var models = require('../models/models.js');

//GET /quizes/question
exports.load = function(req, res, next, quizId) {
	//models.Quiz.findById(quizId).then(
		models.Quiz.find({
			where: { id: Number(quizId) },
			include: [{model: models.Comment }]
		}). then (function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId= ' + quizId));
			}		
		}).catch(function(error){next(error);});
/*
		function (quiz) {	
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId= ' + quizId));
			}
		}
	).catch(function(error){next(error);});
*/
};

exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function (quizes) {	
			res.render('quizes/index', {quizes: quizes, errors: []});	
		}
	).catch(function(error){next(error);});
};

//GET /quizes/question
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});	
	//})
};

//GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcto";
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
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
		{pregunta: "Pregunta", respuesta: "Respuesta", categoria: "Categoria"}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then(function(err){
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else {
			quiz
			.save({fields: ["pregunta", "respuesta", "categoria"]}).then(function(){				
				res.redirect('/quizes');
			});			
		}
	})
};

exports.edit = function(req, res) {
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.categoria = req.body.quiz.categoria;

	req.quiz
	.validate()
	.then(
		function (err) {
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
				.save( {fields: ["pregunta", "respuesta", "categoria"]} )
				.then( function(){ res.redirect("/quizes");});
			}
		}
	);
}

exports.destroy = function(req, res) {
	req.quiz.destroy().then( function(){ 
		res.redirect("/quizes");
	}).catch(function(error){next(error)});
};