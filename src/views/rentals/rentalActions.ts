import {userStorage} from "../../userSession/userStorage";

export const deleteProperty = (id : number) => {
    return new Promise<void>(
        (resolve, reject) => {
            const token = userStorage.getToken()
            const URL = "http://localhost:8080/api/v1/accommodations/" + id;

            fetch(URL,
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token}
            }).then(response => {
                if(response.status === 200) {
                    console.log('Property deleted successfully')
                    resolve()
                    return;
                } 
                console.log("An error has ocurred")
                reject()
            }).catch(error => {
                console.log("No response from the server", error)
                reject()
            })

        }
    )
}