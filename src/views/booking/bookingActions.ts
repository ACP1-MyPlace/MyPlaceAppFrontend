import {userStorage} from "../../userSession/userStorage";

export const book = (booking: any)  => {
    return new Promise<void>(
        (resolve, reject) => {
            const URL = "http://localhost:8080/api/v1/reservations";
            const token = userStorage.getToken()

            fetch(URL,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token},
                body: JSON.stringify(booking)
            }).then(async response => {
                if(response.status === 200) {
                    console.log('Reservation was successful')
                    const responseBody = await response.json()
                    resolve(responseBody)
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