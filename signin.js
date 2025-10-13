document.querySelector('form').addEventListener('submit',async (event)=>{
    try
    {
        event.preventDefault()
        console.log('hiiiiiiiiiii')
        a = await axios.post('http://localhost:1000/login',{
            name : event.target.name.value,
            password : event.target.password.value
        })
        if(a.data == '')
        {
            alert('user not found')
        }
        else
        {
            if(a.data.password == event.target.password.value)
            {
                alert('login success')
            }
            else
            {
                alert('Entered wrong password')
            }
        }
    }
    catch(e)
    {
        console.log(e)
    }
})