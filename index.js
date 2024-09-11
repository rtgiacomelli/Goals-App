const { select, input, checkbox } = require('@inquirer/prompts')

let goal = {
  value: 'Tomar 3L de água por dia',
  checked: false,
}

let goals = [ goal ]

const registerGoal = async () => {
  const goal = await input({ message: "Digite a meta:" })

  if(goal.length == 0) {
    console.log('A meta não pode ser vazia.')
    return
  }

  goals.push({
    value: goal,
    checked: false
  })
}

const listGoals = async () => {
  const answers = await checkbox({
    message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...goals],
    instructions: false
  })

  goals.forEach((g) => {
    g.checked = false
  })

  if(answers.length == 0) {
    console.log("Nenhuma meta selecionada.")
    return
  }

  answers.forEach((answer) => {
    const goal = goals.find((g) => {
      return g.value == answer
    })

    goal.checked = true
  })

  console.log('Meta(s) marcada(s) como concluída(s)')

}

const goalsDone = async () => {
  const done = goals.filter((goal) => {
    return goal.checked
  })

  if(done.length == 0) {
    console.log('Não existem metas realizadas! :(')
    return
  }

  await select({
    message: "Metas realizadas",
    choices: [...done]
  })
}

const start = async () => {
  
  while(true) {
    
    const option = await select ({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Metas realizadas",
          value: "realizadas"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch(option) {
      case "cadastrar":
        await registerGoal()
        console.log(goals)
        break
      case "listar":
        await listGoals()
        break
      case "realizadas":
        await goalsDone()
        break
      case "sair":
        console.log("Até a próxima!")
        return
    }
  }
}

start();