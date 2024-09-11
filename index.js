const { select, input, checkbox } = require('@inquirer/prompts')

let message = "Bem-vindo ao App de Metas!";

let goal = {
  value: 'Tomar 3L de água por dia',
  checked: false,
}

let goals = [ goal ]

const registerGoal = async () => {
  const goal = await input({ message: "Digite a meta:" })

  if(goal.length == 0) {
    message = 'A meta não pode ser vazia.'
    return
  }

  goals.push({
    value: goal,
    checked: false
  })

  message = "Meta cadastrada com sucesso!"
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
    message = "Nenhuma meta selecionada."
    return
  }

  answers.forEach((answer) => {
    const goal = goals.find((g) => {
      return g.value == answer
    })

    goal.checked = true
  })

  message = 'Meta(s) marcada(s) como concluída(s)'

}

const goalsDone = async () => {
  const done = goals.filter((goal) => {
    return goal.checked
  })

  if(done.length == 0) {
    message = 'Não existem metas realizadas! :('
    return
  }

  await select({
    message: "Metas Realizadas: " + done.length,
    choices: [...done]
  })
}

const goalsOpen = async () => {
  const open = goals.filter((goal) => {
    return !goal.checked
  })

  if(open.length == 0) {
    message = 'Não existem metas abertas! :)'
    return
  }

  await select({
    message: "Metas Abertas: " + open.length,
    choices: [...open]
  })
}

const deleteGoals = async () => {
  const uncheckedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  const goalsToDelete = await checkbox({
    message: "Selecione meta(s) para deletar",
    choices: [...uncheckedGoals],
    instructions: false
  })

  if(goalsToDelete.length == 0) {
    message = "Nenhuma meta para deletar."
    return
  }

  goalsToDelete.forEach((item) => {
    goals = goals.filter ((goal) => {
      return goal.value != item
    })
  })

  message = "Meta(s) deletada(s) com sucesso!"
}

const showMessage = () => {
  console.clear();

  if(message != "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const start = async () => {
  
  while(true) {
    showMessage()
    
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
          name: "Metas abertas",
          value: "abertas"
        },
        {
          name: "Deletar metas",
          value: "deletar"
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
        break
      case "listar":
        await listGoals()
        break
      case "realizadas":
        await goalsDone()
        break
      case "abertas":
        await goalsOpen()
        break
      case "deletar":
        await deleteGoals()
        break
      case "sair":
        console.log("Até a próxima!")
        return
    }
  }
}

start();