import {getUsers,UserRecord ,getPlaybackTime} from '../../src/tasks3-6'
describe('task3',()=>{
    const records: UserRecord[]=[
        { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
        { user_id: 2, device: "OSX 15.4", action: "start", date_actioned: 200 },
        { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
        { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 370 },
        { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 410 },
        { user_id: 2, device: "OSX 15.4", action: "stop", date_actioned: 490 },
        { user_id: 3, device: "Android 9.1", action: "start", date_actioned: 700 },
    ]
    
    test('It works',()=>{
        expect(getUsers(records, "start", 700, 900)).toEqual([3])
    })
    test('It does not return duplicate values',()=>{
        expect(getUsers(records, "start", 100, 900)).toEqual([1,2,3])
    })
    test('It returns an empty array when input array is also empty',()=>{
        expect(getUsers([], "start", 100, 900)).toEqual([])
    })
})
describe('task4',()=>{

    test('It works',()=>{
        const records: UserRecord[]=[
            { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
            { user_id: 2, device: "OSX 15.4", action: "start", date_actioned: 200 },
            { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
            { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 370 },
            { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 410 },
            { user_id: 2, device: "OSX 15.4", action: "stop", date_actioned: 490 },
            { user_id: 3, device: "Android 9.1", action: "start", date_actioned: 700 },
        ]
        expect(getPlaybackTime(1,records)).toEqual(310)
    })

    test('It adds total unique time ignoring overlaps',()=>{
        const records: UserRecord[]=[
            { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
            { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 200 },
            { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 250 },
            { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 370 },
            { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 410 },
            { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
            { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 490 },
            { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },
        ]
        expect(getPlaybackTime(1,records)).toEqual(400)
    })
    test('It adds total unique time when there are no overlaps',()=>{
        const records: UserRecord[]=[
            { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
            { user_id: 1, device: "Windows 10", action: "stop", date_actioned: 200 },
            { user_id: 1, device: "OSX 15.4", action: "start", date_actioned: 250 },
            { user_id: 1, device: "OSX 15.4", action: "stop", date_actioned: 300 },
            { user_id: 1, device: "iPhone 8s", action: "start", date_actioned: 350 },
            { user_id: 1, device: "iPhone 8s", action: "stop", date_actioned: 400 },
            { user_id: 1, device: "Android", action: "start", date_actioned: 450 },
            { user_id: 1, device: "Android", action: "stop", date_actioned: 500 },
        ]
        expect(getPlaybackTime(1,records)).toEqual(250)
    })
    test('It returns 0 when there is no stop time',()=>{
        const records: UserRecord[]=[
            { user_id: 1, device: "Windows 10", action: "start", date_actioned: 100 },
        ]
        expect(getPlaybackTime(1,records)).toEqual(0)
    })
})