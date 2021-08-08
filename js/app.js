

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


document.addEventListener('DOMContentLoaded', ()=>{
formulario.addEventListener('submit', loaderWenther);
});

function loaderWenther (e){
   e.preventDefault()
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;
  
  if(ciudad === '' || pais === ''){
    alertMenssage('Todos los campos son obligatorios')
    return
  }
  
  ShowWenther(ciudad,pais)
  
}

function alertMenssage(mensaje){
   const alert = document.querySelector('.bg-red-100')
   if(!alert){
     const showMs = document.createElement('div');
     showMs.classList.add('bg-red-100', 'text-center', 'py-2', 'mt-4','rounded', 'max-w-md', 'mx-auto','border-red-700','text-red-700')
  
     showMs.textContent = mensaje
  
     formulario.appendChild(showMs);
  
     setTimeout(()=>{
      showMs.remove()
     },3000)
   }
}

function ShowWenther(ciudad, pais){

    const apikey = 'f1c27929009e3a54b711fd10970e808b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;

    spinner();

    fetch(url)
      .then(res => res.json())
      .then(date => {
        clearHTML()
        if(date.cod === '404'){
          alertMenssage('ciudad no encontrada prueve con otra busqueda')
          return
        }

        insertarWenther(date)
      })
    
}


function insertarWenther(date){
  const {name,main: {temp, temp_max, temp_min}} = date
  const temActual = parseInt(temp - 275.15)
  const max = parseInt(temp_max - 275.15)
  const min = parseInt(temp_min - 275.15)

  const parrafo = document.createElement('p');
  parrafo.innerHTML = `${temActual} &#8451`;
  parrafo.classList.add('font-bold','text-6xl')

  const tempMax = document.createElement('p');
  tempMax.classList.add('font-bold','text-xl')
  tempMax.innerHTML = `Max: ${max} &#8451`;

  const tempMin = document.createElement('p');
  tempMin.classList.add('font-bold','text-xl')
  tempMin.innerHTML = `Min: ${min} &#8451`;

  const nameCity = document.createElement('p')
  nameCity.classList.add('text-4xl')
  nameCity.textContent = name;

  const resultDiv = document.createElement('div');
  resultDiv.classList.add('text-center','text-white')

  resultDiv.appendChild(nameCity)
  resultDiv.appendChild(parrafo)
  resultDiv.appendChild(tempMax)
  resultDiv.appendChild(tempMin)

  resultado.appendChild(resultDiv)

}

function clearHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
  }
}

function spinner(){
  clearHTML()
  const spinner = document.createElement('div');
  spinner.classList.add('sk-fading-circle');

  spinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `
  resultado.appendChild(spinner);
}