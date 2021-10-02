// This is a helper function for integrating with `/api/reference-data/metadata`
// To avoid heavily coupling the generic UI implementation to 1 version of the API

import type { ValueType } from '$lib/types/journey';
import { ENV } from '$lib/env'
import { getToken } from '../_token'

export async function getMetadata(context, list) {

    const url = `${ENV.APIHOSTNAME}/api/reference-data/metadata`
    console.log(`calling url ${url} ...`)

    let token = await getToken();

    let options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Context': context,
            'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
            "GetMetadataModel": [
                {
                    "ReferenceType": list
                }
            ]
        })
    }

    var result: ValueType[] = await fetch(url, options)
        .then(res => res.json())
        .then(json => 
            json ? json.ResultObj[0].Values.map(obj => {
                let rObj = {}
                rObj["value"] = obj.Value
                rObj["display"] = obj.Name
                return rObj
                }) : []
        )
        .catch(error => console.log(error))

    return result
}
