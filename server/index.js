require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/healthyHacks',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(jsonMiddleware);
app.use(staticMiddleware);

app.post('/api/restaurants', (req, res) => {
  const sql = `
  insert into "restaurants" ("restaurant name", "userId")
  values ($1, $2)
  returning *
  `;
  const values = [req.body.restaurant, req.body.currUser];

  db.query(sql, values)
    .then(result => {
      res.status(201);
      res.json(result.rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occured' });
    }
    );
});

app.delete('/api/restaurants/:restaurantName', (req, res) => {
  const restaurantName = req.params.restaurantName;
  const sql = `
  delete from "restaurants"
  where "restaurant name" = $1
  returning *
  `;
  const values = [restaurantName];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `cannot find restaraunt ${restaurantName}` });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occured.' });
    });
});

app.post('/api/meals', (req, res) => {
  const sql = `
  insert into "meals" ("meal name", "restaurantId")
  values ($1, $2)
  returning *
  `;
  const values = [req.body.mealName, req.body.restaurantId];

  db.query(sql, values)
    .then(result => {
      res.status(201);
      res.json(result.rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error has occured' });
    }
    );
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
