import React from 'react';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={245} />
            <col />
            <col width={180} />
        </colgroup>
        <thead>
            <tr>
                <th>Method</th>
                <th>Description</th>
                <th>Returns</th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

const Row = ({ children, method, returns }) => (
    <tr className='top'>
        <th>{method}</th>
        <td>{children}</td>
        <td>
            <span className='number'>{returns}</span>
        </td>
    </tr>
);

const Methods = () => (
    <Table>
        <Row
            method={
                <>
                    jumpTo(<kbd>index</kbd>:Number)
                </>
            }>
            Transition to the specified <kbd>{'<Slide />'}</kbd> index.
        </Row>
        <Row method='next()'>Transition to the next slide.</Row>
        <Row method='pause()'>
            Pause if <kbd>autoplay</kbd> is true.
        </Row>
        <Row method='play()'>
            Start if <kbd>autoplay</kbd> is true.
        </Row>
        <Row method='prev()'>Transition to the previous slide.</Row>
        <Row method='resume()'>
            Start if <kbd>autoplay</kbd> is true and the Carousel is paused.
        </Row>
        <Row method='stop()'>
            Stop if <kbd>autoplay</kbd> is true.
        </Row>
    </Table>
);

export default Methods;
