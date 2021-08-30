import type { JourneyType } from '$lib/types/journey'
import path from 'path'

/* @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

    console.log('loading journey')
    const result: JourneyType = await import(path.resolve('static',params.brand,'journey.json')).then(module => module.default)

    return {
        body: result
    }
}