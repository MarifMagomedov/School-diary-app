import {useEffect, useState} from "react";
import {getClassInfo} from "../../api/classes.jsx";
import {Space, Typography} from "antd";
import ClassComponents from "./ClassComponents.jsx";




function Class({cls, teachersComponents, setTeachersComponents, classesOptions}) {
    const [teacherComponent, setTeacherComponent] = useState(null);
    const [studentsComponents, setStudentsComponent] = useState([]);

    useEffect(() => {
        getClassInfo(
            cls,
            teachersComponents,
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
            <Typography.Title style={{marginTop: '35px', marginBottom: '0px'}}>Ученики</Typography.Title>
            {studentsComponents}
        </Space>
    )
}

export default Class;