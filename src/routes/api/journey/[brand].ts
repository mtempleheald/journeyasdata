import type { JourneyType } from '$lib/types/journey'
import path from 'path'
import fs from 'fs'

/* @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

    console.log('loading journey')
    // TODO: rework the journey loading to avoid reloads mid journey
    // static files found in /build/assets after build
    var j = path.resolve('assets',params.brand,'journey.json')
    if (!fs.existsSync(j)) {
        // static files found in /static during development
        j = path.resolve('static',params.brand,'journey.json')
    }
    const result: JourneyType = await import(j).then(module => module.default)

    return {
        body: result
    }
}