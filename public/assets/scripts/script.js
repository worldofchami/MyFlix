document.querySelectorAll(".category__content--block").forEach(contentBlock => {
    const blockDetails = document.querySelector(`#${contentBlock.id} .category__block--details`)
    const blockLogo = document.querySelector(`#${contentBlock.id} .category__block--logo>img`)

    contentBlock.onmouseover = () => {
        contentBlock.classList.add("category__content--block-expanded")
        blockDetails.style.zIndex = 1
        blockLogo.style.marginBottom = "130px"
    }

    contentBlock.onmouseleave = () => {
        contentBlock.classList.remove("category__content--block-expanded")
        blockDetails.style.zIndex = -1
        blockLogo.style.marginBottom = "10px"
    }
})

if(localStorage.getItem("myList") === null) localStorage.setItem("myList", `{"vals": []}`)