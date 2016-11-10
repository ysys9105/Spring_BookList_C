/**
 * Created by CJuser on 2016-10-31.
 */
var priceTd = null;
var titleTd = null;
var authorTd = null;
var img = null;
var imgTd = null;
var aboutTd = null;
var tr = null;
var dbtn = null;
var ubtn = null;
var abtn = null;


function searchBook() {
    if(event.keyCode==13){
        $.ajax({
            url : "http://localhost:7070/book/bookList",
            type: "get",
            dataType : "jsonp",
            jsonp : "callback",
            data :{
                keyword : $("#keyword").val()
            },

            success : function(result){
                $("tbody").empty();
                //결과창출력


                for (var i = 0; i < result.length; i++) {
                    tr = $("<tr></tr>").attr("data-isbn",result[i].isbn);

                    priceTd = $("<td></td>").text(result[i].price);
                    titleTd = $("<td></td>").text(result[i].title).attr("id","tTd"+result[i].isbn);
                    authorTd = $("<td></td>").text(result[i].author);
                    img = $("<img />").attr("src",result[i].img).attr("id","bookimg");
                    imgTd = $("<td></td>").append(img);

                    dbtn =$("<input>");
                    dbtn.attr("type","button");
                    dbtn.attr("class","btn btn-danger");
                    dbtn.attr("value","삭제");

                    //DELETE 기능!! *********************************
                    dbtn.on("click",function(){
                            //update처리!!
                            //DB처리, 화면처리
                            //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        var pos =  $(this).parent().parent();
                            $.ajax({
                                url : "http://localhost:7070/book/bookDelete",
                                type : "get",
                                dataType : "jsonp",
                                jsonp : "callback",
                                data : {
                                    isbn : isbn

                                },
                                success : function(){

                                    pos.remove();
                                    alert("삭제되었습니다!")
                                },
                                error : function () {
                                    alert("삭제 에러 발생!!")
                                }
                            });

                    });
                    var dbtnTd = $("<td></td>").append(dbtn);

                    abtn =$("<input>");
                    abtn.attr("type","button");
                    abtn.attr("class","btn btn-info");
                    abtn.attr("value","상세보기");

                    aboutTd = $("<td></td>").append(abtn);

                    //상세보기 기능!! *********************************
                    abtn.on("click",function(){
                        //상세정보 처리!!
                        //DB처리, 화면처리
                        //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        console.log(isbn);
                        $.ajax({
                            url : "http://localhost:7070/book/bookAbout",
                            type : "get",
                            dataType : "jsonp",
                            jsonp : "callback",
                            data : {
                                isbn : isbn

                            },
                            success : function(result){

                                //*****************상세보기기능*****************************
                                var date = result.date;
                                var page = result.page;
                                var translator = result.translator;
                                var supple = result.supplement;
                                var detail = "<b>도서정보 :</b><br>"+"ISBN: "+ isbn + "<br>"+"출판일: " + date +"<br>"+ "페이지 수: "+ page+"<br>"+"번역가: "+ translator +"<br>"+ "부록: "+supple;

                                var d1 = $("<div></div>").attr("id","detail").append(detail);
                                $("#tTd"+isbn).append(d1);

                            },
                            error : function () {
                                alert("불러오기 에러 발생!!")
                            }
                        });

                    });




                    ubtn = $("<input>");
                    ubtn.attr("type","button");
                    ubtn.attr("value","수정");
                    ubtn.attr("class","btn btn-primary");
                    ubtn.attr("id","update");

                    //UPDATE 기능!! *********************************
                    ubtn.on("click",function(){
                        //수정처리
                        var title = $(this).parent().parent().find("td:nth-child(2)").text();
                        var author = $(this).parent().parent().find("td:nth-child(3)").text();
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();
                        var updatetitle=$("<input />").attr("type","text").val(title);
                        var updateauthor=$("<input />").attr("type","text").val(author);
                        var updateprice=$("<input />").attr("type","text").val(price);


                        $(this).parent().parent().find("td:nth-child(2)").text("");
                        $(this).parent().parent().find("td:nth-child(2)").append(updatetitle);
                        $(this).parent().parent().find("td:nth-child(3)").text("");
                        $(this).parent().parent().find("td:nth-child(3)").append(updateauthor);
                        $(this).parent().parent().find("td:nth-child(4)").text("");
                        $(this).parent().parent().find("td:nth-child(4)").append(updateprice);
                        $(this).parent().parent().find("[value=삭제]").attr("disabled","disabled");
                        $(this).parent().parent().find("[value=상세보기]").attr("disabled","disabled");
                        $(this).parent().parent().find("#update").attr("value","완료");
                        var update =$(this).parent().parent().find("#update");

                        update.on("click",function () {
                                //update처리!!
                                //DB처리, 화면처리
                                //1.AJAX 호출해 서버프로그램을 실행시켜 DB처리

                                var isbn = $(this).parent().parent().attr("data-isbn");

                                var title1 = updatetitle.val();
                                var author1 = updateauthor.val();
                                var price1 = updateprice.val();

                                var tr = $(this).parent().parent();
                                $.ajax({
                                    url : "http://localhost:7070/book/bookUpdate",
                                    type : "get",
                                    dataType : "jsonp",
                                    jsonp : "callback",
                                    data : {
                                        isbn : isbn,
                                        title : title1,
                                        author : author1,
                                        price : price1
                                    },
                                    success : function(result){
                                        alert("변경되었습니다");
                                        tr.find("td:nth-child(2)").empty();
                                        tr.find("td:nth-child(2)").text(title1);
                                        tr.find("td:nth-child(3)").empty();
                                        tr.find("td:nth-child(3)").text(author1);
                                        tr.find("td:nth-child(4)").empty();
                                        tr.find("td:nth-child(4)").text(price1);
                                    },
                                    error : function () {
                                        alert("업데이트 에러 발생!!")
                                    }
                                });


                        })
                    });
                    var ubtnTd = $("<td></td>").append(ubtn);




                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(dbtnTd);
                    tr.append(ubtnTd);
                    tr.append(aboutTd);

                    $("tbody").append(tr);
                }


                $(document).ready(function(){

                    $('#pagenav').empty();

                    $('#data').after('<div id="nav"></div>');
                    var rowsShown = 10;
                    var rowsTotal = $('#myTbody tr').length;
                    var numPages = rowsTotal/rowsShown;

                    for(i = 0;i < numPages;i++) {
                        var pageNum = i + 1;
                        $('#pagenav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
                    }

                    $('#myTbody tr').hide();
                    $('#myTbody tr').slice(0, rowsShown).show();
                    $('#pagenav a:first').addClass('active');


                    $('#pagenav a').bind('click', function(){

                        $('#pagenav a').removeClass('active');
                        $(this).addClass('active');
                        var currPage = $(this).attr('rel');
                        var startItem = currPage * rowsShown;
                        var endItem = startItem + rowsShown;
                        $('#myTbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                        css('display','table-row').animate({opacity:1}, 300);

                    });
                });

            },
            error: function () {
                alert("이상이상")
            }
        });
    }
}
