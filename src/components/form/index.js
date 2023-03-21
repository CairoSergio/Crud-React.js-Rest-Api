import { useEffect, useState } from 'react';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function Form({Edit, getUsers}) {
    const [ usernome, setNome] = useState('') 
    const [ useremail, setemail] = useState('') 
    const [ usertelefone, setTelefone] = useState('') 
    const [ usercidade, setCidade] = useState('')
    useEffect(()=>{
        if (Edit){
            setNome(Edit.nome)
            setemail(Edit.email)
            setTelefone(Edit.telefone)
            setCidade(Edit.cidade)
        }
    },[Edit]) 


    const handlesave = async (e)=>{
        e.preventDefault()
        if(!usernome || !useremail|| !usertelefone|| !usercidade){
            return(
                toast.warn('Preeche todos os campos')
            )
        }else{
            if(Edit){
                await axios
                .put('http://localhost:8800/' + Edit.id,{
                    nome: usernome,
                    email: useremail,
                    telefone: usertelefone,
                    cidade: usercidade,
                })
                .then(({data}) =>
                    getUsers(),
                    toast.success('Usuario atualizado com sucesso'),
                    setCidade(''),
                    setNome(''),
                    setTelefone(''),
                    setemail('')
                )
                .catch(({data}) => toast.error('erro'))
            }else{
                await axios
                .post('http://localhost:8800', {
                    nome: usernome,
                    email: useremail,
                    telefone: usertelefone,
                    cidade: usercidade,
                })
                .then(({data}) =>
                    getUsers(),
                    toast.success('Usuario Cadastrado com sucesso'),
                    setCidade(''),
                    setNome(''),
                    setTelefone(''),
                    setemail(''),
                )
                .catch(({data}) => toast.error('erro'))
            }
        }
    }

    
    return (
        <div className='form'>
            <ToastContainer position="top-center" autoClose={1500}/>
            <div className='formInput'>
                <h3>Nome</h3>
                <input type='text' value={usernome} onChange={e=>setNome(e.target.value)}/>
            </div>
            <div className='formInput'>
                <h3>Email</h3>
                <input type='text' value={useremail} onChange={e=>setemail(e.target.value)}/>
            </div>
            <div className='formInput'>
                <h3>Telefone</h3>
                <input type='text' value={usertelefone} onChange={e=>setTelefone(e.target.value)}/>
            </div>
            <div className='formInput'>
                <h3>Cidade</h3>
                <input type='text' value={usercidade} onChange={e=>setCidade(e.target.value)}/>
            </div>
            <button type='submit' className='btn' onClick={handlesave}>Salvar</button>
        </div>
    );
}