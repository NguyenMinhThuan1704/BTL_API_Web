var listpage= document.getElementsByClassName("Page");
var listperson=JSON.parse(localStorage.getItem('register')) || [];
var listuser=JSON.parse(localStorage.getItem('user')) || [];
function Bieutuan() {  
    var chart = new CanvasJS.Chart("chartContainerTuan",  
    {  
        animationEnabled: true,
        theme: "light2",
        title:{  
        text: "Thống kê theo tuần",   
        fontWeight: "bolder",  
        fontColor: "#008B8B",  
        fontfamily: "tahoma",          
        fontSize: 25, 
        padding: 10 ,   
    },  
    data: [  
        {          
        type: "column",  
        dataPoints: [  
            {label: "Thứ 2", y: 46 },  
            {label: "Thứ 3", y: 87},  
            {label: "Thứ 4", y: 76},  
            {label: "Thứ 5", y: 39 },  
            {label: "Thứ 6", y: 87 },  
            {label: "Thứ 7", y: 42 },     
            {label: "Chủ nhật", y: 60}
        ]  
        }  
    ]  
    });  
    chart.render();  
}
var listclick=document.getElementsByClassName("clickh");
$(document).ready(function(){
    $('.hello').click(function(e){
        $('.Dangxuat').slideToggle();
    })
    
    listpage[0].style.display='block'
    listclick[0].className += " clickhh"
    DoanhThu();
})
listdx= JSON.parse(localStorage.getItem("user")) || []
$(document).ready(function(){
    $('.XemChiTiet').click(function(e){
        $('.chitiet').slideToggle();
    })
})
function dangxuat()
{
    listdx=null
    localStorage.setItem("user",JSON.stringify(listdx))
    window.location.href = "../login.html";
  
}

var listbill=JSON.parse(localStorage.getItem('bill')) || [];
function DoanhThu()
{
    var t=0;
    var d = new Date();
    var a=0;
    var b=0;
    var c=0
    for(x of listbill)
    {
        if(x[x.length-1].day==d.getDate() && x[x.length-1].thang==d.getMonth()+1 && x[x.length-1].nam==d.getFullYear())
        {
            for(z of x)
            {
                if(z.thanhtoan != undefined)
                {
                    t=t+z.thanhtoan;
                    a=a+1;
                }
                if(z.soluong != undefined)
                {
                    b=b+z.soluong
                }
                
            }
        }
        
    }
    $('.all>.Details>.overview>.overview1>.Bieudo>.bieudo1>span>span').text(t+"đ");
    $('.all>.Details>.overview>.overview1>.Bieudo>.bieudo2>span>span').text(a);
    $('.all>.Details>.overview>.overview1>.Bieudo>.bieudo3>span>span').text(b);
}
DoanhThu();
function Chucvu(a){
    if(a=="Nhân viên")
    {
        return "NV"
    }
    else if(a=="Quản lý")
    {
        return "QL"
    }
    else
    {
        return "KH"
    }
}
$(document).ready(function(){
    var d=0;
    for(x of listperson)
    {
        d=d+1;
        if(listuser.tailkhoan==x.username && listuser.matkhau==x.password)
        {
            $('.homehello').text("Welcome, "+listuser.tailkhoan )
            $('#mahome').text( Chucvu(x.chucvu) + d);
            $('#tenhome').text(x.name);
            $('#emailhome').text(x.email);
            $('#sdthome').text(x.phone);
            $('#diachihome').text(x.address + " - tỉnh "+x.tinh );
            $('#nhanvienhome').text(x.chucvu)
            $('#chao').text("Xin chào, "+listuser.tailkhoan )
        }

    }
})
$(document).ready(function(){
    $('.all>.selection>.generalinf>#TTC>dt').click(function (e) { 
        $('.all>.selection>.generalinf>#TTC>dd').slideToggle(function(){
        });

    });
})
$(document).ready(function(){
    $('.all>.selection>.generalinf>#QLDH>dt').click(function (e) { 
        $('.all>.selection>.generalinf>#QLDH>dd').slideToggle(function(){
        });
    });
})

$(document).ready(function(){
    $('.all>.selection>.user>dl>dt').click(function (e) { 
        $('.all>.selection>.user>dl>dd').slideToggle();
    });
})
function Home()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
       y.className = y.className.replace(" clickhh","")
    }
    listclick[0].className += " clickhh"
    listpage[0].style.display='block'
  
}
function OVERVIEW()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[1].className += " clickhh"
    listpage[1].style.display='block'
    Bieutuan();
}
function HangMT()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[2].className += " clickhh"
    listpage[2].style.display='block'
}
function DongMT()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[3].className += " clickhh"
    listpage[3].style.display='block'
}
function COMPUTER()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[4].className += " clickhh"
    listpage[4].style.display='block'
}
function PROVIDER()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[5].className += " clickhh"
    listpage[5].style.display='block'
}
function INVOICEINPUT()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[6].className += " clickhh"
    listpage[6].style.display='block'
}
function CXL()
{
    for(let x of listpage)
    {
        x.style.display='none'
    }
    for(let y of listclick)
    {
        y.className = y.className.replace(" clickhh","")
    }
    listclick[7].className += " clickhh"
    listpage[7].style.display='block'
}
function OpenAddcompany(){
    Refresh();
    $('.display').css({'transform':'scaleY(1)'});
    $('.Addcompany').css({'transform':'scaleY(1)'});
    
    
}

