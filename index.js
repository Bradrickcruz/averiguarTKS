window.addEventListener("load", () => {
  const date = document.querySelector("#futureDate");
  date.value = getTodayOnISOString();

  let form = document.querySelector("#ftks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let courseDurationWeeks = calculateDiffOfDatesOnWeeks();
    let classesWeeks = calculateCourseDurantionOnWeeks();
    let classesPerWeek = Math.ceil(classesWeeks / courseDurationWeeks);
    mountResult(courseDurationWeeks, classesWeeks, classesPerWeek);
  });
});

// retorna o dia de hoje em ISOstring
function getTodayOnISOString() {
  let today = new Date();
  today = today.toISOString().slice(0, 10);

  return today;
}

// calcula a quantidade de semanas para terminar o curso
function calculateCourseDurantionOnWeeks() {
  let aulas = document.querySelector("#aulas");
  let provas = document.querySelector("#provas");
  let total = Number(aulas.value) + Number(provas.value);
  // console.log(total)
  let weeks = Math.round(total / 2);
  console.log("semanas de curso:", weeks);
  return weeks;
}

// calcula a quantidade de semanas restantes até o fim do curso
function calculateDiffOfDatesOnWeeks() {
  let today = new Date().getTime();
  let futureDate = new Date(
    document.querySelector("#futureDate").value
  ).getTime();
  let diff = Math.abs(today - futureDate);
  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  let weeks = Math.round(days / 7);
  return weeks == 0 ? 1 : weeks;
}

// monta o resultado abaixo do container
function mountResult(course, classes, classesPerWeek) {
  let divResult = document.querySelector(".result");
  let nome = document.querySelector("#nome").value;

  divResult.classList.remove("hide",'OK','NotOK');
  divResult.classList.add(classesPerWeek == 1 ? "OK" : "NotOK");

  divResult.innerHTML = `
  <span class="resultTitle">Aluno: ${nome}</span>
  <span class="resultContent">Semanas até o fim do prazo: <b>${course} semana</b></span>
  <span class="resultContent">Total de curso restante em semanas: <b>${classes}(${
    classes * 2
  }h) de aula</b></span>
  <span class="resultContent">
    Frequência ideal de aulas: <b>${classesPerWeek}(${
    classesPerWeek * 2
  }h) por semana</b>
  </span>
  `;
}