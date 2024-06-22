import {useEffect, useState} from "react";
import {DatePicker, Table, Typography} from "antd";
import {getStudentSchedule} from "../../api/students.jsx";


function Diary() {
    const [schedule, setSchedule] = useState([]);
    const tableColumns = [
        {
            title: '№',
            dataIndex: 'rowNumber',
        },
        {
            title: 'Предмет',
            dataIndex: 'subject',
        },
        {
            title: 'Домашнее задание',
            dataIndex: 'homework',
        },
        {
            title: 'Оценки',
            dataIndex: 'marks',
        }
    ]

    useEffect(() => {
        getStudentSchedule().then((res) => {setSchedule(res.data)})
    }, []);

    return (
        <div>
            <div style={{marginBottom: "30px"}}>
                <Typography.Title level={5}> Выбрать неделю</Typography.Title>
                <DatePicker onChange picker="week" />
            </div>
            {schedule.map(data => {
                console.log(data)
                return (
                    <div>
                        <Typography.Title level={4}>{data.date.slice(0, 10).replaceAll('-', '.', )}</Typography.Title>
                        <Table
                            bordered
                            locale={{'emptyText':<p style={{color: 'black'}}>На этот день нет расписания</p>}}
                            size={'middle'}
                            pagination={false}
                            columns={tableColumns}
                            style={{justifyContent: 'center', width: '1350px', marginBottom: '30px'}}
                            dataSource={data.rows.map(((row, index) => {
                                return {
                                    rowNumber: index + 1,
                                    subject: row.subject.subject_name,
                                    homework: row.homework.description,
                                    marks: (
                                        <div
                                            style={{
                                                width: '30px',
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            {[row.subject.marks.map(item => {
                                                return (
                                                    <div
                                                        style={{
                                                            padding: '5px 10px',
                                                            border: '#e5e7eb solid 1px',
                                                            marginRight: '10px',
                                                            borderRadius: '0px'
                                                        }}
                                                    >
                                                        {item.mark_value}
                                                    </div>
                                                )
                                            })]}
                                        </div>
                                    ),
                                }
                            }))}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Diary