$("li.seletor").click((e)=>{
    $(".sub-list").removeClass("active")
    let element = e.target.children[0]
    element.classList.add("active")
})

$(window).click((e)=>{
    if(e.target.classList[0] != "seletor"){
        $(".sub-list").removeClass("active")
    }
})