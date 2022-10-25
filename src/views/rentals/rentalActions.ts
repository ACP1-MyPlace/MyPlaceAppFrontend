

export const deleteProperty = (id : number) => {
    return new Promise<void>(
        (resolve, reject) => {
            const token = localStorage.getItem('token')
            const URL = "http://localhost:8080/api/v1/accommodations/" + id;

            fetch(URL,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token}
            }).then(response => {
                if(response.status === 200) {
                    alert('Property deleted successfully')
                    resolve()
                    return;
                } 
                alert('An error has ocurred')
                reject()
            }).catch(error => {
                alert('No response from server')
                reject()
            })

        }
    )
}