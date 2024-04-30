import {Button, Card, Modal, Space} from "antd";
import axios from "axios";
import {Component, useState} from "react";


class ClassesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalSuccessDelete: false
        }
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
                onOk={handleOkButton}
                onCancel={handleCancelButton}
                confirmLoading={loading}
            />
        )
    }

    render(){
        return (
            <Card
                title={`${props.name}`}
                bordered={false}
                style={{
                    width: "750px",
                    marginLeft: "150px"
                }}
                extra={
                    <div>
                        <Button
                            type="primary"
                            onClick={handleClickEdit}
                            style={{marginRight: "10px"}}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleClickDelete}
                            danger
                            ghost
                        >
                            Удалить
                        </Button>
                    </div>
                }
            >
                <p>{props.teacher}</p>
            </Card>
        )
    }
}

export default ClassesComponent;