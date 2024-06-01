import axios from "axios";
import TeacherComponent from "../components/TeacherComponents/TeacherComponent.jsx";

export async function getTeachersCard(subjectId, handlerTeachers, teachers) {
     return await axios.get(
         `http://localhost:5000/subjects/${subjectId}/teachers`
     ).then((response) => {
          return response.data.map(teacher => {
               return <TeacherComponent
                   key={teacher.id}
                   teacher={teacher}
                   subject={subjectId}
                   handlerTeachers={handlerTeachers}
                   teachers={teachers}
                   // handler={this.handler}
                   // toggleModal={this.toggleModal}
               />
          });
     })
}

export async function deleteTeacher(teacherId) {
     return await axios.delete(
         `http://localhost:5000/teachers/${teacherId}`
     ).then(response => response.status);
}