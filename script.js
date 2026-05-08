const searchBar = document.getElementById('searchBar')


async function querySB(query) {
    const APIkey = 'sb_publishable_OCcq6FTaDJTNbk8LZQZ6zw_zbGE_6ZB'
    const APIurl = `https://luyjbnuxociyzcafkpef.supabase.co/rest/v1/Errors?ID=eq.${query}`

    const queryRequest = await fetch(APIurl, {
        method: 'GET',
        headers: {'apikey': APIkey, 'Authorization': `Bearer ${APIkey}`}
    })

    const queryResponse = await queryRequest.json()

    if (!queryRequest) {
        console.log('ID Query Failure')
        return false
    } else {
        return queryResponse
    }
}

searchBar.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        if (searchBar.value != '') {
            const searchItem = searchBar.value

            const queryResult = await querySB(searchItem)

            if (!queryResult === false  && queryResult[0]) {
                window.location.href = `https://dev.db.northern-star.online/view.html?id=${queryResult[0].ID}&service=${queryResult[0].service}&code=${queryResult[0].code}&error=${queryResult[0].error}&date=${queryResult[0].date}&lookup=false`                
            }
        }
    }
})