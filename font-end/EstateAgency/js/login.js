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
    if (user.role.id === 1) {
        $(".setProfile").attr("href", "agent-single.html")
    } else {
        $(".setProfile").attr("href", "guest-single.html")
    }
    let srcImg = user.img;
    if (document.getElementById("personal_avatar") !== null) {
        document.getElementById("personal_avatar").innerHTML = '<img style="width: 540px;height: 604px" src="' + srcImg + '" alt="" className="agent-avatar img-fluid">'
    }
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
    document.getElementById("img-agent").src = house.host.img
    getImgPersonalHouse()
    getListGuestRent()
    getUser()
    if (user.id !== house.host.id) {
        $(".identify").hide();
    } else {
        $(".identify").show();
    }
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
            list = document.getElementsByClassName('house_pagination');
            loadItem();
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
                if (houses[i].host.id === user.id) {
                    content += displayPersonalHouse(houses[i]);
                }
            }
            document.getElementById('list-house').innerHTML = content;
            list = document.getElementsByClassName('house_pagination');
            loadItem();
        }
    });
    getUser();
}


function getHouseHome() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses",
        success: function (houses) {

            $('.bg-image1').css('background-image', 'url(' + houses[0].avatar + ')');
            $('.bg-image2').css('background-image', 'url(' + houses[1].avatar + ')');
            $('.bg-image3').css('background-image', 'url(' + houses[2].avatar + ')');
            $('.address1 ').text(houses[0].address);
            $('.address2 ').text(houses[1].address);
            $('.address3 ').text(houses[2].address);
            $('.id1 ').text(houses[0].id);
            $('.id2 ').text(houses[1].id);
            $('.id3 ').text(houses[2].id);
            $('.price1 ').text(houses[0].price);
            $('.price2 ').text(houses[1].price);
            $('.price3 ').text(houses[2].price);
            $('.name-house1 ').text(houses[0].name);
            $('.name-house2 ').text(houses[1].name);
            $('.name-house3 ').text(houses[2].name);
            getTop3();
            let content = '';
            for (let i = houses.length - 1; i >= 0; i--) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('list-house').innerHTML = content;
            list = document.getElementsByClassName('house_pagination');
            loadItem();
        }
    });
    getUser();
}

function getTop3() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/rent/top3",
        success: function (houses) {
            let content = '';
            for (let i = 0; i < houses.length; i++) {
                content += displayHouse(houses[i]);
            }
            document.getElementById('top3').innerHTML = content;
        }
    });
}


function displayPersonalHouse(house) {
    return `  <div  class="col-lg-12 house_pagination">
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
                                                    style="background: none;outline: none;border: none" onclick="deleteHouse(${house.id})"><i
                                                    class='fas fa-trash' style='font-size:16px'></i></button>
                                        </li>
                                        <li>
                                            <button id="btn-edit-house" data-bs-toggle="modal" data-bs-target="#modalUpdateHouse" data-bs-whatever="@mdo"
                                                    onclick="passIdUpdate(${house.id})" style="background: none;outline: none;border: none"><i
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
    return `  <div  class="col-md-12 house_pagination">
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

function houseDetail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/" + id,
        success: function (house) {
            window.localStorage.setItem("house", JSON.stringify(house));
            if (user.role.id === 1) {
                window.location.href = "property-single.html"
            } else {
                window.location.href = "property-guest.html"
            }

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
        avatar: ""
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
        success: function () {
            $("#nameHouse").val("")
            $("#addressHouse").val("")
            $("#descriptionHouse").val("")
            $("#priceHouse").val("")
            $("#avatar-House").val("")
            getPersonalHouse()
            $('#modalAddHouse').modal('hide');
            Swal.fire('Successfully!', '', 'success')
        }
    })
    event.preventDefault();
}

function deleteHouse(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/api/houses/" + id,
                success: function () {
                    getPersonalHouse()
                }
            })
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

        }
    })
}

function updateHouse(id) {
    let name = $("#nameUpdateHouse").val();
    let address = $("#addressUpdateHouse").val();
    let description = $("#descriptionUpdateHouse").val();
    let price = $("#priceUpdateHouse").val();
    let newHome = {
        id: id,
        name: name,
        address: address,
        description: description,
        price: price,
        host: user,
        avatar: ""
    }
    let formData = new FormData();
    formData.append("file", $('#avatar-UpdateHouse')[0].files[0])
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
        type: "PUT",
        url: "http://localhost:8080/api/houses/" + id,
        data: formData,
        success: function () {
            $("#nameUpdateHouse").val("")
            $("#addressUpdateHouse").val("")
            $("#descriptionUpdateHouse").val("")
            $("#priceUpdateHouse").val("")
            $("#avatar-UpdateHouse").val("")
            getPersonalHouse()
            $('#modalUpdateHouse').modal('hide');
            Swal.fire('Successfully!', '', 'success')
        }
    })
    event.preventDefault();
}

