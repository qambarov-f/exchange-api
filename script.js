let api_key = "508023b1732f379b48c82f8e";
let url = "https://v6.exchangerate-api.com/v6/" + api_key;

let currency_one = document.getElementById("currency_one");
let currency_two = document.getElementById("currency_two");
let list_one = document.getElementById("list_one");
let list_two = document.getElementById("list_two");
let amount = document.getElementById("amount");
let calculate = document.getElementById("calculate");
let result = document.getElementById("result");


fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        let items = data.supported_codes; 
        
        let options;
        for(let item of items){
            options += `<option value=${item[0]}>${item[1]}</option>`
        }
        
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    })

calculate.addEventListener("click", function(){
    let currency1 = currency_one.value;
    let currency2 = currency_two.value;
    let amounTotal = amount.value;

    fetch( url + "/latest/" + currency1)
        .then(res => res.json())
        .then(data => {

            let total = (data.conversion_rates[currency2] * amounTotal).toFixed(3);

           result.innerHTML = `
            <div class="card border-primary">
                  <div class="card-body text-center" style="font-size: 30px;">
                  ${amounTotal} ${currency1} = ${total} ${currency2}
                  </div>
             </div>`     
            
        })
})