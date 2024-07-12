

const providerPath = {
    base: "/",
    port: "/portfolio",

    guest() {return this.port + "/guest"},
    signIn () {return this.port + "/signIn"},
    signUp () {return this.port + "/signUp"},

    todoBoard () {return this.port + "/todoBoard"},
    todoWorkspace () {return this.todoBoard() + "/workspace"},

    myChat () {return this.port + "/myChat";},
    settings () {return this.port + "/settings"},
}

export  {providerPath}  