let idUpdate = "";

function passIdUpdate(id) {
    idUpdate = id;
    getDataUpdateHouseForm()
}

function getDataUpdateHouseForm() {
    let id = idUpdate
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/" + id,
        success: function (data) {
            $("#nameUpdateHouse").val(data.name)
            $("#addressUpdateHouse").val(data.address)
            $("#descriptionUpdateHouse").val(data.description)
            $("#priceUpdateHouse").val(data.price)
        }
    });
}

function createImgHouse() {
    let newImg = {
        house: house,
        img: ""
    }
    let formData = new FormData();
    formData.append("file", $('#inputGroupFile01')[0].files[0])
    formData.append("img", new Blob([JSON.stringify(newImg)]
        , {type: 'application/json'}))
    $.ajax({
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
        type: "POST",
        url: "http://localhost:8080/img/house/",
        data: formData,
        success: function () {
            $('#modalAddImg').modal('hide');
            Swal.fire('Successfully!', '', 'success')
            location.reload();
        }
    })
    event.preventDefault();
}

function getImgPersonalHouse() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GET",
        url: "http://localhost:8080/img/house/" + house.id,
        success: function (data) {
            let content = " <div style='height: 700px' id=\"carouselExampleControls\" class=\"carousel slide\" data-bs-ride=\"carousel\">\n" +
                "            <div class=\"carousel-inner\">";
            for (let i = data.length - 1; i >= 0; i--) {
                if (i === data.length - 1) {
                    content += `<div class="carousel-item active">
                <img width="800px" height="600px" src="` + data[i].img + `" class="d-block w-100" alt="...">
              </div>`
                } else {
                    content += `<div class=carousel-item">
                <img width="800px" height="600px" src="` + data[i].img + `" class="d-block w-100" alt="...">
              </div>`
                }
            }
            content += `</div>
            <button  class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span style="background-color: #66a973; border-radius: 100px; " class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button  class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span style="background-color: #66a973;border-radius: 100px;" class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
            $(".personalImgHouse").html(content);
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

function getListGuestRent() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "GET",
        url: "http://localhost:8080/rent/" + house.id,
        success: function (data) {


            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += "<tr>\n" +
                    "            <th scope=\"row\">" + (i + 1) + "</th>\n" +
                    "            <td>" + data[i].guest.name + "</td>\n" +
                    "            <td>" + data[i].startDay + "</td>\n" +
                    "            <td>" + data[i].endDay + "</td>\n"
                if (data[i].status === true) {
                    content += "<td>Booked</td>"
                } else {
                    content += "<td>Canceled</td>"
                }
                if (data[i].checkIn === true) {
                    content += "<td>Checked</td></tr>"
                } else {
                    content += "<td>Unchecked</td></tr>"
                }
                $("#listRentHouse").html(content);
            }
        },
        error: function () {
            let status = "<div style=\"background-color: #66a973;width: 280px; height: 30px;border-radius:15px;text-align:center;padding-top: 2px;color: white\">\n" +
                "              <span > The house has not been rented</span>\n" +
                "                </div>";
            $(".tableListRent").html(status);
        }
    })
    event.preventDefault();
}

// pagination
let thisPage = 1;
let limit = 3;
let list = [];

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    for (let i = 0; i < list.length; i++) {
        if (i >= beginGet && i <= endGet) {
            list[i].style.display = 'grid';
        } else {
            list[i].style.display = 'none';
        }
    }
    listPage();
}

function listPage() {
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if (thisPage !== 1) {
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i === thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage !== count) {
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(i) {
    thisPage = i;
    loadItem();
}

// ---------------------------------------------------------------------------------------------------
function rentHouse(){
    let money = bill();
    
    let startDay = $("#dateStart").val()
    let endDay = $("#dateEnd").val()
    let newRentHouse = {
        guest: user,
        house: house,
        startDay: startDay,
        endDay: endDay,
        status: true,
        checkIn: false
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/rent",
        data: JSON.stringify(newRentHouse),
        dataType: "text",
        success: function (data) {
            document.getElementById("dateStart").value = ""
            document.getElementById("dateEnd").value = ""
            $('#modalRent').modal('hide');
            Swal.fire(data, '', 'success')
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Can't rent house on this day",
            })
        }
    })
    event.preventDefault();
}

function rentalHistory(){

}

function bill(){
    let startDay = $("#dateStart").val()
    let endDay = $("#dateEnd").val()
    let date_1 = new Date(startDay);
    let date_2 = new Date(endDay);
    let difference = (date_2.getTime() - date_1.getTime()) / (1000 * 3600 * 24);
    return difference * house.price;
}
