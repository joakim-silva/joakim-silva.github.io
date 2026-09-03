// =========================================================
// MOD & PROJECT MANAGER
// =========================================================


// ---------- Select HTML Elements ----------

const projectForm = document.querySelector("#project-form");
const projectList = document.querySelector("#project-list");


// ---------- Load Saved Projects ----------

const savedProjects = localStorage.getItem("projects");

let projects = savedProjects
    ? JSON.parse(savedProjects)
    : [];


// ---------- Track Which Project Is Being Edited ----------

let editingProjectIndex = null;


// ---------- Add Project ----------

projectForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.querySelector("#project-name").value;
    const type = document.querySelector("#project-type").value;
    const status = document.querySelector("#project-status").value;
    const priority = document.querySelector("#project-priority").value;
    const notes = document.querySelector("#project-notes").value;

    const project = {
        name: name,
        type: type,
        status: status,
        priority: priority,
        notes: notes
    };

    projects.push(project);

    saveProjects();
    displayProjects();

    projectForm.reset();
});


// ---------- Save Projects ----------

function saveProjects() {

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );
}


// ---------- Display Projects ----------

function displayProjects() {

    projectList.innerHTML = "";

    projects.forEach((project, index) => {

        const projectCard = document.createElement("div");

        projectCard.classList.add("project-card");


        // If this card is being edited

        if (editingProjectIndex === index) {

            projectCard.innerHTML = `
                <div class="edit-project-form">

                    <label for="edit-name-${index}">
                        Project Name
                    </label>

                    <input
                        type="text"
                        id="edit-name-${index}"
                        class="edit-project-name"
                        value="${project.name}"
                    >


                    <label for="edit-type-${index}">
                        Project Type
                    </label>

                    <select
                        id="edit-type-${index}"
                        class="edit-project-type"
                    >
                        <option
                            value="Civ VII Mod"
                            ${project.type === "Civ VII Mod" ? "selected" : ""}
                        >
                            Civ VII Mod
                        </option>

                        <option
                            value="Web Development"
                            ${project.type === "Web Development" ? "selected" : ""}
                        >
                            Web Development
                        </option>

                        <option
                            value="Roblox"
                            ${project.type === "Roblox" ? "selected" : ""}
                        >
                            Roblox
                        </option>

                        <option
                            value="Software"
                            ${project.type === "Software" ? "selected" : ""}
                        >
                            Software
                        </option>

                        <option
                            value="Other"
                            ${project.type === "Other" ? "selected" : ""}
                        >
                            Other
                        </option>
                    </select>


                    <label for="edit-notes-${index}">
                        Notes
                    </label>

                    <textarea
                        id="edit-notes-${index}"
                        class="edit-project-notes"
                        rows="5"
                    >${project.notes}</textarea>


                    <div class="edit-buttons">

                        <button
                            class="save-edit"
                            type="button"
                            data-index="${index}"
                        >
                            Save Changes
                        </button>

                        <button
                            class="cancel-edit"
                            type="button"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            `;

        } else {

            // Normal card view

            projectCard.innerHTML = `
                <h3>${project.name}</h3>

                <p>
                    <strong>Type:</strong>
                    ${project.type}
                </p>

                <div class="project-field">

                    <label for="status-${index}">
                        Status
                    </label>

                    <div class="select-with-dot">

                        <span
                            class="status-dot ${getStatusClass(project.status)}"
                        ></span>

                        <select
                            id="status-${index}"
                            class="status-select"
                            data-index="${index}"
                        >
                            <option
                                value="Planned"
                                ${project.status === "Planned" ? "selected" : ""}
                            >
                                Planned
                            </option>

                            <option
                                value="In Progress"
                                ${project.status === "In Progress" ? "selected" : ""}
                            >
                                In Progress
                            </option>

                            <option
                                value="Testing"
                                ${project.status === "Testing" ? "selected" : ""}
                            >
                                Testing
                            </option>

                            <option
                                value="Complete"
                                ${project.status === "Complete" ? "selected" : ""}
                            >
                                Complete
                            </option>
                        </select>

                    </div>

                </div>


                <div class="project-field">

                    <label for="priority-${index}">
                        Priority
                    </label>

                    <div class="select-with-dot">

                        <span
                            class="priority-dot ${getPriorityClass(project.priority)}"
                        ></span>

                        <select
                            id="priority-${index}"
                            class="priority-select"
                            data-index="${index}"
                        >
                            <option
                                value="Low"
                                ${project.priority === "Low" ? "selected" : ""}
                            >
                                Low
                            </option>

                            <option
                                value="Medium"
                                ${project.priority === "Medium" ? "selected" : ""}
                            >
                                Medium
                            </option>

                            <option
                                value="High"
                                ${project.priority === "High" ? "selected" : ""}
                            >
                                High
                            </option>
                        </select>

                    </div>

                </div>


                <p class="project-notes">
                    <strong>Notes:</strong>
                    ${project.notes}
                </p>


                <div class="project-card-buttons">

                    <button
                        class="edit-project"
                        type="button"
                        data-index="${index}"
                    >
                        Edit Project
                    </button>

                    <button
                        class="delete-project"
                        type="button"
                        data-index="${index}"
                    >
                        Delete Project
                    </button>

                </div>
            `;
        }

        projectList.appendChild(projectCard);
    });

    addProjectCardEvents();
}


