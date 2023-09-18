const containeer=document.getElementById("containeer");

 async function fetchCards(){
    let url="https://gauravgitacc.github.io/postAppData/auctionData.json";

    const responce=await fetch(url);
    const data=await responce.json();
    appendData(data);
 }

 function appendData(cardList){
    cardList.forEach((card) => {
        let div=document.createElement("div");
        div.className="card";

        div.innerHTML=`<div class="top">
                            <div class="left">
                                <span class="badge ${card.status.toLowerCase()}">${card.status}</span>
                                <Span class="case-no">${card.caseNumber}</Span>
                            </div>
                            <div class="right">
                                ${card.date}
                            </div>
                        </div>
                        <div class="bottom">
                            <b>${card.fromLocation}</b>
                            <span>${card.toLocation}</span>
                            <span class="price>${card.fare}</span>
                        </div>`;
        containeer.appendChild(div);
    });
 }

 fetchCards();