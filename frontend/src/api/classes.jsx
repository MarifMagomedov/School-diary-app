import axios from "axios";
import TeacherComponent from "../components/TeacherComponents/TeacherComponent.jsx";
import StudentCard from "../components/StudentComponents/StudentCard.jsx";


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


export async function getClassInfo(classId) {
    return await axios.get(`http://localhost:5000/classes/class/${classId}`)
        .then((response) => {
            const clsInfo = response.data;
            const classStudents = clsInfo.students.map((student) => {
                // <StudentCard />
                student
            })
            const classroomTeacher = (
                <TeacherComponent
                    key={clsInfo.teacher.id}
                    teacher={clsInfo.teacher}
                    subject={clsInfo.subjectId}
                ></TeacherComponent>
            )
            return {
                teacher: classroomTeacher,
                students: classStudents,
            };
        })
}

