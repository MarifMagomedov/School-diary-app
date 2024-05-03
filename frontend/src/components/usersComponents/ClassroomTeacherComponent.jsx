import {Component} from "react";
import {Button, Card} from "antd";


class ClassroomTeacherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.teacher = this.props.teacher
    }

    handleClickEdit() {
        //pass
    }

    handleClickDelete() {
        //pass
    }

    render() {
        return (
            <Card
                title={`${this.teacher.name} ${this.teacher.surname} ${this.teacher.middle_name}`}
                bordered={false}
                style={{
                    width: "750px",
                    marginTop: "15px",
                    marginBottom: "15px"
                }}
                extra={
                    <div>
                        <Button
                            type="primary"
                            style={{marginRight: "10px"}}
                            onClick={this.handleClickEdit}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type="primary"
                            danger
                            ghost
                            onClick={this.handleClickDelete}
                        >
                            Удалить
                        </Button>
                    </div>
                }
            >
                <p><b>Идентификатор:</b>{` ${this.teacher.id}`}</p>
                <p><b>Возраст:</b>{` ${this.teacher.age}`}</p>
                {(this.teacher.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (this.teacher.email == null)
                        ? ' Не зарегистирован' :
                        ` ${this.teacher.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (this.teacher.vk == null)
                        ? ' Не указан' :
                        ` ${this.teacher.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (this.teacher.telegram == null)
                        ? ' Не указан' :
                        ` ${this.teacher.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
            </Card>
            // <this.SuccessDeleteModal isOpen={this.state.modalSuccessDelete}/>
        )
    }
}

export default ClassroomTeacherComponent