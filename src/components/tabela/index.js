import axios from 'axios';
import './index.css'
import  {FaEdit, FaTrash} from 'react-icons/fa'
import { toast } from 'react-toastify';
export default function Tabela({users,Edit,getUsers}) {
    const handledetele = async (item) =>{
        await axios 
        .delete('http://localhost:8800/' + item.id)
        .then(()=> 
            getUsers(),
            toast.success(`Usuario Deletado com sucesso`)
        )
        .catch(()=> toast.error('Algo correu errado'))
    }
    const EmptyVerify = () =>{
        if (users[0]){
            return
        }else{
            console.log(users[0])
            return(
                <div  style={{display:'flex',alignItems:'center',height:100,justifyContent:'center',fontSize:22, fontWeight:600,}}>SEM USUARIOS PARA EXIBIR</div>
            )
        }
    }
 return (
    <div className="tabela">
        <div style={{display:'flex', height:'70px',borderBottomStyle:'solid',borderBottomColor:'#ccc', borderBottomWidth:'1px'}}>
            <tr>
                <th>Nome</th>
            </tr>
            <tr>
                <th>Email</th>
            </tr>
            <tr>
                <th>Telefone</th>
            </tr>
            <tr>
                <th>Cidade</th>
            </tr>
        </div>
        <div>
            <EmptyVerify/>
            {
                users.map((item, i)=>(
                    
                    <div className='tbody' key={i}>
                        <tr>
                            <th style={{fontSize:'18px', color:'rgb(92 92 92)'}}>{item.nome}</th>
                        </tr>
                        <tr>
                            <th  style={{fontSize:'18px', color:'rgb(92 92 92)'}}>{item.email}</th>
                        </tr>
                        <tr>
                            <th  style={{fontSize:'18px', color:'rgb(92 92 92)'}}>{item.telefone}</th>
                        </tr>
                        <tr>
                            <th  style={{fontSize:'18px', color:'rgb(92 92 92)'}}>{item.cidade}</th>
                        </tr>
                        <tr style={{width:'7%'}}>
                            <FaEdit size={21} style={{cursor:'pointer'}} onClick={()=>Edit(item)}/>
                            <FaTrash size={21} color='red'style={{cursor:'pointer'}} onClick={()=>handledetele(item)}/>
                        </tr>
                    </div>
                ))

            }
        </div>
    </div>   
  );
}