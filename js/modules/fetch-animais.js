import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  const numerosGrid = document.querySelector(target);
  //Cria a div contendo informações com o total de animai
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");

    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // Preenche cada animal no DOM
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // Anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  //Puxa os animais através de um arquivo json e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      //Fetch espera a resposta e transforma a resposta em json
      const animaisResponte = await fetch(url);
      const animaisJSON = await animaisResponte.json();

      //Após a transformação de json, ativa as funções para preencher e animar os numeros
      animaisJSON.forEach((animal) => {
        preencherAnimais(animal);
      });
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
