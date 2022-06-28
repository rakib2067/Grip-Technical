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
const records = [];
let res = getUsers(records, 'start', 700, 900);
console.log(res);
//# sourceMappingURL=task3.js.map