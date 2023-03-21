import { toast} from "react-toastify";
import Form from "./components/form";
import Tabela from "./components/tabela";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] =  useState(null)

  const getUsers = async ()=>{
    try{
      const res = await axios.get('http://localhost:8800');
      setUsers(res.data)
      setOnEdit(null)
    }catch(error){
      toast.error(error)
    }
  }

  useEffect(()=>{
    getUsers();
  },[setUsers])
  return (
    <>
      <main className='main-body'>
        <h2 style={{fontSize:30}}>
          Usuarios
        </h2>
        <Form getUsers={getUsers} Edit={onEdit} setedit={setOnEdit}/>
        <Tabela users={users} Edit={setOnEdit} getUsers={getUsers}/>
      </main>
    </>
  );
}

export default App;
