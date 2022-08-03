
//carregar o módulo express 
const { response, urlencoded } = require('express')
const express = require('express')

//carregar o módulo mongoose
const mongoose = require('mongoose')

//conectar com o banco de dados revisao
const conexao = ()=>{
    mongoose.connect('mongodb+srv://userRevisao:230205@fiaptec.n8xny.mongodb.net/revisao')
}

//conectar com a collection infos
const modelo = new mongoose.Schema({
    nome:String,
    turma: String,
    disciplina: String
})
const infos = mongoose.model('infos', modelo)

//executar o módulo express
const app = express()

//definir o local padrão para os arquivos ejs
app.set('views', './')

//renderizar o arquivo index.ejs na requisição / (root)
app.get('/', async(req,res)=>{
    //conectar com o revisao
    conexao()
    //buscar todos os dados de infos
    const resultado = await infos.find()
    res.render('index.ejs', {resultado })
})

//gravar as informações do formulário no banco de dados
app.use(urlencoded({extended:false}))

app.post('/', async(req,res)=>{
    const { body } = req;
//    res.send(body);
    //res.send(dados)
    const gravar = new infos ({
    nome:body.nome,
    turma:body.turma,
    disciplina:body.disciplina
}).save()
res.redirect('/')
})

const porta = process.env.PORT || 3050
//ligar o servidor na porta 3050
app.listen(3050, ()=>{
    console.log('Servidor local em http://localhost:3050/')
})


//node index
//gravou a versao do script anterior, n é automático
//p cada operacao script precisa interromper o server e rodar dnv 
