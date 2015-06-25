var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Salvador Camacho', errors: [] });
});

/*router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
*/

router.param('quizId', quizController.load);

router.get('/quizes', quizController.index);
router.get('/quizes/search', quizController.search);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

module.exports = router;
