import axios from "axios";
import Teacher from "../components/TeacherComponents/Teacher.jsx";
import Student from "../components/StudentComponents/Student.jsx";
import {Typography} from "antd";


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


export async function getClassesOptions() {
    return await axios.get('http://localhost:5000/classes/all').then((response) => {
        const responseClasses = response.data.map((item) => {
            return getItem(
                `${item.class_number} ${item.class_word}`,
                item.id
            );
        })
        return getItem('Классы', 'classes', null, responseClasses)
    })
}


export async function getClassInfo(classId, teachers, handlerTeachers, classesOptions, handlerStudents) {
    return await axios.get(`http://localhost:5000/classes/class/${classId}`)
        .then((response) => {
            let classroomTeacher
            const clsInfo = response.data;
            const classStudents = clsInfo.students.map((student) => {
                return (
                    <Student
                        student={student}
                        key={student.id}
                        handlerStudents={handlerStudents}
                        classId={classId}
                    />
                )
            })

            if (clsInfo.teacher !== undefined) {
                classroomTeacher = (
                    <Teacher
                        key={clsInfo.teacher.id}
                        teacher={clsInfo.teacher}
                        subject={clsInfo.subject_id}
                        handlerTeachers={handlerTeachers}
                        classesOptions={classesOptions}
                        teachers={teachers}
                    />
                )
            } else {
                classroomTeacher = (
                    <Typography.Title
                        level={5}
                        style={{marginBottom: "0px", marginTop: "15px"}}
                    >
                        Классного руководителя в данном классе нет
                    </Typography.Title>
                )
            }

            return {
                students: classStudents,
                teacher: classroomTeacher,
            }
        })
}

