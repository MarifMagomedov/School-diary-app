import {Button, Card, Modal, Space, Typography} from "antd";
import axios from "axios";
import {Component, useState} from "react";
import {TeacherComponent} from "./TeacherComponents.jsx";
import ClassroomTeacherComponent from "./ClassroomTeacherComponent.jsx";
import StudentComponent from "./StudentComponent.jsx";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";


class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSuccessDelete: false,
            studentsComponents: [],
            left: 0,
            right: 5
        }
        this.teacher = this.props.teacher
        this.students = this.props.students
        this.onClickRight = this.onClickRight.bind(this)
        this.onClickLeft = this.onClickLeft.bind(this)
    }

    componentDidMount() {
        const studentsComponents = []
        for (let student of this.props.students) {
            let studentComponent = <StudentComponent key={student.id} student={student}/>
            studentsComponents.push(studentComponent)
        }
        this.setState({studentsComponents: studentsComponents})
    }
    handleClickDelete(cls) {
        axios.delete().then((response) => {})
    }

    handleClickEdit(cls) {
        //pass
    }

    SuccessDeleteModal = () => {
        const [loading, setLoading] = useState(false);

        const handleCancelButton = () => {
            this.setState({modalSuccessDelete: false})
        }

        return (
            <Modal
                open={this.state.modalSuccessDelete}
                title="Вы точно хотите удалить данного учителя из базы?"
                okText='Удалить'
                cancelText='Отмена'
                onCancel={handleCancelButton}
                confirmLoading={loading}
            />
        )
    }

    onClickRight() {

        this.setState(
            {
                left: this.state.right,
                right: this.state.right + 6,
            }
        )
    }

    onClickLeft() {
        this.setState(
            {
                left: this.state.left - 6,
                right: this.state.left - 1,
            }
        )
    }

    render(){
        return (
            <Space direction="horizontal" align="center">
                <LeftOutlined
                    style={{marginRight: "15px"}}
                    hidden={this.state.left <= 0}
                    onClick={this.onClickLeft}
                />
                <Space direction='vertical'>
                    <Space direction='vertical'>
                        <Typography.Title
                            level={2}
                            style={{marginBottom: "0px"}}
                        >
                            Классный руководитель
                        </Typography.Title>
                        <ClassroomTeacherComponent teacher={this.teacher}/>
                    </Space>
                    <Space direction='vertical'>
                        <Typography.Title
                            level={2}
                            style={{marginBottom: "0px"}}
                        >
                            Ученики
                        </Typography.Title>
                        {this.state.studentsComponents.slice(this.state.left, this.state.right)}
                    </Space>
                </Space>
                <RightOutlined
                    style={{marginLeft: "15px"}}
                    hidden={this.state.right > this.state.studentsComponents.length}
                    onClick={this.onClickRight}
                />
            </Space>
        )
    }
}

export default ClassComponent;