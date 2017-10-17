//add event handler to handle submit event and event handler method saveIssue
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  //define vars and assign user input values to variables
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid(); //use change js lib to get global unique id
  var issueStatus = 'Open';

  //create new issue obj
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  //insert issue obj in localStorage
  //check if localstorage is empty
  if (localStorage.getItem('issues') == null) {
    //initialize empty array
    var issues = [];
    //push issue obj from above into array issues
    issues.push(issue);
    //json method takes array and generates json obj which is value being stored in issues obj in localstorage
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    //generate array
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  //reset input elements
  document.getElementById('issueInputForm').reset();

  //list output is regenerated with new stuff
  fetchIssues();

  //prevent default submission of submit
  e.preventDefault();

  console.log(issues);
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      //set issue to closed 
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      //remove issue from array
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  //retrive issues from local storage and parse as json obj
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  //iterate over issues items in issues obj
  for (var i = 0; i < issues.length; i++) {
    //retrieve various props
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    //generate HTML
    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
