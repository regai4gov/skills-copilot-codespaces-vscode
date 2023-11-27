function skillsMember() {
  // Get the data from the form
  var skill = document.getElementById("skill").value;
  var level = document.getElementById("level").value;
  var years = document.getElementById("years").value;
  var skillId = document.getElementById("skillId").value;
  var memberId = document.getElementById("memberId").value;
  var action = document.getElementById("action").value;
  var url = "skills.php?action=" + action + "&skill=" + skill + "&level=" + level + "&years=" + years + "&skillId=" + skillId + "&memberId=" + memberId;
  window.location = url;
}