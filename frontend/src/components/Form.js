import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.form`
	display: flex;
	align-items: flex-end;
	gap: 10px;
	flex-wrap: wrap;
	background-color: #fff;
	padding: 20px;
	box-shadow: 0px 0px 5px #ccc;
	border-radius: 5px;
`;

const Label = styled.label``;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	width: 100px;
	padding: 0 10px;
	border: 1px solid #bbb;
	border-radius: 5px;
	height: 30px;
`;

const Button = styled.button`
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	border: none;
	background-color: #2c73d2;
	color: white;
	height: white;
`;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
	const ref = useRef();

	useEffect(() => {
		if(onEdit) {
			const userForm = ref.current;

			userForm.nome.value = onEdit.nome;
			userForm.email.value = onEdit.email;
			userForm.fone.value = onEdit.fone;
			userForm.data_nascimento.value = onEdit.data_nascimento;
		}
	}, [onEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userForm = ref.current;

		if(!userForm.nome.value || !userForm.email.value || !userForm.fone.value || !userForm.data_nascimento.value)
			return toast.warn("Preencha todos os campos!");
		
		if(onEdit) {
			await axios
				.put(`http://localhost:8800/${onEdit.id}`, {
					nome: userForm.nome.value.trim(), 
					email: userForm.email.value.trim(), 
					fone: userForm.fone.value.trim(), 
					data_nascimento: userForm.data_nascimento.value.trim()
				})
				.then(({ data }) => {
					if(data.error) toast.error(data.message);
					else if(data.warn) toast.warn(data.message);
					else toast.success(data);
				})
				.catch(({ data }) => toast.error(data));
		} else {
			await axios
				.post("http://localhost:8800/", {
					nome: userForm.nome.value, 
					email: userForm.email.value, 
					fone: userForm.fone.value, 
					data_nascimento: userForm.data_nascimento.value
				})
				.then(({ data }) => {
					if(data.error) toast.error(data.message);
					else if(data.warn) toast.warn(data.message);
					else toast.success(data);
				})
				.catch(({ data }) => toast.error(data));
		}
		
		userForm.reset();

		setOnEdit(null);
		getUsers();
	};

	return (
		<FormContainer ref={ref} onSubmit={handleSubmit}>
			<InputArea>
				<Label htmlFor="nome">Nome</Label>
				<Input name="nome" />
			</InputArea>
			<InputArea>
				<Label htmlFor="email">E-mail</Label>
				<Input name="email" type="email" />
			</InputArea>
			<InputArea>
				<Label htmlFor="fone">Telefone</Label>
				<Input name="fone" />
			</InputArea>
			<InputArea>
				<Label htmlFor="data_nascimento">Data de Nascimento</Label>
				<Input name="data_nascimento" type="date" />
			</InputArea>

			<Button type="submit">Salvar</Button>
		</FormContainer>
	);
}

export default Form;