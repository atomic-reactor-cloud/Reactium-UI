/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import op from 'object-path';
import React, { Component } from 'react';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';
import DataTable, {
    Column,
    Pagination,
    Row,
    SearchBar,
} from 'components/common-ui/DataTable';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DataTableMolecule
 * -----------------------------------------------------------------------------
 */

const Header = ({ onSearchChange, search }) => {
    return (
        <>
            <h2>House Tullos</h2>
            <SearchBar
                defaultValue={search}
                placeholder='Search'
                className='mr-xs-8'
                onChange={onSearchChange}
            />
        </>
    );
};

class DataTableMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = { page: this.props.page };
        this.table = null;
    }

    next = () => this.table.nextPage();

    onChange = () => this.setState({ page: this.table.page });

    prev = () => this.table.prevPage();

    footer = () => {
        const { page, rowsPerPage = 0 } = this.state;

        return (
            this.table &&
            this.table.pages > 1 && (
                <div className='flex-right flex-grow'>
                    <div className='btn-group'>
                        <button
                            className='btn-clear-xs px-xs-4'
                            onClick={this.prev}>
                            <Feather.ChevronLeft width={14} height={14} />
                        </button>
                        <span
                            className='btn-clear-xs'
                            style={{ width: 50, minWidth: 50, maxWidth: 50 }}>
                            {page}
                            <span className='lowercase mx-xs-8'>of</span>
                            {this.table.pages}
                        </span>
                        <button
                            className='btn-clear-xs px-xs-4'
                            onClick={this.next}>
                            <Feather.ChevronRight width={14} height={14} />
                        </button>
                    </div>
                </div>
            )
        );
    };

    render() {
        const { columns, data, rowsPerPage } = this.props;
        const tableData = op.get(this, 'table.data');
        const search = op.get(this, 'table.search');

        return (
            <div style={{ height: 380 }}>
                <DataTable
                    columns={columns}
                    data={data}
                    header={
                        <>
                            <Header
                                onSearchChange={e => {
                                    this.table.setState({
                                        search: e.target.value,
                                    });
                                }}
                            />
                            {tableData && (
                                <Row className='bg-white-dark'>
                                    <Column width='100%'>
                                        <div className='flex flex-middle'>
                                            {tableData.length}
                                            {tableData.length === 1
                                                ? ' Member'
                                                : ' Members'}
                                            {search && (
                                                <>
                                                    <span className='mx-xs-4'>
                                                        :
                                                    </span>
                                                    <span className='italic'>
                                                        {search}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </Column>
                                </Row>
                            )}
                        </>
                    }
                    footer={
                        <Pagination
                            className='ml-xs-auto mr-xs-auto ml-sm-auto mr-sm-0'
                            onNextClick={this.next}
                            onPrevClick={this.prev}
                            page={op.get(this, 'table.page', 0) || 0}
                            pages={op.get(this, 'table.pages', 0) || 0}
                        />
                    }
                    multiselect={true}
                    onChange={this.onChange}
                    onSelect={e => console.log(e)}
                    onUnSelect={e => console.log(e)}
                    ref={elm => (this.table = elm)}
                    rowsPerPage={rowsPerPage}
                />
            </div>
        );
    }
}

// Default properties
DataTableMolecule.defaultProps = {
    columns: {
        name: {
            label: 'Name',
            verticalAlign: DataTable.ENUMS.VERTICAL_ALIGN.MIDDLE,
        },
        dob: {
            label: 'Birthday',
            verticalAlign: DataTable.ENUMS.VERTICAL_ALIGN.MIDDLE,
            width: 100,
        },
        actions: {
            label: null,
            verticalAlign: DataTable.ENUMS.VERTICAL_ALIGN.MIDDLE,
            textAlign: DataTable.ENUMS.TEXT_ALIGN.RIGHT,
            width: 90,
        },
    },
    data: [
        {
            name: 'Cam Tullos',
            dob: '04/22/1978',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Lisa Tullos',
            dob: '05/22/1977',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Lauren Tullos',
            dob: '12/14/2000',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Allie Tullos',
            dob: '03/14/2008',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Veronica Tullos',
            dob: '10/19/1951',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Ramona Tullos',
            dob: '06/20/1969',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Justin Tullos',
            dob: '11/19/1998',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
        {
            name: 'Paris Brown',
            dob: '06/11/1990',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
        },
    ],
    page: 1,
    rowsPerPage: 4,
};

export default DataTableMolecule;
