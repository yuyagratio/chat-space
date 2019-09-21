$(function() {
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    return html;
  }

  function noUser(alert){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${alert}</p>
                </div>`
    return html;
  }

  $(function() {
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        url: "/users",
        type: "GET", 
        data: {keyword: input},
        dataType: "json"
      })
      .done(function(users){
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            searchUser(user);
            var html = searchUser(user);
            $("#user-search-result").append(html);
          });
        } else {
          var html = noUser("ユーザーが見つかりません");
          $("#user-search-result").append(html);
        };
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    })
  });

  $(function(){
    $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
    })
  })
});