// ---------- Add Card Event Listeners ----------

function addProjectCardEvents() {

    const statusSelects =
        document.querySelectorAll(".status-select");

    const prioritySelects =
        document.querySelectorAll(".priority-select");

    const editButtons =
        document.querySelectorAll(".edit-project");

    const deleteButtons =
        document.querySelectorAll(".delete-project");

    const saveEditButtons =
        document.querySelectorAll(".save-edit");

    const cancelEditButtons =
        document.querySelectorAll(".cancel-edit");


    // Update status

    statusSelects.forEach((select) => {

        select.addEventListener("change", (event) => {

            const index = event.target.dataset.index;

            projects[index].status = event.target.value;

            saveProjects();
            displayProjects();
        });
    });


    // Update priority

    prioritySelects.forEach((select) => {

        select.addEventListener("change", (event) => {

            const index = event.target.dataset.index;

            projects[index].priority = event.target.value;

            saveProjects();
            displayProjects();
        });
    });


    // Open edit mode

    editButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            editingProjectIndex =
                Number(event.target.dataset.index);

            displayProjects();
        });
    });


    // Save edited project

    saveEditButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const index =
                Number(event.target.dataset.index);

            const name =
                document.querySelector(
                    `#edit-name-${index}`
                ).value;

            const type =
                document.querySelector(
                    `#edit-type-${index}`
                ).value;

            const notes =
                document.querySelector(
                    `#edit-notes-${index}`
                ).value;

            projects[index].name = name;
            projects[index].type = type;
            projects[index].notes = notes;

            saveProjects();

            editingProjectIndex = null;

            displayProjects();
        });
    });


    // Cancel editing

    cancelEditButtons.forEach((button) => {

        button.addEventListener("click", () => {

            editingProjectIndex = null;

            displayProjects();
        });
    });


    // Delete project

    deleteButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const index =
                Number(event.target.dataset.index);

            projects.splice(index, 1);

            saveProjects();

            editingProjectIndex = null;

            displayProjects();
        });
    });
}


// ---------- Status Dot Colours ----------

function getStatusClass(status) {

    if (status === "Planned") {
        return "status-planned";
    }

    if (status === "In Progress") {
        return "status-progress";
    }

    if (status === "Testing") {
        return "status-testing";
    }

    if (status === "Complete") {
        return "status-complete";
    }

    return "";
}


// ---------- Priority Dot Colours ----------

function getPriorityClass(priority) {

    if (priority === "Low") {
        return "priority-low";
    }

    if (priority === "Medium") {
        return "priority-medium";
    }

    if (priority === "High") {
        return "priority-high";
    }

    return "";
}


// ---------- Initial Display ----------

displayProjects();
