const express = require("express");
const app = express();

app.use(express.json(), debug);

app.get("/heroes", (_req, res) => {

});

app.get("/heroes/:name", findHero, (req, res) => {

})

app.get("/heroes/:name/powers", findHero, (req, res) => {

})

app.post("/heroes",transformName, (req, res) => {

});

app.patch("/heroes/:name/powers", findHero, (req, res) => {

});

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

