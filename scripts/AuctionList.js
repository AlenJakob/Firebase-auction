import { db } from "./firebase";

const auctionDomList = document.querySelector('#auction_list');

const setupAuction = auctionList => {
    if (auctionList.length) {
        auctionList.forEach(doc => {
            const auction = doc.data();

            const html = `
            <div class="row" >
            <div class="col s12 m7">
              <div class="card">
                <div class="pt20 pl20">
                  <span class="card-title"><b>${auction.title}</b></span>
                </div>
                <div class="card-content">
                  <p>${auction.description}</p>
                </div>
                <div class="card-action collection">
                  <div class="collection-item">Offered By : <b>${auction.itemState === false ? "Private" : "Company"}</b></div>
                  <div class="collection-item">Item : <b>${auction.offerType === false ? "Used" : "New"}</b></div>
                </div>
              </div>
              <div class="btn_edit material-icons">edit</div>
              <div data-id="${doc.id}" class="btn_del material-icons">close</div>
            </div>
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
    } else {
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