/* Stap 1: Voeg een 'input' event listener toe aan het tekstveld om statistieken bij te werken bij elke invoer */
document.getElementById("textInput").addEventListener("input", updateCounts);

/* Stap 2: Voeg een 'change' event listener toe aan de checkbox voor het uitsluiten van spaties */
document
  .getElementById("excludeSpaces")
  .addEventListener("change", updateCounts);

/* Stap 3: Voeg een 'change' event listener toe aan de checkbox voor het instellen van een karakterlimiet */
document.getElementById("setCharLimit").addEventListener("change", function () {
  const limitInput = document.getElementById("charLimitInput");
  /* Stap 3.1: Toon het nummer invoerveld als de checkbox aangevinkt is */
  if (this.checked) {
    limitInput.style.display = "inline";
    /* Stap 3.2: Verberg het invoerveld en wis de waarde als de checkbox niet aangevinkt is */
  } else {
    limitInput.style.display = "none";
    limitInput.value = "";
  }
  /* Stap 3.3: Werk statistieken bij na wijziging van de karakterlimiet */
  updateCounts();
});

/* Stap 4: Voeg een 'input' event listener toe aan het karakterlimiet invoerveld */
document
  .getElementById("charLimitInput")
  .addEventListener("input", function () {
    updateCounts();
  });

/* Stap 5: Definieer de functie updateCounts om de tekstanalyse bij te werken */
function updateCounts() {
  const textInput = document.getElementById("textInput");
  const text = textInput.value;
  const excludeSpaces = document.getElementById("excludeSpaces").checked;
  /* Stap 5.1: Bepaal de tekst om te analyseren; negeer spaties voor de telling indien geselecteerd */
  const textToAnalyze = excludeSpaces ? text.replace(/\s/g, "") : text;

  const charLimit = document.getElementById("charLimitInput").value; // Haal de karakterlimiet op
  const isCharLimitActive = document.getElementById("setCharLimit").checked;

  /* Stap 5.2: Pas de karakterlimiet toe indien actief */
  if (isCharLimitActive && charLimit) {
    textInput.value = text.substring(0, charLimit);
  }

  /* Stap 5.3: Bereken het aantal karakters exclusief spaties indien geselecteerd */
  const charCount = textToAnalyze.length;
  /* Stap 5.4: Bereken aantal woorden */
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  /* Stap 5.5: Bereken aantal zinnen */
  const sentenceCount = text.match(/[.!?]+(?:\s|$)/g)
    ? text.match(/[.!?]+(?:\s|$)/g).length
    : 0;
  /* Stap 5.6: Schat de leestijd */
  const readingTime = Math.ceil(wordCount / 200);

  /* Stap 5.7: Update de weergave van statistieken */
  document.getElementById("charCount").textContent = charCount.toLocaleString();
  document.getElementById("wordCount").textContent = wordCount.toLocaleString();
  document.getElementById("sentenceCount").textContent =
    sentenceCount.toLocaleString();
  document.getElementById("readingTime").textContent = readingTime;
}
