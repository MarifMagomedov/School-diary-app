import {DatePicker, Typography} from "antd";
import AllMarksTable from "./AllMarksTable.jsx";


function AllMarks(){
    const onChange = (item) => {
        console.log(item.year());
    }

    return (
        <div>
            <div style={{marginBottom: "30px"}}>
                <Typography.Title level={5}> Выбрать неделю</Typography.Title>
                <DatePicker onChange={onChange} picker='year' locale='ru_RU'/>
            </div>
            <AllMarksTable data/>
        </div>
    )
}

export default AllMarks;