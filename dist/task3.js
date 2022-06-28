"use strict";
function getUsers(records, action, start_time, end_time) {
    let users = [];
    const filteredArray = records.filter(record => record.action === action && start_time <= record.date_actioned && record.date_actioned <= end_time);
    filteredArray.map(record => {
        if (!users.includes(record.user_id)) {
            users.push(record.user_id);
        }
    });
    return users;
}
function getPlaybackTime(user_id, records) {
    let totalTime = 0;
    const filteredArray = records.filter(record => record.user_id === user_id);
    let overlapStopTime = 0;
    for (let i = 0; i < filteredArray.length; i++) {
        let currentRecord = filteredArray[i];
        let currentDevice = currentRecord.device;
        if (currentRecord.action === "start") {
            for (let j = i + 1; j < filteredArray.length; j++) {
                let testRecord = filteredArray[j];
                if (testRecord.device == currentDevice && testRecord.action === "stop" && currentRecord.date_actioned > overlapStopTime) {
                    totalTime = totalTime + (testRecord.date_actioned - currentRecord.date_actioned);
                    overlapStopTime = testRecord.date_actioned;
                    break;
                }
                else if (testRecord.device == currentDevice && testRecord.action === "stop" && overlapStopTime < testRecord.date_actioned) {
                    totalTime = totalTime + (testRecord.date_actioned - overlapStopTime);
                    overlapStopTime = testRecord.date_actioned;
                    break;
                }
            }
        }
    }
    return totalTime;
}
const records = [
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 2, device: "OSX 15.4", action: "start", date_actioned: 200 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 370 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 410 },
    { user_id: 2, device: "OSX 15.4", action: "stop", date_actioned: 490 },
    { user_id: 3, device: "Android 9.1", action: "start", date_actioned: 700 },
];
let res = getUsers(records, 'start', 700, 900);
console.log(res);
let res1 = getUsers(records, 'start', 100, 900);
console.log(res1);
let res2 = getPlaybackTime(1, records);
console.log(res2);
const records2 = [
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 200 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 370 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 410 },
    { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
    { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 490 },
    { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },
];
let res3 = getPlaybackTime(1, records2);
console.log(res3);
const records3 = [
    { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
    { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 200 },
    { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 250 },
    { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 300 },
    { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 350 },
    { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 400 },
    { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
    { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },
];
let res4 = getPlaybackTime(1, records3);
console.log(res4);
//# sourceMappingURL=task3.js.map