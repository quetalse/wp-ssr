import React from 'react';
import {Helmet} from "react-helmet-async";
import {useSelector} from "react-redux";

export default () => {

    const page = useSelector( state => {
        // if(!state.home.data.page){return null}
        return state.home.data.page
    });

    const title = page ? page.title : '',
          description = page ? page.description : '',
          keywords = page ? page.keywords : '',
          site_name = page ? page.site_name : '';

    return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title}/>

        <meta property="og:description" content={description}/>
        <meta name="description" content={description}/>

        <meta property="og:keywords" content={keywords}/>
        <meta name="keywords" content={keywords}/>

        <meta property="og:site_name" content={site_name}/>
      </Helmet>
    )
}