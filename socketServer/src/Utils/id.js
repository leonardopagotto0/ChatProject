import { v4 } from 'uuid'; 

export default async function ()
{
    const id = v4();
    return id;
}