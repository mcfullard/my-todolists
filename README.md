# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
Explain what you have done here and why...

#### Task 1: Add Editing Feature (`git show t1` or `git diff init t1`)
Added route `/todo/edit/:id` that, when called with a POST request and the parameter `editedtodo`, it replaces the string in the array of todo items at index `id` with the new parameter. I modified the template view to include an *edit icon* lik that, when pressed, creates a HTML form with a text box filled with the old todo value to be modified. Once the text has been modified, the user can click on the submit button, which will send a POST request to the server with the new todo value as parameter for the appropriate item in the list. 

#### Task 2 & 4: Add Sufficient Test Coverage And Display Test Coverage (`git show t2` or `git diff t1 t2`)
Added tests for all the valid web service routes by making use of the libraries `chai`, `chai-http`, and `mocha`. `istanbul` is used to display test coverage automatically after the tests are run. Detailed output is stored to `./coverage`.

**To run the tests:**
```
npm test
```

**Note: testing can be done using the Docker test environment. See task 3 below.**

#### Task 5: Secure The Web Service Against XSS and Add A Test (`git show t5` or `git diff t2 t5`)
The web service was vulnerable to cross-site scripting (XSS) as users could add malacious scripts instead of to-do list items, and these scripts would then be stored and executed once the page was reloaded and the items displayed. In order to get around this, the input was escaped using the `sanitize` library. A test was added to ensure HTML input is properly escaped once entered.

#### Task 3: Docker Deployment (`git show t3` or `git diff t5 t3`)
(See [Docker installation](https://docs.docker.com/engine/installation/) for information on how to install Docker)

Added Docker files `Dockerfile.production` and `Dockerfile.test` for running the service, and testing the service, respectively. Images for the production and test environments were added to my personal repositories and each can be run by simply executing the following commands:

**Run the production service now**
```
docker run -p 8080:8080 mcfullard/my-todolists:v1
```

**Run the tests now**
```
docker run mcfullard/my-todolists-test:v1
```

To build the Docker files, run the following commands (depending on how you installed Docker, you may need to run the commands with `sudo`):

**Build Docker image for production called *my-todolists***

```
docker build -t my-todolists -f Dockerfile.production .
```

**Build Docker image for tests called *my-todolists-test***

```
docker build -t my-todolists-test -f Dockerfile.test .
```

**Run the production image**

```
docker run -p 8080:8080 my-todolists
```

**Run the test image**

```
docker run my-todolists-test
```
