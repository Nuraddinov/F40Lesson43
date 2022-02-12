// $(".myInput").on("input", function () {
//   let rgb1 = Math.floor(Math.random() * 256);
//   let rgb2 = Math.floor(Math.random() * 256);
//   let rgb3 = Math.floor(Math.random() * 256);
//   let span = document.createElement("span");
//   span.innerHTML = $(this)
//     .val()
//     .charAt($(this).val().length - 1);
//   span.style.color = `rgb(${rgb1},${rgb2},${rgb3})`;
//   $("h2").append(span)
// });

let addButton = document.querySelector(".add");
let idSaqla = null;
let students = [];
const getStudents = () => {
  $.ajax({
    url: "https://studentcrudforlesson.herokuapp.com/api/student/get",
    method: "get",
    success: function (javob) {
      students = javob;
      chiz();
    },
    error: function (error) {
      console.log(error);
      $("h2").html("Xatolik");
    },
  });
};
const addStudent = () => {
  $.ajax({
    url: "https://studentcrudforlesson.herokuapp.com/api/student/add",
    method: "post",
    data: JSON.stringify({
      firstname: $(".fname").val(),
      lastname: $(".lname").val(),
      username: $(".uname").val(),
      phoneNumber: $(".number").val(),
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      console.log(response);
      getStudents();
    },
    error: function (error) {
      getStudents();
      console.log(error);
    },
  });
  $(".fname").val("");
  $(".lname").val("");
  $(".uname").val("");
  $(".number").val("");
};
addButton.addEventListener("click", () => {
  addStudent();
  chiz();
});
const chiz = () => {
  let myText = "";
  students.forEach((student, index) => {
    myText += `<tr>
              <th scope="row">${index + 1}</th>
              <td>${student.firstname}</td>
              <td>${student.lastname}</td>
              <td>${student.username}</td>
              <td>${student.phoneNumber}</td>
              <td> 
              <img  onclick="editImg(${
                student.id
              })" class="deleteImg" src="img/pen.png" alt="edit">
              <img onclick="deleteImg(${
                student.id
              })" src="img/delete.png" class="deleteImg" alt="delete">           

              </td>
            </tr>`;
  });
  $(".tableBody").html(myText);
};
const deleteImg = (id) => {
  console.log(id);
  $.ajax({
    url: `https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`,
    method: "delete",
    success: function (javob) {
      console.log(javob);
      getStudents();
    },
    error: function (error) {
      console.log(error);
    },
  });
};
const editImg = (id) => {
  let student = students.find((i) => i.id === id);
  idSaqla = id;
  console.log(id, student);
  $(".fname").val(student.firstname),
    $(".lname").val(student.lastname),
    $(".uname").val(student.username),
    $(".number").val(student.phoneNumber);
  $(".add").hide();
  $(".edit").show();
};
$(".edit").on("click", function () {
  let firstname = $(".fname").val();
  let lastname = $(".lname").val();
  let username = $(".uname").val();
  let phoneNumber = $(".number").val();
  console.log(idSaqla);
  $.ajax({
    url: `https://studentcrudforlesson.herokuapp.com/api/student/update/${idSaqla}`,
    method: "post",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({
      firstname,
      lastname,
      username,
      phoneNumber,
    }),
    success: function (javob) {
      console.log(javob);
      getStudents();
    },
    error: function (error) {
      console.log(error);
      getStudents();
    },
  });
  $(".fname").val("");
  $(".lname").val("");
  $(".uname").val("");
  $(".number").val("");
  $(".add").show();
  $(".edit").hide();
});
