import { useState, useEffect } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { useParams } from "react-router-dom"

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
            <form onSubmit={editUser}>
            <label for="genero"> Genero</label>
                <select name="genero" id="genero" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value={gender}>feminino</option>      
                    <option value={gender}>masculino</option>   
                </select>

                <label for="estado">Estado Cívil</label>
                <select name="estado" id="estadi" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value={estado} >Solteiro</option>
                    <option value={estado} >Casado</option>
                    <option value={estado} >Divorciado</option>
                    <option value={estado} >Viuvo</option>
                    <option value={estado} >União Estável</option>
                </select>

                <label for="corPele"> Cor da pele</label>
                <select name="corPele" id="corPele" value={corPele} onChange={(e) => setCorPele(e.target.value)}>
                    <option value={corPele}>Branca</option>
                    <option value={corPele}>Preta</option>
                    <option value={corPele}>Parda</option>
                    <option value={corPele}>Indigena</option>
                </select>
                <label for="escolaridade"> Escolaridade</label>
                <select name="escolaridade" id="escolaridade" onChange={(e) => setEscolaridade(e.target.value)}>
                    <option value={escolaridade} >Fundamental - Compçleto</option>
                    <option value={escolaridade}>Fundamental - Inconpleto</option>
                    <option value={escolaridade}>Ensino Médio - Completo</option>
                    <option value={escolaridade}>Ensino Médio - Incompleto</option>
                    <option value={escolaridade}>Superior - Completp</option>
                    <option value={escolaridade}>Superior - Incompleto</option>
                    <option value={escolaridade}>Pós Graduação - Completo</option>
                    <option value={escolaridade}>Pós Graduação - incompleto</option>
                </select>

                <input
                    className="a"
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
          />
                <input
                    className="a"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
          />
                <input
                    className=""
                    type="text"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
          />
                <button type="submit" onClick={editUser}>Enviar</button>
                </form>
         
        
    
        </>
    );
  };