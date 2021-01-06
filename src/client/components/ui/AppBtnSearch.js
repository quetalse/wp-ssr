import React, { useState } from 'react';
import {Link} from "react-router-dom";

const AppBtnSearch = ({text, disabled, onClick, countLoader, countValue}) => {

    return (
        <button
            style={{width: '100%', color: '#000000', height: '3rem', backgroundColor: '#F0F0F0'}}
            className="btn waves-effect waves-light input-tool"
            onClick={onClick}
            disabled={disabled}
        >{text}
            {!countLoader|| <img width="20px" style={{'top': '4px'}} src="/app/images/loading.gif" alt="Загрузка"/>}
            {countValue ? `(${countValue})` : ''}
        </button>
    )
}

export default AppBtnSearch;