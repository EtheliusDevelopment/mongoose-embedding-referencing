var Movie = require('../models/movie');
var Performer = require('../models/performer');

//referenced chiama i due modelli

module.exports = {
  index,
  show,
  new: newMovie,
  create
};








//Hotel Dashboard
//router.get('/', moviesCtrl.index);
// View Page : movies/index
function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Movies', movies });
  });
}

// Add new Hotel  FORM
//router.get('/new', moviesCtrl.new);
// View Page : movies/new
function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

// Save New Hotel
//router.post('/', moviesCtrl.create);
// View Page : movies/ NIENTE perche è una POST ma redirige a movies/:id
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    console.log(movie);
    res.redirect(`/movies/${movie._id}`);
  });
}


//Show New Hotel
//router.get('/:id', moviesCtrl.show);
// View Page : movies/show
function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast')
  .exec(function(err, movie) {
    console.log(movie)
    Performer.find({
      _id: {$nin: movie.cast}
    }, function(err, performers) {
      res.render('movies/show', {
        title: 'Movie Detail',
        movie,
        performers
      });
    });
  });
}




// function show(req, res) {
  //   Movie.findById (req.params.id,function(err, movie) {
//     console.log(movie)
//     res.render('movies/show', { title: 'Movie Detail', movie });
//   });
// }