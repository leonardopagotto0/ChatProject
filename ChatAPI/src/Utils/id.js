import {validate, v4} from 'uuid'; 

export default async function ()
{
    const id = v4();
    return id;
}

export async function validete (id)
{
    return validate(id);
}
