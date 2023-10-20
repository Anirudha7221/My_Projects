const apikey="AIzaSyBshw2KNLIMTEMLPJxvnrH_XL0m0vugw4c";
const baseurl="https://www.googleapis.com/youtube/v3";

async function fetchChannelInfo(channelId){
    let url=`${baseurl}/channels?key=${apikey}&part=snippet,statistics&id=${channelId}`;

    const responce= await fetch(url);
    const results= await responce.json();

    return results;
}

async function fetchVideo(videoId="VuG7ge_8I2Y"){
    let url=`${baseurl}/videos?key=${apikey}&part=snippet,contentDetails,statistics&id=${videoId}`;

    const responce= await fetch(url,{method:"GET"});
    const results= await responce.json();

    const channelDetails=await fetchChannelInfo(results.items[0].snippet.channelId);

    addDataOnDom(results,channelDetails);
    addDataOnUI(results);
}

function addDataOnDom(videoInfo,channelDetails){
    let containeer=document.getElementById("containeer");
    const video_details=document.createElement("div");
    video_details.id="videoDetails";

    video_details.innerHTML=`<div id="video">
                                <img src="${videoInfo.items[0].snippet.thumbnails.high.url}"
                            </div>
                            <p>${videoInfo.items[0].snippet.title}</p>
                            <div class="statistics">
                                <div class="left">
                                        <span>${videoInfo.items[0].statistics.viewCount} views</span>
                                        <span>${videoInfo.items[0].snippet.publishedAt}</span>
                                </div>
                                <div class="right">
                                    <div>
                                        <span class="material-symbols-outlined">
                                            thumb_up
                                        </span>${videoInfo.items[0].statistics.likeCount}
                                    </div>
                                    <div>
                                        <span class="material-symbols-outlined">
                                            thumb_down
                                        </span>
                                        <div><i class="fa-solid fa-share"></i>  Share</div>
                                        <div><i class="fa-regular fa-floppy-disk"></i>  Save</div>
                                    </div>
                                </div>
                            </div>
                            <div class="channel-containeer">
                                <div class="left">
                                    <img src="${channelDetails.items[0].snippet.thumbnails.high.url}">
                                    <div>
                                        <span>${channelDetails.items[0].snippet.title}</span>
                                        <span style="color: #aaa;">${channelDetails.items[0].statistics.subscriberCount} Subscribers</span>
                                    </div>
                                </div>
                                <button class="right">Subsribe</button>
                            </div>`;
        containeer.appendChild(video_details);

}

function addDataOnUI(videosList){
    videosList.forEach(video => {
       const {snippet}=video;
  
    let side_bar=document.getElementById("side-bar")
    let video_item=document.createElement("div");
    video_item.className="video-item"
           video_item.innerHTML=`<div class="thumbnil">
                                    <img src="${snippet.thumbnails.medium.url}">
                                 </div>
                                 <div class="video-info">
                                    <h4>${snippet.title}</h4>
                                    <span>${snippet.channelTitle}</span>
                                    <span>views</span>
                                 </div>`;
          side_bar.appendChild(video_item);
    });
  }

fetchVideo();