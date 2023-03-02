const loadAiTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools);
    displayTools(data.data.tools);
}
const displayTools = tools => {
    const toolsContainer = document.getElementById('tools-container');
    tools = tools.slice(0, 6);
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
                <button class="btn btn-success"> Details <i class="fa-solid fa-arrow-right"></i></buttton>
                 </div>


            </div>
            </div>
  `;

        toolsContainer.appendChild(toolsDiv);
    })
}
loadAiTools();