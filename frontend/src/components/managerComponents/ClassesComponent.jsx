import {Button, Card} from "antd";


function ClassesComponent(props) {
    const handleClickDelete = (cls) => {
        console.log(props)
        localStorage.setItem('setClass', props.classId)
        console.log(localStorage.getItem('setClass'))
    }

    function handleClickEdit(cls) {
        localStorage.setItem('setClass', props.classId)
        console.log(cls)
    }

    return (
         <Card
            title={`${props.name}`}
            bordered={false}
            style={{
                width: "750px",
                marginLeft: "150px"
            }}
            extra={
                <div>
                    <Button
                        type="primary"
                        onClick={handleClickEdit}
                        style={{marginRight: "10px"}}
                    >
                        Редактировать
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleClickDelete}
                        danger
                        ghost
                    >
                        Удалить
                    </Button>
                </div>
            }
        >
            <p>{props.teacher}</p>
        </Card>
    )
}

export default ClassesComponent;