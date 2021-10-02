
import { ENV } from '$lib/env';

export async function getToken() {

    console.log(`getting API bearer token...`)

    return fetch(`${ENV.APIHOSTNAME}/api/token/authorize?Username=${ENV.APIUSERNAME}&Password=${ENV.APIPASSWORD}`)
        .then(res => res.json())
        .then(json => json["access_token"])
        .catch(error => console.log(error))

}