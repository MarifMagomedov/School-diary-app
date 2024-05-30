import {Component} from "react";
import {Button, Card} from "antd";


const StudentComponent = (props) => {
    const handleClickEdit = () => {

    }

    const handleClickDelete = () => {

    }

    return(
        <Card
            title={`${props.student.name} ${props.student.surname} ${props.student.middle_name}`}
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
            <p><b>Идентификатор:</b>{` ${props.student.id}`}</p>
            <p><b>Возраст:</b>{` ${props.student.age}`}</p>

            {(props.student.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (props.student.email == null)
                        ? ' Не зарегистирован' :
                        ` ${props.student.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (props.student.vk == null)
                        ? ' Не указан' :
                        ` ${this.teacher.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (props.student.telegram == null)
                        ? ' Не указан' :
                        ` ${props.student.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
        </Card>
    )
}

export default StudentComponent
