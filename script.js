const themeToggle = document.getElementById("theme-toggle")
const body = document.body
const spinner = document.getElementById("spinner")
const table = document.getElementById("data-table")
const tableBody = document.getElementById("table-body")
const pagination = document.getElementById("pagination")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const pageNumber = document.getElementById("page-number")

let data = []
let sortedData = []
let currentPage = 1
const rowsPerPage = 10
let sortDirection = {}

async function fetchData() {
    spinner.style.display = 'flex'
    pagination.style.display = 'none'
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch("https://randomuser.me/api/?results=50")
        const json = await response.json()
        data = json.results
        sortedData = [...data]
        displayTable(sortedData)
        updateButtons()
    } catch (e) {
        console.error(`Error fetching data: ${e}`)
    } finally {
        spinner.style.display = 'none'
        table.style.display = 'table'
        pagination.style.display = 'block'
    }
}

function displayTable(dataToDisplay) {
    tableBody.innerText = ''
    const start = (currentPage - 1) * rowsPerPage
    const end = start + rowsPerPage
    const paginatedItems = dataToDisplay.slice(start, end)
    paginatedItems.forEach( user => {
        const row = `
            <tr>
                <td data-label="Name">${user.name.first} ${user.name.last}</td>
                <td data-label="Email">${user.email}</td>
                <td data-label="Username">${user.login.username}</td>
                <td data-label="Country">${user.location.country}</td>
            </tr>
        `
        tableBody.insertAdjacentHTML('beforeend', row)
    })
}

function sortTable(columnIndex) {
    clearSortIcons()
    if(!sortDirection[columnIndex]) {
        sortDirection[columnIndex] = 'asc'
    }
    sortedData = [...data].sort((a, b) => {
        let valA, valB
        switch(columnIndex) {
            case 0:
                valA = `${a.name.first} ${a.name.last}`
                valB = `${b.name.first} ${b.name.last}`
                break
            case 1:
                valA = a.email
                valB = b.email
                break
            case 2:
                valA = a.login.username
                valB = b.login.username
                break
            case 3: 
                valA = a.location.country
                valB = b.location.country
                break
        }
        if(sortDirection[columnIndex] === "desc") {
            return valB.localeCompare(valA)
        } else {
            return valA.localeCompare(valB)
        }
    })
    sortDirection[columnIndex] = sortDirection[columnIndex] === 'asc' ? 'desc' : 'asc'

    updateSortIcon(columnIndex, sortDirection[columnIndex])

    displayTable(sortedData)
}

function clearSortIcons() {
    for(let i = 0; i < 4; i++) {
        const icon = document.getElementById(`icon-${i}`)
        icon.className = 'fas fa-sort'
    }
}

function updateSortIcon(columnIndex, direction) {
    const icon = document.getElementById(`icon-${columnIndex}`)
    icon.className = direction === 'asc' ? 'fas fa-sort-down' : 'fas fa-sort-up'

}

function prevPage() {
    if(currentPage > 1) {
        currentPage--
        displayTable(sortedData)
        updateButtons()
    }
}

function nextPage() {
    if(currentPage * rowsPerPage < sortedData.length) {
        currentPage++
        displayTable(sortedData)
        updateButtons()
    }
}

function updateButtons() {
    pageNumber.innerText = currentPage
    prevBtn.disabled = currentPage === 1
    nextBtn.disabled = currentPage * rowsPerPage >= data.length
}

prevBtn.addEventListener("click", prevPage)
nextBtn.addEventListener("click", nextPage)

fetchData()


const isDarkMode = localStorage.getItem('dark-mode') === 'true'

if (isDarkMode) {
    body.classList.add('dark-mode')
    themeToggle.innerText = 'Light mode'
}

themeToggle.addEventListener("click", () => {
    body.style.transition = 'background-color 0.3s, color 0.3s'
    if(body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode')
        themeToggle.innerText = 'Dark Mode'
        localStorage.setItem('dark-mode', 'false')
    } else {
        body.classList.add('dark-mode')
        themeToggle.innerText = 'Light Mode'
        localStorage.setItem('dark-mode', 'true')
    }
})
