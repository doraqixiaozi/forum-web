import Cookies from 'js-cookie'
import user from "../api/user";

const TokenKey = 'User-Token';
const NameKey = 'User-Name';
const AvatarKey = 'User-Avatar';
const Id = 'User-Id';
const UserKey = 'User';

/*
export default {
    setUser(token,name,avatar){
        Cookies.set(TokenKey,token)
        Cookies.set(NameKey,name)
        Cookies.set(AvatarKey,avatar)
    }
}
*/

export function setUser(token, name, id, avatar) {
  Cookies.set(UserKey, {token: token, name: name, id: id, avatar: avatar});
  Cookies.set(TokenKey, token);
  Cookies.set(NameKey, name);
  Cookies.set(AvatarKey, avatar);
  Cookies.set(Id, id);
}

export function getUser() {
  let user = Cookies.getJSON(UserKey);
  if (user) {
    return {
      token: user.token,
      name: user.name,
      id: user.id,
      avatar: user.avatar
    }
  }
  return null;
  /* return {
       token: Cookies.get(TokenKey),
       name: Cookies.get(NameKey),
       avatar: Cookies.get(AvatarKey)
   }*/
}

export function removeUser() {
  Cookies.remove(UserKey);
  Cookies.remove(TokenKey);
  Cookies.remove(NameKey);
  Cookies.remove(AvatarKey);
  Cookies.remove(Id);
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function getId() {
  return Cookies.get(Id);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getNickName() {
  return Cookies.remove(NameKey);
}
