const firebaseConfig = {
    apiKey: "AIzaSyCXyTWHr4T1FQpQ5sWVFN1deLS1CUwLF20",
    authDomain: "rt-d4726.firebaseapp.com",
    projectId: "rt-d4726",
    storageBucket: "rt-d4726.appspot.com",
    messagingSenderId: "1080817411924",
    appId: "1:1080817411924:web:e4f9dfac77d2f55b278ac1",
    measurementId: "G-JLY1WQ75EP"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();


let subList = $("nav>ul>li")
let select = ""
let items = []
events()
update()

function recarregar(){
    if (items.length == 0) {
        $("." + divId).html("<h1>Nenhum arquivo encontrado</h1>")
    } else {
        console.log(("foi"))
        let table = `
        <table>
            <thead>
                <th>Nome</th>
                <th>Data do Arquivo</th>
            </thead>
            <tbody>
            `
        items.forEach((item)=>{
            table += `<td><a href="${item.link}">${item.nome}</a></td><td>${item.data}</td>` 
        })
        table += `</tbody>
        </table>`
        $("." + divId).html(table)
    } 
}

 function update() {
    var largura = document.querySelector(".conteiner").offsetWidth;
    $("main>div").hide()
    divId = $(".select").attr("id")

    if ($(`.sub-list>li#${divId}`).length != 0) {
        let id = $(`.select`).parent().attr("id")
             storage.ref(id).listAll().then( res => {
                 res.items.forEach( element => {
                 element.getMetadata().then(async metadata => {
                    if (metadata.customMetadata.tipo == divId) {
                        let nome = element.name
                        let link = ''
                        let data = metadata.customMetadata.data
                        await element.getDownloadURL().then(url=>{
                            link = url
                        })
                        items.push({nome, link, data})
                        recarregar()
                    }else{
                        recarregar()
                    }
                })
            })
    })
}
    
    $("." + divId).show()
    if (largura < 1100) {





        $("nav").html(`
        <ul>
            <li class="select" id="${divId}">${select}</li>
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