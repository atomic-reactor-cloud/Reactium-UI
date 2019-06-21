/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Pagination } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: PaginationMolecule
 * -----------------------------------------------------------------------------
 */

export default class PaginationMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12 col-sm-6 col-lg-4 pb-xs-20 text-center'>
                    <Pagination page={3} pages={20} numbers={5} />
                </div>
                <div className='col-xs-12 col-sm-6 col-lg-4 pb-xs-20 text-center'>
                    <Pagination page={10} pages={20} />
                </div>
                <div className='col-xs-12 col-sm-6 col-lg-4 pb-xs-20 text-center'>
                    <Pagination
                        page={3}
                        pages={20}
                        numbers={5}
                        color={Pagination.COLOR.SECONDARY}
                    />
                </div>
                <div className='col-xs-12 col-sm-6 col-lg-4 pb-xs-20 text-center'>
                    <Pagination
                        page={20}
                        pages={20}
                        color={Pagination.COLOR.PRIMARY}
                    />
                </div>

                <div className='col-xs-12 col-sm-6 col-lg-4 text-center'>
                    <Pagination
                        page={2}
                        pages={20}
                        numbers={5}
                        arrows={false}
                        color={Pagination.COLOR.DANGER}
                    />
                </div>
                <div className='col-xs-12 col-sm-6 col-lg-4 text-center'>
                    <Pagination
                        page={10}
                        pages={20}
                        arrows={false}
                        color={Pagination.COLOR.SUCCESS}
                    />
                </div>
            </div>
        );
    }
}
