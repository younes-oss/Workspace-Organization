
// variables globales
const form = document.getElementById('add-employee-form');
const modal = document.getElementById("modal-add-employee");
const openBtn = document.querySelector(".open-modal");
const closeBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById('cancel-btn');

const experiencesContainer = document.getElementById("experiences-container");
const addExperienceBtn = document.getElementById("add-experience");
const list = document.getElementById("employees-list");

const detailsModal = document.getElementById("employee-details-modal");
const detailsContent = document.getElementById("details-content");
const closeDetails = document.getElementById("close-details");
const selector = document.getElementById("select-employee-modal");
const employeeList = document.getElementById("employee-list");
const closeSelector = document.getElementById("close-selector");
let currentZone = null;


const zoneRules = {
    reception: ["manager", "manager"],      
    serveurs: ["it", "manager"],             
    securite: ["securite", "manager"],      
    archives: ["manager"],             
    conference: "all",
    personnel: "all"
};


let employees = [];


// Fonction pour sauvegarder dans localStorage
function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}
// Fonction pour charger depuis localStorage
function loadEmployees() {
    const data = localStorage.getItem("employees");
    if (data) {
        employees = JSON.parse(data);
        renderEmployees();
    }
}




// Ouvrir la modale
function openModal() {
    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add('backdrop-blur-xs');
    });
}

// Fermer la modale
function hideModal() {
    modal.classList.add('hidden');
    form.reset();
    experiencesContainer.innerHTML = "";
}

closeBtn.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);

openModal();

// fonction d'ajout

function addEmploye(nameValue, roleValue, photoValue, emailValue, phoneValue, experiencesList) {
    const employee = {
        id: Date.now(),
        name: nameValue,
        role: roleValue,
        photo: photoValue,
        email: emailValue,
        phone: phoneValue,
        experiences: experiencesList
    };

    employees.push(employee);

}





//  creer une experience
function createExperienceItem() {
    const div = document.createElement('div');
    div.classList.add("experience-item", "border", "rounded", "p-3", "relative");

    div.innerHTML = `
        <button type="button"
                class="remove-experience absolute top-2 right-2 text-red-600">
            ✖
        </button>

        <div>
            <label class="font-medium">Entreprise</label>
            <input type="text" class="exp-entreprise w-full border rounded p-2">
        </div>

        <div>
            <label class="font-medium">Poste</label>
            <input type="text" class="exp-poste w-full border rounded p-2">
        </div>

        <div class="flex gap-3">
            <div class="flex-1">
                <label class="font-medium">Date début</label>
                <input type="date" class="exp-start w-full border rounded p-2">
            </div>
            <div class="flex-1">
                <label class="font-medium">Date fin</label>
                <input type="date" class="exp-end w-full border rounded p-2">
            </div>
        </div>
    `;

    return div;
}

// Ajouter une experience
addExperienceBtn.addEventListener("click", () => {
    const item = createExperienceItem();
    experiencesContainer.appendChild(item);
});

// Supprimer une experience
experiencesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-experience")) {
        e.target.parentElement.remove();
    }
});

