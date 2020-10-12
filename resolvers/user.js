const {users,tasks} = require('../constants')
const uuid = require('uuid')


module.exports = {
    Query : {

        users : ()=>users,

        user : (_,{id})=>users.find(user => id === user.id)
    },

    User : {
        tasks: ({id})=>tasks.filter(task =>task.userId === id)
    },

    Mutation : {
        createUser : (_,{input})=>{
            const task = {...input, id : uuid.v4()}
            tasks.push(task)
            return task
        }
    }
}