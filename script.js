let painel = {
  temperatura: 26,
  umidade: 65,
  solo: "Bom",
  clima: "Normal ☀️"
};

const temp = document.getElementById("temp");
const umidade = document.getElementById("umidade");
const solo = document.getElementById("solo");
const climaTxt = document.getElementById("clima");

function atualizarPainel() {
  temp.innerText = painel.temperatura.toFixed(1) + " °C";
  umidade.innerText = painel.umidade.toFixed(0) + " %";
  solo.innerText = painel.solo;
  climaTxt.innerText = painel.clima;
}

setInterval(() => {
  const climas = ["Chuva 🌧️", "Seca 🔥", "Normal ☀️"];
  painel.clima = random(climas);

  if (painel.clima.includes("Chuva")) {
    painel.umidade += 4;
    painel.temperatura -= 1;
    painel.solo = "Úmido";
  } else if (painel.clima.includes("Seca")) {
    painel.umidade -= 4;
    painel.temperatura += 1;
    painel.solo = "Seco";
  } else {
    painel.solo = "Bom";
  }

  atualizarPainel();
}, 4000);

/* MAPA */
let regioes = [];
let gotas = [];

function setup() {
  const canvas = createCanvas(900, 450);
  canvas.parent("mapCanvas");

  for (let i = 0; i < 35; i++) {
    regioes.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      producao: random(50, 150),
      impacto: random(0, 100),
      agua: random(30, 100),
      pulso: random(TWO_PI)
    });
  }

  atualizarPainel();
}

function draw() {
  background("#020617");
  atualizarRegioes();
  desenharRegioes();
  simularChuva();
}

function atualizarRegioes() {
  for (let r of regioes) {
    r.impacto = constrain(r.impacto + random(-0.3, 0.3), 0, 100);
    r.agua = constrain(r.agua + random(-0.4, 0.4), 0, 100);
    r.pulso += 0.05;
  }
}

function desenharRegioes() {
  noStroke();
  textAlign(CENTER);

  for (let r of regioes) {
    let cor =
      r.impacto < 40 && r.agua > 60 ? color(34,197,94) :
      r.impacto < 70 ? color(250,204,21) :
      color(239,68,68);

    let tamanho = r.producao / 2 + sin(r.pulso) * 6;

    fill(cor);
    ellipse(r.x, r.y, tamanho);
    fill(255);
    text("🌾", r.x, r.y + 4);
  }
}

function simularChuva() {
  if (painel.clima.includes("Chuva")) {
    gotas.push({ x: random(width), y: 0, v: random(4, 7) });
  }

  stroke(100, 200, 255);
  for (let g of gotas) {
    line(g.x, g.y, g.x, g.y + 10);
    g.y += g.v;
  }

  gotas = gotas.filter(g => g.y < height);
}