import { db } from "./firebase";

const auctionDomList = document.querySelector('#auction_list');

const setupAuction = auctionList => {
    if (auctionList.length) {
        auctionList.forEach(doc => {
            const auction = doc.data();
            console.log(doc.id);

            const li = document.createElement("li");
            li.setAttribute("data-id", doc.id)
            const divTitleAndPrice = document.createElement("div");
            divTitleAndPrice.classList = "mb0 row header teal lighten-3 white-text ";

            const divDescription = document.createElement("div")
            const title = document.createElement("span");
            const price = document.createElement("span");

            divDescription.classList = "body card-panel";
            divDescription.textContent = auction.description;

            price.classList = "col s6 right-align";
            price.innerHTML = `<h5>${auction.price}</h5>`


            title.classList = "col s6";
            title.innerHTML = `<h5>${auction.title}</h5>`


            let deleteBtn = document.createElement("div");
            deleteBtn.textContent = "delete"
            deleteBtn.classList = "right-align pr10 pt10 pb10 white btn-delete pink-text text-lighten-3";


            li.appendChild(deleteBtn)
            li.appendChild(divTitleAndPrice)
            divTitleAndPrice.appendChild(title)
            divTitleAndPrice.appendChild(price)
            li.appendChild(divDescription)


            auctionDomList.appendChild(li);


            deleteBtn.addEventListener("click", (ev) => {
                ev.stopPropagation()
                let id = ev.target.parentElement.getAttribute("data-id");
                console.log(id);
                db.collection("auctions").doc(id).delete();
                auctionDomList.innerHTML = ''
            })
        });
    } else {
        auctionDomList.innerHTML = `
        <h3> You have Sign In to view auction's</h3>
        `
    }

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


export { setupAuction , auctionDomList }