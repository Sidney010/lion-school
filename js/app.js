'use strict'

const main = document.querySelector('main')

const sectionCursos = document.getElementById('Cursos')
const sectionGalerias = document.getElementById('Galeria-Alunos')
const sectionAluno = document.getElementById('studant')

const containerCursos = document.querySelector('.Right-ClassListAvailable')
const containerAlunos = document.getElementById('id-classe')


const pathImg = `./img`
const pathImgIcons = `/icons-class`

const URL_BASE = "https://lion-school-phbo.onrender.com/"

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

            card.appendChild(img)
            card.appendChild(titulo)

            containerCursos.appendChild(card)

            card.addEventListener('click', () => { 
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
    let URL_ESTUDANTES_CURSO = ` ${URL_BASE}/alunos?${idCurso}`

    const tituloCurso = document.getElementById('title') 
    tituloCurso.textContent = ''
    tituloCurso.textContent = nomeCurso

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
async function exibirDadosEstudante(idAluno) {
    let URL_DADS_ESTUDANTES = ` ${URL_BASE}/alunos/${idAluno}`
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

exibirTodosCursos()
