import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Container, Cadastro, Form } from './style';

interface Cadastro {
  cliente: string;
  telefone: string;
  email: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [cadastro, setCadastro] = useState<Cadastro[]>();
  const [alterarCad, setAlterarCad] = useState(false);

  const [clienteAlterar, setClienteAlterar] = useState('');
  const [telefoneAlterar, setTelefoneAlterar] = useState('');
  const [emailAlterar, setEmailAlterar] = useState('');
  const [idAlterar, SetIDAlterar] = useState('');

  useEffect(() => {
    api.get(`/clients`).then((response) => {
      setCadastro(response.data);
    });
  }, [cadastro]);

  async function handleAddEvent(event: any) {
    event.preventDefault();

    const { target: form } = event;

    const novoCadastro = {
      cliente: form.cliente.value,
      telefone: form.telefone.value,
      email: form.email.value,
    };

    await api.post('clients', novoCadastro).then((response) => {
      if (response.data.error) {
        alert('Dados ja cadastrados.');
      } else {
        history.push('/clients');
      }
    });

    history.push('/');
  }

  async function handleAlterar(event: any) {
    event.preventDefault();

    const { target: form } = event;

    const alterarCadastro = {
      cliente: form.cliente.value,
      telefone: form.telefone.value,
      email: form.email.value,
    };

    await api.put(`/clients/${idAlterar}`, alterarCadastro);

    history.push('/');
  }

  function deleteCadastro(id: string) {
    api.delete(`/clients/${id}`);
    history.push('/');
  }

  function alterarCadastro(
    id: string,
    cliente: string,
    telefone: string,
    email: string,
  ) {
    setAlterarCad(true);
    setClienteAlterar(cliente);
    setTelefoneAlterar(telefone);
    setEmailAlterar(email);
    SetIDAlterar(id);
  }

  return (
    <Container>
      {alterarCad === false ? (
        <Form onSubmit={handleAddEvent}>
          <input type="text" name="cliente" placeholder="Nome do Cliente" />
          <input type="text" name="telefone" placeholder="Telefone" />
          <input type="text" name="email" placeholder="E-mail" />
          <button type="submit">Cadastrar</button>
        </Form>
      ) : (
        <Form onSubmit={handleAlterar}>
          <input
            defaultValue={clienteAlterar}
            name="cliente"
            type="text"
            placeholder={`${clienteAlterar}`}
          />
          <input
            defaultValue={telefoneAlterar}
            name="telefone"
            type="text"
            placeholder={`${telefoneAlterar}`}
          />
          <input
            defaultValue={emailAlterar}
            name="email"
            type="text"
            placeholder={`${emailAlterar}`}
          />
          <button type="submit">Alterar</button>
          <button
            onClick={() => {
              setAlterarCad(false);
            }}
          >
            Cadastrar
          </button>
        </Form>
      )}

      <Cadastro>
        <ul>
          {cadastro
            ? cadastro.map((cadastroMap) => (
                <li key={cadastroMap.id}>
                  <span>Cliente: {cadastroMap.cliente}</span>
                  <span>Telefone: {cadastroMap.telefone}</span>
                  <span>E-mail: {cadastroMap.email}</span>

                  <div>
                    <button
                      onClick={() => {
                        deleteCadastro(cadastroMap.id);
                      }}
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => {
                        alterarCadastro(
                          cadastroMap.id,
                          cadastroMap.cliente,
                          cadastroMap.telefone,
                          cadastroMap.email,
                        );
                      }}
                    >
                      Alterar
                    </button>
                  </div>
                </li>
              ))
            : ''}
        </ul>
      </Cadastro>
    </Container>
  );
};

export default Dashboard;
