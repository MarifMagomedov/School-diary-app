import {Component, useEffect, useState} from "react";
import axios from "axios";
import {Button, Menu, Space} from "antd";
import {TeacherComponent} from "../../components/managerComponents/TeacherComponents.jsx";
import {AddNewTeacher} from "../../components/managerComponents/TeacherComponents.jsx";
import ClassesComponent from "../../components/managerComponents/ClassesComponent.jsx";
import {useForm} from "antd/es/form/Form.js";

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
            classesComponents: [],
            showAddTeacherModal: false,
            openSubject: ''
        }
        this.handler = this.handler.bind(this)
    }

    onClickSubject = (subject) => {
        axios.get(
            `http://localhost:5000/subjects/${subject.key}/teachers`
        ).then(response => {
            const teachers = response.data.map(teacher => {
                return <TeacherComponent
                    teacher={teacher}
                    subject={subject.key}
                    handler={this.handler}
                    toggleModal={this.toggleModal}
                />
            })
            const button = <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'center'}}
            >
                <Button
                    type="primary"
                    style={{ marginTop: "15px"}}
                    onClick={this.toggleModal}
                >
                    Добавить учителя
                </Button>
            </Space>
            this.setState({
                teachersComponents: [teachers, button],
                classesComponents: [],
                openSubject: subject.key
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
            const button = <Button type="primary" >Добавить ученика</Button>
            this.setState({
                teachersComponents: [],
                classesComponents: [cls, button]
            });
        })
    }

    handler(items) {
        this.setState({teachersComponents: items});
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showAddTeacherModal: !prevState.showAddTeacherModal
        }));
    }

    componentDidMount() {
        axios.get('http://localhost:5000/subjects/all').then((response) => {
            const response_subjects = response.data.map((item) => {
                return getItem(
                    item.subject_name,
                    item.id
                );
            })

            this.setState(
                {
                    subjectOptions: getItem('Учителя', 'subjects', null, response_subjects)
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
                    classesOptions: getItem('Классы', 'classes', null, response_classes)
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
                {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                    {...this.state.teachersComponents}
                </Space>}
                {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                    {...this.state.classesComponents}
                </Space>}
                <AddNewTeacher
                    showModal={this.state.showAddTeacherModal}
                    toggleModal={this.toggleModal}
                    subject={this.state.openSubject}
                    handler={this.handler}
                />
            </div>
        )
    }
}

export default ManagerPage;