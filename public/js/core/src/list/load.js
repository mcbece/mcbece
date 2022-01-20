export function loadToPage(data, container) {
    container.innerHTML = ""
    this.list.complete = false
    if (window.IntersectionObserver) loadByIntersectionObserver.call(this, data, container)
    else {
        let items = document.createDocumentFragment()
        data.forEach(item => items.appendChild(document.createRange().createContextualFragment(item)))
        container.appendChild(items)
        this.list.complete = true
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

function loadByIntersectionObserver(data, container) {
    // https://www.xiabingbao.com/post/scroll/longlist-optimization.html
    let start = 0
    let count = 20
    loadList(start, count)
    if (data.length >= 20) {
        let observerEle = document.createElement("div")
        observerEle.id = "observer"
        container.appendChild(observerEle)
        let observer = new IntersectionObserver(entries => {
            let entry = entries[0]
            if (entry.intersectionRatio <= 0 || !entry.isIntersecting) return false
            start += count
            loadList(start, count, () => {
                observer.unobserve(entry.target)
                container.removeChild(entry.target)
                // FIXME  ^^^^^^^^^^^
                this.list.complete = true
            })
        }, {
            rootMargin: "400px 0px"
        })
        observer.observe(container.querySelector("#observer"))
    }
    
    function loadList(start, count, handler = () => {}) {
        let div = document.createDocumentFragment()
        for (let i = start, len = start + count; i < len && i < data.length; i++) {
            let item = document.createRange().createContextualFragment(data[i])
            div.appendChild(item)
            if (i === data.length - 1) handler()
        }
        container.insertBefore(div, container.querySelector(`#observer`))
    }
}