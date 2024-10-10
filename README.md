# Employee-Skill-Inventory
A Web App to manage the Skill Database of any company's employees. <br>
One can:
- Add/Update/Delete Employee Data
- View entire Skill Inventory of the company
- Analyse the skill distribution of the employees with a pie chart.

### The Application was built using:
- HTML, CSS, JS
- Bootstrap
- Firebase Realtime Database (UI console)
- Chart.js (for the pie chart)


## Features of the app
- Uses Firebase Realtime Database to maintain the entries made through the application. <br>(Database is developed on a static json object (File_name: static_data.json))
- The database is constantly changed dynamically through firebase functions such as get, set, update, remove,etc.
- Uses Chart.js to create and display a 'doughnut' chart of the current data in the database everytime the Visualise button is clicked.<br> This chart shows the distribution of skills among the employees.
- Regular alerts prompted after user inputs to inform the user about the status of his/her input.
- Collapsible display options for Update Database Form, Table Display and Pie Chart Display, making the webpage look concise and clear.
- A favicon (logo) has also been included alongside title of the html file


#### Updating Database Form Feature:
The firebase realtime database can be updated through this form: <br>

- Add New Employee Data
- Remove Entire Data associated with a particular Employee
- Check Skill List of a particular employee
- Add a skill to the skillset of an employee
- Remove a skill from the skillset of an employee
- Upgrade Skill Level in a particular skill (For example, Beginner -> Intermediate in ML)
- Current Date Feature (If the user forgets to enter the date, the current date is considered)

#### Viewing the Skill Inventory:
- Users can view the entire skill inventory of the current data in the database (in the form of a table)
- The database is updated everytime the "View Entire Database" button is clicked. 
- #### Search and Filter:
      - The skill inventory can be filtered by selecting category from the drop down menu.
      - The database can be searched by name, skill, and by last updated date.

#### Pie Chart display:
- A display of colored chart of the entire skill distribution among the employees of the company.
- This chart helps in analysing the status of human resources with the required skills for the company.
- The chart is updated everytime the "Visualise, Analyze and Upgrade" button is clicked.

## Setup Instructions:
      - Download all the files on the page by navigating through Code -> Download Zip
      - Extract the files and make sure all of them are included in the same folder.
      - Once one has accessed the application, they can also view the videos in the Video_link file to see a quick demonstration of the working project.
      - You can also check the Video_link folder for a quick demo of the page.



##### Note: The firebase script had to be deployed first and then used in my code, but I have used it directly through a cdn import link and hence my javascript code is included in my html file


