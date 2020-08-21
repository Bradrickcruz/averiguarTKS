$(() => {
  let date = $("#futureDate");
  date.val(getTodayOnISOString())

  $("#ftks").on("submit", (e) => {
    e.preventDefault();
    let courseDurationWeeks = calculateDiffOfDatesOnWeeks();
    let classesWeeks = calculateCourseDurantionOnWeeks();
    let classesPerWeek = Math.ceil(classesWeeks.weeks / courseDurationWeeks);
    mountResult(courseDurationWeeks, classesWeeks, classesPerWeek);
  });
  $("#clear").click(clearForm);

  // date.on("change", (e) => {
  //   console.log(e.target.value);
  // });
});

// retorna o dia de hoje em ISOstring
function getTodayOnISOString() {
  let today = new Date();
  today = today.toISOString().slice(0, 10);
  return today;
}

// calcula a quantidade de semanas para terminar o curso
function calculateCourseDurantionOnWeeks() {
  let aulas = $("#aulas");
  let provas = $("#provas");
  let total = addbits(aulas.val()) + addbits(provas.val());
  let weeks = Math.round(total / 2);
  // console.log("semanas de curso:", weeks);
  return { exact: total, weeks: weeks };
}

// calcula a quantidade de semanas restantes até o fim do curso
function calculateDiffOfDatesOnWeeks() {
  let today = new Date().getTime();
  let futureDate = new Date($("#futureDate").val()).getTime();
  let diff = Math.abs(today - futureDate);
  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  let weeks = Math.round(days / 7);
  return weeks == 0 ? 1 : weeks;
}

// monta o resultado abaixo do container
function mountResult(course, classes, classesPerWeek) {
  let divResults = $("#results");
  let nome = $("#nome").val();

  divResults.removeClass("hide");

  let now = new Date().toLocaleString().slice(0, 16);

  divResults.html(`
  <div id="result" class="result container ${
    classesPerWeek == 1 ? "OK" : "NotOK"
  }">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="resultTitle">Aluno: ${nome}</span>
      <span><i style="font-size:1.2rem">Data da consulta: ${now}</i></span>
    </div>  
    <span class="resultContent">Semanas até o fim do prazo: <b>${course} semanas</b></span>
    <span class="resultContent">
      Total de curso restante: 
      <b>${classes.weeks} semanas (${classes.exact}h) de aula
      </b>
    </span>
    <span class="resultContent">
      Frequência ideal de aulas: 
      <b>
      ${classesPerWeek} aulas (${classesPerWeek * 2}h) por semana
      </b>
    </span>
  </div>
  ${divResults.html()}
  `);
}

// retorna resultado de string com expressão matemática de adição ou subtração
function addbits(s) {
  var total = 0;
  s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];

  while (s.length) {
    total += parseFloat(s.shift());
  }
  return total;
}

function clearForm() {
  $("#nome").val("");

  $("#futureDate").val("");

  $("#aulas").val("");

  $("#provas").val("");

  $("#results").html("").addClass("hide");
}

function selectMultAndDivis(string) {
  const multiDivPattern = /[*\\]+(\.\d+|\d+(\.\d+)?)/g;
  const SumSubPattern = /[+\-]+(\.\d+|\d+(\.\d+)?)/g;
}
