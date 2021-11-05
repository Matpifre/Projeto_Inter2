import app = require("teem");

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

	public async login(req: app.Request, res: app.Response) {
		res.render("index/login");
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
}

export = IndexRoute;
