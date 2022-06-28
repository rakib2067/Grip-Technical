interface UserRecord {

    user_id: number;
    device:string;
    action:Action;
    date_actioned:number
    
}

type Action = "start"|"stop"

function getUsers(records:UserRecord [], action: Action, start_time: number, end_time: number) : number []{

    //Setup: created users array to return and filteredarray for matching record
    let users: number []=[]
    const filteredArray: UserRecord [] = records.filter(record => record.action === action && start_time<= record.date_actioned && record.date_actioned<=end_time)
    
    //To avoid duplicate values
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
    let overlapStopTime: number= 0;

    for(let i=0;i<filteredArray.length;i++){
        
        let currentRecord=filteredArray[i]
        let currentDevice= currentRecord.device
        if( currentRecord.action==="start"){

        //Looping over starting from next index
        for(let j=i+1; j<filteredArray.length;j++){

            //variable for test record
            let testRecord=filteredArray[j]


            if(testRecord.device == currentDevice && testRecord.action==="stop"&& currentRecord.date_actioned>overlapStopTime){
                //Total duration for for record or if there is no overlap on subsequent devices
                totalTime=totalTime+ (testRecord.date_actioned-currentRecord.date_actioned)
                overlapStopTime=testRecord.date_actioned
                break
            }
            else if(testRecord.device == currentDevice &&testRecord.action==="stop"&& overlapStopTime<testRecord.date_actioned){

                //If the testrecord device has a stop time higher than our current one (It is overlapping)
                // add to total time, using difference of the current stop time
                totalTime=totalTime+ (testRecord.date_actioned- overlapStopTime)

                //update stop time
                overlapStopTime=testRecord.date_actioned;
                break
            }
            //For cases where it is overlapping within our stoptime, nothing happens
        }}
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
console.log(res) //Expect [3]

let res1=getUsers(records,'start',100, 900)
console.log(res1) //Expect [1,2,3]


let res2=getPlaybackTime(1,records)
console.log(res2) //Expect 310



// tests for overlaps, and not adding overlapping playbacktime
const records2: UserRecord[]=[
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 200 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 370 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 410 },
    { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
    { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 490 },
    { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },

]
let res3=getPlaybackTime(1,records2)
console.log(res3) //expect 400

// Test for no overlap
const records3: UserRecord[]=[
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 200 },
    { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 250 },
    { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 300 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 350 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 400 },
    { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
    { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },
]

let res4=getPlaybackTime(1,records3)
console.log(res4) //expect 250