function Exit(){
    $('.display').css({'transform':'scaleY(0)'});
    $('.Addcompany').css({'transform':'scaleY(0)'});
    $('.note').text(' ')
}

listcompany=JSON.parse(localStorage.getItem('company')) || [] ;
function AddCompany(){
    var tenh=$('#tenhang').val();
    var motah=$('#mota').val();
    var mah=0;
    var kt=true;
    if(listcompany=="")
    {
        mah=1;
    }
    else
    {
        mah=Number(listcompany[listcompany.length-1]['mahang'])+1;
    }
    if (tenh == "") 
    {
        kt=false;
        $('.note').text("* Tên không được để trống")
    }
    if(motah=="")
    {
        kt=false;
        $('.note').text("* Mô tả không được để trống")
    }
    if(kt==true)
    {
        var totalll = {
            "mahang": mah,
            "tenhang": tenh,
            "mota":motah
        };
        listcompany.push(totalll);
        localStorage.setItem("company",JSON.stringify(listcompany));
       LoadCompany();
       Refresh();
       alert("Bạn đã thêm thành công")
    }
  
}

function Refresh()
{
    if(listcompany =="")
    {
        $('#mahang').val("MH01");
    }
    else if(Number(listcompany[listcompany.length-1]['mahang'])+1<10)
    {
        $('#mahang').val("MH0"+(Number(listcompany[listcompany.length-1]['mahang'])+1));
    }
    else
        $('#mahang').val("MH"+(Number(listcompany[listcompany.length-1]['mahang'])+1));
    $('#tenhang').val("")
    $('#mota').val("")
}
function LoadCompany()
{
    var stt=0;
    var strrr=`<tr>
            <th><input type="checkbox"></th>
            <th>STT</th>
            <th>Mã hãng máy tính</th>
            <th>Tên hãng máy tính</th>
            <th>Mô tả</th>
            <th>Tác vụ</th>
        </tr>`;
    var strr=""
    for(x of listcompany)
    {
        stt=stt+1;
        if(stt<10)
        {
            strr += `<tr>
            <td><input type="checkbox"></td>
            <td>`+stt+`</td>
            <td> MH0`+x.mahang+`</td>
            <td>`+x.tenhang+`</td>
            <td>`+x.mota+`</td>
            <td><i onclick="EditCompany(`+ x.mahang+ `)" class="fa-solid fa-pen-to-square"></i>   <i onclick="RemoveCompany(`+ x.mahang+ `)" class="fa-solid fa-trash-can"></i></td>
            </tr>`;
        }
        else
        {
            strr += `<tr>
            <td><input type="checkbox"></td>
            <td>`+stt+`</td>
            <td> MH`+x.mahang+`</td>
            <td>`+x.tenhang+`</td>
            <td>`+x.mota+`</td>
            <td><i onclick="EditCompany(`+ x.mahang+ `)" class="fa-solid fa-pen-to-square"></i>   <i onclick="RemoveCompany(`+ x.mahang+ `)" class="fa-solid fa-trash-can"></i></td>
            </tr>`;
        }
        
    }
    var str = strrr+ strr;
    $("#addapny").html(str);
}
LoadCompany();

function RemoveCompany(mahang){
    var index=listcompany.findIndex( x => x.mahang == mahang);
  if(index >=0 ){
    listcompany.splice(index,1);
  }
  LoadCompany();
}
function UpdateCompany()
{
    localStorage.setItem('company',JSON.stringify(listcompany));
    alert("Bạn đã cập nhập thành công");
    LoadCompany();
}
function EditCompany(mahang)
{
    var index=listcompany.findIndex( x => x.mahang == mahang);
    OpenAddcompany();
    $('#mahang').val(listcompany[index]['mahang']);
    $('#tenhang').val(listcompany[index]['tenhang']);
    $('#mota').val(listcompany[index]['mota'])
}
function UpdateCompanyA()
{
    var ten=$('#tenhang').val();
    var mota=$('#mota').val();
    var ok =true;
    if (ten == "") 
    {
        ok=false;
        $('.note').text("* Tên không được để trống")
    }
    if(mota=="")
    {
        ok=false;
        $('.note').text("* Mô tả không được để trống")
    }
    if(ok==true)
    {
        for(x of listcompany)
        {
            if(x.mahang==$('#mahang').val())
            {
                x.tenhang=ten;
                x.mota=mota;
                UpdateCompany();
            }
        }
        $('.note').text("")
    }
}
