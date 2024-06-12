import AuthComponent from "../../components/authComponents/AuthComponent.jsx";


const RegisterPage = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "80%", flexDirection: "column"}}>
            <div className='rounded-lg drop-shadow' style={{backgroundColor: 'white'}}>
                <div className="" style={{width: "500px", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <AuthComponent/>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage