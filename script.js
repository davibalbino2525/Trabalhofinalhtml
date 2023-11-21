function calcularPlanos() {
    var idade = parseInt(document.getElementById("idade").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);

    var imc = peso / (altura * altura);

    var operadoraA = calcularPlanoA(idade, imc);
    var operadoraB = calcularPlanoB(imc);

    exibirResultado(operadoraA, operadoraB);
}

function calcularPlanoA(idade, imc) {
    var planoBasico = 100 + (idade * 10 * (imc / 10));
    var planoStandard = (150 + (idade * 15)) * (imc / 10);
    var planoPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    return {
        basico: planoBasico.toFixed(2),
        standard: planoStandard.toFixed(2),
        premium: planoPremium.toFixed(2)
    };
}

function calcularPlanoB(imc) {
    var fatorComorbidade = calcularFatorComorbidade(imc);

    var planoBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
    var planoStandard = (150 + (fatorComorbidade * 15)) * (imc / 10);
    var planoPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    return {
        basico: planoBasico.toFixed(2),
        standard: planoStandard.toFixed(2),
        premium: planoPremium.toFixed(2)
    };
}

function calcularFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10;
    } else if (imc < 25) {
        return 1;
    } else if (imc < 30) {
        return 6;
    } else if (imc < 35) {
        return 10;
    } else if (imc < 40) {
        return 20;
    } else {
        return 30;
    }
}

function exibirResultado(operadoraA, operadoraB) {
    var tabelaResultado = document.getElementById("tabelaResultado");

    criarLinhaResultado(tabelaResultado, "Operadora A", "Plano Básico", operadoraA.basico);
    criarLinhaResultado(tabelaResultado, "Operadora A", "Plano Standard", operadoraA.standard);
    criarLinhaResultado(tabelaResultado, "Operadora A", "Plano Premium", operadoraA.premium);

    criarLinhaResultado(tabelaResultado, "Operadora B", "Plano Básico", operadoraB.basico);
    criarLinhaResultado(tabelaResultado, "Operadora B", "Plano Standard", operadoraB.standard);
    criarLinhaResultado(tabelaResultado, "Operadora B", "Plano Premium", operadoraB.premium);
}

function criarLinhaResultado(tabela, operadora, plano, preco) {
    var row = tabela.insertRow();
    var operadoraCell = row.insertCell(0);
    var planoCell = row.insertCell(1);
    var precoCell = row.insertCell(2);

    operadoraCell.innerHTML = operadora;
    planoCell.innerHTML = plano;
    precoCell.innerHTML = "R$ " + preco;
}

function sugerirMelhorPlano() {
    var idade = parseInt(document.getElementById("idade").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);

    var imc = peso / (altura * altura);

    var operadoraA = calcularPlanoA(idade, imc);
    var operadoraB = calcularPlanoB(imc);

    var melhorPlano = 'Básico';
    var precoMelhorPlano = Number(operadoraA.basico);

    var precoStandard = Number(operadoraA.standard);
    if (precoStandard < precoMelhorPlano) {
        melhorPlano = 'Standard';
        precoMelhorPlano = precoStandard;
    }

    var precoPremium = Number(operadoraA.premium);
    if (precoPremium < precoMelhorPlano) {
        melhorPlano = 'Premium';
        precoMelhorPlano = precoPremium;
    }

    var precoBasicoB = Number(operadoraB.basico);
    if (precoBasicoB < precoMelhorPlano) {
        melhorPlano = 'Básico (Operadora B)';
        precoMelhorPlano = precoBasicoB;
    }

    var precoStandardB = Number(operadoraB.standard);
    if (precoStandardB < precoMelhorPlano) {
        melhorPlano = 'Standard (Operadora B)';
        precoMelhorPlano = precoStandardB;
    }

    var precoPremiumB = Number(operadoraB.premium);
    if (precoPremiumB < precoMelhorPlano) {
        melhorPlano = 'Premium (Operadora B)';
        precoMelhorPlano = precoPremiumB;
    }

    exibirMelhorPlano(melhorPlano, precoMelhorPlano.toFixed(2));
    exibirTabelaPlanos();
}

function exibirMelhorPlano(melhorPlano, precoMelhorPlano) {
    var planoSugerido = document.getElementById("planoSugerido");
    var precoMelhorPlanoElement = document.getElementById("precoMelhorPlano");

    planoSugerido.innerHTML = "O melhor plano encontrado é o <strong>" + melhorPlano + "</strong>.";
    precoMelhorPlanoElement.innerHTML = "Preço: <strong>R$ " + precoMelhorPlano + "</strong>.";
}

function exibirTabelaPlanos() {
    var tabelaResultado = document.getElementById("tabelaResultado");
    tabelaResultado.style.display = "block";
}
