async function get_data(url, render_func)
{
    try 
    {
        const response = await fetch(url)
        const data = await response.json()
        render_func(data)
    } 
    catch (error) 
    {
        console.log(error)
    }
}