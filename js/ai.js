const loadAiTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools);
    displayTools(data.data.tools);
}
const displayTools = tools => {
    const toolsContainer = document.getElementById('tools-container');
    // tools = tools.slice(0, 6);

    const showAll = document.getElementById('show-all');
    if (tools.length > 6) {
        tools = tools.slice(0, 6);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    tools.forEach(tool => {
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('col');
        toolsDiv.innerHTML = `   
            <div class="card">
            <img src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>Features</h5>
                <ol>
                    <li>${tool.features[0]}</li>
                    <li>${tool.features[1]}</li>
                    <li>${tool.features[2]}</li>
                    <li>${tool.features[3]}</li> 
                </ol>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="card-title">${tool.name}</h5>
                    <small class="text-muted"><i class="fa-regular fa-calendar"></i> ${tool.published_in}</small>
    
                </div>
                <div> 
                <button onclick=loadToolDetails('${tool.id}') class="btn btn-success"> Details <i class="fa-solid fa-arrow-right"></i></buttton>
                 </div>


            </div>
            </div>
  `;

        toolsContainer.appendChild(toolsDiv);
    })
}
// document.getElementById('btn-show-all').addEventListener('click', function(){
//     tools = tools.length;

// })

const loadToolDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/01`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);

}
// loadAiTools();