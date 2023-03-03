const loadAiTools = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools);
    displayTools(data.data.tools,dataLimit);
}
const displayTools = (tools,dataLimit) => {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = '';

    // tools = tools.slice(0,6);
    const showAll = document.getElementById('show-all');
    if (dataLimit && tools.length > 6) {
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
            <div class="card tools-card">
            <img src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5>Features</h5>
                <ol>
                    <li>${tool.features[0] ? tool.features[0] : "Unavailable"}</li>
                    <li>${tool.features[1]? tool.features[1] : 'Unavailable'}</li>
                    <li>${tool.features[2] ? tool.features[2] : 'Unavailable'}</li>
                    <li>${tool.features[3] ? tool.features[3] : 'Unavailable'}</li> 
                </ol>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <div>
                    <h5 class="card-title">${tool.name ? tool.name: 'Not found'}</h5>
                    <small class="text-muted"><i class="fa-regular fa-calendar"></i> ${tool.published_in ? tool.published_in : 'No Date found' }</small>
    
                </div>
                <div> 
                <button onclick=loadToolDetails('${tool.id}') class="btn btn-success" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"> Details <i class="fa-solid fa-arrow-right"></i>
                </button>
                 </div>


            </div>
            </div>
  `;

        toolsContainer.appendChild(toolsDiv);
    });
    
}


document.getElementById('sort-btn').addEventListener('click', function(){
//     tools = tools.length;

// start loader
     toggleSpinner(true);
});
document.getElementById('btn-show-all').addEventListener('click', function () {
    
    loadAiTools();
})

// spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
toggleSpinner(false);


const loadToolDetails = async id => {
    toggleSpinner(true);
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
        <div class="col-md-6  col-sm-12 bg-secondary-subtle p-3">
            <h6 class="my-3">${toolModal.description ? toolModal.description : "Modal Title not found"}</h6>
         <div class="d-flex">
            <div class="m-2 py-3 px-2 bg-white rounded text-success fw-bold">
                <p>${toolModal.pricing[0].price ? toolModal.pricing[0].price : 'Free of Cost'} <br>/${toolModal.pricing[0].plan}</p>
            </div>
            <div class="m-2 py-3 px-2 bg-white rounded text-danger fw-bold">
                <p>${toolModal.pricing[1].price ? toolModal.pricing[1].price : 'Free of Cost'} <br>/${toolModal.pricing[1].plan}</p>
            </div>
            <div class="my-2 py-3 text-danger-emphasis fw-bold bg-white px-2">
                <p>${toolModal.pricing[2].price === "0" ? toolModal.pricing[2].price : 'Free of Cost'} <br>/${toolModal.pricing[2].plan} </p>
            </div>
         </div>

         <div class="d-flex justify-content-between">
            <div>
                <h6>Features</h6>
                <ul>
                    <li>${toolModal.features[1].feature_name ? toolModal.features[1].feature_name : 'Feature not available'
                    }</li>
                    <li>${toolModal.features[2].feature_name ? toolModal.features[2].feature_name : 'Feature not available'
                    }</li>
                    <li>${toolModal.features[3].feature_name ? toolModal.features[3].feature_name: 'Feature not available'
                    }</li>
                </ul>
            </div>
            <div>
                <h6>Integrations</h6>
                <ul>
                    <li>${toolModal.integrations[0] ? toolModal.integrations[0] : 'No data Found'}</li>
                    <li>${toolModal.integrations[1] ? toolModal.integrations[1] : 'No data Found'}</li>
                    <li>${toolModal.integrations[2] ?toolModal.integrations[2] : 'No data Found'}</li>
                </ul>
            </div>
         
         </div>
        </div>
        <div class="col-md-6  col-sm-12  ps-5">
        
                <div>
                    <img src="${toolModal.image_link[0]}" class="w-75 position-relative" rounded p-4" alt="...">
                
                    <div><button class="btn btn-danger accuracy-button position-absolute">${toolModal.accuracy.score? toolModal.accuracy.score * 100 + "% accuracy" : ''}  </button></div>
                </div>
        <h6 class="mt-4">${toolModal.input_output_examples[0].input ? toolModal.input_output_examples[0].input : 'Not Found'}</h6>
        <p class="mt-2">${toolModal.input_output_examples[0].output ? toolModal.input_output_examples[0].output : 'No! Not Yet! Take a break'}</p>
    
    </div>
   
        
       

        `;
};
loadAiTools(6);
// displayTools(6)