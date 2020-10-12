const {users,tasks} = require('../constants')
const uuid = require('uuid')

module.exports = {
    Query : {
        greetings : ()=> null,
        
        tasks : ()=>tasks,
        
        task : (_,{id}) =>tasks.find(task=>task.id === id),


    },

    Task : {
        user : (parent)=>{
            return users.find(user=>user.id === parent.userId) 
        }
    },


    Mutation : {
        createTask : (_,{input})=>{
            const task = {...input, id : uuid.v4()}
            tasks.push(task)
            return task
        }
    }
}