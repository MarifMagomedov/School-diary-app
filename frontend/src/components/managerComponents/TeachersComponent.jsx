import {Card, Button, Modal} from "antd";
import {Component, useState} from "react";
import axios from "axios";




class TeacherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSuccessDelete: false
        }
        this.handler = this.props.handler.bind(this)
    }

    SuccessDeleteModal = () => {
        const [loading, setLoading] = useState(false);

        const handleOkButton = () => {
            setLoading(true);
            axios.delete(`http://localhost:5000/teachers/${this.props.teacherId}`).then((response) => {
                if (response.status === 200) {
                    axios.get(`http://localhost:5000/subjects/${this.props.subject}/teachers`).then((response) => {
                        const teachers = response.data.map(teacher => {
                            return <TeacherComponent
                                name={teacher.name}
                                surname={teacher.surname}
                                middleName={teacher.middle_name}
                                teacherId={teacher.id}
                                teacherClass={teacher.teacher_class}
                                subject={this.props.subject}
                                email={teacher.email}
                                handler={this.handler}
                            />
                        })
                        this.handler(teachers)
                    })
                }
            })
            setLoading(false)
            this.setState({ modalSuccessDelete: false })
        }


        const handleCancelButton = () => {
            this.setState({modalSuccessDelete: false})
        }

        return (
            <Modal
                open={this.state.modalSuccessDelete}
                title="Вы точно хотите удалить данного учителя из базы?"
                okText='Удалить'
                cancelText='Отмена'
                onOk={handleOkButton}
                onCancel={handleCancelButton}
                confirmLoading={loading}
            />
        )
    }
    handleClickDelete = () => {
        this.setState({modalSuccessDelete: true})
    }

    handleClickEdit() {

    }

    render() {
        return (
            <>
                <Card
                    title={`${this.props.name} ${this.props.surname} ${this.props.middleName}`}
                    bordered={false}
                    style={{
                        width: "750px",
                        marginLeft: "150px"
                    }}
                    extra={
                        <div>
                            <Button
                                type="primary"
                                style={{marginRight: "10px"}}
                                onClick={this.handleClickEdit}
                            >
                                Редактировать
                            </Button>
                            <Button
                                type="primary"
                                danger
                                ghost
                                onClick={this.handleClickDelete}
                            >
                                Удалить
                            </Button>
                        </div>
                    }
                >
                    <p><b>Классный руководитель:</b>
                        {
                            (this.props.teacherClass !== {})
                                ? ` ${this.props.teacherClass.class_number} ${this.props.teacherClass.class_word}`:
                                'Не является классным руководителем'
                        }
                    </p>
                    <p><b>Электронная почта:</b>{this.props.email}</p>
                    <p></p>
                </Card>
                <this.SuccessDeleteModal isOpen={this.modalSuccessDelete}/>
            </>
        )
    }
}


export default TeacherComponent