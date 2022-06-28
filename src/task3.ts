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

function getPlaybackTime(user_id:number,records:UserRecord [] ):number{

    //Setup: declare variable to be returned and filter array for our user

    let totalTime:number=0;
    const filteredArray: UserRecord []=records.filter(record=>record.user_id===user_id)
    

    //Variables declared outside of the scope of loops, to check for overlapping, and store date_actioned of previous stop time
    let overlap=false

    let overlapStopTime: number= 0;
    for(let i=0;i<filteredArray.length;i++){
        
        let currentRecord=filteredArray[i]
        let currentDevice= currentRecord.device

        for(let j=i+1; j<filteredArray.length;j++){

            //variables for test record
            let testRecord=filteredArray[j]


            if(testRecord.device!==currentDevice && testRecord.action==="start"){
                console.log(`There has been an overlap between ${currentDevice} and ${testRecord}  Overlap:${overlap} will be set to true`)
                overlap=true
            }
            else if(testRecord.device===currentDevice && !overlap){
                //If there is no overlap, add whole duration to total time
                totalTime=totalTime+ (testRecord.date_actioned-currentRecord.date_actioned)
                overlapStopTime=testRecord.date_actioned
                overlap=false
                break
            }
            else if(testRecord.device===currentDevice && overlap && overlapStopTime==0){
                // If we are testing our first record and an overlap has been detected
                totalTime=totalTime+ (testRecord.date_actioned-currentRecord.date_actioned)
                overlapStopTime=testRecord.date_actioned
                break
            }
            else if(testRecord.device===currentDevice && overlap && overlapStopTime!==0){
                // Handling overlaps from records after the first
                // subtract current stop from previous stop to get the unique duration
                totalTime=totalTime+ (testRecord.date_actioned- overlapStopTime)
                overlap=false
                break
            }
        }
    }
    return totalTime

}

const records: UserRecord[]=[
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 2, device: "OSX 15.4", action: "start", date_actioned: 200 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 370 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 410 },
    { user_id: 2, device: "OSX 15.4", action: "stop", date_actioned: 490 },
    { user_id: 3, device: "Android 9.1", action: "start", date_actioned: 700 },
]

let res=getUsers(records,'start',700, 900)
console.log(res)

let res2=getPlaybackTime(1,records)
console.log(res2)
