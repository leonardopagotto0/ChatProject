import bcrypt from 'bcryptjs'

export default {
    hash,
    validate
}

export async function hash(password)
{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
export async function validate(hash, password){
    return bcrypt.compareSync(password, hash);
}
