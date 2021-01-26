import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment/min/moment.min";
import {dropField} from "../../../../store/actions/home";
import { pushRoute } from "../../../../store/actions/page";

export const AppBtnSearch = ({classifierTitles, text, btnCounter: {loader, value}, selected, datePicker}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const classifiersLength = useSelector(state => {
        let length = 0;
        classifierTitles.forEach(classifierTitle => {
            if(state.classifiers[classifierTitle]) {
                length += 1;
                // data[classifierTitle] = state.classifiers[classifierTitle].data
            }
        })
        return length;
    });
    const classifierTitlesLength = classifierTitles.length;
    // const classifiersData = classifierTitles.filter(classifierTitle => classifiers[classifierTitle])
    const searchHandler = (e) => {
        e.preventDefault();
        // let data = {};

        // data['date'] = moment(datePicker).format("DD/MM/YYYY");
        let pushUrl = '';
        let dateStr = moment(datePicker).format("DD/MM/YYYY");
        //
        for (let key in selected) {
            // data[key] = selected[key].value
            pushUrl += `${key}=[${selected[key].value}]&`
        }

        // console.log('data', data);
        //
        pushUrl += `date=[${dateStr}]`;

        // dispatch(pushRoute({ url: `/search?${pushUrl}`, history}));

        history.push(`/search?${pushUrl}`);
    }
    return (
        <button
            style={{width: '100%', color: '#000000', height: '3rem', backgroundColor: '#F0F0F0'}}
            className="btn waves-effect waves-light input-tool"
            disabled={classifiersLength !== classifierTitlesLength}
            onClick={searchHandler}
        >{text}
            {!loader|| <img width="20px" style={{'top': '4px'}} src="/app/images/loading.gif" alt="Загрузка"/>}
            {value ? `(${value})` : ''}
        </button>
    )
}