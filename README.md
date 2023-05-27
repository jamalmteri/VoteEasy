# Voteeasy
Voting system

VoteEasy
"Simplify Your Vote, Amplify Your Impact."

Authors:
      1) Daffy Selemani Mwarabu
      2) Jamal Ally Mteri
       


MVP specification

Minimum Viable Product (MVP) for the VoteEasy system. The MVP will include the core features necessary to simplify the voting process and amplify the impact of individual votes. Here's an outline of the system's components:
User Authentication and Registration:
Allow users to create accounts and log in securely.
Implement authentication mechanisms to verify user identities.
Candidate Information:
Provide a user-friendly interface for voters to access information about candidates.
Display candidate profiles, including their background, party affiliation, and campaign promises.
Ballot Creation and Submission:
Develop a ballot creation module that allows users to select candidates of their choice.
Implement validation mechanisms to ensure each user can vote only once.
Enable users to submit their ballots securely.
Real-time Result Updates:
Develop a result calculation module to process submitted ballots.
Provide real-time updates on the voting results.
Display aggregated results, such as the number of votes received by each candidate.
Accessibility and Multi-language Support:
Implement accessibility features to cater to users with disabilities.
Provide options for users to interact with the system in multiple languages.
Security Measures:
Implement robust security measures to prevent unauthorised access, data breaches, and manipulation of voting data.
Employ encryption techniques to secure sensitive information.
Conduct regular security audits to identify and address vulnerabilities.
User-Friendly Interface:
Design an intuitive and user-friendly interface to simplify the voting process.
Ensure the system is responsive and compatible with different browsers and devices.
Conduct cross-browser and cross-device testing to provide consistent user experiences.
Testing and Quality Assurance:
Develop a comprehensive testing strategy, including unit tests, integration tests, and end-to-end testing.
Utilise testing frameworks and automation tools to ensure the reliability and quality of the system.
Perform load testing to address scalability issues and optimise system performance.
Deployment and Release Management:
Follow a deployment strategy that includes continuous integration and continuous deployment (CI/CD) practices.
Utilise staging environments for further testing and verification of code changes.
Plan and coordinate the deployment of new features and updates to ensure a smooth transition for users.
It is worth noting that this MVP is a starting point and can be expanded upon with additional features and improvements based on user feedback and project requirements. This will be implemented using an agile development approach, iterating on the MVP and continuously delivering value to users throughout the development process.




Architecture






APIs and Methods
API Routes for Web Client to Web Server Communication:
/api/user/register
POST: Allows the web client to send user registration data to the server for creating a new user account.
/api/user/login
POST: Enables the web client to send user login credentials to the server for authentication and generating a session ID.
/api/user/logout
POST: Instructs the web server to invalidate the current user's session and log them out.
/api/candidates
GET: Retrieves a list of candidates from the server to display in the web client's interface.
/api/ballot/submit
POST: Allows the web client to submit a completed ballot to the server for processing and storage.
/api/results
GET: Retrieves the calculated voting results from the server to display in the web client's interface.
API Endpoints/Methods for External Clients:
getUserInfo(userId)
Description: Returns the information of a user based on their user ID.
Parameters:
userId: The unique identifier of the user.
Returns: User information (e.g., name, email, profile picture).
get JobSearch Results(job Params)
Description: Performs a job search based on the provided parameters using a third-party job search API.
Parameters:
jobParams: An object containing the search criteria (e.g., location, keywords, salary range).
Returns: Job listings matching the search criteria.
sendEmail(recipient, subject, body)
Description: Sends an email to the specified recipient using a third-party email delivery service.
Parameters:
recipient: The email address of the recipient.
subject: The subject line of the email.
body: The content of the email.
Returns: Status indicating whether the email was sent successfully or any error messages.
3rd Party APIs:
Google Maps API: Integration with Google Maps API to retrieve location information, geocode addresses, calculate distances, etc.
Twilio API: Integration with Twilio API to send SMS messages for notification purposes.


Data Modelling


+--------------------------------------------------+
|                      User                        |
+--------------------------------------------------+
| user_id (PK)                                     |
| username                                         |
| email                                            |
| password                                         |
| full_name                                        |
| created_at                                       |
| updated_at                                       |
+--------------------------------------------------+
                            |
                            |
                            |
                            | 1
                            |
                            |
                            V
+--------------------------------------------------+
|                   NationalID                      |
+--------------------------------------------------+
| national_id_id (PK)                              |
| user_id (FK referencing User.user_id)            |
| national_id_number                               |
+--------------------------------------------------+
                            |
                            |
                            |
                            | 1
                            |
                            |
                            V
+--------------------------------------------------+
|                     Election                      |
+--------------------------------------------------+
| election_id (PK)                                 |
| title                                            |
| description                                      |
| start_date                                       |
| end_date                                         |
| created_at                                       |
| updated_at                                       |
+--------------------------------------------------+
                            |
                            |
                            |
                            | N
                            |
                            |
                            V
+--------------------------------------------------+
|                     Candidate                     |
+--------------------------------------------------+
| candidate_id (PK)                                |
| election_id (FK referencing Election.election_id)|
| full_name                                        |
| party                                            |
| created_at                                       |
| updated_at                                       |
+--------------------------------------------------+
                            |
                            |
                            |
                            | N
                            |
                            |
                            V
+--------------------------------------------------+
|                     Vote                          |
+--------------------------------------------------+
| vote_id (PK)                                     |
| user_id (FK referencing User.user_id)            |
| election_id (FK referencing Election.election_id)|
| candidate_id (FK referencing Candidate.candidate_id)|
| created_at                                       |
| updated_at                                       |
+--------------------------------------------------+


In this data model:
The User table/entity includes attributes like user_id (primary key), username, email, password, full_name, created_at, and updated_at.
The NationalID table/entity includes attributes like national_id_id (primary key), user_id (foreign key referencing User.user_id), and national_id_number.
The Election table/entity includes attributes like election_id (primary key), title, description, start_date, end_date, created_at, and updated_at.
The Candidate table/entity includes attributes like candidate_id (primary key), election_id (foreign key referencing Election.election_id), full_name, party, created_at, and updated_at.
The Vote table/entity includes attributes like vote_id (primary key), user_id (foreign key referencing User.user_id), election_id (foreign key referencing Election.election_id), candidate_id (foreign key referencing Candidate.candidate_id), created_at, and updated_at.
This data model allows you to store information about users, their national ID, elections, candidates, and votes. Each entity has its primary key, and relationships are established using foreign keys.




User Stories
The table below summarise the user stories of the project
User Story
Description
User Story 1
As a registered voter, I want to be able to view a list of ongoing elections, including their titles, descriptions, start dates, and end dates. This will help me stay informed about the available elections and their timelines.
User Story 2
As a registered voter, I want to be able to cast my vote in an election by selecting a candidate from the provided list. Once I have voted, I should receive a confirmation message to ensure that my vote has been successfully recorded.
User Story 3
As an election administrator, I want to have access to a dashboard where I can manage elections. This includes creating new elections, specifying their details such as title, description, and duration, as well as adding candidates to the respective elections.
User Story 4
As an election administrator, I want to be able to view the results of completed elections, including the total number of votes received by each candidate and their corresponding percentages. This will help me analyse the outcome of the elections.
User Story 5
As an election administrator, I want to ensure the security and integrity of the voting process. This includes implementing measures such as user authentication, preventing duplicate voting by the same user, and ensuring that only registered voters can participate in the elections.



