let subList = $("nav>ul>li")
let select = ""
events()
update()



function update() {
    var largura = document.querySelector(".conteiner").offsetWidth;
    $("main>div").hide()
    id = $(".select").attr("id")
    $("." + id).show()
    if (largura < 800) {





        $("nav").html(`
        <ul>
            <li class="select" id="${id}">${select}</li>
            <li class="seletor" id="more">
            Mais
            <span class="material-symbols-outlined">
                expand_more
            </span>
            <ul class="sub-list more">
            <li>
            </li>
            </ul>`)

        $(".sub-list").html(subList)

        $("ul").css({
            "grid-template-columns": "auto auto",
            "text-align": "center",
        })

        $("nav>ul>li.select").css({
            "border-right": "1px solid black"
        })

        $(".sub-list").css({
            "width": "100%"
        })

        $(".itens").css({
            "background-color": "gray",
            "z-index": "5"
        })

        $("main").css({
            "width": "95%",
            "margin": "auto",
            "margin-top": "10px"
        })

        events()

    }
}

function events() {
    $(".seletor").click((e) => {
        if (e.target.id != "") {
            $("." + e.target.id).addClass("active")
        }
    })

    $(window).click((e) => {
        if (e.target.classList[0] != "seletor") {
            $(".sub-list").removeClass("active")
        }
    })

    $("li").not(".seletor").click((e) => {
        $("li.select").removeClass("select")
        e.target.classList.add("select")
        select = $(".select").html()
        update()
    })
    select = $(".select").html()
}