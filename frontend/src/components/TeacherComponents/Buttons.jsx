import {Button, Space} from "antd";

export const AddNewTeacherButton = () => {
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