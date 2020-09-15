console.log('Client side js file.')

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchTerm.value
    messageOne.textContent = 'Rendering....';
    messageTwo.textContent = '';
       
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

        
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
               
            }else{
                messageOne.textContent = data.loc;
                messageTwo.textContent = data.forecast;
                
            }
            
        })
    
    })
})