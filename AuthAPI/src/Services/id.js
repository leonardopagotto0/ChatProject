import * as uuid from 'uuid';

async function build()
{
    const id = uuid.v4();
    return id;
}

const  id = {
    build,
}

export default id;