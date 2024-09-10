const { select, input } = require('@inquirer/prompts')

let goal = {
  value: 'Tomar 3L de água por dia',
  checked: false,
}

let goals = [ goal, ]

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
        console.log("vamos listar")
        break
      case "sair":
        console.log("Até a próxima!")
        return
    }
  }
}

start();