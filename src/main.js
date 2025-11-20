
// variables globales
const form = document.getElementById('add-employee-form');
const modal = document.getElementById("modal-add-employee");
const openBtn = document.querySelector(".open-modal");
const closeBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById('cancel-btn');

const experiencesContainer = document.getElementById("experiences-container");
const addExperienceBtn = document.getElementById("add-experience");

let employees = [];



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
        name: nameValue,
        role: roleValue,
        photo: photoValue,
        email: emailValue,
        phone: phoneValue,
        experiences: experiencesList
    };

    employees.push(employee);
    return employee;
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

    const newEmployee = addEmploye(name, role, photo, email, phone, experiences);

    console.log("Employe ajoute :", newEmployee);
    console.log("Liste des employes :", employees);

    hideModal();
});

