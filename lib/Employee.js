
// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email, role) {
        /*if(!name) {
            throw new Error("You are missing the name.");
        }
        if(!role) {
            throw new Error("You are missing the role");
        }
        if(!id) {
            throw new Error("You are missing your id");
        }
        if(!mail) {
            throw new Error("You are missing your email");
        }*/
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return this.role
    }
    
}


module.exports = Employee;
