import { db } from "./firebase";
import { date, time } from "./dateAndTime"
const auctionDomList = document.querySelector('#auction_list');

const setupAuction = auctionList => {
  console.log(date, time);

  auctionDomList.innerHTML = ``;
  if (auctionList.length) {
    document.querySelector(".welcome-msg").innerHTML = `<div class=""><h3>Welcome To Auction Service</h3></div>`;
    auctionList.forEach(doc => {

      const auction = doc.data();
      const html = `
              <div class="card">
              <h6>${doc.id}</h6>
                <div class="card-action right">
                  <div class="collection-item btn_edit material-icons">edit</div>
                  <div data-id="${doc.id}" class="collection-item btn_del material-icons">close</div>
                </div>
                    <div class="pt20 pl20">
                  <span class="card-title"><b>${auction.title}</b></span>
                  </div>
                <div class="card-content">
                  <p>${auction.description}</p>
                    </div>


                   <ul class="card-action collection with-header">
        <li class="collection-header"><h6>Auction specification :</h6></li>
        <li class="collection-item">Offered By : <b>${auction.itemState === false ? "Private" : "Company"}</b></li>
        <li class="collection-item">Item : <b>${auction.offerType === false ? "Used" : "New"}</b></li>
        
                  </ul>
             
             <blockquote><b>Date : </b>${auction.currDate} </blockquote>
             <blockquote><b>Time : </b>${auction.currTime}</blockquote>
              </div>
          
            `;

      auctionDomList.innerHTML += html;
      const btns = document.querySelectorAll(".btn_del");
      for (const btn of btns) {
        btn.addEventListener('click', function (event) {
          const id = event.target.getAttribute("data-id");
          console.log(id);
          db.collection("auctions").doc(id).delete();
          auctionDomList.innerHTML = "";
        })
      }

    });
  }
  else if (auctionList) {
    auctionDomList.innerHTML = `
        <h3> You have Sign In to view auction's or There is no auction available right now</h3>
        `;
  }

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  let modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  let items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


export { setupAuction, auctionDomList }

