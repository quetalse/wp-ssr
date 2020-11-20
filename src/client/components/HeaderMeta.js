import React from 'react';
import {Helmet} from "react-helmet-async";

export default ({meta}) => {
    return (
      <Helmet>
        <title>{meta.email}</title>
        <meta property="og:title" content={meta.email} />
        <meta property="og:description" content={meta.phone} />
        <meta property="og:keywords" content={meta.username} />
        <meta name="keywords" content={meta.username} />
        <meta property="og:site_name" content={meta.name} />
      </Helmet>
    )
}