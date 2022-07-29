let titre = document.querySelector('#titre');
let prix = document.querySelector('#prix');
let taxes = document.querySelector('#taxes');
let combien = document.querySelector('#combien');
let category = document.querySelector('#category');
let total = document.querySelector('#total');
let submit = document.querySelector('#submit');
let tmp;
let mood ='create';
let dataSearch = document.querySelector('#search');



function getTotal() {
   if (prix.value != '' | taxes.value !=''){
    let result = +prix.value + +taxes.value ;
    total.innerHTML = result;
    total.style.background = 'green';
   }else{
    total.style.background = 'rgba(255, 9, 9, 0.425)';
   }
}

/*----ajouter---*/
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product) ;
}else{
    dataProduct = [];
}
    submit.onclick = function ()
    {
        let newProduct = {
            titre : titre.value,
            prix : prix.value,
            taxes : taxes.value,
            combien : combien.value,
            category : category.value,
            total : total.innerHTML

        };
        if(mood ==='create'){
             // if(newProduct.combien > 1){
        //     for(let i=0 ; i < newProduct.combien; i++){
        //         dataProduct.push(newProduct) ;
        //     }
        // }else{
        //     dataProduct.push(newProduct) ;
        // }
        
            dataProduct.push(newProduct) ;
        }else{
            dataProduct[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'Ajouter Produit';
            combien.style.display = 'block';

        }
       

        localStorage.setItem('product',JSON.stringify(dataProduct)) ; 
        
        titre.value = '';
        prix.value = '';
        taxes.value = '';
        category.value = '';
        combien.value = '';
        total.innerHTML = '';
        total.style.background = 'rgba(255, 9, 9, 0.425)';
        readData();
    };

/*-----lire les données-----*/
function readData(){
    getTotal();
    let table = '';
    for(let i=0; i<dataProduct.length ; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titre}</td>
                <td>${dataProduct[i].prix}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].combien}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
                <td> <button onclick="deleteProduct(${i})" id="delete">Delete</button> </td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.querySelector('#deleteAll');
    if(dataProduct.length != 0 ){
        
        btnDelete.innerHTML =`<button id="DellAll" onclick ="deleteAll()" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  class="btn-sub"> Delete All  (${dataProduct.length}) </button>`;
    }else{
        btnDelete.innerHTML =``;
    }
}
readData();


/*-------------Suprimer------------------*/



function deleteProduct(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    readData();
}
function deleteAll(id){
    if(id == 'oui'){
        localStorage.clear();
        dataProduct.splice(0)
        readData();
        
    }
}


/*-------------Update ------------------*/
function updateData(i){

    titre.value = dataProduct[i].titre;
    prix.value = dataProduct[i].prix;
    taxes.value = dataProduct[i].taxes;
    category.value = dataProduct[i].category;
    combien.style.display = 'none';
    submit.innerHTML ='Update Product';
    getTotal();
    tmp = i;
    mood = 'update';
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}
/*-------------search ------------------*/
let searchMood = 'title';
function getMood(id)
{
    if(id == 'searchTitle'){
        searchMood = 'title';
        
    }else{
        searchMood = 'category'
        
    }
    dataSearch.focus();
    console.log(searchMood);

}

function searchData(value){
    let table ='';
    if(searchMood == 'title'){
        for(let i = 0 ; i < dataProduct.length; i++){
            if(dataProduct[i].titre.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titre}</td>
                <td>${dataProduct[i].prix}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].combien}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
                <td> <button onclick="deleteProduct(${i})" id="delete">Delete</button> </td>
            </tr>
        `;
            }
        }

    }else{
        
        for(let i = 0 ; i < dataProduct.length; i++){
            if(dataProduct[i].category.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].titre}</td>
                <td>${dataProduct[i].prix}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].combien}</td>
                <td>${dataProduct[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
                <td> <button onclick="deleteProduct(${i})" id="delete">Delete</button> </td>
            </tr>
        `;
            }
        }

    }
    
    document.getElementById('tbody').innerHTML = table;
}


let darkMood = document.querySelector('#darkMood');
let contents = document.querySelector('.contents');
let p = document.querySelector('p');
let h2 = document.querySelector('h2');
let seachTitle = document.querySelector('#searchTitle');
let searchCat = document.querySelector('#searchCat');
let delAll = document.querySelector('#DellAll');
let Table = document.querySelector('table');
let UPDate = document.querySelector('#update');
let label = document.querySelector('label');

darkMood.onclick = function() {
    contents.classList.toggle('dark-mood');
    p.classList.toggle('p');
    h2.classList.toggle('p');
    titre.classList.toggle('input')
    prix.classList.toggle('input')
    category.classList.toggle('input')
    taxes.classList.toggle('input')
    combien.classList.toggle('input')
    search.classList.toggle('input')
    submit.classList.toggle('BTN')
    seachTitle.classList.toggle('BTN')
    searchCat.classList.toggle('BTN')
    delAll.classList.toggle('BTN')
    Table.classList.toggle('table')
    label.classList.toggle('form-check-input1')
    total.classList.add('tot')
}