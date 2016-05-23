'use strict';

/* NOTE Controllers */

angular.module('peckbox')
  .controller('NotesCtrl', ['$scope', '$http', '$auth', 'Auth', 'toastr', function($scope, $http, $auth, Auth, toastr) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });


    $scope.note = {};

    $scope.test = function(note, color) {

        console.log(note);
        // overriding post model with color (String)
        if (color === "red") {
          note.color = "red";
        } else if (color === "blue"){
          note.color = "blue";
        } else if (color === "yellow"){
          note.color = "yellow";
        } else {
          note.color = "default";
        }
        
        $http.put('/api/notes/'+ note._id, note)
        .success(function(response){
         console.log(response);
       });
    };


    $scope.createNote = function(user) {
     
        var config = {
            userId: user._id,
            body  : $scope.note.body,
            color:  $scope.note.color,
        };
        console.log(config);
        $http.post('/api/notes', config)
        .success(function(response){
            toastr.success('You have successfully created a note!');
            console.log('response', response);
            $scope.user.notes.unshift(response);
        })
        .error(function(response){
            console.log('err', response);
        });

    };

    $scope.editNote = function(note){
        $scope.note = {
            userId: note.userId[0],
            _id: note._id,
            body: note.body
        };
        console.log('edit', $scope.note);
    };

    $scope.updateNote = function(note){
       console.log('update', note)
       $http.put('/api/notes/'+ note._id, note)
       .success(function(response){
         toastr.warning('You have successfully edited a note!');
         console.log(response)
         note.editForm = false;
       });
     };

    $scope.deleteNote = function(note) {
      $http.delete('/api/notes/' + note._id)
        .success(function(data) {
          toastr.error('You have successfully deleted a note!');
          var index = $scope.user.notes.indexOf(note);
          $scope.user.notes.splice(index,1);

        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

 
 }]);


