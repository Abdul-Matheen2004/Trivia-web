var data = {}
const fetching = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=boolean")
    if (response.status === !200) {
      throw new Error("Fetching failed: " + response.status)
    }
    data = await response.json()
    starting(0)
  }
  catch (error) {
    console.error(error)
  }

}
var count = 0;
const starting = (count) => {
  var list = data.results
  if (count < list.length) {
    injecting(list[count])
  } else {
    results()
  }
}
const injecting = (raw) => {
  const question = raw.question
  const out = `<h2 class="qus">${question}</h2>
        <input type="radio" name ="ans" value="True" id="true">
        <label for="true">True</label>
        <input type="radio" name ="ans" value="False" id="false" >
        <label for="false">False</label><br />
        <button id="start" type="button" onclick="checking(data.results[count])">Continue</button>`
  var section = document.getElementById("display")
  section.textContent = ""
  section.insertAdjacentHTML("beforeend", out);
}
var points = 0
const checking = (raw) => {
  var re = document.getElementsByName('ans')
  var ans = ""
  for (i = 0; i < re.length; i++) {
    if (re[i].checked) {
      ans = re[i].value;
    }
  }
  if (raw.correct_answer === ans) {
    points++;
  }
  count++;
  starting(count)
}
const results = () => {
  const out = `<h1>Your score is :</h1>
        <h1>${points} / ${data.results.length}</h1>`
  var section = document.getElementById("display")
  section.textContent = ""
  section.insertAdjacentHTML("beforeend", out);
}