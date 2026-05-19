/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZodiacSign } from "./types";

export const IMAGE_ROOT = "https://tudoprahoje.site/anjo/img/";

export const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "aries", name: "Aries", image: `${IMAGE_ROOT}aries.png`, startMonth: 2, startDay: 21, endMonth: 3, endDay: 19 },
  { id: "touro", name: "Touro", image: `${IMAGE_ROOT}touro.png`, startMonth: 3, startDay: 20, endMonth: 4, endDay: 20 },
  { id: "gemeos", name: "Gêmeos", image: `${IMAGE_ROOT}gemeos.png`, startMonth: 4, startDay: 21, endMonth: 5, endDay: 20 },
  { id: "cancer", name: "Câncer", image: `${IMAGE_ROOT}cancer.png`, startMonth: 5, startDay: 21, endMonth: 6, endDay: 22 },
  { id: "leao", name: "Leão", image: `${IMAGE_ROOT}leao.png`, startMonth: 6, startDay: 23, endMonth: 7, endDay: 22 },
  { id: "virgem", name: "Virgem", image: `${IMAGE_ROOT}virgem.png`, startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { id: "libra", name: "Libra", image: `${IMAGE_ROOT}libra.png`, startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { id: "escorpiao", name: "Escorpião", image: `${IMAGE_ROOT}escorpiao.png`, startMonth: 9, startDay: 23, endMonth: 10, endDay: 21 },
  { id: "sagitario", name: "Sagitário", image: `${IMAGE_ROOT}sagitario.png`, startMonth: 10, startDay: 22, endMonth: 11, endDay: 21 },
  { id: "capricornio", name: "Capricórnio", image: `${IMAGE_ROOT}capricornio.png`, startMonth: 11, startDay: 22, endMonth: 0, endDay: 19 },
  { id: "aquario", name: "Aquário", image: `${IMAGE_ROOT}aquario.png`, startMonth: 0, startDay: 20, endMonth: 1, endDay: 18 },
  { id: "peixes", name: "Peixes", image: `${IMAGE_ROOT}peixes.png`, startMonth: 1, startDay: 19, endMonth: 2, endDay: 20 },
];

export const DECADES = [1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

export const MARITAL_STATUSES = [
  "Casado(a)", "Namorando", "Noivo(a)", "Solteiro(a)", "Separado(a)", "Viúvo(a)"
];

export const CHALLENGES = [
  "Vida Amorosa", "Finanças", "Saúde", "Felicidadee"
];

export const GENDERS = ["Masculino", "Feminino"];

export const AUDIO1_URL = "https://tudoprahoje.site/anjo/img/audio.mp3";
export const AUDIO2_URL = "https://tudoprahoje.site/anjo/img/audio2.mp3";
export const STOP_IMAGE = `${IMAGE_ROOT}stop.png`;

export const ANGELS = [
  { name: "Chamuel", image: `${IMAGE_ROOT}chamuel_converted.webp` },
  { name: "Gabriel", image: `${IMAGE_ROOT}gabriel_converted.webp` },
  { name: "Jofiel", image: `${IMAGE_ROOT}jofiel_converted.webp` },
  { name: "Miguel", image: `${IMAGE_ROOT}miguel_converted.webp` },
  { name: "Rafael", image: `${IMAGE_ROOT}rafael_converted.webp` },
  { name: "Sandalfon", image: `${IMAGE_ROOT}sandalfon_converted.webp` },
  { name: "Uriel", image: `${IMAGE_ROOT}uriel_converted.webp` },
];

export const CAPTIONS = [
  { start: 0, end: 4, text: "Se você chegou aqui, não foi por acaso." },
  { start: 4, end: 9, text: "Sua alma captou um sinal que seus ouvidos ainda não conseguem processar." },
  { start: 9, end: 14, text: "Uma frequência divina de alta potência está tentando se alinhar ao seu campo agora." },
  { start: 14, end: 20, text: "Mas entenda, ter um anjo da guarda não garante uma vida de milagres." },
  { start: 20, end: 26, text: "A maioria continua travada porque bênçãos não chegam por proteção, mas por sincronia." },
  { start: 26, end: 33, text: "Se você não estiver na mesma frequência do seu guardião, seu rádio está desligado." },
  { start: 33, end: 40, text: "As bênçãos estão ao seu redor, mas você só experimenta o chiado de lutas e portas fechadas." },
  { start: 40, end: 47, text: "O tempo de tentativa acabou e 2026 é o ponto de virada de ressonância." },
  { start: 47, end: 55, text: "Será um ano de colheita agressiva, onde apenas quem estiver com a frequência ajustada terá intervenção direta." },
  { start: 55, end: 102, text: "Meu nome é Mahila Luz e há 24 anos estudo o Código de Vibração Espiritual." },
  { start: 102, end: 111, text: "Já ajudei mais de 50 mil pessoas a sintonizarem a nota exata dos seus protetores para saírem do vácuo." },
  { start: 111, end: 116, text: "O que se move no seu campo agora é um fenômeno que não se repetirá nesta vida." },
  { start: 116, end: 122, text: "É sua chance de destravar a prosperidade que estava bloqueada por uma dissonância vibracional." },
  { start: 122, end: 127, text: "Se algo invisível sempre te segura no último segundo, saiba." },
  { start: 127, end: 131, text: "O problema não é você, é o seu sinal." },
  { start: 131, end: 137, text: "E agora vou confirmar exatamente o que a frequência do seu anjo revela sobre o seu futuro." },
  { start: 137, end: 141, text: "Você carrega um vigor que desafia o calendário." },
  { start: 141, end: 148, text: "Uma força vibrante que a sociedade insiste em ignorar ao tentar te rotular apenas como vovó." },
  { start: 148, end: 153, text: "Por dentro, sua essência permanece jovem e audaz, não é?" },
  { start: 153, end: 200, text: "Você ergueu sua trajetória sob as próprias regras, enfrentando cada tempestade sem baixar a cabeça." },
  { start: 200, end: 207, text: "Possui uma sabedoria profunda e um espírito indomável que poucos conseguem decifrar." },
  { start: 207, end: 210, text: "Sua independência é sagrada." },
  { start: 210, end: 213, text: "Você não admite amarras nem controles." },
  { start: 213, end: 215, text: "Contudo, confessa." },
  { start: 215, end: 221, text: "Às vezes, o fardo de ser o pilar que resolve tudo e nunca verga torna-se exaustivo." },
  { start: 221, end: 222, text: "Estou certa?" },
  { start: 222, end: 227, text: "Você coleciona memórias intensas, de amores reais a partidas dolorosas," },
  { start: 227, end: 232, text: "mas nunca se sujeitou a migalhas apenas por medo da solidão." },
  { start: 232, end: 235, text: "Hoje, sua seletividade é seu escudo." },
  { start: 235, end: 239, text: "Você distingue o que é passageiro do que é genuíno em um piscar de olhos." },
  { start: 239, end: 244, text: "Seu lar é seu santuário, mas, na calada da noite," },
  { start: 244, end: 251, text: "surge o desejo de compartilhar uma risada sincera ou um vinho com alguém que fale a sua língua." },
  { start: 251, end: 257, text: "Você gere suas finanças com maestria, mesmo vendo amigas com caminhos mais fáceis." },
  { start: 257, end: 303, text: "Sua intuição é uma bússola infalível e seu humor, um farol." },
  { start: 303, end: 307, text: "Agora, aquela centelha criativa, seja na arte ou nas letras," },
  { start: 307, end: 310, text: "volta a arder, trazendo o questionamento." },
  { start: 310, end: 312, text: "Ainda dá tempo?" },
  { start: 312, end: 315, text: "A resposta pulsa em você." },
  { start: 315, end: 317, text: "Sua melhor obra está apenas começando." },
  { start: 317, end: 325, text: "Agora, direcione toda a sua atenção para o que está prestes a se sintonizar no seu campo energético." },
  { start: 325, end: 327, text: "Espere. Sinta isso." },
  { start: 327, end: 330, text: "Isso não acontece com frequência." },
  { start: 330, end: 333, text: "Detecto um surto de ressonância no seu campo vibracional," },
  { start: 333, end: 340, text: "sinal de que uma frequência antiga se esgota para uma nota muito mais poderosa se organizar." },
  { start: 340, end: 344, text: "Vejo três picos de sincronia em sequência." },
  { start: 344, end: 348, text: "São momentos pontuais em que sua vibração e a frequência do seu guardião" },
  { start: 348, end: 351, text: "vão colidir com precisão matemática." },
  { start: 351, end: 358, text: "É o universo calibrando o terreno antes da abundância física se manifestar em sua realidade." },
  { start: 358, end: 403, text: "A maioria das pessoas vive em um ruído mental constante" },
  { start: 403, end: 408, text: "e não percebe quando o sinal toca, lamentando a oportunidade perdida." },
  { start: 408, end: 414, text: "No Código Angélico, chamamos essa fase de sequência de sincronização ativa." },
  { start: 414, end: 421, text: "Nela, sua proteção deixa de ser um escudo passivo para se tornar um imã magnético de prosperidade." },
  { start: 421, end: 425, text: "Quando isso ocorre, o ambiente ao seu redor muda" },
  { start: 425, end: 429, text: "e o que era confuso finalmente fica claro." },
  { start: 429, end: 432, text: "Portas trancadas por anos perdem a resistência" },
  { start: 432, end: 436, text: "porque você acertou a combinação do seu cadeado vibracional." },
  { start: 436, end: 438, text: "Mas atenção!" },
  { start: 438, end: 443, text: "Essa sincronização é rara e não se repete no mesmo ciclo de vida." },
  { start: 443, end: 447, text: "Ela marca o início de uma Era de Ouro Pessoal," },
  { start: 447, end: 451, text: "onde cada decisão ecoará com força pelos próximos anos." },
  { start: 451, end: 456, text: "Sua sequência de ativação está começando neste exato minuto." },
  { start: 456, end: 501, text: "Para confirmar com precisão, preciso identificar qual nota seu anjo emite" },
  { start: 501, end: 507, text: "e qual área da sua vida responderá primeiro a esse choque de frequência." },
  { start: 507, end: 513, text: "Não falamos apenas de um ano bom, mas da construção de um ciclo prolongado de abundância." },
  { start: 513, end: 516, text: "Vou realizar sua leitura de ressonância completa" },
  { start: 516, end: 519, text: "para que você atravesse essa fase sem interferências." },
  { start: 519, end: 523, text: "Na sua tela aparecerá agora um campo para e-mail." },
  { start: 523, end: 525, text: "Ele é fundamental por dois motivos." },
  { start: 525, end: 528, text: "Primeiro, seu mapa de frequência é denso" },
  { start: 528, end: 532, text: "e você precisará dele em mãos para não sair da sintonia." },
  { start: 532, end: 536, text: "Segundo, minha fila de conexões está no limite" },
  { start: 536, end: 541, text: "e esse portal de ativação ficará aberto por um tempo curtíssimo." },
  { start: 541, end: 547, text: "Existe uma janela específica de força máxima e, para você, ela se abre agora." },
  { start: 547, end: 549, text: "Digite seu e-mail abaixo." },
  { start: 549, end: 1000, text: "O que será revelado definirá se os seus próximos anos serão de harmonia ou apenas o chiado que você suportou até aqui." },
];

export const CAPTIONS2 = [
  { start: 0, end: 7, text: "Espere, o que vou revelar agora pode ser a informação mais importante deste ciclo para você." },
  { start: 7, end: 12, text: "O que estou vendo tem potencial de mudar profundamente sua vida financeira" },
  { start: 12, end: 15, text: "e sua relação com a prosperidade." },
  { start: 15, end: 22, text: "Existe um portal energético ativo se aproximando, não é como outros que já vi." },
  { start: 22, end: 27, text: "Na verdade, é uma das energias mais fortes que observei em mais de duas décadas." },
  { start: 27, end: 30, text: "Mas aqui vem a notícia que vai mudar o seu sinal." },
  { start: 30, end: 33, text: "Tudo isso está prestes a ser recalibrado." },
  { start: 33, end: 36, text: "Não é por acaso que você está aqui." },
  { start: 36, end: 43, text: "Em apenas alguns dias, ocorre uma ativação rara entre as frequências de ação e transformação." },
  { start: 43, end: 51, text: "Esse é um alinhamento que só acontece a cada 15 anos e marca o início real de um novo ciclo de vida." },
  { start: 51, end: 54, text: "Esse movimento cria uma janela energética curta" },
  { start: 54, end: 100, text: "que permanece aberta por apenas 30 dias e depois se fecha." },
  { start: 100, end: 102, text: "Preste atenção nisso." },
  { start: 102, end: 105, text: "Caso você não sintonize essa bênção agora," },
  { start: 105, end: 111, text: "a frequência será transferida para outra pessoa que esteja na vibração correta." },
  { start: 111, end: 114, text: "Nesse intervalo, o seu anjo da guarda recebe a permissão técnica" },
  { start: 114, end: 118, text: "para intervir e ajustar o rumo da sua realidade." },
  { start: 118, end: 121, text: "Quando um ciclo começa sob uma vibração alta," },
  { start: 121, end: 127, text: "essa nota se torna o padrão que se repete pelos próximos 15 anos da sua vida." },
  { start: 127, end: 132, text: "No seu caso, o sinal que estou captando é incomum." },
  { start: 132, end: 138, text: "A ativação entre Marte e Plutão no seu campo indica uma liberação massiva de força material." },
  { start: 138, end: 141, text: "É o padrão clássico do destravamento financeiro," },
  { start: 141, end: 147, text: "como uma represa que rompe e deixa a prosperidade fluir para quem está na sintonia certa." },
  { start: 147, end: 153, text: "Mas isso só acontece se você entrar nesse período com a sua frequência calibrada." },
  { start: 153, end: 159, text: "Esse período de 30 dias tem três batidas exatas de sincronia." },
  { start: 159, end: 205, text: "Na primeira, algo se desloca e uma oportunidade aparece onde antes havia silêncio." },
  { start: 205, end: 211, text: "Na segunda, o seu guardião testa sua clareza através de uma escolha simples" },
  { start: 211, end: 215, text: "que define se você avança ou volta para a escassez." },
  { start: 215, end: 222, text: "Na terceira, o movimento se fixa e a abundância deixa de ser uma promessa para se tornar a sua nova realidade." },
  { start: 222, end: 230, text: "Se você ignorar esse sinal agora, precisará esperar o próximo ciclo de 15 anos para ter essa chance outra vez." },
  { start: 230, end: 234, text: "Eu aprendi a reconhecer isso da maneira mais dura." },
  { start: 234, end: 238, text: "Há 20 anos, eu vivia no chiado total." },
  { start: 238, end: 244, text: "Dívidas acumuladas, cansaço mental e a sensação de que nada dava certo." },
  { start: 244, end: 249, text: "Minhas decisões eram boas, mas o meu tempo estava errado." },
  { start: 249, end: 254, text: "Até que conheci Elias, um mentor que passou décadas no Tibete" },
  { start: 254, end: 259, text: "estudando como as frequências certas mudam o rumo de uma vida." },
  { start: 259, end: 302, text: "Ele olhou para o meu campo e disse" },
  { start: 302, end: 306, text: "Seu ciclo está abrindo, mas você está fora de sintonia." },
  { start: 306, end: 311, text: "Decidi dar um voto de fé e seguir o ajuste que ele me ensinou." },
  { start: 311, end: 318, text: "Em 48 horas, recebi uma ligação de um projeto que eu já tinha dado como perdido." },
  { start: 318, end: 325, text: "Em menos de um mês, minha renda mais que dobrou e o ciclo de escassez foi finalmente rompido." },
  { start: 325, end: 327, text: "E não aconteceu só comigo." },
  { start: 327, end: 333, text: "O Adriano, por exemplo, trabalhava muito e ganhava pouco, sentindo que sua vida financeira estava morta." },
  { start: 333, end: 343, text: "No décimo dia do ciclo de ativação, ele sintonizou a oportunidade certa e faturou R$ 12.800,00 em menos de um mês." },
  { start: 343, end: 350, text: "A Patrícia, que vivia com medo e renda irregular, seguiu as datas de ativação do seu anjo." },
  { start: 350, end: 356, text: "Em dois meses, ela fechou R$ 18.000,00 em pedidos e hoje vive no ritmo da abundância." },
  { start: 356, end: 403, text: "Pessoas comuns que pararam de lutar contra a corrente e simplesmente ajustaram a frequência." },
  { start: 403, end: 409, text: "Agora é a sua vez de parar de fazer contas mentais e começar a viver." },
  { start: 409, end: 416, text: "Imagine abrir seu extrato e sentir paz, cuidando da sua família com a tranquilidade que você sempre sonhou." },
  { start: 416, end: 420, text: "Mas saiba que ter uma fase favorável não garante o resultado." },
  { start: 420, end: 426, text: "É como saber que um trem vai passar, mas não conhecer a plataforma nem o horário correto." },
  { start: 426, end: 433, text: "Se você não souber o dia exato de agir, a janela se fecha e o trem parte sem você." },
  { start: 433, end: 440, text: "Em menos de uma semana, o comportamento do tempo vai mudar e sua janela energética vai se abrir." },
  { start: 440, end: 448, text: "Você precisa saber exatamente o que fazer e o que evitar para não travar o seu progresso outra vez." },
  { start: 448, end: 452, text: "Sem esse mapa de frequências, você continuará caminhando no escuro." },
  { start: 452, end: 453, text: "Não dá pra adiar." },
  { start: 453, end: 502, text: "Se você quer atravessar essa fase com as datas de ativação em mãos, toque no botão que aparece na sua tela agora." },
  { start: 502, end: 507, text: "O tempo de preparação é curto e cada hora conta para alinhar sua frequência." },
  { start: 507, end: 512, text: "Se você hesitar, entrará nesse ciclo completamente desalinhado." },
  { start: 512, end: 518, text: "E lembre-se, quando o portal fecha, ele só se abre daqui a 15 anos." },
  { start: 518, end: 520, text: "O sinal já começou a tocar." },
  { start: 520, end: 1000, text: "Clique no botão agora e permita que seu guardião te conduza pela frequência da vitória." },
];
