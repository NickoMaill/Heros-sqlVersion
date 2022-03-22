const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});

async function verifyHero(req, res, next) {
	const heroes = await Postgres.query("SELECT * FROM heroes");
	const heroesData = heroes.rows;
	const verifyName = heroesData.find((hero) => {
		return hero.name === req.body.name;
	});

	if (verifyName !== undefined) {
		return res.status(400).json({
			message: "hero already added",
		});
	}

	next();
}

module.exports = verifyHero;