function upcomingInterviewStatus(dateIndex,timeIndex,updateIndex){
    var currentDate = new Date();
    var upcomingInterviews=document.getElementById("table-upcoming");
    
    for (var i=1, row; row=upcomingInterviews.rows[i];i++){
            interviewDate=row.cells[dateIndex].firstChild.nodeValue.trim().split(' '); //Shows the date extracted from the table in dd/mm/yyyy
            interviewDay=parseInt(interviewDate[0].split('/')[0]);
            interviewMonth=parseInt(interviewDate[0].split('/')[1])-1;
            interviewYear=parseInt(interviewDate[0].split('/')[2]);

            interviewTime=row.cells[timeIndex].firstChild.nodeValue.trim().split(' '); //Shows the time extracted from the table in hh:mm
            interviewHour=parseInt(interviewTime[0].split(':')[0]);
            if (interviewTime[1]=='PM')
                interviewHour+=12;

            interviewMin=parseInt(interviewTime[0].split(':')[1]);
            interviewSec=00;

            var interview=new Date(interviewYear,interviewMonth, interviewDay, interviewHour, interviewMin, interviewSec);
            dateDifference = parseFloat(interview.getTime() - currentDate.getTime());
            
            TimeLeftForInterview = parseFloat(dateDifference/1000);

            TimeLeftForInterview=Math.abs(TimeLeftForInterview);
            DaysLeft=Math.floor(TimeLeftForInterview%(86400*30)/86400);
            HoursLeft=Math.floor((TimeLeftForInterview%86400)/3600);
            MinutesLeft=Math.floor((TimeLeftForInterview%3600)/60);

            console.log(DaysLeft+"-"+HoursLeft+"-"+MinutesLeft);

            if (dateDifference>0){
                if (MinutesLeft>5){
                    if (HoursLeft>0){
                        if (DaysLeft>0)
                            toWrite=DaysLeft+"d "+ HoursLeft+"h left";
                        else
                            toWrite=HoursLeft+"h "+ MinutesLeft +"m "+ "left";
                    }

                    else
                        toWrite=MinutesLeft +"m "+ "left";
                }

                else{
                    toWrite="Join now";
                    //console.log(row.cells[5].firstChild.nextSibling);
                    row.cells[updateIndex].firstChild.nextSibling.setAttribute('onclick','enterInterview()');
                }
              
            row.cells[updateIndex].firstChild.nextSibling.firstChild.nodeValue=toWrite;
            }          
        }
    }

function enterInterview(){
    window.location = "file:///home/aravind/Documents/mock-int/interview.html";
}

(function() {
            'use strict';
            window.addEventListener('load', function() {
                var forms = document.getElementsByClassName('needs-validation');
                var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
                });
            }, false);
            })();