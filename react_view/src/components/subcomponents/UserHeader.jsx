import React from "react";

import userDefaultPhoto from '../../public/images/user00.png';

function UserHeader({photo, name, showSettingEvent}){
    return(
        <div className="contact-header">
            <div>
                <img src={!photo ? userDefaultPhoto : photo} alt="Contact photo" />
                <span>{name}</span>
            </div>
            <div>
                <div className="header-config" onClick={showSettingEvent}>
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;