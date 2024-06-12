import axios from "axios";
import Teacher from "../components/TeacherComponents/Teacher.jsx";
import Student from "../components/StudentComponents/Student.jsx";


export async function deleteStudent(studentId) {
    console.log(studentId);
    return await axios.delete(
        `http://localhost:5000/students/${studentId}`
    ).then(response => response.status);
}


export async function getStudentsCard(classId, handlerStudents) {
    return await axios.get(
        `http://localhost:5000/students/${classId}`
    ).then(response => {
        return response.data.map(student => {
            return (
                <Student
                    student={student}
                    handlerStudents={handlerStudents}
                    classId={classId}
                />
            )
        })
    })
}

export async function addStudent(values) {
    return await axios.post(`http://localhost:5000/students/add`, values).then(
        response => response
    )
}