const prams =  new URLSearchParams(window.location.search)
let id = prams.get('id')

const lookup = prams.get('lookup')

let error
let date
let service
let code

if (lookup === 'false') {
    error = prams.get('error')
    date = prams.get('date')
    service = prams.get('service')
    code = prams.get('code')
} else {
    const APIkey = 'sb_publishable_OCcq6FTaDJTNbk8LZQZ6zw_zbGE_6ZB'
    const APIurl = `https://luyjbnuxociyzcafkpef.supabase.co/rest/v1/Errors?ID=eq.${id}`

    const queryRequest = await fetch(APIurl, {
        method: 'GET',
        headers: {'apikey': APIkey, 'Authorization': `Bearer ${APIkey}`}
    })

    const queryResponse = await queryRequest.json()

    if (!queryResponse || !queryResponse[0]) {
        window.location.href = './index.html'
    } else {
        error = queryResponse[0].error
        date = queryResponse[0].date
        service = queryResponse[0].service
        code = queryResponse[0].code
    }
}

const titleID = document.getElementById('titleID')
const serviceT =  document.getElementById('service')
const dateT = document.getElementById('date')
const codeT = document.getElementById('code')
const errorMessageBox = document.getElementById('errorMessageBox')

function IDcreator() {
    const range = 8 - (id.length)
    console.log(id.length)
    let concat = ''
    for (let i = 0; i < range; i++) {
        concat = concat + '0'
    }
    id = concat + id
}

IDcreator()

titleID.innerHTML = `Error ID:${id}`

serviceT.innerHTML = `Service: ${service}`
dateT.innerHTML = `Date : ${date}`
codeT.innerHTML = `Code: ${code}`

errorMessageBox.innerHTML = error


