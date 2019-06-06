import React from 'react';

const Header = ({ header, namespace }) =>
    !header ? null : <div className={`${namespace}-header`}>{header}</div>;

export default Header;
