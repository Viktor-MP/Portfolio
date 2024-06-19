

class UserDto {
    
    userName;
    id;
    isActivated;

    constructor (model) {
        this.userName = model.userName;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }

}


module.exports = UserDto