import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './styles.css'
import './App.css';

function App() {

  const [ partidos, setPartidos ] = useState([])

  const [selectedPartido, setSelectedPartido] = useState('')

  const [deputados, setDeputados] = useState([])

  useEffect( () => {

  async function getPartidos() {
    const res = await axios.get('https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla')
    const arrayPartidos = []
    res.data.dados.map( item => {
      arrayPartidos.push(item.sigla)
    })
    setPartidos(arrayPartidos)
  }

  getPartidos()

  handleEncontrarDeputadosPorPartido()

  },[selectedPartido])

  async function handleEncontrarDeputadosPorPartido() {

    if(selectedPartido === '') {
      return 
    }

    const obterDeputadosPorPartido = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaPartido=${selectedPartido}&siglaPartido=&ordem=ASC&ordenarPor=nome`)
    setDeputados(obterDeputadosPorPartido.data.dados)
  }

  return (
    <div className="App">
        <select value={selectedPartido} onChange={ e => { 
          setSelectedPartido(e.target.value)
        }}>

        { partidos.map(item => {
            return <option value={item}>
              {item}
            </option>
        })}
        </select>

        <main id="lista-deputados">
          Deputados do partido selecionado:

          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sigla-UF</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              { deputados.map(item => {
                return <tr>
                  <td>{item.nome}</td>
                  <td>{item.siglaUf}</td>
                  <td>{item.email}</td>
                </tr>
              })
              }
            </tbody>

          </table>
        </main>
    </div>
  );
}

export default App;
