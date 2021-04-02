import { readable } from 'svelte/store';

//https://stackoverflow.com/questions/64799008/make-ajax-request-from-store
const url = '/questionsets/questionset.json';

const loadJson = async () => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Bad response')
    const qs = await res.json()
    return [qs] // store must return any[] type
}

// TODO: consider replacing this with page store + others
// this would simplify loops in pages
export const questionSet = readable([], set => {
    loadJson()
        .then(set)
        .catch(err => {
            console.error('Failed to fetch', err)
        })
    return () => {}
});


