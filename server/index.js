require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const pg = require('pg');
const path = require('path');
// const jwt = require('jsonwebtoken');
// const argon2 = require('argon2');
// const ClientError = require('./client-error');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/healthyHacks',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(jsonMiddleware);
app.use(staticMiddleware);
app.use(express.static(publicPath));

app.post('/api/restaurants', (req, res) => {
  const sql = `
  insert into "restaurants" ("restaurant name", "userId", "restaurantId")
  values ($1, $2, $3)
  returning *
  `;
  const values = [req.body.restaurant, req.body.currUser, req.body.id];

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
  where "restaurantId" = $1
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
  insert into "meals" ("meal name", "restaurantId", "serving size", "calories", "protein", "fat", "carbohydrates", "restaurant name")
  values ($1, $2, $3, $4, $5, $6, $7, $8)
  returning *
  `;
  const values = [
    req.body.mealName,
    req.body.id,
    req.body.servingSize,
    req.body.calories,
    req.body.protein,
    req.body.fat,
    req.body.carbohydrates,
    req.body.restaurantName
  ];

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

app.delete('/api/meals/:meal', (req, res) => {
  const mealName = req.params.meal;
  const sql = `
  delete from "meals"
  where "meal name" = $1
  returning *
  `;
  const values = [mealName];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `cannot find restaraunt ${mealName}` });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occured.' });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
