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
