var models = require('../models/models.js');

//GET /quizes/question
exports.load = function(req, res, next, quizId) {
	//models.Quiz.findAll().then(function (quiz) {	
	models.Quiz.find(quizId).then(
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
	//models.Quiz.find(req.params.quizId).then(function (quiz) {	
			res.render('quizes/index', {quizes: quizes});	
		}
	).catch(function(error){next(error);});
};

//GET /quizes/question
exports.show = function(req, res) {
	//models.Quiz.findAll().then(function (quiz) {	
	//models.Quiz.find(req.params.quizId).then(function (quiz) {	
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
/*
	models.Quiz.find(req.params.quizId).then(function (quiz) {	
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}
	})*/
};
