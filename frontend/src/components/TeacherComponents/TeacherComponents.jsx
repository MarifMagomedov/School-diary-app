import {Card, Button, Modal, Typography, Form, Select, Input, Space, InputNumber} from "antd";
import {Component, useState} from "react";
import axios from "axios";
import TeacherComponent from "./TeacherComponent.jsx";
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