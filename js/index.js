function loadDoc() {
    $.ajax({
        type: 'GET',
        url: "/tours",
        success: function (result) {
         $("<div id='form_div' class='hid' > </div>").insertAfter("#div1");
        tab(result);
        },
        error: function (err) {
        console.log("err", err);
        }
    });
}

function tab(data){
    let bord = 3;
    let str = "<table cellspacing='10' border='" + bord +"'><tr><th>ID</th><th>Start Date</th><th>Duration</th><th>Price</th><th>Guide Name</th><th>Guide Email</th><th>Guide Cellular</th><th>Path</th><th>Delete Tour</th><th>Edit Tour</th><th>Add Site</th></tr>";
    let size = data.length;
    let site_html = `<label for="name">Name</label><input type="text" class="form-control" name="name" id="name{}" placeholder="write name here" required><label for="country">Country</label><input type="text" class="form-control" name="country" id="country[]" placeholder="write country here" required>`;
    let get_ajax = "$.ajax({type: `GET`,url: `{}`,success: function (result) {tab(result);},error: function (err) {console.log(`err`, err);}});";
    let del_ajax = "$.ajax({type: `DELETE`,url: `{}`,success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let add_site_ajax = "$.ajax({type: `POST`,url: `{}`,data: obj = {name: name_val, country: country_val},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let edit_ajax = "$.ajax({type: `PUT`,url: `tours/` + id_val,data: obj = {id: id_val, start_date: date_val,duration: duration_val,price: price_val,guide: {name: gname,email: gemail,cellular: gphone}},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    // let edit_ajax = 'console.log(id_val)';
    for(let i = 0; i < size; i++)
    {   
        str = str + "<tr>";
        str = str + "<td>" + data[i][1]["id"] +"</td>";
        str = str + "<td>" + data[i][1]["start_date"] +"</td>";
        str = str + "<td>" + data[i][1]["duration"] +"</td>";
        str = str + "<td>" + data[i][1]["price"] +"</td>";
        str = str + "<td>" + data[i][1].guide.name +"</td>";
        str = str + "<td>" + data[i][1].guide.email +"</td>";
        str = str + "<td>" + data[i][1].guide.cellular +"</td>";
        str += "<td>";
        let copy = '';
        if(data[i][1].path){
            let num_path = data[i][1].path.length;
            for (let index = 0; index < num_path; index++) {
                let s_name = data[i][1].path[index].name;
                let s_country = data[i][1].path[index].country;
                copy = del_ajax;
                copy = copy.replace('{}', 'tours/' + data[i][1]["id"] + '/sites/' + s_name);
                str += s_name +" At " + s_country + `</br><button onclick="{${copy}}">Delete</button></br>`;         
            }
        }
        str += "</td>";
        copy = del_ajax.replace('{}','tours/' +data[i][1]["id"]);
        str += `<td><button onclick="{${copy}}">Delete</button></td>`;
        str += `<td><button onclick="{$('#form_div').removeClass('hid').addClass('show'); $('#edit_id').val('${data[i][1]["id"]}');}">Edit</button></td>`;


        copy = add_site_ajax.replace('{}','tours/' +data[i][1]["id"] + '/sites');
        let site_copy = site_html;
        site_copy = site_copy.replace('{}', String(i));
        site_copy = site_copy.replace('[]', String(i));
        let get_info = `let name_val = $('#name${String(i)}').val();let country_val = $('#country${String(i)}').val(); let obj = ''; if(!name_val || !country_val) return;`;
        str += `<td>${site_copy}<button onclick="{${get_info} ${copy}}">Add</button></td>`;
        str = str + "</tr>";
    }
    str = str + "</table>";
    let tableToAdd = $(str);
    $("#div1").html(tableToAdd);
    let get_date = get_ajax;
    get_date = get_date.replace('{}', '/tours_date');
    let get_aplhabetical = get_ajax.replace('{}', '/tours');
    let get_price = get_ajax.replace('{}', '/tours_price');
    let get_duration = get_ajax.replace('{}', '/tours_duration');
    let but = $(`<button onclick="{${get_date}}">Date sort</button></br></br><button onclick="{${get_aplhabetical}}">Alphabetical sort</button></br></br><button onclick="{${get_price}}">Price sort</button></br></br><button onclick="{${get_duration}}">Duration sort</button></br></br></br></br><button onclick="{location.href='/add_tour';}">Add Tour</button>`);
    $("#div2").html(but);
    let get_info2 = `let id_val = $('#edit_id').val();let date_val = $('#date').val();let duration_val = $('#duration').val();let price_val = $('#price').val();let gname = $('#gname').val();let gemail = $('#gemail').val(); let gphone = $('#gphone').val();let obj = ''; if(!id_val) return;`;
    $("#form_div").html($(`<form id="tour_form" name="tour_form">
    <div id="name-group" class="form-group">
        <label for="name">Name/ID</label>
        <input type="text" class="form-control" name="name" id="edit_id" placeholder="write name/id here">
    </div>
    <div id="name-group" class="form-group">
        <label for="id">Start Date</label>
        <input type="date" class="form-control" min="2021-05-09" name="id_field" id="date" placeholder="choose date here">
    </div>

    <!-- Duration -->
    <div id="name-group" class="form-group">
        <label for="duration">Duration</label>
        <input type="number" min="1" class="form-control" name="duration" id="duration"
            placeholder="write duration here">
        <!-- errors will go here -->
    </div>


    <!-- Price -->
    <div id="name-group" class="form-group">
        <label for="price">Price</label>
        <input type="number" min="1" class="form-control" name="price" id="price"
            placeholder="write price here ">
        <!-- errors will go here -->
    </div>

    <!-- Guide name-->
    <div id="name-guide" class="form-group">
        <label for="gname">Guide name</label>
        <input type="text" class="form-control" name="gname" id="gname"
            placeholder="write guide name here">
        <!-- errors will go here -->
    </div>

    <!-- Guide EMAIL -->
    <div id="email-group" class="form-group">
        <label for="email">Guide Email</label>
        <input type="email" class="form-control" name="email" id="gemail" placeholder="rudd@avengers.com">
        <!-- errors will go here -->
    </div>
    <!-- Guide Phone -->
    <div id="email-group" class="form-group">
        <label for="phone">Guide Phone</label>
        <input type="tel" class="form-control" name="phone" id="gphone"
        placeholder="05xxxxxxxx">
        <!-- errors will go here -->
    </div>
    </form>
    <button onclick="{${get_info2} ${edit_ajax}}">Submit Editing</button>`));
}

$("document").ready(loadDoc);