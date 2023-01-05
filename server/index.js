const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
//app.use(cors());
app.use(cors({ withCredentials: true }));
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));

function generateToken() {
	const crypto = require("crypto");
	return crypto.randomBytes(64).toString("hex");
}

app.post("/login", async (req, res) => {
	console.log("request login");
	console.log(req.body);
	const { username, password } = req.body;
	try {
		pool.connect();
		const allTodos = await pool.query(
			"SELECT * FROM equipas where id='" + username + "';"
		);
		if (allTodos.rows.length > 0) {
			if (password == allTodos.rows[0].password) {
				token = generateToken();
				res.json({ token });
				console.log("Status: 200 Token: " + token);
			}
		} else {
			res.status(401).json({ error: "Invalid username or password" });
			console.log("Status: 401 Error");
		}
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/", (req, res) => {
	res.send({ success: true, message: "Welcome to the backend" });
});

app.get("/todos", async (req, res) => {
	console.log("request todos");
	try {
		pool.connect();
		const allTodos = await pool.query("SELECT * FROM equipas");
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/intervention", async (req, res) => {
	console.log("request intervention");
	console.log(req.body);
	const { intervention, username } = req.body;

	try {
		pool.connect();

		query =
			"SELECT * FROM intervencoes WHERE intervencoes.id = '" +
			intervention +
			"' AND intervencoes.id_equipa = '" +
			username +
			"'";

		const result = await pool.query(query);

		if (result.rows.length === 0) {
			res.status(401).json({ error: "Intervention Not Found" });
		} else {
			res.json({ success: true });
		}
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/equipa/delete/:id", async (req, res) => {
	console.log("Estou cá!");
	const id = req.params.id;
	axios
		.delete("http://localhost:3001/equipa/delete/" + id)
		.then((dados) => {
			res.redirect("/equipa");
		})
		.catch((err) => console.log(err));
});

app.get("/relatorios", async (req, res) => {
	console.log("request relatorios");
	obj = [];
	try {
		pool.connect();
		const allTodos = await pool.query(
			" SELECT r.id_intervencao, i.id_equipa, (r.passo_1 + r.passo_3 + r.passo_5 + r.passo_7 + r.passo_9 + r.passo_11 + r.passo_13) as total_erros, r.observacoes,r.data_inicio, r.data_fim, r.data_fim - r.data_inicio as duracao FROM relatorios r JOIN intervencoes i ON i.id = r.id_intervencao;"
		);
		console.log(allTodos.rows[0]);
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/access", async (req, res) => {
	console.log("request access");
	console.log(req.body);
	const { intervention } = req.body;
	try {
		pool.connect();

		query =
			"SELECT * FROM intervencoes WHERE intervencoes.id = '" +
			intervention +
			"'";

		const result = await pool.query(query);

		if (result.rows.length > 0) {
			res.json({ access: result.rows[0].acesso });
			console.log("Status: 200 Access: " + result.rows[0].acesso);
		} else {
			res.status(404).json({ error: "Not Found" });
			console.log("Status: 404 Not Found");
		}
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/pedidos", async (req, res) => {
	console.log("request pedidos");
	obj = [];
	try {
		pool.connect();
		const allTodos = await pool.query("SELECT * FROM pedidos");
		console.log(allTodos.rows);
		allTodos.rows.forEach((c) => {
			obj.push({
				id_intervencao: c.id_intervencao,
				estado: "Suspenso",
				descricao: c.descricao,
			});
		});
		res.json(obj);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/new_reference", async (req, res) => {
	console.log("request new reference");
	console.log(req.body);
	const { id_intervention, description } = req.body;

	try {
		pool.connect();

		query =
			"INSERT INTO pedidos(id_intervencao, estado, descricao) VALUES ('" +
			id_intervention +
			"', 0, '" +
			description +
			"')";
		const result = await pool.query(query);

		res.json(result.rows);
		console.log("Status: 200");
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/new_reference_status", async (req, res) => {
	console.log("request new reference status");
	console.log(req.body);
	const { id_intervention } = req.body;

	try {
		pool.connect();

		query =
			"SELECT * FROM pedidos WHERE id_intervencao = '" +
			id_intervention +
			"'";

		const result = await pool.query(query);

		if (result.rows.length > 0) {
			res.json({ status: result.rows[0].estado });
			console.log("Status: 200 Result: " + result.rows[0].estado);
		} else {
			res.status(404).json({ error: "Not Found" });
			console.log("Status: 404 Not Found");
		}
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/conetor", async (req, res) => {
	console.log("request conetor");
	console.log(req.body);
	const { id_intervention } = req.body;

	try {
		pool.connect();

		query =
			"SELECT conetor FROM intervencoes WHERE id='" +
			id_intervention +
			"'";

		const result = await pool.query(query);

		res.json({ connector: result.rows[0].conetor });
	} catch (err) {
		console.error(err.messag);
	}
});

app.get("/stats", async (req, res) => {
	console.log("request stats");
	obj = [];
	try {
		pool.connect();
		const allTodos = await pool.query(
			"SELECT e.id, COUNT(i.id) as total_jobs, SUM(r.passo_1 + r.passo_3) as total_mistakes, (SUM(r.passo_1 + r.passo_3)/COUNT(i.id)) as media_erro, AVG(r.data_fim - r.data_inicio) as media_tempo FROM equipas e JOIN intervencoes i ON i.id_equipa = e.id JOIN relatorios r ON r.id_intervencao = i.id GROUP BY e.id"
		);
		console.log(allTodos.rows);
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.post("/report", async (req, res) => {
	console.log("request report");
	console.log(req.body);
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

	try {
		pool.connect();

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

app.get("/equipa/:id", async (req, res) => {
	const id = req.params.id;
	try {
		pool.connect();
		const equipa = await pool.query(
			"SELECT * FROM skill where id_equipa='" + id + "';"
		);
		res.json(equipa.rows);
	} catch (err) {
		console.log(err.message);
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
