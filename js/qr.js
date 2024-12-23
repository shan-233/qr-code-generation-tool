$(document).ready(function() {
  $('#generate-btn').click(function() {
      var url = $('#url-input').val();
      if (url.trim() === "") {  
          $('#error-message').show();  
          $('#qrcode').empty();  
          $('#download-btn').hide(); 
          $('#copy-img-btn').hide();
      } else {
          $('#error-message').hide();  
          $('#qrcode').empty();  
          $('#qrcode').qrcode(url);
          $('#download-btn').show();
          $('#copy-img-btn').show();

          $('#download-btn').click(function () {
              var canvas = $('#qrcode canvas')[0];  
              var imgURL = canvas.toDataURL("image/png");  
              $(this).attr("href", imgURL);  
          });

          $('#copy-img-btn').click(function () {
            var canvas = $('#qrcode canvas')[0];  
            canvas.toBlob(function (blob) {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]).then(function () {
                    alert('圖片已複製到剪貼簿'); 
                }).catch(function (error) {
                    alert('複製失敗: ' + error);  
                });
            });
        });
      }
  });
  $('#clear-btn').click(function () {
    $('#url-input').val('');  
    $('#qrcode').empty();    
    $('#download-btn').hide();  
    $('#copy-img-btn').hide();  
    $('#error-message').hide();  
  });
});