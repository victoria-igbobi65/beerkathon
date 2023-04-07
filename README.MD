# MEAL TRACKER

A simple backend API that keeps track of employees and their meal status for the day. It allows employees to recieve only one meal a day. This API eliminates the chances of one employee taking more than one meal a day.

### Technologies

<div align="center">

  <a href="">![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)</a>
  <a href="">![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)</a>
  <a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
  
  
</div>
<div align="center">

  <a href="">![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)</a>
  <a href="">![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)</a>

</div>

### Installation
 
Firstly, you need to clone the repository into your local machine
```javascript
$ git clone https://github.com/victoria-igbobi65/beerkathon.git
```
Secondly, change directory into the project file
```
$ cd chatbot 
```
Thirdly, you need to install the dependencies.
```javascript
$ npm i 
``` 
Fourthly, you need to create a `.env` file and copy the `.env.example` file to it.
```javascript
$ cp .env.example .env 
```
Finally, you need to run the server.
```java
$ npm run start
```

### Testing
To run the test
```
npm run test
```

### Base URL


### Usage

#### Registration
This endpoint is available to only admins, They provide employee's email and ID number. The employee recieves a mail with their login details. 

* Route: /api/v1/auth/signup
* Method: POST
* Body:
```java
{
  email: Myemail@gmail.com,
  id: employeeId /* A unique ID of numbers with length of 5 */
}
```
* Response StatusCodes:
```java
  * 201: success || Created
  * 409: error || Conflict Error
  * 400: error || Bad Request
  * 401: error || Unauthorized Error
  * 500: error || Server Error
```

#### User Login
Employees can log in with their credentials.

* Route: /api/v1/auth/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com || employeeID /* Staff can log in with their email or ID */,
  password: mypassword
}

```
* Response StatusCodes:
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```


#### Vendor Login
Vendors can log in with the credentials

* Route: /api/v1/auth/vendor/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com,
  password: mypassword
}

```
* Response StatusCodes:
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```

#### Admin Login
Admin can log in to access the admin dashboard and excercise admin previledge.

* Route: /api/v1/auth/admin/login
* Method: POST
* Body: 
```java
{
  id: Myemail@gmail.com,
  password: mypassword
}

```
* Response StatusCodes:
```java
  200: success
  400: error || Bad Request
  500: error || Server Error
```

#### Create New Order
Users can access this endpoint to place their order and it returns a unique ID for that meal which they can proceed with to the vendor for their meal.

* Route: /api/v1/ticket/
* Method: POST
* Body: 
```java
{
  category: meal Category,
  meal: meal name,
  price: price
}

```
* Response StatusCodes: 
```java
  201: success || Created
  401: error || Unauthorized
  400: error || Bad Request
  403: error || Forbidden Error
  500: error || Server Error
```

#### Update Order
Vendors can access this endpoint to update an order status from "in progress" to "served".

* Route: /api/v1/ticket/:id
* Method: PATCH
* Body: {}
* Response StatusCodes
```java
  200: success 
  401: error || Unauthorized
  403: error || Forbidden
  404: error || Not Found Error
  500: error || Server Error
```


#### Get all orders
This endpoint is available to vendors and admins to get all the orders made.

* Route: /api/v1/ticket/
* Method: GET
* Query: 
  * status: filters order by status, either in progress or already served.
    ```java
      /api/v1/ticket?status=served
    ```
  * sort : sort orders in ascending or descending order given a specified format. To sort in descending order, add a `-` prefix before a field, seperate multiple values with a `,`.
  Accepted Values:
    * createdAt
    ```java
      /api/v1/ticket/?sort=createdAt
    ```
  * page [default: 1]
  * limit [default: 20] 
  ```java
    /api/v1/ticket/?page=1&limit=10
  ```
* Response StatusCodes:
```java
  200: success
  401: error || Unauthorized
  403: error || Forbidden Error
  500: error || Server Error
```


#### Order Statistics
This endpoint returns a list of the sum of orders made each day in the current month.

* Route: /api/v1/ticket/stats
* Method: GET
* Response: 
```java
  [
    {
      _id: "23rd of march",
      count: 20
    },
    {
      _id: "24th of march",
      count: 34
    },
    {
      _id: "25th of march",
      count: 0
    }
  ]
```
* Response StatusCodes:
```java
  200: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```

#### Today Orders
This endpoint returns all orders made for that day and is only available to vendors and admins.

* Route: /api/v1/ticket/today
* Method: GET
* Response StatusCodes:
```java
  200: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```


#### Five Top Meal For the Week
This endpoint returns the top five meal for the current week. This is calculated based on order data.

* Route: /api/v1/ticket/top-meal
* Method: GET
* Response StatusCodes:
```java
  200: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```

#### Get Employees
This enpoint is available to only admins and it returns a list of all employees.

* Route: /api/v1/users/
* Method: GET
* Response StatusCodes:
```java
  200: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```

#### Delete a User
This endpoint allows an admin delete an employee from the DB. 
```java 
/*NB: This action is irreversible*/
```
* Route: /api/v1/users/
* Method: DELETE
* Response StatusCodes:
```java
  204: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```

#### Current User personal Details
This endpoint returns the personal data of a logged in user.

* Route: /api/v1/me/
* Method: GET
* Response StatusCodes:
```java
  204: success
  401: error || Unauthorized /* Likely cause: Route isn't available to user*/
  403: error || Forbidden Error /* Likely cause: Not logged in, Invalid Token */
  500: error || Server Error 
```
