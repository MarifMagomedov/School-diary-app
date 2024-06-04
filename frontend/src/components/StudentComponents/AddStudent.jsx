import {Button, Space} from "antd";


function AddStudentModal() {

    return (
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button type="primary" >Добавить ученика</Button>
        </Space>
    )
}