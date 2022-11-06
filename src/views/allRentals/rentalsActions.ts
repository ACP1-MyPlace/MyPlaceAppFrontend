import {userStorage} from "../../userSession/userStorage";

export const getAccommodations = ()  => {
    return new Promise<void>(
        (resolve, reject) => {
            const URL = "http://localhost:8080/api/v1/accommodations";

            fetch(URL,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(async response => {
                if(response.status === 200) {
                    console.log('Accommodations fetched successfully')
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

export const getHostAccommodations = () => {
    return new Promise<void>(
        (resolve, reject) => {
            const token = userStorage.getToken()
            const URL = "http://localhost:8080/api/v1/accommodations/myaccomodations";

            fetch(URL,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'auth': String(token)}
            }).then(async response => {
                if(response.status === 200) {
                    console.log('Accommodations fetched successfully')
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