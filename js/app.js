'use strict'

const main = document.querySelector('main')
const sair = document.querySelector('.Right-Exit')

const sectionCursos = document.getElementById('Cursos')
const sectionGalerias = document.getElementById('Galeria-Alunos')
const sectionAluno = document.getElementById('studant')

const containerDadosPerfil = document.querySelector('.Left-PerfilImageAndName')
const containerDadosDesempenho = document.querySelector('.Right-Desempenho')
const containerCursos = document.querySelector('.Right-ClassListAvailable')
const containerAlunos = document.getElementById('id-classe')




const pathImg = `./img`
const pathImgIcons = `/icons-class`

const URL_BASE = "https://lion-school-backend.onrender.com/"

async function exibirTodosCursos() {

    let URL_CURSOS = `${URL_BASE}cursos`

    try {
        let response = await fetch(URL_CURSOS)
        const cursos = await response.json()

        containerCursos.textContent = ""

        cursos.forEach(curso => {

            const card = document.createElement('div')
            card.classList.add('Card-Class')

            const titulo = document.createElement('h1')
            titulo.textContent = curso.sigla

            const img = document.createElement('img')

            if (curso.sigla.toUpperCase() == 'DS')
                img.src = pathImg + pathImgIcons + `/icon-ds.svg`
            else if (curso.sigla.toUpperCase() == 'REDES')
                img.src = pathImg + pathImgIcons + `/icon-redes.svg`
            else
                return

            card.append(img, titulo)
            containerCursos.appendChild(card)

            card.addEventListener('click', () => {
                sectionCursos.classList.remove('active');
                sectionGalerias.classList.add('active');
                exibirEstudantesPorCurso(curso.id, curso.nome)
            })

        });
        
    } catch (error) {
        console.log(error)
    }


    // RETORNO ESPERADO
    // [
    //     {
    //       "id": 1,
    //       "nome": "Desenvolvimento de Sistemas",
    //       "sigla": "DS"
    //     },
    //     {
    //       "id": 2,
    //       "nome": "Redes",
    //       "sigla": "REDES"
    //     }
    //   ]   

}
async function exibirEstudantesPorCurso(idCurso, nomeCurso) {
    let URL_ESTUDANTES_CURSO = `${URL_BASE}alunos?${idCurso}`

    try {
        const tituloCurso = document.getElementById('title')
        tituloCurso.textContent = ''
        tituloCurso.textContent = nomeCurso


        let response = await fetch(URL_ESTUDANTES_CURSO)
        const alunosCursos = await response.json()

        alunosCursos.forEach(estudantes => {

            const cardAluno = document.createElement('div')
            cardAluno.classList.add('Aluno')

            const nome = document.createElement('p')
            nome.textContent = estudantes.nome

            const img = document.createElement('img')
            img.src = estudantes.foto

            cardAluno.append(img, nome)


            containerAlunos.appendChild(cardAluno)

            cardAluno.addEventListener('click', () => {
                sectionGalerias.classList.remove('active');
                sectionAluno.classList.add('active');
                exibirDadosEstudante(estudantes.id, estudantes.nome, estudantes.foto)
            })

        })
    } catch (error) {
        console.log(error)

    }

    //RETORNO ESPERADO
    // [
    //  {
    //     "id": 1,
    //     "nome": "Mariana Silva Santos",
    //     "curso_id": 1,
    //     "foto": "https://i.pravatar.cc/300?img=25",
    //     "desempenho": [
    //         {
    //             "categoria": "SGP",
    //             "valor": 85
    //         },
    //         {
    //             "categoria": "IP",
    //             "valor": 92
    //         },
    //         {
    //             "categoria": "LING",
    //             "valor": 78
    //         },
    //         {
    //             "categoria": "BD",
    //             "valor": 88
    //         },
    //         {
    //             "categoria": "PPE",
    //             "valor": 95
    //         }
    //     ]
    // },
    // {
    //     "id": 2,
    //     "nome": "Lucas Ferreira Costa",
    //     "curso_id": 1,
    //     "foto": "https://i.pravatar.cc/300?img=2",
    //     "desempenho": [
    //         {
    //             "categoria": "SGP",
    //             "valor": 72
    //         },
    //         {
    //             "categoria": "IP",
    //             "valor": 85
    //         },
    //         {
    //             "categoria": "LING",
    //             "valor": 80
    //         },
    //         {
    //             "categoria": "BD",
    //             "valor": 90
    //         },
    //         {
    //             "categoria": "PPE",
    //             "valor": 88
    //         }
    //     ]
    // },
    // ]


}
async function exibirDadosEstudante(idAluno, nomePerfil, fotoPerfil) {
    let URL_DADOS_ESTUDANTES = ` ${URL_BASE}alunos/${idAluno}`
    try {
        let response = await fetch(URL_DADOS_ESTUDANTES)
        const dadosAluno = await response.json()

        const nome = document.createElement('p')
        nome.textContent = nomePerfil

        const img = document.createElement('img')
        img.src = fotoPerfil



        dadosAluno.desempenho.forEach(dadosDesempenho => {
            const cardNotas = document.createElement('div')
            cardNotas.classList.add('Notas')

            const grafico = document.createElement('div')
            grafico.classList.add('Grafico')

            const notaTirada = document.createElement('div')
            notaTirada.classList.add('Nota-tirada')

            const pontos = document.createElement('p')
            pontos.textContent = dadosDesempenho.valor

            const categoria = document.createElement('p')
            categoria.textContent = dadosDesempenho.categoria

            switch (true) {
                case (dadosDesempenho.valor > 90 && dadosDesempenho.valor <= 100):
                    notaTirada.style.backgroundColor = "#1B5E20"; // verde escuro
                    break;
            
                case (dadosDesempenho.valor > 80 && dadosDesempenho.valor <= 90):
                    notaTirada.style.backgroundColor = "#2E7D32"; // verde
                    break;
            
                case (dadosDesempenho.valor > 70 && dadosDesempenho.valor <= 80):
                    notaTirada.style.backgroundColor = "#66BB6A"; // verde claro
                    break;
            
                case (dadosDesempenho.valor > 60 && dadosDesempenho.valor <= 70):
                    notaTirada.style.backgroundColor = "#FDD835"; // amarelo
                    break;
            
                case (dadosDesempenho.valor > 50 && dadosDesempenho.valor <= 60):
                    notaTirada.style.backgroundColor = "#FFB300"; // amarelo escuro
                    break;
            
                case (dadosDesempenho.valor > 40 && dadosDesempenho.valor <= 50):
                    notaTirada.style.backgroundColor = "#FB8C00"; // laranja
                    break;
            
                case (dadosDesempenho.valor > 30 && dadosDesempenho.valor <= 40):
                    notaTirada.style.backgroundColor = "#F4511E"; // laranja escuro
                    break;
            
                case (dadosDesempenho.valor > 20 && dadosDesempenho.valor <= 30):
                    notaTirada.style.backgroundColor = "#E53935"; // vermelho claro
                    break;
            
                case (dadosDesempenho.valor > 10 && dadosDesempenho.valor <= 20):
                    notaTirada.style.backgroundColor = "#C62828"; // vermelho
                    break;
            
                default:
                    notaTirada.style.backgroundColor = "#B71C1C"; // vermelho escuro (0–10)
            }

            notaTirada.style.height = `${dadosDesempenho.valor}%`

            grafico.appendChild(notaTirada)
            cardNotas.append(pontos, grafico, categoria)

            containerDadosDesempenho.appendChild(cardNotas)

        });

        containerDadosPerfil.append(img, nome)

    } catch (error) {
        console.log(error)
    }
    // RETORNO ESPERADO
    // {
    //     "id": 1,
    //     "nome": "Mariana Silva Santos",
    //     "curso_id": 1,
    //     "foto": "https://i.pravatar.cc/300?img=25",
    //     "desempenho": [
    //       {
    //         "categoria": "SGP",
    //         "valor": 85
    //       },
    //       {
    //         "categoria": "IP",
    //         "valor": 92
    //       },
    //       {
    //         "categoria": "LING",
    //         "valor": 78
    //       },
    //       {
    //         "categoria": "BD",
    //         "valor": 88
    //       },
    //       {
    //         "categoria": "PPE",
    //         "valor": 95
    //       }
    //     ]
    //   }

}
sair.addEventListener('click', () => {

    // Volta para tela inicial
    sectionAluno.classList.remove('active')
    sectionGalerias.classList.remove('active')
    sectionCursos.classList.add('active')

    // Limpa todos os containers
    containerAlunos.textContent = ""
    containerDadosDesempenho.textContent = ""
    containerDadosPerfil.textContent = ""

    exibirTodosCursos()
})

exibirTodosCursos()
