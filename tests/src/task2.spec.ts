import {UserInput,sanitizeInput} from '../../src/task2'

describe('task2', () => { 
    test('It passes with valid input',()=>{
        const userInput: UserInput={username:'rakib123',email:'rakib7@hotmail.co.uk',password:'rakib555'}
        expect(sanitizeInput(userInput)).toEqual({username:'rakib123',email:'rakib7@hotmail.co.uk',password:'rakib555'})
    })

    test('It escapes dangerous characters',()=>{
        const userInput: UserInput={username:'<rakib123>',email:'rakib7@hotmail.co.uk',password:'rakib555'}
        expect(sanitizeInput(userInput)).toEqual({username:'&lt;rakib123&gt;',email:'rakib7@hotmail.co.uk',password:'rakib555'})
    })
    test('It fails with invalid username',()=>{
        const userInput: UserInput={username:'rakib',email:'rakib7@hotmail.co.uk',password:'rakib555'}
        expect(sanitizeInput(userInput)).not.toEqual({username:'rakib',email:'rakib7@hotmail.co.uk',password:'rakib555'})
    })
    test('It passes with invalid email',()=>{
        const userInput: UserInput={username:'rakib123',email:'rakib7hotmail.co.uk',password:'rakib555'}
        expect(sanitizeInput(userInput)).not.toEqual({username:'rakib123',email:'rakib7hotmail.co.uk',password:'rakib555'})
    })
    test('It passes with invalid password',()=>{
        const userInput: UserInput={username:'rakib123',email:'rakib7@hotmail.co.uk',password:'rakib'}
        expect(sanitizeInput(userInput)).not.toEqual({username:'rakib123',email:'rakib7@hotmail.co.uk',password:'rakib'})
    })
 })