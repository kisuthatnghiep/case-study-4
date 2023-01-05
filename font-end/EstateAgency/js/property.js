function getAllHouse() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {
            let content = '';
            for (let i = 0; i < houses.length; i++) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('list-house').innerHTML = content;
        }
    });
}


function displayHouse(house) {
    return `  <div  class="col-md-12">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img src="img/property-1.jpg" alt="" class="img-a img-fluid">
            </div>
            <div class="card-overlay">
              <div class="card-overlay-a-content">
                <div class="card-header-a">
                  <h2 class="card-title-a">
                    <a href="#">${house.name}</a>
                  </h2>
                </div>
                <div class="card-body-a">
                  <div class="price-box d-flex">
                    <span class="price-a">rent | ${house.price}</span>
                  </div>
                  <a href="property-single.html" class="link-a">Click here to view
                    <span class="ion-ios-arrow-forward"></span>
                  </a>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li>
                      <h4 class="card-info-title">Description</h4>
                      <span>${house.description} </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`
}