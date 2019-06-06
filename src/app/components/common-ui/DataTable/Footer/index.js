import React from 'react';

const Footer = ({ footer, namespace }) =>
    !footer ? null : <div className={`${namespace}-footer`}>{footer}</div>;

export default Footer;
