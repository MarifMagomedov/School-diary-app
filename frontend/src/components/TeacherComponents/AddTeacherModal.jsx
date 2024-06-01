import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";
import {useState} from "react";
import {addNewTeacher, getTeachersCard} from "../../api/teachers.jsx";
import * as r from "antd";
import TeacherComponent from "./TeacherComponent.jsx";


function AddTeacherModal({modalIsOpen, handler, classesOptions, subject, teachers, handlerTeachers}) {
    const form = Form.useForm()

    async function handleSubmit() {
        try {
            const values = await form[0].validateFields()
            values.age = Number(values.age)
            values.subjects = Number(subject)

            const response = await addNewTeacher(values).then(r => r)
            if (response.status === 200) {
                const newTeachers = await getTeachersCard(subject, handlerTeachers, teachers, classesOptions).then(cards => cards)
                handlerTeachers(
                    [
                        newTeachers,
                        <AddNewTeacher
                            classesOptions={classesOptions}
                            subject={subject}
                            handlerTeachers={handlerTeachers}
                            teachers={teachers}
                        />
                    ]
                )
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <Modal
                centered
                open={modalIsOpen}
                onCancel={handler}
                onOk={handleSubmit}
                footer={[
                    <Button form={form[0]} key="submit" type="primary" onClick={handleSubmit}>
                        Добавить
                    </Button>,
                    <Button key="cancel" onClick={handler}>
                        Отмена
                    </Button>
                ]}
            >
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
                    <Typography.Title level={1} >Добавить учителя</Typography.Title>
                </Space>
                <Form
                    form={form[0]}
                    layout="horizontal"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
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
                        <Select placeholder='Выберите класс' options={classesOptions.map(cls => {
                            return {
                                value: cls.key,
                                label: cls.label,
                            }
                        })}/>
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
        </div>
    )
}

function AddNewTeacher({subject, classesOptions, handlerTeachers, teachers}) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleCancel = () => {
        setModalIsOpen(false)
    }

    return (
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button
                type="primary"
                style={{ marginTop: "15px"}}
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                Добавить учителя
            </Button>
            <AddTeacherModal
                modalIsOpen={modalIsOpen}
                handler={handleCancel}
                subject={subject}
                classesOptions={classesOptions}
                handlerTeachers={handlerTeachers}
                teachers={teachers}
            />
        </Space>
    )
}


export default AddNewTeacher;