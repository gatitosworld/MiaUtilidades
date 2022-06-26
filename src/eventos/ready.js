module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Se ha iniciado sesión como ${client.user.tag}\n\nRecuerda hacer un deploy de los comandos para que aparezcan registrados.`)
    }
}