// Make sure we wait to attach handlers until the DOM is fully loaded
$(function() {
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#bu").val().trim(),
      };
  
      // Send the POST request
      $.ajax("/api/burgers/", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".change-devour").on("click", function(event) {
      var id = $(this).data("id");
      var newStatus = $(this).data("newstatus");
  
      var newEatenStatus = {
        devoured: newStatus
      };
  
      // Send the PUT request
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatenStatus
      }).then(
        function() {
          console.log("changed status to", newStatus);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE",
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });