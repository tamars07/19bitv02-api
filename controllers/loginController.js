//handle all operations related to login, logout, register
const registerView = (req, res) => {
    res.render("register", {

    })
}

const loginView = (req, res) => {
    res.render("login", {
        
    })
}

module.exports = {
    registerView,
    loginView
}