import {db} from "../db.js"

export const getUsers = (_, res) =>{
    const q = "SELECT * FROM usuarios"



    db.query(q, (err, data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
}
 
export const addUsers =(req, res)=>{
    const q = "INSERT INTO usuarios (`nome`, `email`,`telefone`, `cidade`) VALUES(?)"

    const  Values =[
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cidade,
    ]

    db.query(q, [Values], (err) =>{
        if(err){
         return res.json(err)
        }else{

            return res.status(200).json("Usuario cadastrado com sucesso.");
        }    

    })
}
export const updateUsers =(req, res)=>{
    const q = "UPDATE usuarios SET `nome` = ?, `email` = ? ,`telefone` = ?,`cidade` = ? WHERE `id` =  ?"

    const  Values =[
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cidade,
    ]

    db.query(q, [...Values, req.params.id], (err) =>{
        if(err) return res.json(err)

        return res.status(200).json("Usuario atualizado com sucesso.");
    })
}

export const deleteUsers =(req, res)=>{
    const q = "DELETE FROM usuarios WHERE `id` = ?"

    db.query(q, req.params.id, (err) =>{
        if(err) return res.json(err)

        return res.status(200).json("Usuario deletado com sucesso.");
    })
}


