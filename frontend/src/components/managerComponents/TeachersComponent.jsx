import {Card, Button, Modal} from "antd";
import {useState} from "react";
import axios from "axios";




function TeacherComponent(props) {
    const [modalSuccessDelete, setModalSuccessDelete] = useState(false);

    const SuccessDeleteModal = ({isOpen}) => {
        const [loading, setLoading] = useState(false);
        const [modalOpen, setModalOpen] = useState(isOpen)

        const handleOkButton = () => {
            setLoading(true);
            const deleteTeacher = localStorage.getItem("setTeacher");
            axios.delete(`/teachers/${deleteTeacher}`).then((response) => {
                console.log(response.data);
            })
            setLoading(false)
        }


        const handleCancelButton = () => {
            setModalSuccessDelete(false);
        }

        return (
            <Modal
                open={modalSuccessDelete}
                title="Вы точно хотите удалить данного учителя из базы?"
                okText='Удалить'
                cancelText='Отмена'
                onOk={handleOkButton}
                onCancel={handleCancelButton}
                confirmLoading={loading}
            />
        )
    }
    const handleClickDelete = () => {
        setModalSuccessDelete(true)

    }

    function handleClickEdit() {
        localStorage.setItem('setTeacher', props.teacherId)
    }

    return (
        <>
        <Card
            title={`${props.name} ${props.surname} ${props.middleName}`}
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
                        onClick={handleClickEdit}
                    >
                        Редактировать
                    </Button>
                    <Button
                        type="primary"
                        danger
                        ghost
                        onClick={handleClickDelete}
                    >
                        Удалить
                    </Button>
                </div>
            }
        >
            <p><b>Классный руководитель:</b>
                {
                    (props.teacherClass)
                        ? ` ${props.teacherClass.class_number} ${props.teacherClass.class_word}`:
                        'Не является классным руководителем'
                }
            </p>
            <p><b>Электронная почта:</b>{}</p>
            <p></p>
        </Card>
        <SuccessDeleteModal isOpen={modalSuccessDelete}/>
    </>
    )
}


export default TeacherComponent