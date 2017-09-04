// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;
var loading = false;
var lastIndex = $$('.view-main .index .list-block li').length;
var maxItems = 1000;
var itemsPerLoad = 30;
// Add view
var ptrContent = $$('.pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
        location.reload();
        // When loading done, we need to reset it
        myApp.pullToRefreshDone();
    }, 500);
});


var numScroll = 0;
loadPostFunction();
function loadPostFunction(){
    $$(document).on('pageInit', function (e) {
        var page = e.detail.page;
        if (page.name === 'index') {
            $('.page-content').scroll(function(e){
                var elem = $(e.currentTarget);
                if((elem.scrollTop() + $(window).height() >= elem[0].scrollHeight - 5) && numScroll == 0 ) {
                    setTimeout(function(){
                        lastIndex = $$('.view-main .index .list-block li').length;
                        // Exit, if loading in progress
                        if (loading) return;
                        // Set loading flag
                        loading = true;
                        // Emulate 1s loading
                        // Reset loading flag
                        loading = false;
                         if (lastIndex >= maxItems) {
                          // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                          myApp.detachInfiniteScroll($$('.infinite-scroll'));
                          // Remove preloader
                          $$('.infinite-scroll-preloader').remove();
                          return;
                        }
                        // Generate new items HTML
                        $.ajax({
                            url: 'http://api.struyen.net/json/data_json/'+lastIndex,
                            crossDomain: true,
                            dataType: 'json',
                            success: function (data) {
                                var html = '';
                                // Kết quả là một object json
                                // Nên ta sẽ loop result
                                $.each(data.posts, function (key, item) {
                                    html += '<li id="itemPost" idPost="' + item['id'] + '">';
                                    html += '<a href="single.html?slug=' + item['slug'] + '&id=' + item['id'] + '" class="item-link no-fastclick">';
                                    html += '<div class="item-content">';
                                    html += '<div class="item-inner">';
                                    html += '<div class="thumbnail">';
                                    html += '<img src="' + item['thumbnail'] + '" alt="' + item['title'] + '" class="img-responsive" />';
                                    html += '</div>';
                                    html += '<div class="info">';
                                    html += '<div class="item-title">' + item['title'] + '</div>';
                                    html += '<div class="kt-date">' + item['date_post'] + '</div>';
                                    html += '<div class="excerpt">Vào một ngày đẹp trời, có một người đẹp không thốt lên lời, để rồi...</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</a>';
                                    html += '</li>';
                                });
                                $('.index #listPost').append(html);
                                $('.category #listPost').html("");
                                numScroll = 0;
                            }
                        });
                    }, 10);
                }
            });
        }
        if (page.name === 'categories') {
            $('.page-content').scroll(function(e){
                var elem = $(e.currentTarget);
                if((elem.scrollTop() + $(window).height() >= elem[0].scrollHeight - 5) && numScroll == 0 ) {
                    numScroll = 1;
                    setTimeout(function(){
                        lastIndex = $$('.view-main .category .list-block li').length;
                        // Exit, if loading in progress
                        if (loading) return;
                        // Set loading flag
                        loading = true;
                        // Emulate 1s loading
                        // Reset loading flag
                        loading = false;
                         if (lastIndex >= maxItems) {
                          // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                          myApp.detachInfiniteScroll($$('.infinite-scroll'));
                          // Remove preloader
                          $$('.infinite-scroll-preloader').remove();
                          return;
                        }
                        // Generate new items HTML
                        $.ajax({
                            url: 'http://api.struyen.net/json/data_category_json/'+page.query.id + '/' +lastIndex,
                            crossDomain: true,
                            dataType: 'json',
                            success: function (dataCat) {
                                var html = '';
                                // Kết quả là một object json
                                // Nên ta sẽ loop result
                                $.each(dataCat.posts, function (key, item) {
                                    html += '<li id="itemPost" idPost="' + item['id'] + '">';
                                    html += '<a href="single.html?slug=' + item['slug'] + '&id=' + item['id'] + '" class="item-link no-fastclick">';
                                    html += '<div class="item-content">';
                                    html += '<div class="item-inner">';
                                    html += '<div class="thumbnail">';
                                    html += '<img src="' + item['thumbnail'] + '" alt="' + item['title'] + '" class="img-responsive" />';
                                    html += '</div>';
                                    html += '<div class="info">';
                                    html += '<div class="item-title">' + item['title'] + '</div>';
                                    html += '<div class="kt-date">' + item['date_post'] + '</div>';
                                    html += '<div class="excerpt">Vào một ngày đẹp trời, có một người đẹp không thốt lên lời, để rồi...</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</div>';
                                    html += '</a>';
                                    html += '</li>';
                                });
                                $('.category #listPost').append(html);
                            }
                        });
                        numScroll = 0;
                    }, 10);
                }
            });
        }
    });
    
}
history.pushState(null, null, $(location).attr('href'));
    window.addEventListener('popstate', function () {
        history.pushState(null, null, $(location).attr('href'));
        mainView.router.back();
    });

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'index') {
        $.ajax({
            url: 'http://api.struyen.net/json/data_json/',
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                var html = '';
                // Kết quả là một object json
                // Nên ta sẽ loop result
                $.each(data.posts, function (key, item) {
                    html += '<li id="itemPost" idPost="' + item['id'] + '">';
                    html += '<a href="single.html?slug=' + item['slug'] + '&id=' + item['id'] + '" class="item-link no-fastclick">';
                    html += '<div class="item-content">';
                    html += '<div class="item-inner">';
                    html += '<div class="thumbnail">';
                    html += '<img src="' + item['thumbnail'] + '" alt="' + item['title'] + '" class="img-responsive" />';
                    html += '</div>';
                    html += '<div class="info">';
                    html += '<div class="item-title">' + item['title'] + '</div>';
                    html += '<div class="kt-date">' + item['date_post'] + '</div>';
                    html += '<div class="excerpt">Vào một ngày đẹp trời, có một người đẹp không thốt lên lời, để rồi...</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</a>';
                    html += '</li>';
                });
                $('.index #listPost').html(html);
            }
        });
        loadPostFunction();
    }
});
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'categories') {
        $.ajax({
            url: 'http://api.struyen.net/json/data_category_json/'+page.query.id,
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                if(data != false) {
                    var info = '';
                    info +=  '<div class="info">';
                        info +=  '<h4>';
                            info +=  'Danh mục: '+data.category.cat_name;
                        info +=  '</h4>';
                        info +=  '<div class="detail">';
                            info +=  '<p>';
                                info +=  'Tổng số bài viết: ' + data.category.num_posts;
                            info +=  '</p>';
                            info +=  '<p>';
                                info +=  'Mô tả: ' +  data.category.description;
                            info +=  '</p>';
                        info +=  '</div>';
                    info +=  '</div>';
                    $('.category .navbar .title').html(data.category.cat_name);
                    $('.category .picker-modal .list-info').html(info);
                    var html = '';
                    // Kết quả là một object json
                    // Nên ta sẽ loop result
                    $.each(data.posts, function (key, item) {
                        html += '<li id="itemPost" idPost="' + item['id'] + '">';
                        html += '<a href="single.html?slug=' + item['slug'] + '&id=' + item['id'] + '" class="item-link no-fastclick">';
                        html += '<div class="item-content">';
                        html += '<div class="item-inner">';
                        html += '<div class="thumbnail">';
                        html += '<img src="' + item['thumbnail'] + '" alt="' + item['title'] + '" class="img-responsive" />';
                        html += '</div>';
                        html += '<div class="info">';
                        html += '<div class="item-title">' + item['title'] + '</div>';
                        html += '<div class="kt-date">' + item['date_post'] + '</div>';
                        html += '<div class="excerpt">Vào một ngày đẹp trời, có một người đẹp không thốt lên lời, để rồi...</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</a>';
                        html += '</li>';
                    });
                    $('.category #listPost').html(html);
                } else {
                    $('.category #listPost').html("<li class='item-link'><div class='item-inner'>Hiện không có bài viết nào trong danh mục này!</div></li>");
                }
            }
        });
    }
});

