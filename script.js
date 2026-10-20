let studenti = [
    { id: 1, nume: "Ion Popescu", grupa: "DAW-241", varsta: 18, specialitate: "Web Dev", avatar: "https://via.placeholder.com/80" },
    { id: 2, nume: "Maria Ionescu", grupa: "DAW-241", varsta: 19, specialitate: "Design", avatar: "https://via.placeholder.com/80" }
];

const studentSuplimentar = {
    id: 3,
    nume: "Caliniuc Nichita",
    grupa: "DAW-241",
    varsta: 18,
    specialitate: "Web Development",
    avatar: "https://via.placeholder.com/80"
};

studenti.push(studentSuplimentar);

const container = document.getElementById("studenti-container");
const spanNumar = document.getElementById("numar-studenti");

function afiseazaStudenți() {
    container.innerHTML = "";

    if (studenti.length === 0) {
        container.innerHTML = `<div class="mesaj-gol">Nu există niciun student în listă.</div>`;
        spanNumar.textContent = 0;
        return;
    }

    studenti.forEach(student => {
        const card = document.createElement("div");
        card.classList.add("student-card");

        const img = document.createElement("img");
        img.src = student.avatar;
        img.alt = "Avatar";

        const nume = document.createElement("h3");
        nume.textContent = student.nume;

        const grupa = document.createElement("p");
        grupa.textContent = `Grupa: ${student.grupa}`;

        const varsta = document.createElement("p");
        varsta.textContent = `Vârstă: ${student.varsta}`;

        const specialitate = document.createElement("p");
        specialitate.textContent = `Spec: ${student.specialitate}`;

        const btnSterge = document.createElement("button");
        btnSterge.type = "button";
        btnSterge.textContent = "Șterge";
        btnSterge.addEventListener("click", () => stergeStudent(student.id));

        card.append(img, nume, grupa, varsta, specialitate, btnSterge);
        container.appendChild(card);
    });

    spanNumar.textContent = studenti.length;
}

document.getElementById("form-student").addEventListener("submit", function(event) {
    event.preventDefault();

    const nume = document.getElementById("nume").value.trim();
    const grupa = document.getElementById("grupa").value.trim();
    const varsta = parseInt(document.getElementById("varsta").value);
    const specialitate = document.getElementById("specialitate").value.trim();
    let avatar = document.getElementById("avatar").value.trim();

    if (!avatar) {
        avatar = "https://via.placeholder.com/80";
    }

    if (isNaN(varsta) || varsta < 14 || varsta > 100) {
        alert("Eroare: Vârsta trebuie să fie un număr întreg între 14 și 100!");
        return;
    }

    const noulStudent = {
        id: Date.now(),
        nume,
        grupa,
        varsta,
        specialitate,
        avatar
    };

    studenti.push(noulStudent);
    this.reset();
    afiseazaStudenți();
});

function stergeStudent(id) {
    studenti = studenti.filter(student => student.id !== id);
    afiseazaStudenți();
}

function schimbaJustify(valoare) {
    container.style.justifyContent = valoare;
}

function schimbaAlign(valoare) {
    container.style.alignItems = valoare;
}

function schimbaWrap(valoare) {
    container.style.flexWrap = valoare;
}

function schimbaGap(valoare) {
    container.style.gap = valoare + "px";
}

afiseazaStudenți();
