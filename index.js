// document.addEventListener("DOMContentLoaded", init())
const API_URL_LOCAL = 'http://localhost:3000/tokens'

function getTokenStats() {

    fetch('http://localhost:3000/tokens')
    .then(resp => resp.json())
    .then(tokenArray => {
      renderStats(tokenArray[0])

      tokenArray.forEach((tokenObj) => {
        const imgSymbol = document.querySelector(`#${tokenObj.token}_img`);
        // addEventListener: click a token symbol to display it's stats below
        imgSymbol.addEventListener('click',() => renderStats(tokenObj));
        imgSymbol.addEventListener('mouseenter', (e) => { e.target.className = "tokenImgHighlight"; }) 
        imgSymbol.addEventListener('mouseleave', (e) => { e.target.className = "tokenImg"; }) 

        const likesButton = document.querySelector(`#${tokenObj.token}_likes`);
        likesButton.innerText = `♡ ${tokenObj.likes}`;
        // addEventListener: click a like button to show interest in a token
        likesButton.addEventListener('click',() => increaseLikes(tokenObj));
      })
    })
}

function renderStats(tokenObj) {
  const statsList = document.querySelector('#statsList')
  statsList.innerHTML = ''

  const tokenName = document.createElement('li')
  tokenName.innerHTML = `<u>Name:</u> ${tokenObj.name} (${tokenObj.token})`;
  tokenName.className = 'font1'
  statsList.appendChild(tokenName)

    fetch(`https://api.coingecko.com/api/v3/coins/${tokenObj.name_api}`)
    .then(resp => resp.json())
    .then(tokenArray => {

        const price = tokenArray.market_data.current_price.usd;
        const tokenPrice = document.createElement('li')
        tokenPrice.className = "font1"
        tokenPrice.id = `${tokenObj.name_api}Price`
        tokenPrice.innerHTML = `<u>Current Price:</u> <span class"=bold">$${price.toLocaleString('en-US')}</span>`;
        statsList.appendChild(tokenPrice)

        const priceChange24h = tokenArray.market_data.price_change_percentage_24h
        const tokenPriceChange24h = document.createElement('li')
        tokenPriceChange24h.className = "font1"
        tokenPriceChange24h.id = `${tokenObj.name_api}PriceChange`
        if (priceChange24h > 0) {
          tokenPriceChange24h.innerHTML = `<u>Price Change 24h:</u> <span class="fontGreen">%${priceChange24h}</span>`;
        } else { tokenPriceChange24h.innerHTML = `<u>Price Change 24h:</u> <span class="fontRed">%${priceChange24h}</span>`;
        }
        statsList.appendChild(tokenPriceChange24h)

        const marketCap = tokenArray.market_data.market_cap.usd
        const tokenMarketCap = document.createElement('li')
        tokenMarketCap.className = "font1"
        tokenMarketCap.id = `${tokenObj.name_api}MarketCap`
        tokenMarketCap.innerHTML = `<u>Market Cap:</u> $${marketCap.toLocaleString('en-US')}`;
        statsList.appendChild(tokenMarketCap)

        const marketCapRank = tokenArray.market_cap_rank
        const tokenMarketCapRank = document.createElement('li')
        tokenMarketCapRank.className = "font1"
        tokenMarketCapRank.id = `${tokenObj.name_api}MarketCapRank`
        tokenMarketCapRank.innerHTML = `<u>Market Cap Rank:</u> ${marketCapRank}`;
        statsList.appendChild(tokenMarketCapRank)

        const totalSupply = tokenArray.market_data.total_supply
        const tokenTotalSupply = document.createElement('li')
        tokenTotalSupply.className = "font1"
        tokenTotalSupply.id = `${tokenObj.name_api}TotalSupply`
        if(totalSupply !== null) {
          tokenTotalSupply.innerHTML = `<u>Total Supply:</u> $${totalSupply.toLocaleString('en-US')}`;
        } else { tokenTotalSupply.innerHTML = `<u>Total Supply:</u> N/A` }
        statsList.appendChild(tokenTotalSupply)

        const circulatingSupply = tokenArray.market_data.circulating_supply
        const tokenCirculatingSupply = document.createElement('li')
        tokenCirculatingSupply.className = "font1"
        tokenCirculatingSupply.id = `${tokenObj.name_api}CirculatingSupply`
        tokenCirculatingSupply.innerHTML = `<u>Circulating Supply:</u> ${circulatingSupply.toLocaleString('en-US')}`;
        statsList.appendChild(tokenCirculatingSupply)

        const descriptionCG = tokenArray.description.en
        const tokenDescription = document.createElement('li')
        tokenDescription.className = "font1"
        tokenDescription.id = `${tokenObj.name_api}Description`
//       tokenDescription.textContent = tokenArray.description.en;
        tokenDescription.innerHTML = `<u>Description:</u> ${descriptionCG}`;
        statsList.appendChild(tokenDescription)

        // const imgLarge = tokenArray.image.large
    });
}

