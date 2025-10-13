function fobj(obj)
{
    let ele = document.createElement('li')
    let txt = document.createTextNode(`${obj.amount} - ${obj.description} - ${obj.category}`)
    let but1 = document.createElement('button')
    but1.innerHTML = `Edit`;
    but1.addEventListener('click',async ()=>{})
    let but2 = document.createElement('button')
    but2.innerHTML = `Delete`
    but2.addEventListener('click',async ()=>{
        try
        {
            await axios.delete('/task',{data : {id : obj.id}})
            document.querySelector('ul').removeChild(ele)
        }
        catch(e)
        {
            console.log(e)
        }
    })
    ele.appendChild(txt)
    ele.appendChild(but1)
    ele.appendChild(but2)
    document.querySelector('ul').appendChild(ele)
}
function f(arr)
{
    for(let x of arr)
    {
        fobj(x)
    }
}
window.addEventListener('load',async (event)=>{
    event.preventDefault()
    try
    {
        let data = await axios.get("/task")
        f(data.data)
    }
    catch(e)
    {
        console.log(e)
    }
})
document.querySelector("form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    try
    {
        let data = await axios.post('/task',{
            amount : e.target.n1.value,
            description : e.target.n2.value,
            category : e.target.n3.value
        })
        fobj(data.data)
    }
    catch(e)
    {
        console.log(e)
    }
})