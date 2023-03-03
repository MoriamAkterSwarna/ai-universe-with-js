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
                <button onclick=loadToolDetails('${tool.id}') class="btn btn-success" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"> Details <i class="fa-solid fa-arrow-right"></i>
                </button>
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
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayToolDetails(data.data))
        .catch(error => displayToolDetails(error))

}
const displayToolDetails = toolModal => {
    
    console.log(toolModal);

    // const modalTitle = document.getElementById('toolDetailsModalLabel');
    // modalTitle.innerText = toolModal.description;
    const modalDetails = document.getElementById('modal-details');

    modalDetails.innerHTML = `

    <div class="row g-0">
        <div class="col-md-6 bg-secondary-subtle p-3">
            <h6 class="my-3">${toolModal.description}</h6>
         <div class="d-flex">
            <div class="m-2 py-3 px-2 bg-white rounded text-success fw-bold">
                <p>${toolModal.pricing[0].price}</p>
            </div>
            <div class="m-2 py-3 px-2 bg-white rounded text-danger fw-bold">
                <p>${toolModal.pricing[1].price} </p>
            </div>
            <div class="my-2 py-3 text-danger-emphasis fw-bold bg-white px-2">
                <p>${toolModal.pricing[2].price} </p>
            </div>
         </div>

         <div class="d-flex justify-content-between">
            <div>
                <h6>Features</h6>
                <ul>
                    <li>${toolModal.features[1].feature_name
                    }</li>
                    <li>${toolModal.features[2].feature_name
                    }</li>
                    <li>${toolModal.features[3].feature_name
                    }</li>
                </ul>
            </div>
            <div>
                <h6>Integrations</h6>
                <ul>
                    <li>${toolModal.integrations[0]}</li>
                    <li>${toolModal.integrations[1]}</li>
                    <li>${toolModal.integrations[2]}</li>
                </ul>
            </div>
         
         </div>
        </div>
        <div class="col-md-6 ps-5">
        <img src="${toolModal.image_link[0]}" class="w-75" rounded p-4" alt="...">
    
    </div>
   
        
       

        `;
};
loadAiTools();