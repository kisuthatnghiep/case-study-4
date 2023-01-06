let container = document.getElementById('container')

toggle = () => {
    container.classList.toggle('sign-in')
    container.classList.toggle('sign-up')
}

function login() {
    let username = $("#username").val()
    let password = $("#password").val()
    let user = {
        username: username,
        password: password
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            if (data.id != null) {
                window.localStorage.setItem("user", JSON.stringify(data));
                window.location.href = "index.html"
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Log In Failed',
            })
        }
    })
    event.preventDefault();


}

function getUser() {
    user = JSON.parse(window.localStorage.getItem("user"));
    document.getElementById("UserDropdown").innerHTML = "<span>" + user.name + "</span>";
    $(".user_name").text(user.name);
    $("#user_phone").text(user.phone);
    $("#user_email").text(user.email);
    let srcImg = user.img;
    document.getElementById("personal_avatar").innerHTML =
        '<img style="width: 540px;height: 604px" src="' + srcImg + '" alt="" className="agent-avatar img-fluid">'
}
let house
function getHouse() {
    house = JSON.parse(window.localStorage.getItem("house"));
    $("#title-price").text(house.price);
    $("#title-name").text(house.name);
    $("#title-name2").text(house.name);
    $("#title-address").text(house.address);
    $("#title-address2").text(house.address);
    $("#title-agent").text(house.host.name);
    $("#title-id").text(house.id);
    $("#title-description").text(house.description);
    $("#title-phone").text(house.host.phone);
    $("#title-email").text(house.host.email);


}

function signUp() {
    let name = $("#name_signup").val()
    let username = $("#username_signup").val()
    let role = $("#role_signup").val()
    let email = $("#email_signup").val()
    let password = $("#password_signup").val()
    let newUser = {
        name: name,
        username: username,
        role: {
            id: role
        },
        email: email,
        password: password
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/signUp",
        data: JSON.stringify(newUser),
        dataType: "text",
        success: function (data) {
            Swal.fire(data, '', 'success')
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'registration Failed',
            })
        }
    })
    event.preventDefault();
}

let user = "";

function changePassword() {
    let newPassword = $("#newPass").val()
    let oldPassword = $("#oldPass").val()
    let autPassword = $("#passConfirm").val()
    let newUser = {
        id: user.id,
        oldPassword: oldPassword,
        newPassword: newPassword,
        autPassword: autPassword
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/changePw",
        data: JSON.stringify(newUser),
        dataType: "text",
        success: function (data) {
            $('#exampleModal').modal('hide');
            Swal.fire(data, '', 'success')
        },
        error: function () {
            $('#exampleModal').modal('hide');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Change password Failed',
            })
        }
    })
    event.preventDefault();
}

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
    getUser();
}

function getPersonalHouse() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {
            let content = '';
            for (let i = 0; i < houses.length; i++) {
                if (houses[i].host.id === user.id){
                content += displayPersonalHouse(houses[i]);
                }
            }
            document.getElementById('list-house').innerHTML = content;
        }
    });
    getUser();
}
function displayPersonalHouse(house) {
    return `  <div  class="col-lg-12">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img width="360px" height="480px" src="${house.avatar}" alt="" class="col-lg-14">
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
                  <button onclick="houseDetail(${house.id})" style="background: none;outline: none;border: none" class="link-a">Click here to view
                    <span class="ion-ios-arrow-forward"></span>
                  </button>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li>
                      <h4 class="card-info-title">Description</h4>
                      <span>${house.description} </span>
                    </li>
                    <li>
                                            <button id="btn-delete-house"
                                                    style="background: none;outline: none;border: none"><i
                                                    class='fas fa-trash' style='font-size:16px'></i></button>
                                        </li>
                                        <li>
                                            <button id="btn-edit-house"
                                                    style="background: none;outline: none;border: none"><i
                                                    class='fas fa-pen-alt' style='font-size:16px'></i></button>
                                        </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>`
}

function displayHouse(house) {
    return `  <div  class="col-md-12">
          <div class="card-box-a card-shadow">
            <div class="img-box-a">
              <img width="360px" height="480px" src="${house.avatar}" alt="" class="col-lg-14">
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
                  <button onclick="houseDetail(${house.id})" style="background: none;outline: none;border: none" class="link-a">Click here to view
                    <span class="ion-ios-arrow-forward"></span>
                  </button>
                </div>
                <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">
                    <li style="margin-right: 220px">
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

function updateUser() {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let newUser = {
        id: user.id,
        name: name,
        username: user.username,
        password: user.password,
        phone: phone,
        email: email,
        role: user.role,
        img: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar')[0].files[0])
    formData.append("user", new Blob([JSON.stringify(newUser)]
        , {type: 'application/json'}))
    $.ajax({
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
            processData: false,
            contentType: false,
            enctype: "multipart/form-data",
            type: "PUT",
            url: "http://localhost:8080/update_user",
            data: formData,
            success: function (data) {
                $("#name").val("");
                $("#phone").val("");
                $("#email").val("");
                $("#avatar").val("");
                window.localStorage.setItem("user", JSON.stringify(data));
                getUser();
                $('#ModalEdit').modal('hide');
                Swal.fire('Changed!', '', 'success')
            }
        }
    )
    event.preventDefault();
}

function houseDetail(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/"+ id,
        success: function (house) {
            window.localStorage.setItem("house", JSON.stringify(house));
            window.location.href = "property-single.html"

        }
    });
}

function getDataInUpdateForm() {
    let id = user.id
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/" + id,
        success: function (data) {
            $("#name").val(data.name);
            $("#phone").val(data.phone);
            $("#email").val(data.email);
        }
    });
}

function createHouse() {
    let name = $("#nameHouse").val();
    let address = $("#addressHouse").val();
    let description = $("#descriptionHouse").val();
    let price = $("#priceHouse").val();
    let newHome = {
        name: name,
        address: address,
        description: description,
        price: price,
        host: user,
        img: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar-House')[0].files[0])
    formData.append("house", new Blob([JSON.stringify(newHome)]
        , {type: 'application/json'}))
    $.ajax({
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        },
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
        type: "POST",
        url: "http://localhost:8080/api/houses",
        data: formData,
        success: function (data) {
            $("#nameHouse").val("")
            $("#addressHouse").val("")
            $("#descriptionHouse").val("")
            $("#priceHouse").val("")
            $("#avatar-House").val("")
            getPersonalHouse()
            $('#modalAddHouseTitle').modal('hide');
            Swal.fire('Successfully!', '', 'success')
        }
    })
    event.preventDefault();
}