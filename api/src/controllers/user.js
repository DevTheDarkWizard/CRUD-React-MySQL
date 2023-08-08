import { database } from "../database/index.js";

export const getUsers = (req, res) => {
	const query = "SELECT * FROM usuario;";

	database.query(query, (err, data) => {
		if(err) return res.json(err);

		return res.status(200).json(data);
	});
};

export const addUser = (req, res) => {
	const query = "INSERT INTO usuario(nome, email, fone, data_nascimento) value(?);";

	const { nome, email, fone, data_nascimento } = req.body;

	const values = [
		nome?.trim(),
		email?.trim(),
		fone?.trim(),
		data_nascimento?.trim()
	];

	database.query(query, [values], (err) => {
		if(err) {
			if(err.code == "ER_DUP_ENTRY") return res.json({ message: "E-mail já cadastrado!", warn: true });
			return res.json({ message: "Falha ao criar usuário!", error: true });
		}

		return res.status(200).json("Usuário criado com sucesso!");
	});
};

export const updateUser = (req, res) => {
	const query = "UPDATE usuario SET nome = ?, email = ?, fone = ?, data_nascimento = ? where id = ?;";

	const { id } = req.params;
	const { nome, email, fone, data_nascimento } = req.body;

	const values = [
		nome?.trim(),
		email?.trim(),
		fone?.trim(),
		data_nascimento?.trim()
	];

	database.query(query, [...values, id], (err) => {
		if(err) {
			if(err.code == "ER_DUP_ENTRY") return res.json({ message: "E-mail já cadastrado!", warn: true });
			return res.json({ message: "Falha ao atualizar usuário!", error: true });
		}
		return res.status(200).json("Usuário atualizado com sucesso!");
	});
};

export const deleteUser =(req, res) => {
	const query = "DELETE FROM usuario WHERE id = ?;";
	
	const { id } = req.params;

	database.query(query, [id], (err) => {
		if(err) return res.json({ message: "Falha ao deletar usuário!", error: true });

		return res.status(200).json("Usuário deletado com sucesso!");
	});
};
