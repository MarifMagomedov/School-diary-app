import {Button, Space} from "antd";

export const AddNewStudentButton = () => {
    return (
        <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'center'}}
        >
            <Button type="primary" >Добавить ученика</Button>
        </Space>
    )
}