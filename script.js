let currentStep = 0;
const content = document.querySelectorAll('.content')
const returnBtn = document.querySelector('.return-btn')
const formsSteps = document.querySelectorAll('.form__step');
const formWrapper = document.querySelectorAll('.form-content')
const form = document.querySelectorAll('form')

formWrapper.forEach(item => {

  item.addEventListener('click', (e)=>{
    if(!e.target.matches('[data-action]')){
      return
    }
  
    const actions = {
      next(){
        isInputValid()&&
        currentStep++
      },
      prev(){
        currentStep--
      },
    }
  
    const action = e.target.dataset.action

    actions[action]()
  
    updateActiveStep()
    updateProgressStep()
  })

  item.addEventListener('submit', (e)=>{
    e.preventDefault()

    content.forEach(item =>{
      item.classList.toggle('hide')
    })

    returnBtn.addEventListener('click', ()=>{
      location.reload()
    })
    // form.forEach((item) => {
    //   const data = new FormData(item)

    //   for(let [name, id] of data){
    //     console.log(name, id)
    //   }
      
    // })

    
  })
});

const updateActiveStep = () =>{
formsSteps.forEach(step =>{
  step.classList.remove('active')
  if(currentStep < 2){
    step.classList.remove('done')
  }
})

formsSteps[currentStep].classList.add('active')
if(currentStep  > 0){
formsSteps[currentStep-1].classList.add('done')
}
}

const updateProgressStep = () =>{
  formWrapper.forEach(item =>{
    item.classList.remove('show')
  })
  
  formWrapper[currentStep].classList.add('show')

}

const isInputValid = () =>{
  const currentFormStep = formWrapper[currentStep]
  const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

  return formFields.every(input => input.reportValidity())
}
