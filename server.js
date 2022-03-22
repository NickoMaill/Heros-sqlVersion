const express = require("express");
const app = express();
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const debug = require("./middleware/debug");
const transformName = require("./middleware/transformName");
const findHero = require("./middleware/findHero");
const verifyName = require('./middleware/verifyHero')

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

app.get("/heroes/:name", findHero, async (req, res) => {
	const hero = await Postgres.query("SELECT * FROM heroes WHERE heroes.name=$1", [req.hero.name]);
    
	try {
        hero;
	} catch (err) {
        return res.status(400).json({
            message: "An error happened..., Hero not found",
		});
	}
	res.json(hero.rows);
});

app.get("/heroes/:name/powers", findHero, async (req, res) => {
    const hero = await Postgres.query("SELECT power FROM heroes WHERE heroes.name=$1", [req.hero.name]);
    
	try {
		hero;
	} catch (err) {}
	res.json(hero.rows);
});

app.post("/heroes", transformName, verifyName, async (req, res) => {

	try {
		await Postgres.query(
			"INSERT INTO heroes(name, power, color, isAlive, age, image) VALUES($1, $2, $3, $4, $5, $6)",
			[req.body.name, req.body.power, req.body.color, req.body.isAlive, req.body.age, req.body.image]
		);
	} catch (err) {
		return res.status(400).json({
			message: "An error happened..., Hero not found",
		});
	}
	res.json({ message: "hero added" });
});

app.patch("/heroes/:name/powers", findHero, async (req, res) => {

    try {
        await Postgres.query("UPDATE heroes SET power = array_append( power, $1) WHERE heroes.name = $2;",[req.body.power, req.params.name]);
    } catch (err) {
        return res.status(400).json({
			message: "An error happened..., Hero not found",
		});
    }

    res.json({
        message: "power added"
    })
})
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
