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

app.post("/new_request", async (req, res) => {
	try {
		pool.connect();
		const { id_intervention, state, description } = req.body;

		query =
			"INSERT INTO pedidos(id_intervencao, estado, descricao) VALUES ('" +
			id_intervention +
			"', " +
			state +
			", '" +
			description +
			"')";
		const result = await pool.query(query);

		res.json(result.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/report", async (req, res) => {
	try {
		pool.connect();
		const {
			id_intervention,
			step_1,
			step_3,
			step_5,
			step_7,
			step_9,
			step_11,
			step_13,
			observations,
			date_start,
			date_end,
		} = req.body;

		query =
			"INSERT INTO relatorios(id_intervencao, passo_1, passo_3, passo_5, passo_7, passo_9, passo_11, passo_13, observacoes, data_inicio, data_fim) VALUES ('" +
			id_intervention +
			"', " +
			step_1 +
			", " +
			step_3 +
			", " +
			step_5 +
			", " +
			step_7 +
			", " +
			step_9 +
			", " +
			step_11 +
			", " +
			step_13 +
			", '" +
			observations +
			"', '" +
			date_start +
			"', '" +
			date_end +
			"')";
		const result = await pool.query(query);

		res.json(result.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/user_experience", async (req, res) => {
	try {
		pool.connect();
		const { usability_rate, visibility_rate, global_rate } = req.body;

		query =
			"INSERT INTO avaliacoes(avaliacao_usabilidade, avaliacao_aspeto, avaliacao_global) VALUES (" +
			usability_rate +
			", " +
			visibility_rate +
			", " +
			global_rate +
			")";
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
