const Noteservices = require('../services/Noteservices');

module.exports = {
    ping: (req, res)=>{
        res.json({pong: true});
    },

    all: async (req, res)=>{
        let json = {error:'', result:[]};

        let notes = await Noteservices.getAll();

        for(let i in notes){
            json.result.push({
                id: notes[i].id,
                title: notes[i].title
            })
        }

        res.json(json);
    }, 

    one: async (req, res)=>{ 
        let json = {error:'', result:{}};

        let id = req.params.id;
        let note = await Noteservices.findById(id);

        if(note){
            json.result = note;
        }

        res.json(json);
    },

    new: async (req, res)=>{
        let json = {error:'', result:{}};

        let title = req.body.title;
        let body = req.body.body;

        if(title && body){

            let noteId = await Noteservices.add(title, body); 

            json.result = {
                id: noteId,
                title, // quando tem o mesmo nome da váriavel, não precisa atribuir.
                body,
                message: 'Ação feita com sucesso'
            };

        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    edit: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;
        let title = req.body.title;
        let body = req.body.body;

        if(id && title && body){

            await Noteservices.Update(id, title, body);

            json.result = {
                id,
                title,
                body,
                message : 'Alterado com sucesso'
            };
    

        } else {
            json.error = 'Campos vazios';
        }

        res.json(json);
    },

    delete: async (req, res)=>{
        let json = {error:'', result:{}};

        let id = req.params.id;

        if(id){
            await Noteservices.delete(id);
            json.res = {
                message: 'Deletado com sucesso.'
            }
        } else {
            json.error = 'Id inválido';
        }

        res.json(json);
    }, 
}
