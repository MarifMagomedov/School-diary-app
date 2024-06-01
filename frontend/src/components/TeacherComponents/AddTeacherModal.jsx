import {Button, Form, Input, InputNumber, Modal, Select, Space, Typography} from "antd";


const AddNewTeacherButton = () => {
    return (
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button
                type="primary"
                style={{ marginTop: "15px"}}
                // onClick={toggleModal}
            >
                Добавить учителя
            </Button>
        </Space>
    )
}


function AddTeacherModal(props) {
    const [form] = Form.useForm()

    async function handleSubmit() {

    }
    
    return (
        <>
            <Modal
                open={this.props.showModal}
                onCancel={this.toggleModal}
                // onOk={handleSubmit}
                footer={[
                    <Button form={this.props.form[0]} key="submit" type="primary" onClick={handleSubmit}>
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

export default AddTeacherModal;