// PATCH Request - Increase a token's Likes on the Server and the Page
function increaseLikes(tokenObj) {
    console.log(tokenObj.id)
    const newLikesCount = parseInt(tokenObj.likes) + 1;  
    const tokenID = parseInt(tokenObj.id)
    const API_URL_ID = `http://localhost:3000/tokens/${tokenID}`

    const patchObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" },
      body: JSON.stringify({
        "likes": newLikesCount
      })
    }
    
    fetch(API_URL_ID, patchObj)
    .then(resp => resp.json())
    .then(updatedLikes => { 
    console.log(`Updated like count = ${updatedLikes.likes}`)
    console.log(tokenObj.token)
    const likesButton = document.querySelector(`#${tokenObj.token}_likes`);
    likesButton.innerText = `♡ ${updatedLikes.likes}`
    })  
//      button.addEventListener('click',() => increaseLikes(tokenObj))  
}


// COMMENTS:
const commentForm = document.querySelector('#comment_form')

function addToList(e) {
    e.preventDefault();
    let input = e.target.comment.value
    console.log(input)
    if (input !== '') { 
        renderComment(input)
        commentForm.reset();
      }
    else { alert("Write a comment before submitting.")}
}

function renderComment(input){
    const commentLi = document.createElement('li')
    commentLi.textContent = `${input}    `;
    commentLi.className = "commentLi"
    console.log(commentLi)
    const commentsList = document.querySelector('#commentsList')
    commentsList.appendChild(commentLi)
    
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "x";
    deleteButton.className = "delB"
    commentLi.appendChild(deleteButton);
    deleteButton.addEventListener('click',(e) => e.target.parentNode.remove());

//    postComment(input);
}

// POST Request - Add a new comment to Server

// const tokenForm = document.querySelector('.add-token-form')

// function postComment(input) {
//   e.preventDefault();
//   const tokenName = document.querySelector('input[name="name"]').value

//   if(tokenName !== "" && tokenImg !== "") {
//     const tokenObj = {
//       name: tokenName,
//       image: tokenImg,
//       likes: 0,
//     }

//     const postObj = {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json" },
//     body: JSON.stringify(tokenObj)
//     }
    
//     fetch(API_URL_LOCAL, postObj)
//     .then(resp => resp.json())
//     .then(token => rendertoken(token))
//     tokenForm.reset();
//   } else {
//     alert("Fill in the form!")
//   }
// }

// Initialize functions below:
function init() {
  getTokenStats();
  commentForm.addEventListener('submit',addToList);
}
init();



// CHART
// function renderChart(name_api) {

//   import CanvasJS from 'canvasjs'

//     fetch(`https://api.coingecko.com/api/v3/coins/${name_api}/market_chart?vs_currency=usd&days=24&interval=daily`)
//     .then(resp => resp.json())    
//     .then(dataArray => {
//       const pDataPoints = dataArray.prices;    
      
//       pDataPoints.push({x: value[0], y: parseInt(value[1])});
//         }); 

//         const chart = new CanvasJS.Chart("chartContainer",{
//           title:{
//               text:`${api_name} 24h Chart`
//           },
//           data: [{
//               type: "line",
//               dataPoints : pDataPoints,
//           }]
//       });
//         chart.render();
//         const chartDiv = document.querySelector('#chartDiv')
//         chartDiv.appendChild(chart)
//         chart.className = "chart"
//     }