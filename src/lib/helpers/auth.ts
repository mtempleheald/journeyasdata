// All authentication related stuff here
import jwt from 'jsonwebtoken'


// TODO: move this into environment setting
const SECRET = 'secretTODO:inject'


export function credentialsValid(user: string, password: string) {
    // TODO: Replace with real authentication store
    return (user == 'mth' && password == 'letmein')
}


// Given a ; separated string of cookies, grab the authToken cookie and extract the value
export function extractCookieValue(cookies: string, name: string){
	if (!cookies)
        return null
    let re = new RegExp(`${name}=(.*);`);
    let match = cookies.match(re);
    if (match.length > 1)
        return match[1] //[0] is the full match, [1] just the dynamic bit I'm interested in
	return null
}


// generate token with 30 minute lifetime (rolling, refresh on valid action)
export function generateToken(user: string) {
    return jwt.sign(
        { data: user }, 
        SECRET, 
        { expiresIn: '1800'} 
    )
}


export function verifyToken(user: string, token: string) {
	
	// TODO: move this secret to environment variable and strengthen
    try {
        const decoded = jwt.verify(token, SECRET);
        if (decoded == user)
            return true
    } catch(err) {
        if (err.name == 'TokenExpiredError')
            console.log ('Token expired')
    }
	return false
}

