import {useEffect, useState} from "react";
import {Space} from "antd";
import {getClassesOptions, getClassInfo} from "../../api/classes.jsx";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import {getTeachersCard} from "../../api/teachers.jsx";
import ManagerMenu from "../../components/Menu/ManagerMenu.jsx";
import AddNewTeacher from "../../components/TeacherComponents/AddTeacher.jsx";
import Class from "../../components/ClassComponents/Class.jsx";


function ManagerPage() {
    const [subjectsOptions, setSubjectsOptions] = useState({})
    const [classesOptions, setClassesOptions] = useState({})
    const [teachersComponents, setTeachersComponents] = useState([])
    const [classComponent, setClassComponent] = useState(null)

    useEffect(() => {
        getSubjectsOptions().then(subjects => setSubjectsOptions(subjects))
        getClassesOptions().then(classes => setClassesOptions(classes))
    }, []);

    async function onClickSubject(subject){
        setTeachersComponents(
            [
                await getTeachersCard(
                    subject.key, setTeachersComponents
                ).then(teachers => teachers),
                <AddNewTeacher
                    subject={subject.key}
                    handlerTeachers={setTeachersComponents}
                    teachers={teachersComponents}
                />
            ]
        )
        setClassComponent(null)
    }

    async function onClickClass(cls){
        const classComponent = (
            <Class
                key={cls.key}
                cls={cls.key}
                teachersComponents={teachersComponents}
                setTeachersComponents={setTeachersComponents}
                classesOptions={classesOptions}
                subjectOptions={subjectsOptions.children}
            />
        )
        setClassComponent(classComponent)
        setTeachersComponents([])
    }

    return (
        <>
            <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
                <ManagerMenu
                    items={[subjectsOptions, classesOptions]}
                    onClickSubject={onClickSubject}
                    onClickClass={onClickClass}
                />
                {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                    {teachersComponents}
                </Space>}
                {<Space direction='vertical' style={{justifyContent: 'center', marginLeft: "150px", width:"750px"}}>
                    {classComponent}
                </Space>}
            </div>
        </>
    )
}

export default ManagerPage;