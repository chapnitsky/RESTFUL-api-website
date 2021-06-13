let guides = null;

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

async function tab(data){
    await $.ajax({
        type: 'GET',
        url: "/guides",
        success: function (result) {
            guides = result;
        },
        error: function (err) {
        console.log("err", err);
        }
    });
    let bord = 3;
    console.log(guides);
    let str = "<table cellspacing='10' border='" + bord +"'><tr><th>ID</th><th>Start Date</th><th>Duration</th><th>Price</th><th>Guide Name</th><th>Guide Email</th><th>Guide Cellular</th><th>Path</th><th>Delete Tour</th><th>Edit Tour</th><th>Add Site</th></tr>";
    let size = data.length;
    let site_html = `<label for="name">Name</label><input type="text" class="form-control" name="name" id="name{}" placeholder="write name here" required><label for="country">Country</label><input type="text" class="form-control" name="country" id="country[]" placeholder="write country here" required>`;
    let get_ajax = "$.ajax({type: `GET`,url: `{}`,success: function (result) {tab(result);},error: function (err) {console.log(`err`, err);}});";
    let del_ajax = "$.ajax({type: `DELETE`,url: `{}`,success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let add_site_ajax = "$.ajax({type: `POST`,url: `{}`,data: obj = {name: name_val, country: country_val},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let edit_ajax = "$.ajax({type: `PUT`,url: `tours/` + id_val,data: obj = {id: id_val, start_date: date_val,duration: duration_val,price: price_val,guide: g_id},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    
    for(let i = 0; i < size; i++)
    {   
        const g_id = data[i][1]["guide"]; // g_id = dwhjhtj46et9rg9drhfsehf
        console.log(g_id);
        let g_name, g_email, g_phone;
        let found_g = false;
        for(let j = 0; j < guides.length; j++){
            if(guides[j][1]["_id"] == g_id){
                g_name = guides[j][1]["name"];
                g_email = guides[j][1]["email"];
                g_phone = guides[j][1]["phone"];
                found_g = true;
                break;
            }
        }
        if(!found_g){
            console.log("error in guides ID");
            return;
        }
        
        str = str + "<tr>";
        str = str + "<td>" + data[i][1]["id"] +"</td>";
        str = str + "<td>" + data[i][1]["start_date"] +"</td>";
        str = str + "<td>" + data[i][1]["duration"] +"</td>";
        str = str + "<td>" + data[i][1]["price"] +"</td>";
        str = str + "<td>" + g_name +"</td>";
        str = str + "<td>" + g_email +"</td>";
        str = str + "<td>" + g_phone +"</td>";
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
    get_date = get_date.replace('{}', '/date_sort');
    let get_aplhabetical = get_ajax.replace('{}', '/tours');
    let get_price = get_ajax.replace('{}', '/price_sort');
    let get_duration = get_ajax.replace('{}', '/duration_sort');
    let but = $(`<p></p><p></p><button onclick="{${get_date}}">Date sort</button>&nbsp&nbsp<button onclick="{${get_aplhabetical}}">Alphabetical sort</button>&nbsp&nbsp<button onclick="{${get_price}}">Price sort</button>&nbsp&nbsp<button onclick="{${get_duration}}">Duration sort</button>&nbsp&nbsp<p></p><p></p><button onclick="{location.href='/add_tour';}">Add Tour</button>&nbsp&nbsp<button onclick="{location.href='/add_guide';}">Add Guide</button>&nbsp&nbsp<button onclick="{location.href='/update_guide';}">Update Guide</button>&nbsp&nbsp<button onclick="{location.href='/del_guide';}">Delete Guide</button>&nbsp&nbsp<button onclick="{location.href='/tours_by_guide';}">Get tours Guide</button><p></p><p></p>`);
    $("#div2").html(but);
    let get_info2 = `let id_val = $('#edit_id').val();let date_val = $('#date').val();let duration_val = $('#duration').val();let price_val = $('#price').val();let g_id = $('#gname').val();let obj = ''; if(!id_val) return;`;

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
        <label for="gname">Guide ID</label>
        <input type="text" class="form-control" name="gname" id="gname"
            placeholder="write guide name here">
        <!-- errors will go here -->
    </div>
    </form>
    <button onclick="{${get_info2} ${edit_ajax}}">Submit Editing</button>`));
}

$("document").ready(loadDoc);