function renderEmployees() {

    list.innerHTML = "";

    employees.forEach((emp, index) => {
        const item = document.createElement("div");
        item.setAttribute("employe-id", `${emp.id}`)
        item.className = "employee-item flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm";

        item.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full border-2 border-blue-300 overflow-hidden">
                    <img src="${emp.photo || 'https://via.placeholder.com/40'}" 
                         class="w-full h-full object-cover" />
                </div>

                <div>
                    <p class="font-semibold">${emp.name}</p>
                    <p class="text-sm text-gray-500">${emp.role}</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button class="edit-employee text-yellow-500 text-sm" data-index="${index}">
                    <i class="fa-regular fa-pen-to-square" style="color: #31db0f;"></i>
                </button>

                <button class="delete-employee text-red-600" data-id="${emp.id}">
                <i class="fa-solid fa-trash" data-id="${emp.id}" style="color: #f10404;"></i>
                </button>

            </div>
        `;

        list.appendChild(item)

    });

}


list.addEventListener("click", (e) => {

    // remove employe from page

    if (e.target.classList.contains("fa-trash")) {

        e.target.parentElement.parentElement.parentElement.remove();
        console.log("clique");

        // remove employe from localStorage
        deletEmployeWithId(e.target.parentElement.parentElement.parentElement.getAttribute("employe-id"));

    }


    const parent = e.target.closest(".employee-item");
    console.log(parent);
    console.log("clique");


    const id = parent.getAttribute("employe-id");
    const employee = employees.find(emp => emp.id == id);
    if (employee) {
        showEmployeeDetails(employee);
    }


});

function deletEmployeWithId(employId) {
    employees = employees.filter(emp => emp.id != employId);
    saveEmployees();
    renderEmployees();
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('employee-name').value;
    const role = document.getElementById('employee-role').value;
    const photo = document.getElementById('employee-photo').value;
    const email = document.getElementById('employee-email').value;
    const phone = document.getElementById('employee-phone').value;

    // Récupération des expériences
    const experienceItems = document.querySelectorAll(".experience-item");
    let experiences = [];

    experienceItems.forEach(item => {
        experiences.push({
            entreprise: item.querySelector(".exp-entreprise").value,
            poste: item.querySelector(".exp-poste").value,
            start: item.querySelector(".exp-start").value,
            end: item.querySelector(".exp-end").value
        });
    });

    addEmploye(name, role, photo, email, phone, experiences);

    saveEmployees();
    renderEmployees();
    hideModal();
});

function showEmployeeDetails(emp) {
    detailsContent.innerHTML = `
        <div class="flex flex-col items-center gap-3">
            <img src="${emp.photo}" class="w-24 h-24 rounded-full border-2 border-blue-400" />

            <h2 class="text-xl font-semibold">${emp.name}</h2>
            <p class="text-gray-500">${emp.role}</p>

            <p><strong>Email :</strong> ${emp.email}</p>
            <p><strong>Téléphone :</strong> ${emp.phone}</p>

            <h3 class="mt-4 font-semibold">Expériences :</h3>
            <div class="pl-4">
                ${emp.experiences.map(exp => `
                    <div class="mb-2">
                        <p><strong>${exp.poste}</strong> chez <strong>${exp.entreprise}</strong></p>
                        <p>${exp.start} → ${exp.end}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    detailsModal.classList.remove("hidden");
}

closeDetails.addEventListener("click", () => {
    detailsModal.classList.add("hidden");
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-employee")) {
        currentZone = e.target.closest(".zone");
        showEmployeeSelector();
    }
});

function showEmployeeSelector() {

    const zoneType = currentZone.dataset.zone;  // ex: "securite"
    const rules = zoneRules[zoneType];

    employeeList.innerHTML = "";

    let allowedEmployees = [];

    // Zone libre → montrer tous les employés
    if (rules === "all") {
        allowedEmployees = employees;
    } 
    else {
        // Filtrer selon les rôles autorisés
        allowedEmployees = employees.filter(emp => rules.includes(emp.role));
    }

    // Si aucun employé autorisé
    if (allowedEmployees.length === 0) {
        employeeList.innerHTML = `
            <p class="text-center text-red-500 p-3">Aucun employé autorisé pour cette zone.</p>
        `;
        selector.classList.remove("hidden");
        return;
    }

    // Créer la liste
    allowedEmployees.forEach(emp => {
        const div = document.createElement("div");
        div.className = "flex items-center gap-3 p-2 border rounded cursor-pointer hover:bg-gray-100";
        div.dataset.id = emp.id;

        div.innerHTML = `
            <img src="${emp.photo}" class="w-10 h-10 rounded-full object-cover border">
            <div>
                <p class="font-semibold">${emp.name}</p>
                <p class="text-sm text-gray-600">${emp.role}</p>
            </div>
        `;

        employeeList.appendChild(div);
    });

    selector.classList.remove("hidden");
}

employeeList.addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (!card) return;

    const id = card.dataset.id;
    const emp = employees.find(em => em.id == id);

    if (emp && currentZone) {
        addEmployeeToZone(emp, currentZone);
    }

    selector.classList.add("hidden");
});

closeSelector.addEventListener("click", () => {
    selector.classList.add("hidden");
});


function addEmployeeToZone(emp, zone) {
    const container = zone.querySelector(".chosen-employees");

    // Limite 4 employés max
    const count = container.children.length;
    if (count >= 4) {
        alert("Cette zone contient déjà 4 employés !");
        return;
    }

    // Position de la carte
    const positions = ["position-1", "position-2", "position-3", "position-4"];
    const posClass = positions[count];

    const card = document.createElement("div");
    card.className = `absolute ${posClass} pointer-events-auto`;

    card.innerHTML = `
        <div class="flex items-center gap-1 bg-white p-1 rounded shadow relative">

            <img src="${emp.photo}" class="w-6 h-6 rounded-full border border-blue-400 object-cover" />

            <div>
                <p class="text-[10px] font-bold leading-none">${emp.name}</p>
                <p class="text-[9px] text-gray-600 leading-none">${emp.role}</p>
            </div>

            <!-- bouton retirer -->
            <button class="remove-emp absolute -top-2 -right-2 text-red-600 text-sm bg-white rounded-full w-4 h-4">
                ✕
            </button>

        </div>
    `;

    container.appendChild(card);
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-emp")) {
        e.target.closest(".pointer-events-auto").remove();
    }
});

loadEmployees();


