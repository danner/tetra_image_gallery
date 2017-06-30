var pg = require('pg');

module.exports = {
  getAllImages: (res) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      // TODO: paging via... id? time?
      client.query("SELECT * FROM image", (err, result) => {
        done();
        if (err) {
          console.error(err); res.send("Error " + err);
        } else { 
          res.json({data: result.rows});
        };
      });
    }); 
  },
  saveImage: (title, description, imgur_id, imgur_link, res) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      client.query("INSERT INTO image (title, description, imgur_id, imgur_link) VALUES ($1, $2, $3, $4)", 
        [title, description, imgur_id, imgur_link], (err, result) => {
          if (err) {
            console.error(err); res.send("Error " + err);;
          } else {
            // let's send back the id of this image now that it's in the db
            client.query("SELECT currval(pg_get_serial_sequence('image','id'))", (err, result) => {
              done();
              if (err) {
                console.error(err); res.send("Error " + err);
              }
              else {
                res.json({data: {id: result.rows[0].currval}});
              }
            });
          }
        }
      );
    });
  },
  getImage: (image_id, res) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      client.query("SELECT * FROM image where id=$1", [image_id], (err, result) => {
        done();
        if (err) {
          console.error(err); res.send("Error " + err);
        } else {
          res.json({data: result.rows});
        };
      }); 
    });
  }
};