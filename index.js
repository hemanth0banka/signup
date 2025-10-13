document.querySelector('form').addEventListener('submit',async (event)=>{
    try
    {
        event.preventDefault()
        let r = await axios.post('http://localhost:1000/',{
            name : event.target.name.value,
            email : event.target.email.value,
            password : event.target.password.value
        })
        if(r.status==201)
        {
            window.location.href = 'http://localhost:1000/'
        }else
        {
            throw new Error('failed to sign up')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})