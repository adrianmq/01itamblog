/*global $*/

// $(function(){
//   var urlP = 'https://web6-adrianmatei-adrianmq.c9users.io/curs/curs26-MVC-III/blog/admin/';
//   $.ajax({
//     url: urlP + 'articles',
//     success: function(response) {
//       console.log("response: " + response);
//       console.log("id: " + response[0].id);
//     }    
//   });
// });

// $(function(){
//   var url = 'https://web6-adrianmatei-adrianmq.c9users.io/curs/curs26-MVC-III/blog/admin';
  
//   function getArticles() {
//     $.ajax({
//       url: url + 'articles',
//       success: function(response) { 
//         var articlesHtml = "";
//         for(var i=0; i < response.length; i++) {
//           articlesHtml += '<div>' +
//                           '<div>' + response[i].title + '</div>' +
//                           '<div><button data-id="' + response[i].id + '">Delete</button></div>' +
//                           '</div>';

//         }
//         $('.articles-list').html(articlesHtml);
//       }    
//     });
//   }

//   getArticles();

//   $('.articles-list').on('click', '[data-id]', function() {
//     var id = $(this).data('id');
//     $.ajax({
//       url: url + 'articles/delete',
//       method: 'DELETE',
//       data: {'id': id},
//       success: function(response) { 
//         if(response.deleted == 1){
//           getArticles();
//         }
//         else {
//           alert('Failed to remove article!');
//         }
//       }
//     });    
//   });
// });


// var url = 'https://web-6-siitwebcluj.c9users.io/curs25/blog/admin/';

// function getArticles() {
//     $.ajax({
//         url: url + 'articles',
//         success: function(response) { 
//             var articlesHtml = "";
//             for(var i=0; i < response.length; i++) {
//                 articlesHtml += '<div>' +
//                                 '<div>' + response[i].title + '</div>' +
//                                 '<div><button data-id="' + response[i].id + '">Delete</button></div>' +
//                                 '</div>';
     
//             }
//             $('.articles-list').html(articlesHtml);
//         }    
//     });
// }
    
// $(function(){
    
//     getArticles();
    
//     $('.articles-list').on('click', '[data-idd]', function() {
//         var id = $(this).data('id');
//         $.ajax({
//             url: url + 'articles/delete',
//             method: 'DELETE',
//             data: {'id': id},
//             success: function(response) { 
//                 if (response.deleted == 1) {
//                     getArticles();   
//                 } 
//                 else {
//                     alert("HAHA");
//                 }
//             }
//         });    
//     });
// });


