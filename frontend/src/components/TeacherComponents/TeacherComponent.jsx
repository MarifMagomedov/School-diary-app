import {Button, Card, Modal} from "antd";
import {useState} from "react";
import {deleteTeacher, getTeachersCard} from "../../api/teachers.jsx";
import AddNewTeacher from "./AddTeacherModal.jsx";
import {getClassesOptions} from "../../api/classes.jsx";


function DeleteTeacherModal({isOpen, handler, handlerTeachers, teacherId, teachers, subject, classesOptions}) {
    async function handleOkButton(){
        await deleteTeacher(teacherId).then(status => status)
        const newTeachers = await getTeachersCard(subject, handlerTeachers, teachers, classesOptions).then(cards => cards)
        handlerTeachers(
            [
                newTeachers,
                <AddNewTeacher
                    subject={subject}
                    classesOptions={classesOptions}
                    handlerTeachers={handlerTeachers}
                    teachers={newTeachers}
                />
            ]
        )
        handler(false);
    }

    return (
        <Modal
            centered
            open={isOpen}
            title="Вы точно хотите удалить данного учителя из базы?"
            okText='Удалить'
            cancelText='Отмена'
            onOk={handleOkButton}
            onCancel={() => handler(false)}
        />
    )
}


function TeacherComponent({teacher, handlerTeachers, teachers, subject, classesOptions}) {
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleClickEdit = () => {
        return 1
    }

    const handleClickDelete = () => {
        return setIsOpenDeleteModal(true)
    }

    return (
        <>
            <Card
                title={`${teacher.name} ${teacher.surname} ${teacher.middle_name}`}
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
                <p><b>Идентификатор:</b>{` ${teacher.id}`}</p>
                <p><b>Возраст:</b>{` ${teacher.age}`}</p>
                <p><b>Классный руководитель:</b>
                    {
                        (teacher.teacher_class == null)
                            ? ' Не является классным руководителем' :
                            ` ${teacher.teacher_class.class_number} ${teacher.teacher_class.class_word}`
                    }
                </p>
                {(teacher.register != null) ?
                    <div><p><b>Электронная почта:</b>{
                    (teacher.email == null)
                        ? ' Не зарегистирован' :
                        ` ${teacher.email}`
                }
                </p>
                <p><b>Вконтакте:</b>{
                    (teacher.vk == null)
                        ? ' Не указан' :
                        ` ${teacher.vk}`
                }
                </p>
                <p><b>Телеграмм:</b>{
                    (teacher.telegram == null)
                        ? ' Не указан' :
                        ` ${teacher.telegram}`
                }
                </p>
                </div>: <p><b>Зарегистрирован:</b> Нет</p>}
            </Card>
            {<DeleteTeacherModal
                teacherId={teacher.id}
                isOpen={isOpenDeleteModal}
                handler={setIsOpenDeleteModal}
                teachers={teachers}
                handlerTeachers={handlerTeachers}
                subject={subject}
                classesOptions={classesOptions}
            />}
        </>
    )
}

export default TeacherComponent;