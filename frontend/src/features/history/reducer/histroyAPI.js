import axios from "axios";
const SERVER = 'http://127.0.0.1:8000'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege..'
}

const modify = x => axios.put(`${SERVER}/history/modify/${x}`)
const remove = x => axios.delete(`${SERVER}/history/remove/${x}`)
const create = x => axios.post(`${SERVER}/history/create`,JSON.stringify(x),{headers})
const find = x => axios.get(`${SERVER}/history/find/${x}`)//pk로 찾는거 하나 무조건 있어야됌
const list = x => axios.get(`${SERVER}/history/list/${x}`)//page로 찾는거 하나 
const hmap = x => axios.get(`${SERVER}/history/map/${x}`)


export default {
    modify,
    remove,
    create,
    find,
    list,
    hmap
}