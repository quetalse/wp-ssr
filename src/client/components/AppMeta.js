import React, { Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

export const AppMeta = () => {

    const {data, error, loading} = useSelector(state => (state.page));

    const renderMeta = (page) => {
        const title = page ? page.title : '',
            description = page ? page.description : '',
            keywords = page ? page.keywords : '',
            site_name = page ? page.site_name : '';

        return (
            <Fragment>
                <title>{title}</title>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta name="description" content={description}/>
                <meta property="og:keywords" content={keywords}/>
                <meta name="keywords" content={keywords}/>
                <meta property="og:site_name" content={site_name}/>
            </Fragment>
        )
    }

    return (
      <Helmet>
          {error && <title>&#129298; Error!</title> }
          {data !== null && renderMeta(data.page)}
      </Helmet>
    )
}