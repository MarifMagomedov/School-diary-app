import axios from "axios";


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


export async function getSubjectsOptions() {
    return await axios.get('http://localhost:5000/subjects/all').then((response) => {
        let responseSubjects = response.data.map((item) => {
            return getItem(
                item.subject_name,
                item.id
            );
        })
        return getItem('Предметы', 'subjects', null, responseSubjects)
    })
}
