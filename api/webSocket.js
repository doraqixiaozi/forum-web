import {getId} from "../utils/auth";

const base = 'ws://127.0.0.1:9008';
const group_name = 'user';
const api_name = 'webSocket';

export default `${base}/${api_name}/${getId()}`;



