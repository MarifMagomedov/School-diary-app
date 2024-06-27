import {Table} from "antd";


function AllMarksTable() {
    const tableColumns = [
        {
            title: 'Предмет',
            dataIndex: 'subject',
            width: '14%',
        },
        {
            title: 'Первая четверть',
            dataIndex: 'first_quarter',
            width: '20%'
        },
        {
            title: 'Вторая четверть',
            dataIndex: 'second_quarter',
            width: '20%'
        },
        {
            title: 'Третья четверть',
            dataIndex: 'third_quarter',
            width: '20%'
        },
        {
            title: 'Четвертая четверть',
            dataIndex: 'fourth_quarter',
            width: '20%'
        },
        {
            title: 'Ср. балл',
            dataIndex: 'average_mark',
            width: '6%',
        }
    ]
    return (
        <Table
            columns={tableColumns}
            style={{width:'1500px'}}
        />
    )
}

export default AllMarksTable