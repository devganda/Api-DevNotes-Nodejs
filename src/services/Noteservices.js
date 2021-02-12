const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM tb_notes', (error, results)=>{
                if(error){ reject(error); return;}
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject)=>{
            db.query('SELECT * FROM tb_notes WHERE  id = ?', [id], (error, results)=>{
                if(error){ reject(error); return;}
                if(results.length > 0){ // verifica se encontrou no banco
                    resolve(results[0]); // retorna somente o primeiro dado
                } else {
                    resolve(false);
                }
            });
        });
    },

    add: (title, body) =>{

        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO tb_notes (title, body) VALUES (?, ?)', [title, body], (error, results)=>{
                if(error){ reject(error); return;}
                resolve(results.insertId);
            });
        });

    },

    Update: (id, title, body) =>{
        return new Promise((resolve, reject)=>{
            db.query('UPDATE tb_notes SET title = ?, body = ? WHERE id = ?', [title, body, id], (error, results)=>{
                if(error){ reject(error); return;}
                resolve(results);
            });
        });
    },

    delete: (id) =>{
        return new Promise((resolve, reject)=>{
            db.query('DELETE FROM tb_notes WHERE id = ?', [id], (error, results)=>{
                if(error){ reject(error); return;}  
                resolve(results);
            });
        });
    }
}