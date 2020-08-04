window.addEventListener("load", () => {
  let date = document.querySelector("#futureDate");
  date.value = getTodayOnISOString();

  let form = document.querySelector("#ftks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('submit')
    let courseDurationWeeks = calculateDiffOfDatesOnWeeks();
    let classesWeeks = calculateCourseDurantionOnWeeks();
    let classesPerWeek = Math.ceil(classesWeeks / courseDurationWeeks);
    mountResult(courseDurationWeeks, classesWeeks, classesPerWeek);
  });
  let clearBtn = document.querySelector('#clear')
  clearBtn.addEventListener('click',clearForm)

  date.addEventListener('change',(e)=>{console.log(e.target.value)})
});

// retorna o dia de hoje em ISOstring
function getTodayOnISOString() {
  let today = new Date();
  today = today.toISOString().slice(0, 10);
  console.log(today)
  return today;
}

// calcula a quantidade de semanas para terminar o curso
function calculateCourseDurantionOnWeeks() {
  let aulas = document.querySelector("#aulas");
  let provas = document.querySelector("#provas");
  let total = addbits(aulas.value) + addbits(provas.value);
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
  let divResults = document.querySelector("#results");
  let nome = document.querySelector("#nome").value;

  divResults.classList.remove("hide");

  divResults.innerHTML = `
  <div id="result" class="result container ${classesPerWeek == 1 ? "OK" : "NotOK"}">
    <span class="resultTitle">Aluno: ${nome}</span>
    <span class="resultContent">Semanas até o fim do prazo: <b>${course} semanas</b></span>
    <span class="resultContent">
      Total de curso restante: 
      <b>${classes}(${classes * 2}h) semanas de aula
      </b>
    </span>
    <span class="resultContent">
      Frequência ideal de aulas: 
      <b>
      ${classesPerWeek}(${classesPerWeek * 2}h) aulas por semana
      </b>
    </span>
  </div>
  ${divResults.innerHTML}
  `;
}

// retorna resultado de string com expressão matemática de adição ou subtração
function addbits(s) {
  var total = 0,
    s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];

  while (s.length) {
    total += parseFloat(s.shift());
  }
  return total;
}

function clearForm(){
  console.log("clear")
  const name = document.querySelector('#nome')
  name.value = '';

  let date = document.querySelector("#futureDate");
  date.value = ''


  const aulas = document.querySelector('#aulas') 
  aulas.value = ''

  const provas = document.querySelector("#provas")
  provas.value=''

  const results = document.querySelector("#results")
  results.innerHTML = ''
  results.classList.add("hide")


}