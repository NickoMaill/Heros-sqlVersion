function findHero(req, _res, next) {
	const hero = superHeroes.find((hero) => {
		return hero.name.toLowerCase().replace(" ", "-") === req.params.name.toLowerCase().replace(" ", "-");
	});
	req.hero = hero;
	next();
}

module.exports = findHero;
