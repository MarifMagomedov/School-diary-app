import {useEffect, useState} from "react";
import {Space} from "antd";
import ClassComponent from "../../components/usersComponents/ClassComponent.jsx";
import {getClassesOptions, getClassInfo} from "../../api/classes.jsx";
import {getSubjectsOptions} from "../../api/subjects.jsx";
import {getTeachersCard} from "../../api/teachers.jsx";
import {AddNewTeacherButton} from "../../components/TeacherComponents/Buttons.jsx";
import {AddNewStudentButton} from "../../components/StudentComponents/Buttons.jsx";
import ManagerMenu from "../../components/Menu/ManagerMenu.jsx";
import AddTeacherModal from "../../components/TeacherComponents/AddTeacherModal.jsx";


function ManagerPage() {
    const [subjectsOptions, setSubjectsOptions] = useState([])
    const [classesOptions, setClassesOptions] = useState([])
    const [teachersComponents, setTeachersComponents] = useState([])
    const [classComponent, setClassComponent] = useState([])

    useEffect(() => {
        getSubjectsOptions().then(subjects => setSubjectsOptions(subjects))
        getClassesOptions().then(classes => setClassesOptions(classes))
    }, []);

    async function onClickSubject(subject){
        setTeachersComponents(
            await getTeachersCard(
                subject.key, setTeachersComponents, teachersComponents
            ).then(teachers => teachers),
        )
    }

    async function onClickClass(cls){
        const clsInfo = (
            await getClassInfo(cls.key).then(clsInfo => clsInfo)
        )
        const classComponent = <ClassComponent teacher={clsInfo.teacher} subject={clsInfo.students}/>
        const addNewStudentButton = <AddNewStudentButton/>
        setClassComponent([classComponent, addNewStudentButton])
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
                {<AddTeacherModal />}
            </div>
        </>
    )
}

export default ManagerPage;