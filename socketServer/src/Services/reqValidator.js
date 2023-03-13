import * as model from '../Models/request.js';

export function status(status){
    return Object.keys(model.status).includes(status);
}

export function authorized(status){
    if(model.status.ACCEPT == status) return false;
    if(model.status.REJECT == status) return false;
    if(model.status.SENT == status) return false;
    return true;
}