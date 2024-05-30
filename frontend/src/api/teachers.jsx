import axios from "axios";
import TeacherCard from "../components/TeacherComponents/TeacherCard.jsx";

export async function getTeachersCard(subjectId) {
     return await axios.get(
         `http://localhost:5000/subjects/${subjectId}/teachers`
     ).then((response) => {
          return response.data.map(teacher => {
               return <TeacherCard
                   key={teacher.id}
                   teacher={teacher}
                   subject={subjectId}
                   // handler={this.handler}
                   // toggleModal={this.toggleModal}
               />
          });
     })
}

export async function deleteTeacher(teacherId) {
     return await axios.delete().then(response => {

     })
}