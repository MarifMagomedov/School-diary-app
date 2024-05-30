import {Card, Button, Modal, Typography, Form, Select, Input, Space, InputNumber} from "antd";
import {Component, useState} from "react";
import axios from "axios";
import TeacherCard from "./TeacherCard.jsx";
import DeleteTeacherModal from "./Modal.jsx";


class AddNewTeacherModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectsOptions: [],
            classesOptions: [],
        }
        this.toggleModal = this.props.toggleModal.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.handler = this.props.handler.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/classes/all').then((response) => {
            const responseClasses = response.data.map((item) => {
                return {
                    label: `${item.class_number} ${item.class_word}`,
                    value: item.id
                };
            })

            this.setState(
                {
                    classesOptions: responseClasses
                }
            )
        })
    }

    async onFinish() {
        try {
            const values = await this.props.form[0].validateFields()
            values.age = Number(values.age)
            values.subjects = Number(this.props.subject)
            axios.post('http://localhost:5000/teachers/add', values).then((response) => {
                if (response.status === 201) {
                    axios.get(`http://localhost:5000/subjects/${this.props.subject}/teachers`).then(
                        (response) => {
                            const teachers = response.data.map(teacher => {
                                return <TeacherComponent
                                    teacher={teacher}
                                    subject={this.props.subject}
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
                            this.handler([teachers, button])
                        }
                    )
                    this.toggleModal()
                }
            })
        } catch (error) {
            //pass
        }
    }

    render() {
        return (
            <>
                <Modal
                    open={this.props.showModal}
                    onCancel={this.toggleModal}
                    onOk={this.onFinish}
                    footer={[
                        <Button form={this.props.form[0]} key="submit" type="primary" onClick={this.onFinish}>
                            Добавить
                        </Button>,
                        <Button key="cancel" onClick={this.toggleModal}>
                            Отмена
                        </Button>
                    ]}
                >
                    <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                        <Typography.Title level={1} >Добавить учителя</Typography.Title>
                    </Space>
                    <Form
                        form={this.props.form[0]}
                        layout="horizontal"
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            label="Имя"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите имя учителя!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Фамилия"
                            name="surname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите фамилию учителя!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Отчество"
                            name="middle_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите отчество учителя!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Возраст"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите корректный возраст учителя!',
                                },
                            ]}
                        >
                            <InputNumber min={20} max={80} style={{width:'100%'}}/>
                        </Form.Item>
                        <Form.Item
                            label="Класс р-ль"
                            name="teacher_class"
                            rules={[
                                {
                                    required: false
                                },
                            ]}
                        >
                            <Select placeholder='Выберите класс' options={this.state.classesOptions}/>
                        </Form.Item>
                        <Form.Item
                            label="Телеграмм"
                            name="telegram"
                            rules={[
                                {
                                    required: false
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Вконтакте"
                            name="vk"
                            rules={[
                                {
                                    required: false
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export const AddNewTeacher = (props) => {
    const form = Form.useForm()
    return <AddNewTeacherModal
        form={form}
        showModal={props.showModal}
        toggleModal={props.toggleModal}
        subject={props.subject}
        handler={props.handler}
    />
}


export class TeacherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSuccessDelete: false,
            addNewTeacher: false,
        }
        this.teacher = this.props.teacher
        this.handler = this.props.handler.bind(this)
        this.toggleModal = this.props.toggleModal.bind(this)
        this.SuccessDeleteModal = this.SuccessDeleteModal.bind(this)
    }

    SuccessDeleteModal() {
        const [loading, setLoading] = useState(false);

        const handleOkButton = () => {
            setLoading(true);
            axios.delete(`http://localhost:5000/teachers/${this.teacher.id}`).then((response) => {
                if (response.status === 200) {
                    axios.get(`http://localhost:5000/subjects/${this.props.subject}/teachers`).then(
                        (response) => {
                        const teachers = response.data.map(teacher => {
                            return <TeacherComponent
                                key={teacher.id}
                                teacher={teacher}
                                subject={this.props.subject}
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
                        this.handler([teachers, button])
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

}
