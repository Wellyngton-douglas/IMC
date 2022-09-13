function meuForm() {
  const cont = document.querySelector('.container');
  const form = document.querySelector('.form');
  const regex = /[A-zÀ-ÿ]/;
  let status = true;
  
  function calcImc(peso, altura) {
    let pessoa = {
          peso : null,
          altura : null
    }
    pessoa.peso    = peso.replace(',','.');
    pessoa.altura  = altura.replace(',','.');

    if (pessoa.peso.search(regex) >= 0 || pessoa.peso.length == 0) {
      status = false;
      setResultado('Valor de Peso está incorreto', status);
      return;
    }

    if (pessoa.altura.search(regex) >= 0 || pessoa.altura.length == 0) {
      status = false;
      setResultado('Valor da altura está incorreto', status);
      return;
    }

    const calculo     = getCalcImc(pessoa.peso,pessoa.altura);
    const nivel       = getNivelImc(calculo);

    setResultado(`Seu IMC é ${calculo} ${nivel}`, status);
  }

  function getCalcImc(peso, altura) {
    const calc = peso / (altura ** 2);
    return calc.toFixed(2);
  }

  function getNivelImc(imc){
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
                   'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];
    
    if (imc < 18.5) {
      return nivel[0]
    }else if (imc >= 18.5 && calculo <= 24.9) {
      return nivel[1]
    }else if (imc >= 25 && calculo <= 29.9) {
      return nivel[2]
    }else if (imc >= 30 && calculo <= 34.9) {
      return nivel[3]
    }else if (imc >= 35 && calculo <= 39.9) {
      return nivel[4]
    }else if (imc >= 40) {
      return nivel[5]
    }
  }

  function setP() {
    const p = document.createElement('p');
    return p;
  }

  function setResultado(msg, valido) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    
    const p = setP();

    if (valido) {
      p.classList.add('sucesso')
    }else {
      p.classList.add('erro')
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
  }

  function eventoForm(evento) {
    evento.preventDefault();
    const inputPeso = form.querySelector('.peso');
    const inputAltura = form.querySelector('.altura');
    
    calcImc(inputPeso.value, inputAltura.value);
  }

  form.addEventListener('submit', eventoForm);
}

meuForm();