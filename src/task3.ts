interface UserRecord {
    
    
    user_id: number;
    device:string;
    action:Action;
    date_actioned:number
    
}

type Action = "start"|"stop"

function getUsers(records:UserRecord [], action: Action, start_time: number, end_time: number) : number []{
    let users: number []=[]
    const filteredArray: UserRecord [] = records.filter(record => record.action === action && start_time<= record.date_actioned && record.date_actioned<=end_time)
    
    filteredArray.map(record=>{
        if(!users.includes(record.user_id)){
            users.push(record.user_id)
        }
    })
    return users
}

const records: UserRecord[]=[
    
]

let res=getUsers(records,'start',700, 900)
console.log(res)