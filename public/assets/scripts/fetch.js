// let requestOne, requestTwo, requestThree

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3f5161eb14mshb074e1c9f90f2e3p1ebd68jsn4e1fc9a2602b',
// 		'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
// 	}
// }

// const fetchData = async () => {
//     const response = await fetch('./assets/json/initial_request.json')
//     //await fetch('https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20/', options)
    
//     const data = await response.json()
    
//     requestOne = data

    
// }

// const fetchSeasons = async (id) => {
// 	const response = await fetch('./assets/json/get_seasons.json')
// 	// await fetch('https://netflix54.p.rapidapi.com/season/episodes/?ids=80077209%2C80117715&offset=0&limit=25', options)

// 	const data = await response.json()

// 	requestTwo = data
// }

// const fetchEpisodes = async (id) => {
// 	const response = await fetch('./assets/json/season_ids.json')
// 	//await fetch('')
// 	const data = await response.json()

// 	requestThree = data
// }

// // fetchData()
// // fetchSeasons()
// // fetchEpisodes()

// // export default requestOne;