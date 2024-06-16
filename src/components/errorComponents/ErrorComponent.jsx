import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

function NotFoundError({detail, navigate}) {
    function handleButton() {
        navigate("/", { replace: false });
    }

    return(
         <Result
            status="404"
            title="404"
            subTitle={detail}
            extra={<Button type="primary" onClick={handleButton}>Вернуться назад</Button>}
        />
     )
}


function Unauthorized({detail, navigate}) {
    function handleButton() {
        navigate("/login", { replace: false });
    }

    return(
        <Result
            status="404"
            title="404"
            subTitle={detail}
            extra={<Button type="primary" onClick={handleButton}>Вернуться назад</Button>}
        />
     )
}


function ErrorComponent({status, detail, errorCode}) {
    const navigate = useNavigate();
    return (
        <div>
            {<NotFoundError errorCode={errorCode}/>}
        </div>
    )
}