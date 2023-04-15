REQUEST 1:

GET TITLE:
requestOne.titles[0].jawSummary.title

GET BG IMAGE:
requestOne.titles[0].jawSummary.backgroundImage.url

GET LOGO IMAGE:
requestOne.titles[0].jawSummary.logoImage.url

GET ID:
requestOne.titles[0].summary.id

GET SYNOPSIS:
requestOne.titles[0].jawSummary.synopsis

GET NUM SEASONS:
requestOne.titles[0].jawSummary.seasonCount

--------------------------------------------------
REQUEST 2:

GET SEASON IDS:
`https://netflix54.p.rapidapi.com/title/seasons/?ids=${TITLE_ID}&offset=0&limit=25`
**To pass: requestOne.titles[0].summary.id
**To return: requestTwo[0].seasons[0].seasonId

--------------------------------------------------
REQUEST 3:

GET EPISODES:
`https://netflix54.p.rapidapi.com/season/episodes/?ids=${S1_ID}%2C${S2_ID}&offset=0&limit=25`
**To pass: requestTwo[0].seasons[0].seasonId
**To return: requestThree[0]

GET EPISODE PICTURE:
requestThree[0].episodes[0].interestingMoment._342x192.webp.value.url

GET EPISODE TITLE:
requestThree[0].episodes[0].title

GET EPISODE SYNOPSIS:
requestThree[0].episodes[0].contextualSynopsis.text