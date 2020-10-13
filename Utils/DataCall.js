
// Just simulating incremental loading, don't infer anything from here
export async function DataCall(pageNo) {
    const responseVideo = await fetch(
        // "https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed", 
        "http://192.168.1.6:5000/getVideos",
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: pageNo,
            })
        })


    const responseJsonVideos = await responseVideo.json();

    return responseJsonVideos;
}