$.ajax({
    url: 'http://api.struyen.net/json/get_list_menu/1',
    crossDomain: true,
    dataType: 'json',
    success: function (data) {
        $('.pages .navbar_left .list-block .get_menu').html(data);
        //.list-block ul li.dropdow
        $( ".show_sub" ).click(function() {
            $(this).parent().find("ul.sub").toggleClass('show');
            $(this).toggleClass('upto');
        });
    }
});
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'single') {
        var idPost = $('.view-main .page').attr("data-page");
        var idPost = page.query.id;
        var slug = page.query.slug;
        $.ajax({
            type: "POST",
            url: "http://api.struyen.net/json/single_json",
            crossDomain: true,
            dataType: 'json',
            data: {"slug": slug, "id": idPost},
            success: function (data) {
                var html = '';
                html +=  '<div class="title">';
                    html +=  data.title;
                html +=  '</div>';
                html +=  '<div class="content">';
                    html +=  data.content;
                html +=  '</div>';
                var info = '';
                info +=  '<div class="info">';
                    info +=  '<h4>';
                        info +=  'Tiêu đề: '+data.title;
                    info +=  '</h4>';
                    info +=  '<div class="detail">';
                        info +=  '<p>';
                            info +=  'Danh mục: ' + data.cat_name;
                        info +=  '</p>';
                        info +=  '<p>';
                            info +=  'Người đăng: ' + data.author_name;
                        info +=  '</p>';
                        info +=  '<p>';
                            info +=  'Ngày đăng: ' + data.date_post;
                        info +=  '</p>';
                    info +=  '</div>';
                info +=  '</div>';
                $('.single .page-content .content-block .content-block-inner').html(html);
                $('.single .picker-modal .list-info').html(info);
            }
        });
        $.ajax({
            type: "POST",
            url: "http://api.struyen.net/json/get_ads",
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                var html = '';
                    html +=  data;
                $('.toolbar-ads').html(html);
            }
        });
    }
});

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'pages') {
        var slug = page.query.slug;
        $.ajax({
            type: "POST",
            url: "http://api.struyen.net/json/page_json",
            crossDomain: true,
            dataType: 'json',
            data: {"slug": slug},
            success: function (data) {
                var html = '';
                html +=  '<div class="content">';
                    html +=  data.content;
                html +=  '</div>';
                $('.page_c .page-content .content-block .content-block-inner').html(html);
                $('.page_c .navbar .title').html(data.title);
            }
        });
    }
});
