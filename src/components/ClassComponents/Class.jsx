import {useEffect, useState} from "react";
import {getClassInfo} from "../../api/classes.jsx";
import {Space, Typography} from "antd";
import AddStudent from "../StudentComponents/AddStudent.jsx";
import SetTeacher from "../TeacherComponents/SetClassTeacher.jsx";




function Class({cls, setTeachersComponents, classesOptions, subjectOptions}) {
    const [teacherComponent, setTeacherComponent] = useState(null);
    const [studentsComponents, setStudentsComponent] = useState([]);

    useEffect(() => {
        getClassInfo(
            cls,
            setTeachersComponents,
            classesOptions,
            setStudentsComponent
        ).then(clsInfo => {
            setStudentsComponent(clsInfo.students)
            setTeacherComponent(clsInfo.teacher)
        })
    }, []);

    return (
        <Space direction="vertical">
            <Typography.Title style={{marginBottom: '0px'}}>Классный руководитель</Typography.Title>
            {teacherComponent}
            <SetTeacher classId={cls} handlerTeacher={setTeacherComponent}/>
            <Typography.Title style={{marginTop: '35px', marginBottom: '0px'}}>Ученики</Typography.Title>
            {studentsComponents}
            <AddStudent handlerStudents={setStudentsComponent} classId={cls} subjectOptions={subjectOptions}/>
        </Space>
    )
}

export default Class;