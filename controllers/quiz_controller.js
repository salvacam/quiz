var models = require('../models/models.js');

//GET /quizes/question
exports.load = function(req, res, next, quizId) {
	//models.Quiz.findAll().then(function (quiz) {	
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
};

exports.search = function(req, res) {
	if(req.query.search) {
		console.log(req.query.search);
		var filtro  = (req.query.search || '').replace(" ", "%");
		models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
		}).catch(function(error) { next(error);});

	} else {
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
		}).catch(function(error) { next(error);});
	}
};