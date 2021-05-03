var $ = jQuery;

var blog_data = [
  {
    title: "1. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog1.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "2. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog2.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "3. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog3.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "4. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog1.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "5. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog2.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "6. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog3.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "7. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog2.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "8. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog1.jpg",
    url: "https://www.naver.com",
  },
  {
    title: "9. 강아지",
    blogTitle: "(작은 제목 ) 강아지",
    description: "귀여운 강아지 사진입니다",
    thumbnailUrl: "./images/dog3.jpg",
    url: "https://www.naver.com",
  },
];

blog_data.reverse();

function shuffle(arr2) {
  var arr = arr2.slice();
  for (var i = arr.length - 1; i >= 1; i--) {
    var j = Math.floor(Math.random() * i);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

var slide_data = blog_data;
var pageSize = 6;

function initData(blog_data) {
  var pageObj = {
    currentPage: 1,
    currentPages: 1,
    totalPage: blog_data.length,
  };

  // pageSize : 6
  pageObj.totalPages = Math.max(Math.ceil(pageObj.totalPage / pageSize), 0);

  return pageObj;
}

function getDatabyPage(page, pageSize) {
  return blog_data.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );
}

var makeSlideItem = function (data, index) {
  var result = "";
  result += `<div class="slideItem" data-id="`;
  result += index;
  result += `"><div class="slideItemImage" style='background-image:url("`;
  result += data.thumbnailUrl;
  result += `")'><div class="slideItemDescriptionBox"><h3 class="descriptionTitle">`;
  result += data.title;
  result += `</h3><div class="descriptionSummary">`;
  result += data.description;
  result += `</div></div><div class="sourceDescriptionRow" >`;
  result += `</div></div></div>`;
  return result;
};

var makeBlogItem = function (data, index) {
  var result = "";
  result += `<div class="blogItem" data-id="`;
  result += index;
  result += `" style='background-image:url("`;
  result += data.thumbnailUrl;
  result += `")'><div class="blogItemTitleArea `;
  result += data.blogTitleLong ? "long" : "";
  result += `">`;
  result += data.blogTitle ? data.blogTitle : data.title;
  result += `</div></div>`;
  return result;
};

var makeEmptyBlogItem = function () {
  return `<div class="blogEmptyItem" ></div>`;
};

function printBlog() {
  var data = getDatabyPage(pageObj.currentPages, 6);
  var blogItemString = "";
  for (var i = 0; i < data.length; i++) {
    blogItemString += makeBlogItem(data[i], i);
  }

  if (data.length % 2 == 1) blogItemString += makeEmptyBlogItem();

  $(".blogContainer").empty();
  $(".blogContainer").append(blogItemString);
  $(".blogContainer").on("click", ".blogItem", function (e) {
    var id = $(this).attr("data-id");
    var url = blog_data[id].url;
    window.open(url, "_blank");
  });
}

function printSubPage() {
  //var result = calcPageObj(pageObj);
  var subPageString = '<div class="pagination">';
  subPageString += '<div class="prev_button">&lt;</div>';
  subPageString += '<div class="next_button">&gt;</div>';
  subPageString += "</div>";

  $(".subPageContainer").empty();
  $(".subPageContainer").append(subPageString);
  $(".prev_button").on("click", function (e) {
    prevPages();
  });
  $(".next_button").on("click", function (e) {
    nextPages();
  });
}

function nextPages() {
  if (pageObj.currentPages == pageObj.totalPages) return;
  pageObj.currentPages += 1;
  printBlog(pageObj);
  printSubPage(pageObj);
}

function prevPages() {
  if (pageObj.currentPages == 1) return;
  pageObj.currentPages -= 1;
  printBlog(pageObj);
  printSubPage(pageObj);
}

function setPage(page) {
  if (page == pageObj.currentPage) return;
  if (page < 1 || page > pageObj.totalPage) return;
  pageObj.currentPage = page;
  printBlog(pageObj);
  printSubPages(pageObj);
}

var pageObj = {};

$(document).ready(function () {
  pageObj = initData(blog_data);

  var slideItemString = "";

  for (var i = 0; i < slide_data.length; i++) {
    slideItemString += makeSlideItem(slide_data[i], i);
  }

  $(".middle").append(slideItemString);

  $(".middle").on("click", ".slideItem", function (e) {
    var id = $(this).attr("data-id");
    var url = blog_data[id].url;
    window.open(url, "_blank");
  });

  printBlog();
  printSubPage();

  var currentView = $(".slideItem").hide().first().show();
  var moving = false;
  var waiting = true;
  var moveTime = 5000;
  var waitBeforeMove = 10000;
  var autoSliding = setInterval(moveRight, moveTime);

  function setWaiting() {
    waiting = true;
  }

  function unsetWaiting() {
    waiting = false;
    clearInterval(autoSliding);
    autoSliding = null;
  }

  function checkWaitingAndAutoSliding() {
    setTimeout(function () {
      if (waiting & !autoSliding) {
        autoSliding = setInterval(moveRight, moveTime);
      }
    }, waitBeforeMove);
  }

  function moveLock() {
    moving = true;
  }

  function moveUnlock() {
    moving = false;
    if (!autoSliding) {
      setWaiting();
      checkWaitingAndAutoSliding();
    }
  }

  function moveLeft() {
    moveLock();
    var prev = currentView.prev();
    if (prev.length > 0) {
      prev.show("slide", { direction: "left" }, 500);
      currentView.hide("slide", { direction: "right" }, 500, moveUnlock);
      currentView = prev;
    } else {
      moveToEnd();
    }
  }

  function moveRight() {
    moveLock();
    var next = currentView.next();
    if (next.length > 0) {
      next.show("slide", { direction: "right" }, 500);
      currentView.hide("slide", { direction: "left" }, 500, moveUnlock);
      currentView = next;
    } else {
      moveToStart();
    }
  }

  function moveToEnd() {
    moveLock();
    var last = $(".slideItem").last();
    currentView.hide("slide", { direction: "right" }, 500);
    last.show("slide", { direction: "left" }, 500, moveUnlock);
    currentView = last;
  }

  function moveToStart() {
    moveLock();
    var first = $(".slideItem").first();
    currentView.hide("slide", { direction: "left" }, 500);
    first.show("slide", { direction: "right" }, 500, moveUnlock);
    currentView = first;
  }

  $("#navigate_left").click(function () {
    unsetWaiting();
    if (moving) return;
    moveLeft();
  });

  $("#navigate_right").click(function () {
    unsetWaiting();
    if (moving) return;
    moveRight();
  });

  //커서 키 처리
  $(document).keydown(function (e) {
    //e.keyCode : <- 37    -> 39
    var view;
    if (e.keyCode == 37) {
      moveLeft();
    }

    if (e.keyCode == 39) {
      moveRight();
    }
  });
});
