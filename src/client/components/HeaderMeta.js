import React from 'react';
import {Helmet} from "react-helmet-async";

export default ({meta}) => {
    return (
      <Helmet>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title}/>

        <meta property="og:description" content={meta.description}/>
        <meta name="description" content={meta.description}/>

        <meta property="og:keywords" content={meta.keywords}/>
        <meta name="keywords" content={meta.keywords}/>

        <meta property="og:site_name" content={meta.site_name}/>
      </Helmet>
    )
}