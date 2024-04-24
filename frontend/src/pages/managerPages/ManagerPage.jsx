import {useEffect, useState} from "react";
import axios from "axios";
import BookOutlined from "@ant-design/icons";
import {Menu, Space} from "antd";
import TeacherComponent from "../../components/managerComponents/TeachersComponent.jsx";
import ClassesComponent from "../../components/managerComponents/ClassesComponent.jsx";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


function ManagerPage() {
    const [current, setCurrent] = useState('0');
    const [subjectOptions, setSubjectOptions] = useState(getItem());
    const [classesOptions, setClassesOptions] = useState(getItem());
    const [teachersComponents, setTeacherComponents] = useState([]);
    const [classesComponents, setClassesComponents] = useState([]);

    const onClickSubject = (subject) => {
        axios.get(
            `http://localhost:5000/subjects/${subject.key}/teachers`
        ).then(response => {
            const teachers = response.data.map(teacher => {
                return <TeacherComponent
                    name={teacher.name}
                    surname={teacher.surname}
                    middleName={teacher.middle_name}
                />
            })
            setTeacherComponents(teachers)
            setClassesComponents([])
        })
    };

    const onClickClass = (clickCls) => {
        axios.get(`http://localhost:5000/classes/class/${clickCls.key}`).then(response => {
            const clsInfo = response.data
            const cls = <ClassesComponent
                name={`${clsInfo.class_number} ${clsInfo.class_word}`}
                teacher={clsInfo.classroom_teacher}
            />
            setTeacherComponents([])
            setClassesComponents([cls])
        })
    }

    const getMenuItems = () => {
        axios.get('http://localhost:5000/subjects/all').then((response) => {
            const response_subjects = response.data.map((item) => {
                return getItem(
                    item.subject_name,
                    item.subject_name
                );
            })

            setSubjectOptions(
                getItem('Учителя', 'subjects', <BookOutlined/>, response_subjects)
            )
        })

        axios.get('http://localhost:5000/classes/all').then((response) => {
            const response_classes = response.data.map((item) => {
                return getItem(
                    `${item.class_number} ${item.class_word}`,
                    item.class_id
                );
            })

            setClassesOptions(
                getItem('Классы', 'classes', <BookOutlined/>, response_classes)
            );
        })
    }

    useEffect(() => {
        getMenuItems()
    }, []);

    return (
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <Menu
                style={{
                    width: 256,
                    height: '100vh',
                    overflow: 'auto'
                }}
                selectable
                onClick={(item) => {
                    console.log(item);
                    (item.keyPath[1] === 'subjects') ? onClickSubject(item): onClickClass(item);
                }}
                selectedKeys={[current]}
                mode="inline"
                items={[subjectOptions, classesOptions]}

            />
            {<Space direction='vertical' style={{justifyContent: 'center'}}>{...teachersComponents}</Space>}
            {<Space direction='vertical' style={{justifyContent: 'center'}}>{...classesComponents}</Space>}
        </div>
    )
}

export default ManagerPage;