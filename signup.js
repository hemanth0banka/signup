document.querySelector('form').addEventListener('submit',async (event)=>{
    try
    {
        event.preventDefault()
        let a = await axios.post('/create',{
            name : event.target.name.value,
            password : event.target.password.value
        })
        console.log(a)
        window.location.href = 'http://localhost:1000/index.html'
    }
    catch(e)
    {
        document.write(e)
        console.log(e)
    }
})