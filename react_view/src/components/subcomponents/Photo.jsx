import React, { useEffect, useState } from "react";

import defaultPhoto from '../../public/images/user00.png';

function Photo({classN, url}){

    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if(!url) return setPhoto(() => <img src={defaultPhoto} alt="Contact photo" className={"photoDefault " + classN} />)
        setPhoto(() => <img src={url} alt="Contact photo" className={"photoDefault " + classN} />)
    }, []);

    return(
        <>
            {photo}
        </>
    )
}

export default Photo;