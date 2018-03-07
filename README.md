# Lackawanna-Station
Alternative version of Firebase Homework

###     Setup
### 
	* Must use Firebase to store data, GitHub to backup project, and GithHub
Pages to host finished site.

###     Instructions
### 
	
	* Make sure that your app suits this basic spec:

	* When adding trains, administrators should be able to submit the
following:

	* Train Name

	* Destination

	* First Train Time -- in military time

	* Frequency -- in minutes

	* App coded to calculate when the next train will arrive; this should be
relative to the current time.

	* Users from many different machines must be able to view same train
times.

	* Styling and theme are completely up to you. Get Creative!

###     Example Site
### 
	![train homework](Train_Time_Image.png)

###     Bonus (Extra Challenges)
### 

	* Consider updating your "minutes to arrival" and "next train time" text
once every minute. This is significantly more challenging; only attempt this
if you've completed the actual activity and committed it somewhere on GitHub
for safekeeping (and maybe create a second GitHub repo).

	* Try adding `update` and `remove` buttons for each train. Let the user
edit the row's elements-- allow them to change a train's Name, Destination
and Arrival Time (and then, by relation, minutes to arrival).

	* As a final challenge, make it so that only users who log into the site
with their Google or GitHub accounts can use your site. You'll need to read
up on Firebase authentication for this bonus exercise.

	- - -

###     Minimum Requirements
### 
	
	Attempt to complete homework assignment as described in instructions. If
unable to complete certain portions, please pseudocode these portions to
describe what remains to be completed.

	- - -

###     Commentary
	
	* Modified from orgininal program to update minutes on arrival every
minute. 
	* Trains folder set up in Firebase to contain train info. Had
originally intented to add a timeCounter folder there as well and update the
timeNumber variable from there (as well as an initialTime of "60"so that the counters 
would be synched across multiple browsers and update simultaneously. This proved harder 
than expected, so the intervals are all calculated locally using local variables.
	*There is a minor bug. If you add a train on one browser, the schedule renders fine.
However, on a second browser the new train will show up twice until the table refreshes.
	* Used the "time" type for the First Train time. While this has an hh:mm format, 
it enters Firebase as an HH:mm format.
