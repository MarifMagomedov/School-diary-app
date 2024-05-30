import {Button, Card, Modal} from "antd";
import {useState} from "react";


function DeleteTeacherModal(props) {
    const handleOkButton = () => {
        props.handler(false);
    }

    const handleCancelButton = () => {
        props.handler(true)
    }

    return (
        <Modal
            open={props.isOpen}
            title="Вы точно хотите удалить данного учителя из базы?"
            okText='Удалить'
            cancelText='Отмена'
            onOk={handleOkButton}
            onCancel={handleCancelButton}
        />
    )
}


function TeacherCard(props) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleClickEdit = () => {
        return 1
    }

    const handleClickDelete = () => {
        return setIsOpenDeleteModal(true)
    }

    const handler = () => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }

    return (
        <>
            <Card
                title={`${props.teacher.name} ${props.teacher.surname} ${props.teacher.middle_name}`}
                bordered={false}
                style={{
                    width: "750px",
                    marginTop: "15px"
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
                <p><b>Идентификатор:</b>{` ${props.teacher.id}`}</p>
                <p><b>Возраст:</b>{` ${props.teacher.age}`}</p>
                <p><b>Классный руководитель:</b>
                    {
                        (props.teacher.teacher_class == null)
                            ? ' Не является классным руководителем' :
                            ` ${props.teacher.teacher_class.class_number} ${props.teacher.teacher_class.class_word}`
                    }
                </p>
                {(props.teacher.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (props.teacher.email == null)
                        ? ' Не зарегистирован' :
                        ` ${props.teacher.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (props.teacher.vk == null)
                        ? ' Не указан' :
                        ` ${props.teacher.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (props.teacher.telegram == null)
                        ? ' Не указан' :
                        ` ${props.teacher.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
            </Card>
            {<DeleteTeacherModal teacherId={props.teacher.id} isOpen={isOpenDeleteModal} handler={handler}/>}
        </>
    )
}

export default TeacherCard;