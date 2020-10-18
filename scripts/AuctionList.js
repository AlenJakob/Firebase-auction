const auctionDomList = document.querySelector('#auct_list');

const setupAuction = auctionList => {
    if (auctionList.length) {
        let html = '';
        auctionList.forEach(doc => {
            const auction = doc.data();
            console.log(doc.id);
            const li = `
            <li data-id="${doc.id}">
            <div class="mb0 row header teal lighten-3 white-text">
            
            <div class="right-align pr10 pt10 pb10 white btn-delete pink-text text-lighten-3">delete</div>
            <span class="col s6 "><h5>${auction.title}</h5></span>
            <span class="col s6 right-align"><h5>${auction.price}€</h5></span>
            </div>
            <div class="body">
            ${auction.description}
            </div>
            </li>
            `;

            html += li;
        });
        auctionDomList.innerHTML = html
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


export { setupAuction }