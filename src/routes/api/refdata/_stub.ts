
export async function stubRefdata(context, list) {
return  [
    {
        "value": "1",
        "display": context + "." + list + " 1"
    },
    {
        "value": "2",
        "display": context + "." + list + " 2"
    },
    {
        "value": "3",
        "display": context + "." + list + " 3"
    },
    {
        "value": "four",
        "display": context + "." + list + " four"
    }
]
}