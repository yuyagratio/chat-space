$(function() {
  function buildHTML(message){
    var image = message.image ? `<img src"=${message.image}">` : "";
    var html = `<div class="message" data-id=${message.id}>
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
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".new-message__submit-btn").attr("disabled", false);
      $("#new_message")[0].reset();
      $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight }, "first");
    })
    .fail(function() {
      alert('メッセージを入力してください');
    });
    return false;
  });
});
