import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {dropField} from "../../../store/actions/home";
import { pushRoute } from "../../../store/actions/page";

const AppBtnSearch = ({text, btnCounter: {loader, value}, selected, datePicker}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {data, error, loading} = useSelector(state => {
        return state.classifiers
    });

    const page = useSelector(state => {
        return state.page
    });

    const searchHandler = (e) => {
        e.preventDefault();
        let pushUrl = '';
        let dateStr = moment(datePicker).format("DD/MM/YYYY");

        for (let key in selected) {
            pushUrl += `${key}=[${selected[key].value}]&`
        }

        pushUrl += `date=[${dateStr}]`;

        dispatch(pushRoute({ url: `/search?${pushUrl}`, history}));

        // history.push(`/search?${pushUrl}`);
    }

    return (
        <button
            style={{width: '100%', color: '#000000', height: '3rem', backgroundColor: '#F0F0F0'}}
            className="btn waves-effect waves-light input-tool"
            disabled={!data}
            onClick={searchHandler}
        >{text}
            {!loader|| <img width="20px" style={{'top': '4px'}} src="/app/images/loading.gif" alt="Загрузка"/>}
            {value ? `(${value})` : ''}
        </button>
    )
}

export default AppBtnSearch;