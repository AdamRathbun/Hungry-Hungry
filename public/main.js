//for CRUD

const deleting = document.querySelectorAll('.fa-trash')

Array.from(deleting).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemName': sName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


// for API

//for searching based on what's in my fridge:

document.querySelector('.recipe-button').addEventListener('click', turner)

function turner(){
    let fridgeCount=document.querySelector('.items').innerText.replace(/\n/g, "").split(' ')
    fridgeCount.pop()
    console.log(fridgeCount)
    let myItem=''
    for (let i=0; i<fridgeCount.length; i++){
        if (fridgeCount[i]==='chicken' || fridgeCount[i]==='lamb' || fridgeCount[i]==='pork' || fridgeCount[i]==='chicken_breast' || fridgeCount[i]==='salmon' || fridgeCount[i]==='tofu' || fridgeCount[i]==='eggs'|| fridgeCount[i]==='beef' || fridgeCount[i]==='milk' || fridgeCount[i]==='cabbage' || fridgeCount[i]==='tuna' || fridgeCount[i]==='tomato' || fridgeCount[i]==='rice'){
            console.log(fridgeCount[i])
            myItem=fridgeCount[i]
            return getFetch()
        }
    }

    function getFetch(){
        const choice = myItem
        console.log(choice)
        const url = `https://themealdb.com/api/json/v1/1/filter.php?i=${choice}`
        let num=Math.ceil(Math.random()*3)
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
              document.querySelector('.dishName').innerText=data.meals[num].strMeal
              document.querySelector('.dishImg').src=data.meals[num].strMealThumb
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
      }
    
}

// function getFetch(x){
//   const choice = x
//   console.log(choice)
//   const url = `https://themealdb.com/api/json/v1/1/filter.php?i=${choice}`
//   let num=Math.ceil(Math.random()*3)
//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('.dishName').innerText=data.meals[num].strMeal
//         document.querySelector('.dishImg').src=data.meals[num].strMealThumb
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

//For random dish based on searching main ingredient
document.querySelector('.recipe-button2').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('.main-ingredient').value
  let num=Math.ceil(Math.random()*6)
  const url = `https://themealdb.com/api/json/v1/1/filter.php?i=${choice}`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('.dishName').innerText=data.meals[num].strMeal
        document.querySelector('.dishImg').src=data.meals[num].strMealThumb
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// for dish based on what you have in your fridge:
// document.querySelector('.recipe-button').addEventListener('click', ()=>{
//     turner();
//     checker();
// })

// function checker(){
//     if (document.querySelector('.dishName').innerText==='Bubble & Squeak' || document.querySelector('.dishName').innerText==='BeaverTails'){
//         document.querySelector('.dishName').innerText=''
//         document.querySelector('.dishImg').src=''
//     }
//     console.log('add a good main ingredient')
// }


