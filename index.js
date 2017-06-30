var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var queries = require('./queries');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', (req, res) => {
    res.json({ message: 'try /api/image' });   
});

router.route('/image')
  .get((req, res) => {
    // TODO: filters and pagination
    //callback hell, oh shit.
    queries.getAllImages(res);
  })
  .post((req, res) => {
    queries.saveImage(req.body.title, req.body.description, req.body.imgur_id, req.body.imgur_link, res);
  });

router.route('/image/:image_id')
  .get((req, res) => {
    queries.getImage(req.params.image_id, res);
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/', (req, res) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      client.query("SELECT * FROM image ORDER BY created_on DESC LIMIT 6", (err, result) => {
        done();
        if (err) {
          console.error(err); res.send("Error " + err);
        } else { 
          res.render('pages/index', {results: result.rows});
        };
      });
    }); 
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


