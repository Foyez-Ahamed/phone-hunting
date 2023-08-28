const loadPhone = async (searchText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json()
    const phones = data.data;
    displayPhones(phones, isShowAll);
};



const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    const showAllBtn = document.getElementById('show-all-btn');

    if(phones.length >= 10 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    } else{
        showAllBtn.classList.add('hidden')
    }

   phones.forEach(phone => {
    

    const phonesDiv = document.createElement('div');
    phonesDiv.classList = `card bg-base-100 shadow-xl`;
    phonesDiv.innerHTML = `

    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center mt-4">
    <button onclick = "handleShowDetails('${phone.slug}'); " class="btn btn-primary text-white">Show Details</button>
    </div>
    </div>

    `

    phonesContainer.appendChild(phonesDiv);
   });

   loadingSpinner(false);
}

const handleShowDetails = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const modalContainer =  document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <img class = "ml-[30%]" src="${phone.image}">
    <h1 class="text-3xl">${phone.name}</h1>
    <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
    <p><span class="text-2xl">Storage:</span> ${phone.mainFeatures.storage} </p>
    <p><span class="text-2xl">Display Size:</span> ${phone.mainFeatures.displaySize
    } </p>

    <p><span class="text-2xl">Chipset:</span> ${phone.mainFeatures.chipSet
    } </p>

    <p><span class="text-2xl">Memory:</span> ${phone.mainFeatures?.memory
    } </p>

    <p><span class="text-2xl">Slug:</span> ${phone.slug
    } </p>

    <p><span class="text-2xl">GPS:</span> ${phone.others?.GPS || 'No GPS available'
    } </p>
    
    <p> <span class ="text-2xl">Release Date:</span> ${phone.releaseDate
    } </p>
    <p> <span class ="text-2xl">Brand:</span> ${phone.brand
    } </p>
    `
    show_modal_details.showModal(phone)
}


const searchHandler = (isShowAll) => {
    loadingSpinner(true);
    const getInputById = document.getElementById('search-input');
    const getInputValue = getInputById.value;
    // getInputById.value = "";
    loadPhone(getInputValue, isShowAll);
};

const loadingSpinner = (loading) => {
    const loadingId = document.getElementById('spinner-container');
    if(loading){
        loadingId.classList.remove('hidden');
    } else{
        loadingId.classList.add('hidden')
    }
}


const handleShowAll = () => {
    searchHandler(true);
}


// loadPhone();