const auctionDomList = document.querySelector('#auct_list');

const setupAuction = auctionList => {
    if (auctionList.length) {
        let html = '';
        auctionList.forEach(doc => {
            const auction = doc.data();
            console.log(doc.id);
            const li = `
            <li>
            <div class="mb0 row header teal lighten-3 white-text">
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

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


 // <img class="materialboxed " width="450" src="${auction.images[1]}">