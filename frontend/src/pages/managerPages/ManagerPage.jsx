import {Component, useEffect, useState} from "react";
import axios from "axios";
import BookOutlined from "@ant-design/icons";
import {Menu, Space} from "antd";
import TeacherComponent from "../../components/managerComponents/TeachersComponent.jsx";
import ClassesComponent from "../../components/managerComponents/ClassesComponent.jsx";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


class ManagerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectOptions: [],
            classesOptions: [],
            teachersComponents: [],
            classesComponents: []
        }
        this.handler = this.handler.bind(this)
    }

    onClickSubject = (subject) => {
        axios.get(
            `http://localhost:5000/subjects/${subject.key}/teachers`
        ).then(response => {
            const teachers = response.data.map(teacher => {
                return <TeacherComponent
                    name={teacher.name}
                    surname={teacher.surname}
                    middleName={teacher.middle_name}
                    teacherId={teacher.id}
                    teacherClass={teacher.teacher_class}
                    subject={subject.key}
                    email={teacher.email}
                    handler={this.handler}
                />
            })
            this.setState({
                teachersComponents: teachers,
                classesComponents: []
            });
        })
    };

    onClickClass = (clickCls) => {
        axios.get(`http://localhost:5000/classes/class/${clickCls.key}`).then(response => {
            const clsInfo = response.data
            const cls = <ClassesComponent
                name={`${clsInfo.class_number} ${clsInfo.class_word}`}
                teacher={clsInfo.classroom_teacher}
                classId={clsInfo.id}
            />
            this.setState({
                teachersComponents: [],
                classesComponents: cls
            });
        })
    }

    handler(items) {
        this.setState({teachersComponents: items});
    }

    componentDidMount() {
        axios.get('http://localhost:5000/subjects/all').then((response) => {
            const response_subjects = response.data.map((item) => {
                return getItem(
                    item.subject_name,
                    item.subject_name
                );
            })

            this.setState(
                {
                    subjectOptions: getItem('Учителя', 'subjects', <BookOutlined/>, response_subjects)
                }
            )
        })

        axios.get('http://localhost:5000/classes/all').then((response) => {
            const response_classes = response.data.map((item) => {
                return getItem(
                    `${item.class_number} ${item.class_word}`,
                    item.id
                );
            })

            this.setState(
                {
                    classesOptions: getItem('Классы', 'classes', <BookOutlined/>, response_classes)
                }
            )
        })
    }

    render(){
        return (
            <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
                <Menu
                    style={{
                        width: 256,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                    selectable
                    onClick={(item) => {
                        (item.keyPath[1] === 'subjects') ? this.onClickSubject(item): this.onClickClass(item);
                    }}
                    mode="inline"
                    items={[this.state.subjectOptions, this.state.classesOptions]}

                />
                {<Space direction='vertical' style={{justifyContent: 'center'}}>
                    {...this.state.teachersComponents}
                </Space>}
                {<Space direction='vertical' style={{justifyContent: 'center'}}>
                    {...this.state.classesComponents}
                </Space>}
            </div>
        )
    }
}

export default ManagerPage;