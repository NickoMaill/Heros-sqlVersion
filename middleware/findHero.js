const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});

async function findHero(req, res, next) {
	const heroes = await Postgres.query("SELECT * FROM heroes");
	const heroesData = heroes.rows;
	const hero = heroesData.find((hero) => {
		return hero.name.toLowerCase().replace(" ", "-") === req.params.name.toLowerCase().replace(" ", "-");
	});
	req.hero = hero;

    if (req.hero === undefined) {
		return res.status(404).json({
			message: "hero not found",
		});
	}
    
	next();
}

module.exports = findHero;
