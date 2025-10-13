document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        let r = await axios.post('/login',{
            name : event.target.name.value,
            password : event.target.password.value
        })
        console.log(r)
        if(r.status==200)
        {
            window.location.href = "http://localhost:1000/app/"
        }
        else
        {
            alert(r)
        }
    }
    catch(e)
    {
        console.log(e)
    }
})