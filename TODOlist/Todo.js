const textIn = document.getElementById("textInput"),
      addBtn  = document.getElementById("addBtn"),
      op     = document.querySelectorAll(".op"),
      list   = document.querySelectorAll(".list-unstyled"),
      listTodo = document.querySelectorAll(".listTodo"),
      removes    = document.querySelectorAll(".remove");

let datas = [];




localStorage.getItem("datas") ? datas = JSON.parse(localStorage.getItem("datas")) : null ;

addToLOcal = () => localStorage.setItem("datas" , JSON.stringify(datas));

let elements = (Checks , Id , Values) => {
     return `<li class=" bg-light ">
                <div class="toDoSection"  >
                    <p class="h-auto " id="${Id}" onclick="finished(event)" data-check="${Checks}">${Values}</p>
                </div> 
                <div class="remove" >
                    <i class="fa-solid fa-trash-can" onclick="delte(event)" id="${Id}"></i>
                </div>
            </li>
        `
} 

let showData = () => list[0].innerHTML = datas.map((x) => elements(x.Checks , x.Id , x.Values)).join("")

showData();

addBtn.onclick = () => {
    if(textIn.value === ""){
        alert("the input should'nt be empty");
    }else{
        datas.push({Values: textIn.value , Checks : false , Id : Date.now()});
        addToLOcal();
        showData();
    }
    textIn.value = "";
}


finished = (e) =>{

    let ev = e.target;

    datas.map((x) => x.Id == ev.id ? x.Checks = !x.Checks: null )


    addToLOcal();
    showData();
}

delte = (e) => {

    let ev = e.target;

    datas = datas.filter((x) => x.Id != ev.id)

    addToLOcal();
    showData();
}

listTodo.forEach(x => {
    x.addEventListener("click" , event =>{
        let ev = event.target;
        if(ev.dataset.targets == "All"){
            showData();
            
        }else if(ev.dataset.targets == "Activ"){
            list[0].innerHTML = datas.map(x => x.Checks == false ? elements(x.Checks , x.Id , x.Values) : null ).join("")
        }else{
            list[0].innerHTML = datas.map(x => x.Checks == true ? elements(x.Checks , x.Id , x.Values) : null).join("")
        }
    })

})