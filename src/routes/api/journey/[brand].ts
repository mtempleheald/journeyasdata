import type { JourneyType } from '$lib/types/journey'
import fs from 'fs'
import path from 'path'

/* @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

    //const result: JourneyType = await import(`C:/Workspace/github/journeyasdata/static/${params.brand}/journey.json`).then(module => module.default)
    const result: JourneyType = JSON.parse(fs.readFileSync(path.resolve('static',params.brand,'journey.json'), 'utf-8'))

    return {
        body: result
    }
}