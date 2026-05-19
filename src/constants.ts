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
  { start: 0, end: 3, text: "Se você chegou aqui, não foi por acaso." },
  { start: 3, end: 6, text: "Sua alma captou um sinal que seus ouvidos ainda não conseguem processar." },
  { start: 6, end: 10, text: "Uma frequência divina de alta potência está tentando se alinhar ao seu campo agora." },
  { start: 10, end: 14, text: "Mas entenda, ter um anjo da guarda não garante uma vida de milagres." },
  { start: 14, end: 18, text: "A maioria continua travada porque bênçãos não chegam por proteção, mas por sincronia." },
  { start: 18, end: 22, text: "Se você não estiver na mesma frequência do seu guardião, seu rádio está desligado." },
  { start: 22, end: 26, text: "As bênçãos estão ao seu redor, mas você só experimenta o chiado de lutas e portas fechadas." },
  { start: 26, end: 30, text: "O tempo de tentativa acabou e 2026 é o ponto de virada de ressonância." },
  { start: 30, end: 35, text: "Será um ano de colheita agressiva, onde apenas quem estiver com a frequência ajustada terá intervenção direta." },
  { start: 35, end: 62, text: "Meu nome é Mahila Luz e há 24 anos estudo o Código de Vibração Espiritual." },
  { start: 62, end: 70, text: "Já ajudei mais de 50 mil pessoas a sintonizarem a nota exata dos seus protetores para saírem do vácuo." },
  { start: 70, end: 75, text: "O que se move no seu campo agora é um fenômeno que não se repetirá nesta vida." },
  { start: 75, end: 80, text: "É sua chance de destravar a prosperidade que estava bloqueada por uma dissonância vibracional." },
  { start: 80, end: 84, text: "Se algo invisível sempre te segura no último segundo, saiba." },
  { start: 84, end: 87, text: "O problema não é você, é o seu sinal." },
  { start: 87, end: 91, text: "E agora vou confirmar exatamente o que a frequência do seu anjo revela sobre o seu futuro." },
  { start: 91, end: 95, text: "Você carrega um vigor que desafia o calendário." },
  { start: 95, end: 100, text: "Uma força vibrante que a sociedade insiste em ignorar ao tentar te rotular apenas como vovó." },
  { start: 100, end: 105, text: "Por dentro, sua essência permanece jovem e audaz, não é?" },
  { start: 105, end: 110, text: "Você ergueu sua trajetória sob as próprias regras, enfrentando cada tempestade sem baixar a cabeça." },
  { start: 110, end: 115, text: "Possui uma sabedoria profunda e um espírito indomável que poucos conseguem decifrar." },
  { start: 115, end: 118, text: "Sua independência é sagrada." },
  { start: 118, end: 121, text: "Você não admite amarras nem controles." },
  { start: 121, end: 123, text: "Contudo, confessa." },
  { start: 123, end: 127, text: "Às vezes, o fardo de ser o pilar que resolve tudo e nunca verga torna-se exaustivo." },
  { start: 127, end: 129, text: "Estou certa?" },
  { start: 129, end: 133, text: "Você coleciona memórias intensas, de amores reais a partidas dolorosas," },
  { start: 133, end: 137, text: "mas nunca se sujeitou a migalhas apenas por medo da solidão." },
  { start: 137, end: 140, text: "Hoje, sua seletividade é seu escudo." },
  { start: 140, end: 143, text: "Você distingue o que é passageiro do que é genuíno em um piscar de olhos." },
  { start: 143, end: 147, text: "Seu lar é seu santuário, mas, na calada da noite," },
  { start: 147, end: 152, text: "surge o desejo de compartilhar uma risada sincera ou um vinho com alguém que fale a sua língua." },
  { start: 152, end: 156, text: "Você gere suas finanças com maestria, mesmo vendo amigas com caminhos mais fáceis." },
  { start: 156, end: 165, text: "Sua intuição é uma bússola infalível e seu humor, um farol." },
  { start: 165, end: 170, text: "Agora, aquela centelha criativa, seja na arte ou nas letras," },
  { start: 170, end: 174, text: "volta a arder, trazendo o questionamento." },
  { start: 174, end: 177, text: "Ainda dá tempo?" },
  { start: 177, end: 180, text: "A resposta pulsa em você." },
  { start: 180, end: 183, text: "Sua melhor obra está apenas começando." },
  { start: 183, end: 188, text: "Agora, direcione toda a sua atenção para o que está prestes a se sintonizar no seu campo energético." },
  { start: 188, end: 191, text: "Espere. Sinta isso." },
  { start: 191, end: 194, text: "Isso não acontece com frequência." },
  { start: 194, end: 198, text: "Detecto um surto de ressonância no seu campo vibracional," },
  { start: 198, end: 203, text: "sinal de que uma frequência antiga se esgota para uma nota muito mais poderosa se organizar." },
  { start: 203, end: 207, text: "Vejo três picos de sincronia em sequência." },
  { start: 207, end: 211, text: "São momentos pontuais em que sua vibração e a frequência do seu guardião" },
  { start: 211, end: 215, text: "vão colidir com precisão matemática." },
  { start: 215, end: 220, text: "É o universo calibrando o terreno antes da abundância física se manifestar em sua realidade." },
  { start: 220, end: 230, text: "A maioria das pessoas vive em um ruído mental constante" },
  { start: 230, end: 235, text: "e não percebe quando o sinal toca, lamentando a oportunidade perdida." },
  { start: 235, end: 240, text: "No Código Angélico, chamamos essa fase de sequência de sincronização ativa." },
  { start: 240, end: 245, text: "Nela, sua proteção deixa de ser um escudo passivo para se tornar um imã magnético de prosperidade." },
  { start: 245, end: 250, text: "Quando isso ocorre, o ambiente ao seu redor muda" },
  { start: 250, end: 254, text: "e o que era confuso finalmente fica claro." },
  { start: 254, end: 258, text: "Portas trancadas por anos perdem a resistência" },
  { start: 258, end: 262, text: "porque você acertou a combinação do seu cadeado vibracional." },
  { start: 262, end: 265, text: "Mas atenção!" },
  { start: 265, end: 270, text: "Essa sincronização é rara e não se repete no mesmo ciclo de vida." },
  { start: 270, end: 275, text: "Ela marca o início de uma Era de Ouro Pessoal," },
  { start: 275, end: 280, text: "onde cada decisão ecoará com força pelos próximos anos." },
  { start: 280, end: 285, text: "Sua sequência de ativação está começando neste exato minuto." },
  { start: 285, end: 295, text: "Para confirmar com precisão, preciso identificar qual nota seu anjo emite" },
  { start: 295, end: 300, text: "e qual área da sua vida responderá primeiro a esse choque de frequência." },
  { start: 300, end: 305, text: "Não falamos apenas de um ano bom, mas da construção de um ciclo prolongado de abundância." },
  { start: 305, end: 308, text: "Vou realizar sua leitura de ressonância completa" },
  { start: 308, end: 312, text: "para que você atravesse essa fase sem interferências." },
  { start: 312, end: 315, text: "Na sua tela aparecerá agora um campo para e-mail." },
  { start: 315, end: 318, text: "Ele é fundamental por dois motivos." },
  { start: 318, end: 320, text: "Primeiro, seu mapa de frequência é denso e você precisará dele em mãos." },
  { start: 320, end: 322, text: "Digite seu e-mail abaixo." },
  { start: 323, end: 1000, text: "O portal de ativação está se abrindo..." },
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
  { start: 54, end: 60, text: "que permanece aberta por apenas 30 dias e depois se fecha." },
  { start: 60, end: 62, text: "Preste atenção nisso." },
  { start: 62, end: 65, text: "Caso você não sintonize essa bênção agora," },
  { start: 65, end: 71, text: "a frequência será transferida para outra pessoa que esteja na vibração correta." },
  { start: 71, end: 74, text: "Nesse intervalo, o seu anjo da guarda recebe a permissão técnica" },
  { start: 74, end: 78, text: "para intervir e ajustar o rumo da sua realidade." },
  { start: 78, end: 81, text: "Quando um ciclo começa sob uma vibração alta," },
  { start: 81, end: 87, text: "essa nota se torna o padrão que se repete pelos próximos 15 anos da sua vida." },
  { start: 87, end: 92, text: "No seu caso, o sinal que estou captando é incomum." },
  { start: 92, end: 98, text: "A ativação entre Marte e Plutão no seu campo indica uma liberação massiva de força material." },
  { start: 98, end: 101, text: "É o padrão clássico do destravamento financeiro," },
  { start: 101, end: 107, text: "como uma represa que rompe e deixa a prosperidade fluir para quem está na sintonia certa." },
  { start: 107, end: 113, text: "Mas isso só acontece se você entrar nesse período com a sua frequência calibrada." },
  { start: 113, end: 119, text: "Esse período de 30 dias tem três batidas exatas de sincronia." },
  { start: 119, end: 125, text: "Na primeira, algo se desloca e uma oportunidade aparece onde antes havia silêncio." },
  { start: 125, end: 131, text: "Na segunda, o seu guardião testa sua clareza através de uma escolha simples" },
  { start: 131, end: 135, text: "que define se você avança ou volta para a escassez." },
  { start: 135, end: 142, text: "Na terceira, o movimento se fixa e a abundância deixa de ser uma promessa para se tornar a sua nova realidade." },
  { start: 142, end: 150, text: "Se você ignorar esse sinal agora, precisará esperar o próximo ciclo de 15 anos para ter essa chance outra vez." },
  { start: 150, end: 154, text: "Eu aprendi a reconhecer isso da maneira mais dura." },
  { start: 154, end: 158, text: "Há 20 anos, eu vivia no chiado total." },
  { start: 158, end: 164, text: "Dívidas acumuladas, cansaço mental e a sensação de que nada dava certo." },
  { start: 164, end: 169, text: "Minhas decisões eram boas, mas o meu tempo estava errado." },
  { start: 169, end: 174, text: "Até que conheci Elias, um mentor que passou décadas no Tibete" },
  { start: 174, end: 179, text: "estudando como as frequências certas mudam o rumo de uma vida." },
  { start: 179, end: 182, text: "Ele olhou para o meu campo e disse" },
  { start: 182, end: 186, text: "Seu ciclo está abrindo, mas você está fora de sintonia." },
  { start: 186, end: 191, text: "Decidi dar um voto de fé e seguir o ajuste que ele me ensinou." },
  { start: 191, end: 198, text: "Em 48 horas, recebi uma ligação de um projeto que eu já tinha dado como perdido." },
  { start: 198, end: 205, text: "Em menos de um mês, minha renda mais que dobrou e o ciclo de escassez foi finalmente rompido." },
  { start: 205, end: 207, text: "E não aconteceu só comigo." },
  { start: 207, end: 213, text: "O Adriano, por exemplo, trabalhava muito e ganhava pouco, sentindo que sua vida financeira estava morta." },
  { start: 213, end: 223, text: "No décimo dia do ciclo de ativação, ele sintonizou a oportunidade certa e faturou R$ 12.800,00 em menos de um mês." },
  { start: 223, end: 230, text: "A Patrícia, que vivia com medo e renda irregular, seguiu as datas de ativação do seu anjo." },
  { start: 230, end: 236, text: "Em dois meses, ela fechou R$ 18.000,00 em pedidos e hoje vive no ritmo da abundância." },
  { start: 236, end: 243, text: "Pessoas comuns que pararam de lutar contra a corrente e simplesmente ajustaram a frequência." },
  { start: 243, end: 249, text: "Agora é a sua vez de parar de fazer contas mentais e começar a viver." },
  { start: 249, end: 256, text: "Imagine abrir seu extrato e sentir paz, cuidando da sua família com a tranquilidade que você sempre sonhou." },
  { start: 256, end: 260, text: "Mas saiba que ter uma fase favorável não garante o resultado." },
  { start: 260, end: 266, text: "É como saber que um trem vai passar, mas não conhecer a plataforma nem o horário correto." },
  { start: 266, end: 273, text: "Se você não souber o dia exato de agir, a janela se fecha e o trem parte sem você." },
  { start: 273, end: 280, text: "Em menos de uma semana, o comportamento do tempo vai mudar e sua janela energética vai se abrir." },
  { start: 280, end: 288, text: "Você precisa saber exatamente o que fazer e o que evitar para não travar o seu progresso outra vez." },
  { start: 288, end: 292, text: "Sem esse mapa de frequências, você continuará caminhando no escuro." },
  { start: 292, end: 293, text: "Não dá pra adiar." },
  { start: 293, end: 302, text: "Se você quer atravessar essa fase com as datas de ativação em mãos, toque no botão que aparece na sua tela agora." },
  { start: 302, end: 307, text: "O tempo de preparação é curto e cada hora conta para alinhar sua frequência." },
  { start: 307, end: 312, text: "Se você hesitar, entrará nesse ciclo completamente desalinhado." },
  { start: 312, end: 318, text: "E lembre-se, quando o portal fecha, ele só se abre daqui a 15 anos." },
  { start: 318, end: 320, text: "O sinal já começou a tocar." },
  { start: 320, end: 1000, text: "Clique no botão agora e permita que seu guardião te conduza pela frequência da vitória." },
];
