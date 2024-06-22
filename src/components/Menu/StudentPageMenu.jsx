import {Avatar, Menu, Space} from "antd";
import {useEffect, useState} from "react";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {checkUser} from "../../api/auth.jsx";
import {Link, useNavigate} from "react-router-dom";


function StudentPageMenu() {
    const [selectedKey, setSelectedKey] = useState('');
    const items = [
        {
            label: 'Дневник',
            children: [
                {
                    label: <Link to={'diary'}>Дневник</Link>,
                    key: 'diary',
                },
                {
                    label: <Link to={'homeworks'}>Домашнее задание</Link>,
                    key: 'homework',
                },
            ]
        },
        {
            label: 'Оценки',
            children: [
                {
                    label: '' ,
                    key: '',
                }
            ]
        },
        {
            label: 'Образование',
            children: [
                {
                    label: 'Рабочие программы',
                    key: 'workPrograms'
                },
                {
                    label: 'Учебный план',
                    key: 'curriculum'
                },
                {
                    label: 'Календарь',
                    key: 'calendar'
                }
            ]
        },
        {
            label: 'Полезное',
            key: 'useful',
            children: [
                {
                    label: 'Олимпиады',
                    key: 'olympiads'
                }
            ]
        },
        {
            key: 'avatar',
            label: (
                <Avatar size={30} icon={<UserOutlined />} />
            ),
            children: [
                {
                    key: 'studentProfile',
                    label: 'Профиль'
                },
                {
                    key: 'logOut',
                    label: 'Выйти'
                }
            ]
        },
    ]


    return (
        <div>
            <Menu
                style={{alignItems: 'center', justifyContent: 'center'}}
                mode="horizontal"
                items={items}
                selectedKeys={[selectedKey]}
                onClick={(item) => (item.key !== 'logo') ? setSelectedKey(item.key): ''}
            />
        </div>
    )
}

export default StudentPageMenu;