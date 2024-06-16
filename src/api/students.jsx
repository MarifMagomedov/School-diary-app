import axios from "axios";
import Student from "../components/StudentComponents/Student.jsx";


export async function deleteStudent(studentId) {
    console.log(studentId);
    return await axios.delete(
        `http://localhost:5000/students/${studentId}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(response => response.status);
}


export async function getStudentsCard(classId, handlerStudents) {
    return await axios.get(`http://localhost:5000/students/${classId}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(response => {
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
    return await axios.post(`http://localhost:5000/students/add`, values, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}

export async function updateStudent(values, studentId) {
    return await axios.put(`http://localhost:5000/students/${studentId}`, values, {
        headers: {
            token: localStorage.getItem("token")
        }
    }).then(
        response => response
    )
}