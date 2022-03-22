const express = require("express");
const app = express();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const debug = require("./middlewares/debug");
const transformName = require("./middlewares/transformName");
const findHero = require("./middlewares/findHero");

app.use(express.json(), debug);

app.get("/heroes", async (_req, res) => {
	const heroes = await Postgres.query("SELECT * FROM heroes");

	try {
		heroes;
	} catch (err) {
		return res.status(400).json({
			message: "An error happened...",
		});
	}
	res.json(heroes.rows);
});

// app.get("/heroes/:name", findHero, (req, res) => {
// })

// app.get("/heroes/:name/powers", findHero, (req, res) => {
// })

// app.post("/heroes",transformName, (req, res) => {
// });

// app.patch("/heroes/:name/powers", findHero, (req, res) => {
// });

//copy and paste this in postman

// {
//     "name": "Spiderman",
//     "power": ["ultraInstinct", "cobweb", "ramp on the wall"],
//     "color": "red & blue",
//     "isAlive": true,
//     "age": 23,
//     "image": "https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG"
// }

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
