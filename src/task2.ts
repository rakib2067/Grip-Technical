// Validator library imports
import validator from 'validator'
import isEmail from 'validator/lib/isEmail';


//Interface for input received from register form 
interface UserInput{
    username:string;
    email:string;
    password:string;
}



function sanitizeInput({username,email,password}:UserInput): UserInput| unknown{

    try {
        //trim input to remove extra space
        username=username.trim()
        email=email.trim()
        password=password.trim()

        //Error checks
        if (!password || password.length<8 ){
            throw new Error('Password is invalid')
        }
        if(!email || !isEmail(email)){
            throw new Error('Email is invalid')
        }
        if(!username || username.length<8){
            throw new Error('Username is invalid')
        }

        //Escape input
        username=validator.escape(username)
        email =validator.escape(email)
        password=validator.escape(password)

        return {username,email,password}
    } catch (error) {
        if (error instanceof Error) {
            error.message 
        }
        return error
    }
      
}

let res=sanitizeInput({username:'<rakib777>',email:'rakib7@hotmail.co.uk',password:'rakib888'})

console.log(res)