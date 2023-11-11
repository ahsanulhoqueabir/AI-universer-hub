function loadData(count) {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    document.getElementById('loader').classList.remove('hidden')
    fetch(url).then(response => response.json()).then(data => {
        let show = data.data.tools.slice(0, count);
        document.getElementById('loader').classList.add('hidden')
        // console.log(show);
        showData(show);
    });
}

loadData(6)

function showData(data) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    data.forEach(element => 
    {
        const { description, features, image, name, published_in, id } = element;
        // console.log(element);
        const div = document.createElement('div');
        div.classList.add('card','flex','flex-col', 'w-full', 'bg-blue-100', 'shadow-xl', 'h-full');
        div.innerHTML =
            `
        <div class='flex-1'><figure class="px-10 pt-10">
            <img class=" rounded" src="${image ? image : 'https://picsum.photos/400/200'}" alt="${name}" class="rounded-xl" />
        </figure></div>
        <div class="py-10 border-b-2 border-black mx-10">
            <h2 class="text-3xl font-bold pb-3">Features</h2>
            <ul class='list-decimal ml-4'>
            ${features.map((feature) => `<li>${feature}</li>`).join('')}
            </ul>
            </div>
        <div class="py-10 flex mx-10 items-center">
            <div class="flex-1 flex gap-2 flex-col">
                <div>  
                    <p class="text-2xl font-bold">${name}</p>
                </div>
                <div> 
                    <p><i class="fa-solid fa-calendar-days"></i>  ${published_in} </p>
                </div>
            </div>
            <div>
               <button onclick="showDetail.showModal(); Details(${id})" > <i class="fa-solid fa-circle-arrow-right text-3xl text-accent"></i> </button>
            </div>
        </div>
        `;
        container.appendChild(div);

    })
    const Button = document.getElementById('allBtn')
    Button.classList.add('flex', 'justify-center')
    Button.innerHTML =
        `
    <button id="allBtn" class="btn bg-teal-400 capitalize hover:bg-blue-100 hover:text-black">See more</button>
    `
}

// ${features.map((feature, i) => `<li>${i + 1}. ${feature}</li>`).join('')}

document.getElementById('allBtn').addEventListener('click', () => {
    loadData()
});

function Details(id) {
    if (id < 10) id = '0' + id;
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.data)
        showDetails(data.data)
    })
}

function showDetails(data) {
    const { description,tool_name, input_output_examples, features, integrations, pricing, accuracy, image_link } = data;
    // console.log(features);
    document.getElementById('modal').innerHTML= '';
    document.getElementById('modal').innerHTML=
    `
    <div class="left hover:bg-yellow-50 rounded	p-3 w-full">
                    <h1 class="font-bold text-2xl">${description}</h1>
                   <div class="flex flex-col md:flex-row gap-4 my-4">
                    ${basic(pricing)}
                    ${pro(pricing)}
                    ${Enterprise(pricing)}
                    </div>
                    <div class="flex gap-3">
                        <div>
                            <h1 class="font-bold text-2xl"> Features </h1>
                           <ol class="list-disc ml-4">
                                ${list(features)}
                           </ol>
                        </div>
                        <div>
                            <h1 class="font-bold text-2xl">Integrations</h1>
                            <ol class="list-disc ml-4">
                                ${integ(integrations)}
                            </ol>
                        </div>
                    </div>
                  </div>
                  <div class="right px-5 py-3 rounded w-full hover:bg-yellow-50">
                    <div>
                    <img class="h-{70%} w-full rounded" src="${image_link ? image_link[0] : 'https://picsum.photos/400/200'}" alt="${tool_name}">
                    ${showAccuracy(accuracy)}
                    </div>
                    ${inputOutput(input_output_examples)}
                    
    
                  </div>
    `;

}


function basic(pricing)
{  
    if(pricing!=null) 
    {
        const x=(pricing[0].price);
        const y= pricing[0].plan;
        return `<div class="border-2 p-4 w-full font-bold  text-green-600 text-center bg-blue-100 rounded">${x} / ${y} </div>`;
    }
    else
    {
        return `<div class="border-2 p-4 w-full font-bold  text-green-600 text-center bg-blue-100 rounded"> Free of Cost/Basic </div>`;
    }
}

function pro(pricing)
{  
    if(pricing!=null) 
    {
        const x= pricing[1].price;
        const y= pricing[1].plan;
        return `<div class="border-2 p-4 w-full font-bold  text-amber-500 text-center bg-blue-100 rounded"> ${x } / ${y} </div>`
    }
    else
    {
        return `<div class="border-2 p-4 w-full font-bold  text-green-600 text-center bg-blue-100 rounded"> Free of Cost/Pro </div>`;
    }
}
function Enterprise(pricing)
{  
    if(pricing!=null) 
    {
        const x= pricing[2].price;
        const y= pricing[2].plan;
        return `<div class="border-2 p-4 w-full font-bold  text-red-500 text-center bg-blue-100 rounded"> ${x } / ${y} </div>`
    }
    else
    {
        return `<div class="border-2 p-4 w-full font-bold  text-green-600 text-center bg-blue-100 rounded"> Free of Cost/Pro </div>`;
    }
}

function list(features)
{
    let allF= [];
    for(element in features)
    {
        const p = features[element].feature_name;
        const x= (`<li> ${p}`);
        allF.push(x);
    }
    return allF
}

function integ(data)
{
    // console.log(data);
    if(data!=null)
    {
        let alldata=[];
        data.forEach(e=>
            {
                const p = `<li> ${e} `
                    alldata.push(p)
            })
        return alldata
    }
    else
    {
        return `<p> No data Found </p>`;
    }
}

function inputOutput(data)
{
     if(data!=null)
     {
        const position = Math.floor(Math.random()*data.length);
        const x= data[position]
        return `
        <h2 class="font-bold text-2xl text-center pt-5">${x.input}</h2>
        <p class="text-center">${x.output}</p>
        `
     }
     else
     {
       
        return `
        <h2 class="font-bold text-2xl text-center pt-5">Can you give any example?</h2>
        <p class="text-center">No! Not Yet! Take a break!!!</p>
        `
     }
}

function showAccuracy(data)
{
    if(data.score!=null)
    {
        return `
        <div class='mt-10 mr-12 px-2 right-0 bg-teal-100 top-0 absolute'>
                        <p> ${data.score * 100}% accuracy</p>
                    </div>
        `
    }
    else
    {
        return ` `
    }
}