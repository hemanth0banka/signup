document.querySelector('form').addEventListener('submit',async (event)=>{
    
    try
    {
        event.preventDefault()
        await axios.post('/register',{
            name : event.target.name.value,
            password : event.target.password.value
        })
        console.log("hii")
        window.location.href = "http://localhost:1000/login.html"
    }
    catch(e)
    {
        console.log(e)
    }
})