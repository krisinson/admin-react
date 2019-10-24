/* 
操作localStorage的存储封装
 */
import store from 'store'
function set(key, value) {
    //  localStorage.setItem(key,value instanceof Object?JSON.stringify(value):value)
    store.set(key, value)
}

function get(key, defaultValue) {
    if (defaultValue === undefined) {
        throw new Error('必须指定默认值')
    }
    // const value =localStorage.getItem(key)
    // if(defaultValue instanceof Object){
    //     return JSON.parse(value) || defaultValue
    // }
    // return value || defaultValue
    return store.get(key, defaultValue)
}

function remove(key) {
    //  localStorage.removeItem(key)
    if(key){
    store.remove(key)
    }else{
        store.clearAll()
    }
}

export default {
    set,
    get,
    remove,
    KEYS: {
        USER_KEY: 'user_key',
        TOKEN_KEY: 'token_key'
    }
}