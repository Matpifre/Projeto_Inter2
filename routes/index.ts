import app = require("teem");
import DataUtil = require("../utils/dataUtil");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let nomeDoUsuarioQueVeioDoBanco = "Rafael";

		let opcoes = {
			usuario: nomeDoUsuarioQueVeioDoBanco,
			quantidadeDeRepeticoes: 5
		};

		res.render("index/index", opcoes);
	}

	public async servicos(req: app.Request, res: app.Response) {
		res.render("index/servicos");
	}

	public async pedido(req: app.Request, res: app.Response) {
		res.render("index/login");
	}

	public async listagem(req: app.Request, res: app.Response) {
		let limpezas: any[];

		await app.sql.connect(async (sql) => {

			limpezas = await sql.query("SELECT nome, telefone,endereco,complemento,garrafas,date_format(data, '%d/%m/%Y %H:%i') data,plano FROM pedido ORDER BY data");

		});

		let opcoes = {
			limpezas: limpezas
		};

		res.render("index/cadastro", opcoes);
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}

	public async funcionarios(req: app.Request, res: app.Response) {

		let fucionarios = {
			id: 1,
			nome: "Null",
			valor: 0
		}

		/* let produtoA = {
			id: 1,
			nome: "Produto A",
			valor: 25
		};

		let produtoB = {
			id: 2,
			nome: "Produto B",
			valor: 15
		};

		let produtoC = {
			id: 3,
			nome: "Produto C",
			valor: 100
		}; */

		/* produtoA, produtoB, produtoC, */
		let produtosVindosDoBanco = [fucionarios];

		let opcoes = {
			titulo: "Listagem de funcionarios",
			produtos: produtosVindosDoBanco
		};

		res.render("index/funcionarios", opcoes);
	}


	@app.http.post()
	public async ConfirmarReserva(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let limpeza = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!limpeza) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!limpeza.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!limpeza.telefone) {
			res.status(400);
			res.json("telefone inválido");
			return;
		}
		if (!limpeza.endereco) {
			res.status(400);
			res.json("endereco inválido");
			return;
		}
		if (!limpeza.complemento) {
			res.status(400);
			res.json("complemento inválido");
			return;
		}
		if (!limpeza.garrafas) {
			res.status(400);
			res.json("garrafas inválido");
			return;
		}
		if (!limpeza.data) {
			res.status(400);
			res.json("data inválido");
			return;
		}
		if (!limpeza.hora) {
			res.status(400);
			res.json("horário inválido");
			return;
		}
		if (!limpeza.plano) {
			res.status(400);
			res.json("plano inválido");
			return;
		}

		limpeza.data = DataUtil.converterDataISO(limpeza.data + " " + limpeza.hora);
		if (!limpeza.data) {
			res.status(400);
			res.json("data/horário inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO pedido (nome, telefone,endereco,complemento,garrafas,data,plano) VALUES (?, ?, ?, ?, ?, ?, ?)", 
							[limpeza.nome, limpeza.telefone,limpeza.endereco,limpeza.complemento,limpeza.garrafas,limpeza.data,limpeza.plano,]);

		});

		res.json(true);
	}
}


export = IndexRoute;
