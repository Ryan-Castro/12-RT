const storage = firebase.storage();



function active(){
    console.log($("#container"))
    if($("#container").attr("class")){
        $("#container").removeClass("active")
    } else {
        $("#container").addClass("active")
    }
}

function show(element){
    $(".show").removeClass("show")
    $("." + element.id).addClass("show")
    $("#container").removeClass("active")
    update()
}

function adicionar(){

    // Arrumar o form
    let content = ` <input type="file" name="arquivo" id="arquivo">
                        <select>
                            <option value="estatuto">Estatuto</option>
                            <option value="atas">Atas</option>
                            <option value="regulamentos">Regulamentos</option>
                            <option value="cartao">Ficha de Solicitação de cartão</option>
                            <option value="desligamento">Carta de Desligamento</option>
                        </select>
                    <input type="date" id="data">
                    <input type="button" value="Adicionar" onclick="enviar()">`

    $("div#modalOptions").css({"display": "flex"})
    $("#modalOptions>section").html(content)
    $("div.modal").click((e)=>{
        let element = this
        if(e.target.classList == "modal"){
            element.innerHTML =  '<section></section>'
            $("div.modal").hide()
        }
    })
}

function enviar(){
    let arquivo = document.querySelector("#arquivo").files[0]
    let select = document.querySelector("select")
    let value = select.options[select.selectedIndex].value
    const metadata = {
        customMetadata: {
            "tipo": value,
            "data": document.querySelector("#data").value
        }
    }
    if(arquivo != ""){ 
        storage.ref(`${$("div.show").attr("key")}/${arquivo.name}`).put(arquivo, metadata).then((snapshot)=>{
        update()
        $("div.modal").hide()
        })
    } else {
        alert("preencha todos os campos")
    }
}


async function update(){
    await $(".show").html(`
    <table>
                <thead>
                <tr>
                    <th colspan="4" id="titulo">${$(".show").attr("key")}</th>
                </tr>
                    <tr>
                        <th>Arquivo</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Deletar</th>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div id="form">
                <input type="button" value="Adicionar" onclick="adicionar()">
            </div>
            `)

    let divActive = $("div.show").attr("key")
    $("tbody").html("")
    let content = ""
    let tipoArquivo = ""
    await storage.ref(divActive).listAll().then(res=>{
        res.items.forEach(element => {
            element.getMetadata().then(metadata=>{
                tipoArquivo = (metadata.customMetadata.tipo)
                data = (metadata.customMetadata.data)
                content += `<tr>
                                <td>${element.name}</td>
                                <td>${tipoArquivo}</td>
                                <td>${data}</td>
                                <td><input type="button" value="Deletar" id="delet" onclick="deletar('${element.name}', '${divActive}')"></td>
                            </tr>`
                
                
            }).then(()=>$("tbody").html(content))
          
        });
        
        
    })
    
}

async function deletar(nome, tipo){
    await storage.ref(tipo).child(nome).delete()
    update()
}
