export default async function APIGet(url) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };      
    try {
        let response = await  fetch(url, requestOptions);
        let result = await response.text();
        let data = await JSON.parse(result);
        return data;
    } catch (error) {
        return [];
    }
}
 