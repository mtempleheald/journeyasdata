/*
** Given an input string containing one or more {{token}} and a key-value list of replacement values
** Return a string with all tokens replaced
*/

export const replaceTokens = function(input: string, values: {}) {

    let output: string = input;

    // a valid key can only consist of alphanumeric characters or . (full stop) which is only allowed within repeating groups
    const re = new RegExp(/\{\{\s*(\w|\.)*\s*\}\}/gi)
    let tokens = input.match(re) // ['{{ tokentobereplaced }}', '{{anothertokentobereplaced}}']

    tokens && tokens.forEach(t => {
        // extract token id minus the brackets and any whitespace
        const id = t.substring(2,t.length-2).trim()
        // Replace tokens with their values from the store, empty string if not found
        output = output.replace(t, values[id.toString()] ?? '')
    })

    return output
}