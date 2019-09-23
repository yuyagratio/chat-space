$(document).on("turbolinks:load", function() {
  function buildHTML(message) {
    var image = message.image ? `<img src"=${message.image}">` : "";
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__upper-info">
                    <div class="message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".new-message__submit-btn").attr("disabled", false);
      $("#new_message")[0].reset();
      $(".messages").animate(
        { scrollTop: $(".messages")[0].scrollHeight },
        "first"
      );
    })
    .fail(function() {
      alert("メッセージを入力してください");
    });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      // last_message_idはこの記述で値が入っていることをconsole.logで確認済み
      var last_message_id = $(".message:last").data("message-id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: "GET",
        dataType: "json",
        data: {id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = "";
        messages.forEach(function(message) {
          insertHTML += buildHTML(message);
          $(".messages").append(insertHTML);
        });
        $(".messages").animate(
          { scrollTop: $(".messages")[0].scrollHeight },
          "first"
        );
      })
      .fail(function() {
        console.log("error");
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
