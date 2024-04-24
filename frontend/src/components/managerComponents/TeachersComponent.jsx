import {useState} from "react";
import {Space, Card} from "antd";


function TeacherOptions(props) {
    return (
        <>
        </>
    )
}


function TeacherComponent(props) {
    return (
        <Card
            title={`${props.name} ${props.surname} ${props.middleName}`}
            bordered={false}
            style={{
                width: "750px",
                marginLeft: "150px"
            }}
        >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}


export default TeacherComponent