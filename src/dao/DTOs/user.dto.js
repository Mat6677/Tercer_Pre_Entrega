class UserDTO{
    constructor(user){
        this.full_name = `${user.first_name} ${user.last_name}`
        this.email = user.email
        this.rol = user.rol
    }
}

module.exports = UserDTO