import React from 'react';
import {Helmet} from "react-helmet-async";
import {useSelector} from "react-redux";

export default () => {

    console.log('Meta')

    const page = useSelector( state => {
        if(!state.home.data.page){return null}
        return state.home.data.page
    });

    return (
      <Helmet>
        <title>{page.title}</title>
        <meta property="og:title" content={page.title}/>

        <meta property="og:description" content={page.description}/>
        <meta name="description" content={page.description}/>

        <meta property="og:keywords" content={page.keywords}/>
        <meta name="keywords" content={page.keywords}/>

        <meta property="og:site_name" content={page.site_name}/>
      </Helmet>
    )
}