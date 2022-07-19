import { useState, useEffect } from "react";

import api from "../../config";


export const Home = () => {
    const [ gender, setGender ] = useState()
    const [ estado, setEstado ] = useState()
    const [ corPele, setCorPele ] = useState()
    const [ escolaridade, setEscolaridade ] = useState()
    const [ nationality, setNationality ] = useState()
    const [ cpf, setCpf] = useState("")
    const [ rg, setRg] = useState("")
    const token = localStorage.getItem("token")


    function editUser(e){
        const edit = { gender, estado, corPele, escolaridade, nationality, cpf, rg }
        e.preventDefault()
        console.log(edit)

            api.put('/account/personal-information', edit ,{
                 headers: 
                    { "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`} }
             ).then(resp => {
                console.log(resp.data)
            }).catch(e => {
                console.log(e)
            })
    }
 


    return (
        <>
            <div className="form">
            <form onSubmit={editUser}>
            <div className="options">
            <label for="genero"></label>
                <h1>Informe seu Genero</h1>
                <select name="genero" id="genero" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option selected disabled></option>   
                    <option value={gender}>feminino</option>      
                    <option value={gender}>masculino</option>   
                </select>
            </div>
            <div className="options">
                <label for="estado"></label>
                <h1>Informe seu Estado Civil</h1>
                <select name="estado" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option selected disabled></option>   
                    <option value={estado} >Solteiro</option>
                    <option value={estado} >Casado</option>
                    <option value={estado} >Divorciado</option>
                    <option value={estado} >Viuvo</option>
                    <option value={estado} >União Estável</option>
                </select>
                </div>

                <div className="options">
                <label for="corPele"></label>
                <h1>Informe a Cor da sua pele</h1>
                <select name="corPele" id="corPele" value={corPele} onChange={(e) => setCorPele(e.target.value)}>
                <option selected disabled></option>   
                    <option value={corPele}>Branca</option>
                    <option value={corPele}>Preta</option>
                    <option value={corPele}>Parda</option>
                    <option value={corPele}>Indigena</option>
                </select>
                </div>
                <div className="options">
                <label for="escolaridade"></label>
                <h1>Informe sua Escolaridade</h1>
                <select name="escolaridade" id="escolaridade" onChange={(e) => setEscolaridade(e.target.value)}>
                    <option selected disabled></option>   
                    <option value={escolaridade} >Fundamental - Compçleto</option>
                    <option value={escolaridade}>Fundamental - Inconpleto</option>
                    <option value={escolaridade}>Ensino Médio - Completo</option>
                    <option value={escolaridade}>Ensino Médio - Incompleto</option>
                    <option value={escolaridade}>Superior - Completp</option>
                    <option value={escolaridade}>Superior - Incompleto</option>
                    <option value={escolaridade}>Pós Graduação - Completo</option>
                    <option value={escolaridade}>Pós Graduação - incompleto</option>
                </select>
                </div>
                <div className="options">
                    <label for="name"></label>
                    <h1>Informe sua Nacionalidade</h1>
                <input
                    className="a"
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
          />
            </div>
            <div className="options">
            <label for="name" className="for"></label>
            <h1>Informe seu RG</h1>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
          />
          </div>
          <div className="options">
            <label for="name"></label>
            <h1>Informe seu CPF</h1>
                <input
                    className=""
                    type="text"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
          />
              </div>
                <button type="submit" onClick={editUser}>Enviar</button>
                </form>
                </div>
        
    
        </>
    );
  };