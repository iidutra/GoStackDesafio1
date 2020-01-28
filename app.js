const express = require('express')

const server = express();

server.use(express.json())

const projects = []


//middleware
server.use((req, res, next) => {
    console.time('Request')
    console.log(`Metodo: ${req.method}; URL: ${req.url}` )
    
    next()

    console.timeEnd('Request')
})

function checkProjectExists() {
   const { id } = req.params 
   const project = projects.find(p => p.id == id)

   if(!project) {
       return res.status(400).json({ error: 'Project not found'})
   }
   
   return next()
}


 // Middleware que dá log no número de requisições
 
function logRequests(res, req, next) {
    console.count("Numero de requisições")

    return next()
}

//listar todos os meus projetos
server.get('/projects', (req, res) => {
    return res.json(projects)
})

//rota para alterar apenas o titulo do projeto com o id presente
server.put('/projects/:id', (req, res) => {
    const { id } = req.params
    const { title } = req.body
    
    const project = projects.find(p => p.id == id)

    project.title = title

    return res.json(project)
})


//criar meu projeto
server.post('/projects' ,(req, res) => {
    
    const {id, title} = req.body

    const project = {
        id,
        title,
        tasks: []
    }
     projects.push(project)
    
     return res.json(project)
})

//rota para deletar um projeto
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params

    projects.splice(id, 1)
    
    return res.send()
})

//receberá um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota
server.post('projects/:id/tasks', (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(p => p.id == id)

    project.tasks.push(title)

    return res.json(project)
}) 


server.listen(3000)