const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));

app.use("/login", async (req, res) => {
	console.log("OLA");
	res.send({
		token: "test123",
	});
});

app.get("/", (req, res) => {
	res.send({ success: true, message: "Welcome to the backend" });
});

app.get("/todos", async (req, res) => {
	try {
		pool.connect();
		const allTodos = await pool.query("SELECT * FROM equipas");
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/intervention", async (req, res) => {
	try {
		pool.connect();

		const { intervention, username } = req.body;

		query =
			"SELECT * FROM intervencoes WHERE intervencoes.id = '" +
			intervention +
			"' AND intervencoes.id_equipa = '" +
			username +
			"'";

		const result = await pool.query(query);

		res.json(result.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/access", async (req, res) => {
	try {
		pool.connect();

		const { intervention } = req.body;

		query =
			"SELECT intervencoes.acesso FROM intervencoes WHERE intervencoes.id = '" +
			intervention +
			"'";

		const result = await pool.query(query);

		res.json(result.rows);
	} catch (err) {
		console.error(err.message);
	}
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

module.exports = app;
