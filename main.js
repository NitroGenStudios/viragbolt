var flowers = []

function get_categories()
{
    get_data("https://viragbolt-backend.onrender.com/api/categories", add_category_options)
}

function get_flowers()
{
    get_data("https://viragbolt-backend.onrender.com/api/flowers", fill_flowers)
}

function fill_flowers(data)
{
    flowers = data
    console.log(flowers);
}

function add_category_options(data)
{
    var selector = document.getElementById("categories")
    console.log(data);
    

    data.forEach(e => {
        selector.innerHTML += `<button type="button" onclick="select_category(this)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${e.nev}</button>`
    });
}

function select_category(domObj)
{
    console.log(domObj.innerText);
    
    renderCards(domObj.innerText)
}

function renderCards(category)
{
    let container = document.getElementById("cards")
    container.innerHTML = ""

    flowers.filter((e)=> {return e.kategoria_nev == category}).forEach(obj => {
        console.log(obj);
        
        container.innerHTML += createCard(obj)
    });
}

function renderCardsSearch(event)
{
    event.preventDefault()

    let container = document.getElementById("cards")
    container.innerHTML = ""

    let searchbar = document.getElementById("default-search")

    getSearchData(searchbar.value).forEach(obj => {
        console.log(obj);
        
        container.innerHTML += createCard(obj)
    });
}

function getSearchData(search)
{
    return flowers.filter((e)=> 
        {
            var nev = e.nev.toLowerCase()
            var leiras = e.leiras.toLowerCase()
            var s = search.toLowerCase()
            return nev.includes(s) || leiras.includes(s)
        })
}

function createCard(card)
{
    return `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <button popovertarget="mypopover-${card.id}" href="#">
                <img class="rounded-t-lg smallimg" src="${card.kepUrl}">
            </button>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${card.nev}
                </a>

                <div id="mypopover-${card.id}" class="popover-content bg-gray-800 max-w-[600px] rounded-lg shadow-2xl" popover>
                
                    <img class="popover-img rounded-lg" src="${card.kepUrl}">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${card.nev}
                        <label class="text-gray-500 italic">(${card.keszlet}db)</label></h5>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${card.ar} Ft</h5>
                    <p class="text-white font-light text-base">${card.leiras}</p>
                
                </div>
            </div>
        </div>
    `
}

get_flowers()
get_categories()