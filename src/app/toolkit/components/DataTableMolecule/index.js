/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import Code from 'toolkit/Code';

import moment from 'moment';
import op from 'object-path';
import React, { Component } from 'react';
import Button from 'components/common-ui/Button';
import Pagination from 'components/common-ui/Pagination';
import DataTable, {
    Column,
    Row,
    SearchBar,
} from 'components/common-ui/DataTable';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DataTableMolecule
 * -----------------------------------------------------------------------------
 */

const labelFunction = (key, value) => {
    switch (key) {
        case 'dob':
            const d = new Date(value);
            return moment(d)
                .add(1, 'day')
                .format('L');

        default:
            return value;
    }
};

const Header = ({ onSearchChange, search, title }) => {
    return (
        <>
            <h2>{title}</h2>
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
        this.state = {
            data: this.props.data,
            page: this.props.page,
            pages: 1,
            title: 'House Tullos',
        };
        this.table = null;
    }

    next = () => this.table.nextPage();

    onChange = () =>
        this.setState({ page: this.table.page, pages: this.table.pages });

    prev = () => this.table.prevPage();

    renderHeader = ({ title, search, tableData }) => (
        <>
            <Header
                title={title}
                search={search}
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
                            {search && tableData.length < 1 ? (
                                `Searching for ${search}...`
                            ) : (
                                <>
                                    {tableData.length}
                                    {tableData.length === 1
                                        ? ' Member'
                                        : ' Members'}
                                    {search && (
                                        <>
                                            <span className='mx-xs-4'>:</span>
                                            <span className='italic'>
                                                {search}
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Column>
                </Row>
            )}
        </>
    );

    renderFooter = () => {
        const page = Number(op.get(this.state, 'page', 1));
        const pages = Number(op.get(this.state, 'pages', 1));
        return (
            <Pagination
                className='ml-xs-auto mr-xs-auto ml-sm-auto mr-sm-0'
                onNextClick={this.next}
                onPrevClick={this.prev}
                page={page}
                pages={pages}
                update={Date.now()}
            />
        );
    };

    Demo = () => {
        const { columns } = this.props;
        const { data = [], title } = this.state;
        const tableData = data;
        const search = op.get(this, 'table.search');

        return (
            <DataTable
                reorderable={true}
                multiselect={true}
                selectable={true}
                sortable={true}
                scrollable={false}
                sort={DataTable.ENUMS.SORT.DESC}
                sortBy='name'
                ref={elm => (this.table = elm)}
                columns={columns}
                data={data}
                footer={this.renderFooter()}
                header={this.renderHeader({ title, search, tableData })}
                onChange={this.onChange}
            />
        );
    };

    updateData = () => {
        let { title } = this.state;

        const newData =
            String(title).toLowerCase() === 'house tullos'
                ? [
                      {
                          name: 'Bart Simpson',
                          dob: '1978-04-22',
                          actions: (
                              <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>
                          ),
                          id: 'ct422',
                      },
                      {
                          name: 'Maggie Simpson',
                          dob: '1977-05-26',
                          actions: (
                              <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>
                          ),
                          id: 'lt526',
                      },
                      {
                          name: 'Lisa Simpson',
                          dob: '1977-05-26',
                          actions: (
                              <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>
                          ),
                          id: 'lt526',
                      },
                      {
                          name: 'Marge Simpson',
                          dob: '1977-05-26',
                          actions: (
                              <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>
                          ),
                          id: 'lt526',
                      },
                      {
                          name: 'Homer Simpson',
                          dob: '1977-05-26',
                          actions: (
                              <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>
                          ),
                          id: 'lt526',
                      },
                  ]
                : this.props.data;

        title =
            String(title).toLowerCase() === 'house tullos'
                ? 'House Simpson'
                : 'House Tullos';
        this.setState({ data: newData, title });
    };

    render() {
        const { Demo } = this;
        const { title } = this.state;

        return (
            <>
                <div className='py-xs-40'>
                    <Button onClick={this.updateData}>
                        {title === 'House Tullos'
                            ? 'House Simpson'
                            : 'House Tullos'}
                    </Button>
                </div>
                <Demo />
                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Import</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {
                            "import { DataTable } from '@atomic-reactor/reactium-ui';"
                        }
                    </Code>
                </div>
            </>
        );
    }
}

// Default properties
DataTableMolecule.defaultProps = {
    columns: {
        name: {
            label: 'Name',
            verticalAlign: DataTable.ENUMS.VERTICAL_ALIGN.MIDDLE,
            sortType: DataTable.ENUMS.SORT_TYPE.STRING,
        },
        dob: {
            label: 'Birthday',
            verticalAlign: DataTable.ENUMS.VERTICAL_ALIGN.MIDDLE,
            width: 115,
            sortType: DataTable.ENUMS.SORT_TYPE.DATE,
            labelFunction,
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
            dob: '1978-04-22',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'ct422',
        },
        {
            name: 'Lisa Tullos',
            dob: '1977-05-26',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'lt526',
        },
        {
            name: 'Lauren Tullos',
            dob: '2000-12-14',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'lt1214',
        },
        {
            name: 'Allie Tullos',
            dob: '2008-03-14',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'at314',
        },
        {
            name: 'Veronica Tullos',
            dob: '1951-10-19',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'vt1019',
        },
        {
            name: 'Ramona Tullos',
            dob: '1969-06-20',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'rt520',
        },
        {
            name: 'Justin Tullos',
            dob: '1998-11-19',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'jt1119',
        },
        {
            name: 'Paris Brown',
            dob: '1990-06-11',
            actions: <Button size={Button.ENUMS.SIZE.XS}>Edit</Button>,
            id: 'pb611',
        },
    ],
};

export default DataTableMolecule;
