import {Menu} from "antd";

function ManagerMenu(props) {
    return (
        <Menu
            style={{
                width: 256,
                height: '100vh',
                overflow: 'auto',
            }}
            selectable
            onClick={(item) => {
                (item.keyPath[1] === 'subjects') ? props.onClickSubject(item): props.onClickClass(item);
            }}
            mode="inline"
            items={props.items}
        />
    )
}

export default ManagerMenu;