import {Card} from "antd";


function ClassOptions() {
    return (
        <>
        </>
    )
}

function ClassesComponent(props) {
    return (
         <Card
            title={`${props.name}`}
            bordered={false}
            style={{
                width: "750px",
                marginLeft: "150px"
            }}
        >
            <p>{props.teacher}</p>
            <p>{}</p>
            <p>Card content</p>
        </Card>
    )
}

export default ClassesComponent;