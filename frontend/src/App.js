import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";
import Form from "./components/Form.js";
import Grid from "./components/Grid";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/");
      const data = res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)).map((a) => {
        if(a.data_nascimento) {
          a.data_nascimento = a.data_nascimento.split("T")[0];
        }
        return a;
      });
      setUsers(data);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(()=>{
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
